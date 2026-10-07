"""Supplied-code laboratory: M06 mathematics; independent coding waits for M08.

Run with Python3, standard library only. Exact fractions, no simulation or fitting.
The two algorithms use normalized posteriors versus direct joint masses.
"""
from fractions import Fraction as F
from itertools import product

def analyze(prior, channel, utilities):
    assert sum(prior) == 1 and all(p >= 0 for p in prior)
    assert all(sum(row) == 1 and all(p >= 0 for p in row) for row in channel)
    reports = range(len(channel[0]))
    assert all(len(row) == len(channel[0]) for row in channel)
    assert all(len(row) == len(prior) for row in utilities)
    joint = [[prior[h] * channel[h][s] for s in reports] for h in range(len(prior))]
    masses = [sum(row[s] for row in joint) for s in reports]
    posteriors = [None if masses[s] == 0 else [row[s] / masses[s] for row in joint] for s in reports]
    baseline = max(sum(p * r for p, r in zip(prior, action)) for action in utilities)
    perfect = sum(prior[h] * max(action[h] for action in utilities) for h in range(len(prior)))
    policy = []
    normalized_value = F(0)
    for s in reports:
        if masses[s] == 0:
            policy.append(None)
            continue
        values = [sum(q * r for q, r in zip(posteriors[s], action)) for action in utilities]
        best = max(values)
        policy.append([i for i, value in enumerate(values) if value == best])
        normalized_value += masses[s] * best
    direct_value = sum(max(sum(joint[h][s] * action[h] for h in range(len(prior))) for action in utilities) for s in reports)
    # Independently enumerate every supplied contingent action policy.
    exhaustive = max(sum(joint[h][s] * utilities[choices[s]][h] for s in reports for h in range(len(prior))) for choices in product(range(len(utilities)), repeat=len(masses)))
    assert normalized_value == direct_value == exhaustive
    assert baseline <= direct_value <= perfect
    for h, p in enumerate(prior):
        assert sum(masses[s] * posteriors[s][h] for s in reports if masses[s] > 0) == p
    return dict(prior=prior, joint=joint, masses=masses, posteriors=posteriors, policy=policy, baseline=baseline, sample=direct_value, perfect=perfect, evsi=direct_value-baseline, evpi=perfect-baseline)

if __name__ == '__main__':
    prior = [F(3, 8), F(5, 8)]
    utilities = [[F(7), F(-3)], [F(1), F(1)], [F(0), F(0)]]
    for name, channel in [
        ('informative', [[F(2, 3), F(1, 3)], [F(1, 4), F(3, 4)]]),
        ('null', [[F(1, 2), F(1, 2)], [F(1, 2), F(1, 2)]]),
        ('perfect', [[F(1), F(0)], [F(0), F(1)]]),
        ('impossible third report', [[F(2, 3), F(1, 3), F(0)], [F(1, 4), F(3, 4), F(0)]]),
    ]:
        result = analyze(prior, channel, utilities)
        print(name, {k: str(result[k]) for k in ['baseline', 'sample', 'perfect', 'evsi', 'evpi']})
        if name == 'null': assert result['evsi'] == 0
        if name == 'perfect': assert result['evsi'] == result['evpi']
    print('PASS exact finite laboratory: normalized posterior policy = direct joint accounting = exhaustive policy enumeration; support, posterior averaging and information bounds.')
