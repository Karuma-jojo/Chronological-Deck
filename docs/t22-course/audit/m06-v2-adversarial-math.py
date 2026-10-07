"""Exact mathematical witnesses for the same-builder M06 adversarial review.

This independently enumerates a complete three-way law, rather than recomputing
the predictive shortcut under its own assumptions. Fractions are exact.
"""
import itertools
import json
from fractions import Fraction as F
from pathlib import Path

pack = json.loads(Path('course/t22/authoring/m06-v2.json').read_text())
atoms = list(itertools.product((0, 1), repeat=3))  # X,Y,evidence indicator


def law(rate, evidence, perturbation=F(0)):
    result = {}
    for x, y, e in atoms:
        product = (rate if x else 1-rate)*(rate if y else 1-rate)*(evidence if e else 1-evidence)
        result[x, y, e] = product + perturbation*(-1)**(3-x-y-e)
    assert all(v >= 0 for v in result.values())
    assert sum(result.values()) == 1
    return result


def mass(table, **givens):
    indexes = {'x': 0, 'y': 1, 'e': 2}
    return sum(v for atom, v in table.items() if all(atom[indexes[k]] == expected for k, expected in givens.items()))


def prove_pairwise(table):
    for first, second in itertools.combinations(('x', 'y', 'e'), 2):
        for a, b in itertools.product((0, 1), repeat=2):
            assert mass(table, **{first: a, second: b}) == mass(table, **{first: a})*mass(table, **{second: b})


# Same priors, evidence rates and single-outcome rates as the reviewed S34-M.
prior = (F(1, 3), F(2, 3))
rates = (F(4, 5), F(1, 5))
evidence = (F(3, 4), F(1, 4))
independent = [law(r, e) for r, e in zip(rates, evidence)]
perturbed = [law(r, e, F(1, 200)) for r, e in zip(rates, evidence)]
for original, changed in zip(independent, perturbed):
    prove_pairwise(original)
    prove_pairwise(changed)
    for first, second in itertools.combinations(('x', 'y', 'e'), 2):
        for a, b in itertools.product((0, 1), repeat=2):
            assert mass(original, **{first: a, second: b}) == mass(changed, **{first: a, second: b})
    assert mass(changed, x=1, y=1, e=1) != mass(changed, x=1)*mass(changed, y=1)*mass(changed, e=1)

z = sum(p*e for p, e in zip(prior, evidence))


def predictive(tables):
    return [sum(p*mass(table, x=x, y=y, e=1) for p, table in zip(prior, tables))/z
            for x, y in ((1, 1), (1, 0), (0, 1), (0, 0))]


assert predictive(independent) == [F(2, 5), F(4, 25), F(4, 25), F(7, 25)]
assert predictive(perturbed) == [F(103, 250), F(37, 250), F(37, 250), F(73, 250)]
# Single-outcome prediction and the posterior are unchanged; the joint answer is not.
assert sum(predictive(perturbed)[:2]) == F(14, 25)
assert [p*e/z for p, e in zip(prior, evidence)] == [F(3, 5), F(2, 5)]

# General coherence with a zero within-hypothesis prefix: division is only on
# supported cells. Joint restriction independently checks each sequential state.
conditional = [{(1, 1): F(0), (1, 0): F(0), (0, 1): F(1, 2), (0, 0): F(1, 2)},
               {atom: F(1, 4) for atom in itertools.product((0, 1), repeat=2)}]
initial = [F(1, 2), F(1, 2)]
for order, expected in [((0, 1), [(F(0), F(1)), (F(0), F(1))]),
                        ((1, 0), [(F(1, 2), F(1, 2)), (F(0), F(1))])]:
    subset = set(conditional[0])
    posterior = initial[:]
    for index, target in zip(order, expected):
        next_subset = {atom for atom in subset if atom[index] == 1}
        updated = []
        for q, table in zip(posterior, conditional):
            denominator = sum(table[atom] for atom in subset)
            numerator = sum(table[atom] for atom in next_subset)
            if denominator == 0:
                assert q == 0 and numerator == 0
                updated.append(F(0))  # no within-hypothesis conditional is evaluated
            else:
                updated.append(q*numerator/denominator)
        total = sum(updated)
        assert total > 0
        posterior = [w/total for w in updated]
        direct = [p*sum(table[atom] for atom in next_subset) for p, table in zip(initial, conditional)]
        assert tuple(posterior) == target == tuple(w/sum(direct) for w in direct)
        subset = next_subset

# Targeted contract checks bind these witnesses to the actual repairs.
main = pack['problems']['T22V3::ARC502::S34-M@1']['prompt']
assert 'are mutually independent: for every x,y,e in{0,1}' in main
assert 'State and derive the conditional-partition predictive formula' in pack['problems']['T22V3::ARC502::S34-T@1']['prompt']
proof = pack['evaluators']['T22V3::ARC502::S33-M@1']['reference']
assert 'no l_i is evaluated' in proof and 'sums over I only' in proof
print('PASS exact adversarial witnesses: pairwise-compatible S34 predictions 2/5 versus 103/250; single predictions/posteriors preserved; supported-cell coherence in both orders.')
