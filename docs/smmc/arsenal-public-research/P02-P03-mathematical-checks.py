#!/usr/bin/env python3
"""Public developmental math controls for P02/P03; no production evidence.

Standard library only. Source-example reconstructions and original countertests
are identified in the notes. None is an accepted candidate treatment or a
held-out challenge. General arguments are in the notes, not inferred from samples.
"""
from collections import Counter
from fractions import Fraction
from itertools import product
from math import factorial, isqrt, prod
import json


def polynomial_product(a, b):
    out = [0] * (len(a) + len(b) - 1)
    for i, x in enumerate(a):
        for j, y in enumerate(b):
            out[i + j] += x * y
    return out


def card_step(state):
    n = len(state)
    return tuple(tuple(sorted((state[i][1], state[(i - 1) % n][0])))
                 for i in range(n))


def card_orbit(m):
    n = 2 * m
    initial = tuple((i % m + 1, m + i % m + 1) for i in range(n))
    state = initial
    seen = set()
    while state not in seen:
        seen.add(state)
        assert all(1 <= a <= m < b <= n for a, b in state)
        assert Counter(x for pair in state for x in pair) == {x: 2 for x in range(1, n + 1)}
        state = card_step(state)
    assert state == initial
    assert len(seen) == m
    return {'players': n, 'period': len(seen), 'duplicatePairReached': False}


def two_colorings(n, cycle):
    edges = [(i, i + 1) for i in range(n - 1)]
    if cycle:
        edges.append((n - 1, 0))
    return sum(all(c[a] != c[b] for a, b in edges) for c in product(range(2), repeat=n))


def equation_residual(k, x, y, z):
    return x * x + y * y + z * z - k * x * y * z


def positive_two_adic_decomposition(n):
    count = 0
    while n % 2 == 0:
        n //= 2
        count += 1
    return count, n


def p02():
    # Exact coefficient equality certifies this polynomial identity over Z.
    left = [1]
    for offset in range(4):
        left = polynomial_product(left, [offset, 1])
    right = polynomial_product([1, 3, 1], [1, 3, 1])
    right[0] -= 1
    assert left == right == [0, 6, 11, 6, 1]
    for n in range(1, 1001):
        value = prod(n + j for j in range(4))
        assert isqrt(value) ** 2 != value
    assert prod(range(4)) == 0  # Extending the nonsquare claim to n=0 fails.

    # Every tested prefix also fits a different polynomial; formula proves why.
    prefix_checks = []
    for m in range(1, 9):
        perturbation = lambda n: prod(n - j for j in range(1, m + 1))
        assert all(perturbation(n) == 0 for n in range(1, m + 1))
        assert perturbation(m + 1) == factorial(m) != 0
        prefix_checks.append({'matchingPrefixLength': m, 'nextValueDifference': factorial(m)})

    residues = [r * r % 4 for r in range(4)]
    assert residues == [0, 1, 0, 1]
    graph_checks = []
    for n in range(3, 7):
        a, b = two_colorings(n, False), two_colorings(n, True)
        assert a == 2 and b == (0 if n % 2 else 2)
        graph_checks.append({'vertices': n, 'pathColorings': a, 'cycleColorings': b})

    return {
        'fourConsecutivePolynomialCoefficients': left,
        'positiveNonsquareInstancesChecked': 1000,
        'zeroBoundaryIsSquare': True,
        'counterfeitPrefixes': prefix_checks,
        'squareResiduesModulo4': residues,
        'evenCardCycles': [card_orbit(m) for m in range(1, 9)],
        'relaxationColoringControls': graph_checks
    }


def p03():
    # A real strictly decreasing positive sequence need not terminate.
    rationals = [Fraction(1, 2 ** n) for n in range(17)]
    assert all(a > b > 0 for a, b in zip(rationals, rationals[1:]))
    # This checks a finite prefix only; the displayed recurrence proves all n.
    constant = [1] * 17
    assert all(a >= b for a, b in zip(constant, constant[1:]))
    assert not all(a > b for a, b in zip(constant, constant[1:]))

    # Strictly decreasing positive measure is insufficient without membership.
    bad = lambda n: n % 2 == 0
    assert bad(2) and not bad(1) and 1 < 2
    partial_chain = [5, 4, 3, 2, 1]
    assert all(a > b for a, b in zip(partial_chain, partial_chain[1:]))

    # All possible even-coefficient residue classes and coordinate residues.
    allowed = []
    for k, x, y, z in product([0, 2], range(4), range(4), range(4)):
        if equation_residual(k, x, y, z) % 4 == 0:
            assert x % 2 == y % 2 == z % 2 == 0
            allowed.append((k, x, y, z))
    assert len(allowed) == 16

    # Unconditional polynomial scaling, not fabricated solution witnesses.
    scaling_checks = 0
    for k, a, b, c in product(range(-4, 5), range(-3, 4), range(-3, 4), range(-3, 4)):
        assert equation_residual(k, 2 * a, 2 * b, 2 * c) == 4 * equation_residual(2 * k, a, b, c)
        scaling_checks += 1
    assert scaling_checks == 3087
    assert equation_residual(2, 2, 2, 2) == -4
    assert 4 * equation_residual(2, 1, 1, 1) == 4
    assert equation_residual(1, 3, 3, 3) == 0
    assert equation_residual(3, 1, 1, 1) == 0
    assert equation_residual(2, 0, 0, 0) == 0
    for a, b, c in product(range(-3, 4), repeat=3):
        if (a, b, c) != (0, 0, 0):
            old = sum(abs(t) for t in (2 * a, 2 * b, 2 * c))
            new = sum(abs(t) for t in (a, b, c))
            assert old == 2 * new and 0 < new < old

    max_halvings = 0
    for n in range(1, 1025):
        k, odd = positive_two_adic_decomposition(n)
        assert n == 2 ** k * odd and odd > 0 and odd % 2 == 1
        max_halvings = max(max_halvings, k)
    assert max_halvings == 10

    # A finite analogue of the positive-integer harmonic-value example.
    # On the 2x2 torus some neighbor positions coincide; count all four edges.
    harmonic = []
    for values in product(range(1, 4), repeat=4):
        def at(i, j):
            return values[2 * (i % 2) + j % 2]
        if all(4 * at(i, j) == at(i - 1, j) + at(i + 1, j) + at(i, j - 1) + at(i, j + 1)
               for i, j in product(range(2), repeat=2)):
            assert len(set(values)) == 1
            harmonic.append(values)
    assert len(harmonic) == 3

    return {
        'positiveRationalPrefixLength': len(rationals),
        'constantIntegerSequenceIsNotStrictDescent': True,
        'closureFailure': {'badInput': 2, 'smallerOutputOutsideBadSet': 1},
        'partialDescentHasEndpoint': partial_chain,
        'evenCoefficientResidueTuplesChecked': 128,
        'allowedTuplesAllEven': len(allowed),
        'coefficientScalingIdentitiesChecked': scaling_checks,
        'wrongFixedCoefficientResiduals': [-4, 4],
        'oddCoefficientActualSolutions': [[1, 3, 3, 3], [3, 1, 1, 1]],
        'zeroSolutionMustRemainAllowed': True,
        'positiveDecompositionsChecked': 1024,
        'maxHalvingsInFiniteRange': max_halvings,
        'finiteTorusAssignmentsChecked': 81,
        'finiteTorusHarmonicAssignments': len(harmonic)
    }


if __name__ == '__main__':
    print(json.dumps({
        'status': 'P02_P03_MATHEMATICAL_CHECKS_OK',
        'publicDevelopmentOnly': True,
        'acceptedCandidateEvidence': False,
        'heldOutEvaluation': False,
        'formalCandidateDispositions': 0,
        'formalRelationRecords': 0,
        'P02': p02(),
        'P03': p03()
    }, indent=2))
