#!/usr/bin/env python3
"""Public developmental math controls for P08/P09; no production evidence.

Standard library only. Matrix enumeration is independent of basis-image
construction. P09 controls check algebra, not whether a move deserves a human
crux annotation. No candidate updates, validator imports or held-out evaluation.
"""
from collections import Counter
from fractions import Fraction
from itertools import product
from math import prod
import json


def matvec(matrix, vector, modulus):
    return tuple(sum(a * b for a, b in zip(row, vector)) % modulus for row in matrix)


def columns(vectors):
    return tuple(tuple(v[i] for v in vectors) for i in range(len(vectors[0])))


def matmul(a, b, modulus):
    return tuple(tuple(sum(a[i][k] * b[k][j] for k in range(len(b))) % modulus
                       for j in range(len(b[0]))) for i in range(len(a)))


def inverse(matrix, prime):
    n = len(matrix)
    a = [[x % prime for x in row] + [int(i == j) for j in range(n)]
         for i, row in enumerate(matrix)]
    for j in range(n):
        pivot = next((i for i in range(j, n) if a[i][j] != 0), None)
        if pivot is None:
            return None
        a[j], a[pivot] = a[pivot], a[j]
        scale = pow(a[j][j], -1, prime)
        a[j] = [(x * scale) % prime for x in a[j]]
        for i in range(n):
            if i != j:
                scale = a[i][j]
                a[i] = [(x - scale * y) % prime for x, y in zip(a[i], a[j])]
    return tuple(tuple(row[n:]) for row in a)


def rank_columns(vectors, prime):
    a = [list(row) for row in columns(vectors)]
    row = 0
    for j in range(len(vectors)):
        pivot = next((i for i in range(row, len(a)) if a[i][j] != 0), None)
        if pivot is None:
            continue
        a[row], a[pivot] = a[pivot], a[row]
        scale = pow(a[row][j], -1, prime)
        a[row] = [x * scale % prime for x in a[row]]
        for i in range(len(a)):
            if i != row:
                scale = a[i][j]
                a[i] = [(x - scale * y) % prime for x, y in zip(a[i], a[row])]
        row += 1
        if row == len(a):
            break
    return row


def completion(first, prime):
    n = len(first)
    out = [first]
    for j in range(n):
        e = tuple(int(i == j) for i in range(n))
        if rank_columns(out + [e], prime) > len(out):
            out.append(e)
    assert len(out) == n and out[0] == first
    return tuple(out)


def matrices(n, modulus):
    for entries in product(range(modulus), repeat=n * n):
        yield tuple(tuple(entries[i * n:(i + 1) * n]) for i in range(n))


def line_key(vector, prime):
    first = next(x for x in vector if x)
    scale = pow(first, -1, prime)
    return tuple(x * scale % prime for x in vector)


def finite_field_case(prime, n):
    vectors = list(product(range(prime), repeat=n))
    zero = (0,) * n
    nonzero = [v for v in vectors if v != zero]
    direct_sets = {(v, value): set() for v in nonzero for value in range(prime)}
    eigenvector_total = eigenline_total = matrix_total = 0
    for matrix in matrices(n, prime):
        eigenvectors = []
        assert matvec(matrix, zero, prime) == zero
        for v in nonzero:
            image = matvec(matrix, v, prime)
            index = next(i for i, x in enumerate(v) if x)
            value = image[index] * pow(v[index], -1, prime) % prime
            if image == tuple(value * x % prime for x in v):
                direct_sets[v, value].add(matrix)
                eigenvectors.append(v)
        lines = {line_key(v, prime) for v in eigenvectors}
        assert len(eigenvectors) == (prime - 1) * len(lines)
        eigenvector_total += len(eigenvectors)
        eigenline_total += len(lines)
        matrix_total += 1
    assert matrix_total == prime ** (n * n)
    fixed_count = prime ** (n * (n - 1))
    assert all(len(s) == fixed_count for s in direct_sets.values())
    for v in nonzero:
        assert len(set().union(*(direct_sets[v, value] for value in range(prime)))) == prime * fixed_count

    constructed = completion_candidates = valid_completions = 0
    expected_completions = prod(prime ** n - prime ** j for j in range(1, n))
    for v in nonzero:
        basis = completion(v, prime)
        basis_inverse = inverse(columns(basis), prime)
        assert basis_inverse is not None
        for value in range(prime):
            prescribed = tuple(value * x % prime for x in v)
            built = set()
            for remaining_images in product(vectors, repeat=n - 1):
                images = (prescribed,) + remaining_images
                matrix = matmul(columns(images), basis_inverse, prime)
                assert all(matvec(matrix, x, prime) == y for x, y in zip(basis, images))
                built.add(matrix)
                constructed += 1
            assert len(built) == fixed_count and built == direct_sets[v, value]
        count = 0
        for rest in product(vectors, repeat=n - 1):
            completion_candidates += 1
            if inverse(columns((v,) + rest), prime) is not None:
                count += 1
        assert count == expected_completions
        valid_completions += count

    expected = Fraction(prime ** n - 1, prime ** (n - 1))
    assert Fraction(eigenvector_total, matrix_total) == expected
    assert Fraction(eigenline_total, matrix_total) == expected / (prime - 1)
    return {
        'prime': prime, 'dimension': n, 'matricesExhausted': matrix_total,
        'fixedVectorFixedEigenvalueCount': fixed_count,
        'fixedVectorAnyEigenvalueCount': prime * fixed_count,
        'averageEigenvectors': str(expected),
        'averageEigenlines': str(expected / (prime - 1)),
        'basisImageAssignmentsChecked': constructed,
        'completionListsChecked': completion_candidates,
        'validOrderedBases': valid_completions,
        'zeroVectorConstraintCount': matrix_total
    }


def p08():
    cases = [finite_field_case(p, n)
             for p, n in [(2, 1), (2, 2), (2, 3), (3, 1), (3, 2), (5, 1), (5, 2)]]
    assert sum(x['matricesExhausted'] for x in cases) == 1244
    assert sum(x['basisImageAssignmentsChecked'] for x in cases) == 4164
    assert sum(x['completionListsChecked'] for x in cases) == 1139
    assert sum(x['validOrderedBases'] for x in cases) == 709

    # Counting every completion without quotienting would count descriptions.
    vectors = list(product(range(2), repeat=2))
    v = (1, 0)
    descriptions = Counter()
    bases = [(v, w) for w in vectors if inverse(columns((v, w)), 2) is not None]
    for basis in bases:
        inv = inverse(columns(basis), 2)
        for free_image in vectors:
            descriptions[matmul(columns((v, free_image)), inv, 2)] += 1
    assert len(bases) == 2 and len(descriptions) == 4
    assert set(descriptions.values()) == {2}

    # A spanning dependent list does not admit arbitrary image assignments.
    compatible_triples = [(a, b, c) for a, b, c in product(vectors, repeat=3)
                          if c == tuple((x + y) % 2 for x, y in zip(a, b))]
    assert len(compatible_triples) == 16
    assert not ((0, 0), (0, 0), (1, 0)) in compatible_triples

    all_maps = list(matrices(2, 2))
    invertible = [m for m in all_maps if inverse(m, 2) is not None]
    assert len(invertible) == 6
    assert sum(matvec(m, v, 2) == v for m in all_maps) == 4
    assert sum(matvec(m, v, 2) == v for m in invertible) == 2
    assert sum(matvec(m, v, 2) == (0, 0) for m in invertible) == 0

    # An original out-of-domain control over Z/4Z, not the field with 4 elements.
    ring_maps = list(matrices(2, 4))
    ring_v = (2, 0)
    lambda_one = {m for m in ring_maps if matvec(m, ring_v, 4) == ring_v}
    lambda_three = {m for m in ring_maps
                    if matvec(m, ring_v, 4) == tuple(3 * x % 4 for x in ring_v)}
    assert len(lambda_one) == 64 and lambda_one == lambda_three
    assert len(lambda_one) != 4 ** (4 - 2)
    assert tuple(2 * x % 4 for x in ring_v) == (0, 0) and ring_v != (0, 0)

    return {
        'finiteFieldCases': cases,
        'totalMatricesExhausted': 1244,
        'basisImageAssignmentsChecked': 4164,
        'completionListsChecked': 1139,
        'validOrderedBases': 709,
        'completionOvercountExample': {'bases': 2, 'descriptions': 8, 'distinctMaps': 4},
        'dependentSpanningList': {'imageTriples': 64, 'compatibleImageTriples': 16},
        'invertibleBoundary': {'allMapsFixingVector': 4, 'invertibleFixingVector': 2,
                               'invertibleSendingVectorToZero': 0},
        'residueRing4Boundary': {'nonzeroVector': [2, 0], 'fixedImageCount': 64,
                                 'invalidFieldFormula': 16,
                                 'eigenvalues1And3GiveSameEvent': True}
    }


def polynomial_product(a, b):
    out = [0] * (len(a) + len(b) - 1)
    for i, x in enumerate(a):
        for j, y in enumerate(b):
            out[i + j] += x * y
    return out


def p09():
    # Exact coefficient check, not a classifier of pedagogical importance.
    factored = polynomial_product([2, 2, 1], [2, -2, 1])
    assert factored == [4, 0, 0, 0, 1]
    square = polynomial_product([2, 0, 1], [2, 0, 1])
    square[2] -= 4
    assert square == factored

    ratios = [Fraction(-2), Fraction(-1), Fraction(-1, 2), Fraction(0),
              Fraction(1, 2), Fraction(1), Fraction(2)]
    first_terms = [Fraction(-2), Fraction(0), Fraction(3, 2)]
    geometric_cases = unit_ratio_cases = 0
    for a, r, n in product(first_terms, ratios, range(1, 9)):
        s = sum(a * r ** k for k in range(n))
        assert (1 - r) * s == a * (1 - r ** n)
        if r != 1:
            assert s == a * (1 - r ** n) / (1 - r)
        else:
            assert s == n * a
            unit_ratio_cases += 1
        geometric_cases += 1
    assert (geometric_cases, unit_ratio_cases) == (168, 24)
    for n in list(range(1, 21)) + [99]:
        s = sum(Fraction(1, k * (k + 1)) for k in range(1, n + 1))
        assert s == 1 - Fraction(1, n + 1)
    return {
        'addZeroFactorizationCoefficients': factored,
        'geometricSeriesCases': geometric_cases,
        'ratioOneBoundaryCases': unit_ratio_cases,
        'rationalTelescopingCases': 21,
        'sourceFiniteSum99Terms': '99/100',
        'automatedCruxClassification': False,
        'newVerificationOfFourConsecutiveIdentity': False
    }


if __name__ == '__main__':
    print(json.dumps({
        'status': 'P08_P09_MATHEMATICAL_CHECKS_OK',
        'publicDevelopmentOnly': True,
        'acceptedCandidateEvidence': False,
        'heldOutEvaluation': False,
        'formalCandidateDispositions': 0,
        'formalRelationRecords': 0,
        'P08': p08(),
        'P09': p09()
    }, indent=2))
