#!/usr/bin/env python3
"""P01 original finite mathematical checks. SYNTHETIC_ONLY; no real dispositions.

Python standard library only. Exhaustive checks cover stated finite domains;
the research note supplies the general arguments and their scope limits.
"""
from collections import Counter
from fractions import Fraction
from itertools import combinations, permutations, product
from math import prod
import json


def determinant(a):
    """Independent Leibniz formula; exact integer arithmetic, det(empty)=1."""
    n = len(a)
    total = 0
    for p in permutations(range(n)):
        inversions = sum(p[i] > p[j] for i in range(n) for j in range(i + 1, n))
        total += (-1) ** inversions * prod(a[i][p[i]] for i in range(n))
    return total


def minor(a, i, j):
    return tuple(tuple(x for c, x in enumerate(row) if c != j)
                 for r, row in enumerate(a) if r != i)


def reduce_unit_rows_and_columns(a):
    """Cofactor reduction on binary square matrices with row sum <= 2.

    Return sign, terminal matrix, and zero flag. No candidate IDs or evidence.
    """
    sign = 1
    while a:
        if any(sum(row) == 0 for row in a):
            return sign, a, True
        row = next((i for i, r in enumerate(a) if sum(r) == 1), None)
        if row is not None:
            col = a[row].index(1)
        else:
            sums = [sum(r[j] for r in a) for j in range(len(a))]
            if 0 in sums:
                return sign, a, True
            col = next((j for j, s in enumerate(sums) if s == 1), None)
            if col is None:
                assert all(sum(r) == 2 for r in a)
                assert all(s == 2 for s in sums)
                return sign, a, False
            row = next(i for i in range(len(a)) if a[i][col] == 1)
        sign *= (-1) ** (row + col)
        a = minor(a, row, col)
    return sign, (), False


def tilings(cells):
    if not cells:
        return 1
    x, y = min(cells)
    rest = cells - {(x, y)}
    return sum(tilings(rest - {p}) for p in
               [(x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)] if p in rest)


def main():
    # Equal checkerboard counts fail as a sufficient condition, even when
    # connected. Two leaves in the first shape have the same sole neighbor.
    obstructed = frozenset({(0, 0), (-1, 0), (0, -1), (1, 0), (2, 0), (1, 1)})
    rectangle = frozenset(product(range(3), range(2)))
    for shape in [obstructed, rectangle]:
        assert Counter((x + y) % 2 for x, y in shape) == {0: 3, 1: 3}
    assert tilings(obstructed) == 0
    assert tilings(rectangle) == 3

    # Explicit constant velocities in a common drifting frame. In that frame
    # the out/back velocities are -u,+u. The two durations are equal.
    frame_cases = 0
    for current, speed, tau in product(
        [Fraction(1, 4), Fraction(1, 2), Fraction(1)],
        [Fraction(2), Fraction(3), Fraction(5)],
        [Fraction(1), Fraction(3, 2)]
    ):
        x_turn = (current - speed) * tau
        catch_time = 2 * tau
        x_swimmer = x_turn + (current + speed) * (catch_time - tau)
        x_drift = current * catch_time
        assert x_swimmer == x_drift
        assert x_swimmer - current * catch_time == 0
        frame_cases += 1
    # Unequal speeds preserve coordinate validity but break equal-time symmetry.
    u_out, u_back, tau = Fraction(2), Fraction(4), Fraction(1)
    return_time = u_out * tau / u_back
    assert return_time == Fraction(1, 2) and return_time != tau

    # All binary n-square matrices with each row having <=2 ones, 1<=n<=4.
    # Verify every reduction against the unrelated full permutation determinant.
    matrices = 0
    outcomes = Counter()
    for n in range(1, 5):
        rows = []
        for k in range(3):
            for support in combinations(range(n), k):
                rows.append(tuple(int(j in support) for j in range(n)))
        for a in product(rows, repeat=n):
            sign, core, zero = reduce_unit_rows_and_columns(a)
            actual = determinant(a)
            assert actual == (0 if zero else sign * determinant(core))
            outcomes['zero_terminal' if zero else 'empty_core' if not core else 'two_regular_core'] += 1
            matrices += 1
    assert matrices == 15002

    cycles = []
    for n in range(2, 9):
        a = tuple(tuple(int(j == i or j == (i + 1) % n) for j in range(n)) for i in range(n))
        value = determinant(a)
        assert value == 1 - (-1) ** n
        cycles.append({'length': n, 'determinant': value})

    triangle = ((1, 1, 0), (0, 1, 1), (1, 0, 1))
    swapped = (triangle[1], triangle[0], triangle[2])
    assert determinant(triangle) == 2 and determinant(swapped) == -2
    parallel_edges = ((1, 1), (1, 1))
    assert determinant(parallel_edges) == 0
    weighted = ((2, 0), (0, 1))
    unweighted = tuple(tuple(int(x != 0) for x in row) for row in weighted)
    assert determinant(weighted) == 2 and determinant(unweighted) == 1

    print(json.dumps({
        'status': 'P01_MATHEMATICAL_CHECKS_OK', 'syntheticOnly': True,
        'coloringCounts': [3, 3], 'obstructedTilings': 0, 'rectangleTilings': 3,
        'constantFrameCases': frame_cases, 'unequalSpeedReturnTime': str(return_time),
        'binaryMatricesChecked': matrices, 'matrixDimensions': [1, 2, 3, 4],
        'reductionOutcomes': dict(sorted(outcomes.items())), 'cycleChecks': cycles,
        'rowOrderSignTest': [2, -2], 'parallelEdgeDeterminant': 0,
        'weightErasureDeterminants': [2, 1],
        'formalCandidateDispositions': 0, 'formalRelationRecords': 0
    }, indent=2))


if __name__ == '__main__':
    main()
