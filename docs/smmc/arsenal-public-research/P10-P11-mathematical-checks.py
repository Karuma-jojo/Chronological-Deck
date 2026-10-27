#!/usr/bin/env python3
"""Public developmental math controls for P10/P11; no production evidence.

Standard library only. The notes give general proofs independently of finite
checks. These controls test mathematical obligations, not Gate-3 status changes,
source admission, candidate identity or independent review.
"""
from itertools import combinations, product
import json


def implies(p, q):
    return not p or q


def divides(a, b):
    # Hammack's witness definition includes 0 | 0, without dividing by zero.
    return b == 0 if a == 0 else b % a == 0


def p10():
    # Reconstruction of 4 | (5^n - 1), including the predecessor witness.
    previous_witness = 0  # The n=0 identity is a separate valid boundary.
    for n in range(1, 65):
        witness = 5 * previous_witness + 1
        assert 5 ** n - 1 == 4 * witness
        assert witness == (5 ** n - 1) // 4
        previous_witness = witness
    assert 5 ** 0 - 1 == 0

    # Finite model controls: selecting a first false statement is not itself
    # a contradiction; the mathematical transition must rule it out.
    patterns = valid_base_and_step = 0
    for values in product([False, True], repeat=8):
        premise = values[0] and all(implies(values[i - 1], values[i])
                                    for i in range(1, len(values)))
        assert premise == all(values)
        valid_base_and_step += premise
        if not all(values):
            first_bad = values.index(False)
            assert all(values[:first_bad]) and not values[first_bad]
        patterns += 1
    assert (patterns, valid_base_and_step) == (256, 1)
    all_false = [False] * 8
    assert all(implies(all_false[i - 1], all_false[i]) for i in range(1, 8))
    assert not all_false[0]  # Transition alone is insufficient.
    first_failure = [True, True, False, True]
    assert first_failure.index(False) == 2
    assert all(first_failure[:2]) and not first_failure[2]
    # On Z the negative integers have no least element in the usual order.
    for k in range(-16, 0):
        assert k - 1 < k < 0  # Samples only; the formula proves this for every k<0.

    generated_witnesses = 0
    for a, d, e in product(range(-4, 5), repeat=3):
        b, c = a * d, a * d * e
        assert b == a * d and c == b * e and c == a * (d * e)
        assert divides(a, b) and divides(b, c) and divides(a, c)
        generated_witnesses += 1
    antecedent_cases = 0
    for a, b, c in product(range(-3, 4), repeat=3):
        if divides(a, b) and divides(b, c):
            assert divides(a, c)
            antecedent_cases += 1
    assert generated_witnesses == 729 and antecedent_cases == 83
    assert divides(0, 0) and not divides(0, 1)

    return {
        'powerDivisibilityPositiveInputs': 64,
        'zeroExponentBoundaryIsValid': True,
        'eightStatementTruthPatternsExhausted': patterns,
        'patternsSatisfyingBaseAndEveryTransition': valid_base_and_step,
        'transitionWithoutBaseFalsified': True,
        'firstBadChoiceAloneNotContradiction': first_failure,
        'negativeIntegerNoMinimumControl': True,
        'directWitnessTriplesChecked': generated_witnesses,
        'boundedIntegerTriplesExhausted': 343,
        'transitivityAntecedentCases': antecedent_cases,
        'zeroAsDivisorHandledWithoutDivision': True
    }


def injective(mapping):
    return len(set(mapping)) == len(mapping)


def p11():
    # The compound source conditional. Negative cases require an OR after
    # negating the conjunction, not an AND.
    residue_cases = contrapositive_inputs = 0
    for x, y in product(range(5), repeat=2):
        p = not divides(5, x * y)
        q = not divides(5, x) and not divides(5, y)
        assert implies(p, q)
        neg_q = divides(5, x) or divides(5, y)
        neg_p = divides(5, x * y)
        assert neg_q == (not q) and neg_p == (not p)
        assert implies(neg_q, neg_p)
        contrapositive_inputs += neg_q
        residue_cases += 1
    assert (residue_cases, contrapositive_inputs) == (25, 9)
    x, y = 5, 1
    assert (divides(5, x) or divides(5, y))
    assert not (divides(5, x) and divides(5, y))

    # Original quantified-function stress test, including empty source domains.
    # P: f o g injective; Q: g injective.
    function_cases = noninjective_g_cases = composite_injective = converse_failures = 0
    for d_size in range(4):
        for e_size in range(1, 4):
            for f_size in range(1, 3):
                for g in product(range(e_size), repeat=d_size):
                    q = injective(g)
                    for f in product(range(f_size), repeat=e_size):
                        composed = tuple(f[g[x]] for x in range(d_size))
                        p = injective(composed)
                        assert implies(p, q) and implies(not q, not p)
                        if not q:
                            witness = next((x, y) for x, y in combinations(range(d_size), 2)
                                           if g[x] == g[y])
                            x, y = witness
                            assert x != y and g[x] == g[y]
                            assert composed[x] == composed[y]
                            noninjective_g_cases += 1
                        function_cases += 1
                        composite_injective += p
                        converse_failures += q and not p
    assert (function_cases, noninjective_g_cases, composite_injective, converse_failures) == (447, 272, 85, 90)
    g, f = (0, 1), (0, 0)
    assert injective(g) and not injective(tuple(f[x] for x in g))

    return {
        'sourceMod5ResiduePairsExhausted': residue_cases,
        'compoundContrapositiveAntecedentCases': contrapositive_inputs,
        'wrongAndNegationCounterexample': {'x': 5, 'y': 1},
        'typedFiniteFunctionPairsExhausted': function_cases,
        'noninjectiveGWithTransferredWitness': noninjective_g_cases,
        'injectiveCompositions': composite_injective,
        'converseFailuresInCorpus': converse_failures,
        'converseCounterexample': {'g': [0, 1], 'f': [0, 0]},
        'sourceSchemaIdentityProvedInNoteNotInferredFromEnumeration': True
    }


if __name__ == '__main__':
    print(json.dumps({
        'status': 'P10_P11_MATHEMATICAL_CHECKS_OK',
        'publicDevelopmentOnly': True,
        'acceptedCandidateEvidence': False,
        'heldOutEvaluation': False,
        'formalCandidateDispositions': 0,
        'formalRelationRecords': 0,
        'gate3MeasurementsChanged': False,
        'P10': p10(),
        'P11': p11()
    }, indent=2))
