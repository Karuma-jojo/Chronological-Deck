#!/usr/bin/env python3
"""Public developmental math controls for P04/P05; no production evidence.

Standard library only. The notes distinguish source reconstructions from original
controls and give general arguments independently of finite instance checks.
No validator imports, candidate updates, selection, or held-out evaluation.
"""
from fractions import Fraction
from itertools import product
from math import gcd, lcm, prod
import json


def implies(p, q):
    return not p or q


def crt_pairwise(moduli, residues):
    """Explicit inverse-sum construction; only pairwise coprime moduli > 1."""
    assert len(moduli) == len(residues) and moduli
    assert all(m > 1 for m in moduli)
    assert all(gcd(m, n) == 1 for i, m in enumerate(moduli)
               for n in moduli[i + 1:])
    modulus = prod(moduli)
    value = 0
    for m, a in zip(moduli, residues):
        other = modulus // m
        value += a * other * pow(other, -1, m)
    return value % modulus


def p04():
    truth_rows = []
    for p, q in product([False, True], repeat=2):
        original = implies(p, q)
        contra = implies(not q, not p)
        converse = implies(q, p)
        inverse = implies(not p, not q)
        assert original == contra and converse == inverse
        truth_rows.append({'P': p, 'Q': q, 'conditional': original,
                           'contrapositive': contra, 'converse': converse,
                           'inverse': inverse})
    assert sum(r['conditional'] != r['converse'] for r in truth_rows) == 2
    for background, p, q in product([False, True], repeat=3):
        assert implies(background, implies(p, q)) == implies(
            background, implies(not q, not p))

    # Original concrete falsifier for converse/inverse substitution.
    n = 2
    p, q = n % 4 == 0, n % 2 == 0
    assert implies(p, q) and implies(not q, not p)
    assert not implies(q, p) and not implies(not p, not q)

    # Reconstruction of Hammack's two proofs, with all arithmetic exact.
    direct = contra = 0
    for x in range(-50, 51):
        p, q = (7 * x + 9) % 2 == 0, x % 2 != 0
        assert implies(p, q)
        if p:
            a = (7 * x + 9) // 2
            b = a - 3 * x - 5
            assert 7 * x + 9 == 2 * a and x == 2 * b + 1
            direct += 1
        if not q:
            a = x // 2
            assert x == 2 * a
            assert 7 * x + 9 == 2 * (7 * a + 4) + 1
            assert not p
            contra += 1
    assert (direct, contra) == (50, 51)
    x = Fraction(1, 7)
    assert 7 * x + 9 == 10 and x.denominator != 1

    # Velleman's ordered-field example; samples supplement the general proof.
    vals = [Fraction(i, 2) for i in range(-4, 5)]
    ordered_cases = 0
    for a, b, c in product(vals, repeat=3):
        if a > b:
            assert implies(a * c <= b * c, c <= 0)
            assert implies(c > 0, a * c > b * c)
            ordered_cases += 1
    assert ordered_cases == 324
    a, b, c = 1, 1, 1
    assert a * c <= b * c and not c <= 0  # Background hypothesis omitted.

    # Complete finite logical controls for negating compound/quantified goals.
    for p, q in product([False, True], repeat=2):
        assert (not (p and q)) == ((not p) or (not q))
        assert (not (p or q)) == ((not p) and (not q))
    relation_cases = 0
    for entries in product([False, True], repeat=4):
        at = lambda i, j: entries[2 * i + j]
        negated = not all(any(at(i, j) for j in range(2)) for i in range(2))
        correct = any(all(not at(i, j) for j in range(2)) for i in range(2))
        assert negated == correct
        relation_cases += 1
    identity = lambda i, j: i == j
    assert all(any(identity(i, j) for j in range(2)) for i in range(2))
    assert all(any(not identity(i, j) for j in range(2)) for i in range(2))

    return {
        'completeTruthTable': truth_rows,
        'commonBackgroundTruthCases': 8,
        'converseInverseCounterexample': {'n': 2, 'P': '4 divides n', 'Q': '2 divides n'},
        'hammackIntegerInputs': 101,
        'directWitnessCases': direct,
        'contrapositiveWitnessCases': contra,
        'rationalDomainCounterexample': 'x=1/7; 7x+9=10',
        'vellemanRationalInstances': ordered_cases,
        'missingBackgroundCounterexample': {'a': a, 'b': b, 'c': c},
        'quantifierRelationsExhausted': relation_cases,
        'wrongQuantifierNegationFalsified': True
    }


def p05():
    # Independent oracle: enumerate every residue in the complete period first.
    construction_cases = 0
    for moduli in [(2, 3, 5), (3, 4, 5), (4, 9, 25)]:
        modulus = prod(moduli)
        oracle = {}
        for x in range(modulus):
            residues = tuple(x % m for m in moduli)
            assert residues not in oracle
            oracle[residues] = x
        assert len(oracle) == modulus
        for residues in product(*(range(m) for m in moduli)):
            x = crt_pairwise(moduli, residues)
            assert x == oracle[residues]
            construction_cases += 1
    assert construction_cases == 990
    negative_cases = 0
    for residues in product([-17, -1, 0, 31], repeat=3):
        x = crt_pairwise((3, 4, 5), residues)
        assert all((x - a) % m == 0 for m, a in zip((3, 4, 5), residues))
        for t in [-2, -1, 0, 1, 2]:
            assert all((x + 60 * t - a) % m == 0
                       for m, a in zip((3, 4, 5), residues))
        negative_cases += 1

    # The gcd compatibility claim is an original two-modulus extension.
    two_modulus_cases = coprime_cases = 0
    for m, n in product(range(2, 13), repeat=2):
        period = lcm(m, n)
        for a, b in product(range(m), range(n)):
            solutions = [x for x in range(period) if x % m == a and x % n == b]
            compatible = (b - a) % gcd(m, n) == 0
            assert bool(solutions) == compatible
            assert len(solutions) == int(compatible)
            if gcd(m, n) == 1:
                assert crt_pairwise((m, n), (a, b)) == solutions[0]
                coprime_cases += 1
            two_modulus_cases += 1
    assert (two_modulus_cases, coprime_cases) == (5929, 3294)
    assert not [x for x in range(4) if x % 2 == 1 and x % 4 == 0]
    assert [x for x in range(24) if x % 4 == 1 and x % 6 == 3] == [9, 21]
    composite_x = crt_pairwise((4, 9, 25), (3, 4, 7))
    assert composite_x == 607
    assert all(2 % m != 0 for m in (4, 9, 25)) and gcd(2, 900) != 1

    # Book-example exponent reconstruction; no complete solution classification.
    exponent_residues = tuple(crt_pairwise((2, 3, 5), r)
                              for r in [(0, 0, 2), (1, 0, 0), (0, 1, 0)])
    assert exponent_residues == (12, 15, 10)
    base_a, base_b, base_c = (sum(i ** d for i in range(1, 5)) for d in (2, 3, 5))
    assert (base_a, base_b, base_c) == (30, 100, 1300)
    previous_scale = 0
    for j in range(4):
        m, n, p = 12 + 30 * j, 15, 10
        assert all(v % 5 == 0 for v in (2 * m + 1, 2 * n, 2 * p))
        assert all(v % 2 == 0 for v in (3 * m, 3 * n + 1, 3 * p))
        assert all(v % 3 == 0 for v in (5 * m, 5 * n, 5 * p + 1))
        scale = base_a ** m * base_b ** n * base_c ** p
        assert scale > previous_scale
        previous_scale = scale
        y = base_a ** ((2 * m + 1) // 5) * base_b ** (2 * n // 5) * base_c ** (2 * p // 5)
        z = base_a ** (3 * m // 2) * base_b ** ((3 * n + 1) // 2) * base_c ** (3 * p // 2)
        w = base_a ** (5 * m // 3) * base_b ** (5 * n // 3) * base_c ** ((5 * p + 1) // 3)
        assert sum((i * scale) ** 2 for i in range(1, 5)) == y ** 5
        assert sum((i * scale) ** 3 for i in range(1, 5)) == z ** 2
        assert sum((i * scale) ** 5 for i in range(1, 5)) == w ** 3

    # Contest reconstruction: all 30 saturated residue choices, every cup.
    units = [r for r in range(30) if gcd(r, 30) == 1]
    assert units == [1, 7, 11, 13, 17, 19, 23, 29]
    gaps = [b - a for a, b in zip(units, units[1:] + [units[0] + 30])]
    assert max(gaps) == 6
    window_counts = [sum(gcd(s + i, 30) == 1 for i in range(13)) for s in range(30)]
    assert min(window_counts) == 2
    assert [s for s, count in enumerate(window_counts) if count == 2] == [24]
    prefixes = []
    cup_membership_cases = 0
    for residues in product(range(2), range(3), range(5)):
        x = crt_pairwise((2, 3, 5), residues)
        prefix = [0]
        for cup in range(1, 2024):
            empty = all(cup % m != a for m, a in zip((2, 3, 5), residues))
            assert empty == (gcd(cup - x, 30) == 1)
            prefix.append(prefix[-1] + empty)
            cup_membership_cases += 1
        prefixes.append((x, residues, prefix))
    assert cup_membership_cases == 60690
    for size in range(121):
        q, r = divmod(size, 30)
        direct_minimum = min(prefix[size] for _, _, prefix in prefixes)
        window_minimum = min(sum(gcd(s + i, 30) == 1 for i in range(r)) for s in range(30))
        assert direct_minimum == 8 * q + window_minimum
    contest_counts = [prefix[2023] for _, _, prefix in prefixes]
    assert min(contest_counts) == 538
    optimizers = [(x, residues) for x, residues, prefix in prefixes if prefix[2023] == 538]
    assert optimizers == [(7, (1, 1, 2))]

    return {
        'completePairwiseCRTResidueTuples': construction_cases,
        'negativeOrUnreducedResidueCases': negative_cases,
        'twoModulusCompatibilitySystems': two_modulus_cases,
        'coprimeTwoModulusSystems': coprime_cases,
        'incompatibleSystem': 'x=1 mod 2; x=0 mod 4',
        'compatibleSystemPeriod12RepresentativesModulo24': [9, 21],
        'compositeModuliChallenge': {'moduli': [4, 9, 25], 'residues': [3, 4, 7], 'x': composite_x},
        'compositeCupUnitShortcutFalsified': True,
        'bookExponentResiduesModulo30': list(exponent_residues),
        'bookPositiveSolutionInstances': 4,
        'unitsModulo30': units,
        'cyclicUnitGaps': gaps,
        'allThirtyLength13WindowCounts': window_counts,
        'contestCupMembershipCases': cup_membership_cases,
        'smallCupSizesExhausted': 121,
        'contestSaturatedChoices': 30,
        'contestMinimumEmptyCups': 538,
        'contestOptimalShift': 7,
        'contestOptimalColorResidues': [1, 1, 2]
    }


if __name__ == '__main__':
    print(json.dumps({
        'status': 'P04_P05_MATHEMATICAL_CHECKS_OK',
        'publicDevelopmentOnly': True,
        'acceptedCandidateEvidence': False,
        'heldOutEvaluation': False,
        'formalCandidateDispositions': 0,
        'formalRelationRecords': 0,
        'P04': p04(),
        'P05': p05()
    }, indent=2))
