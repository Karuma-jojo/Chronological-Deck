#!/usr/bin/env python3
"""Public developmental math controls for P06/P07; no production evidence.

Standard library only. Original controls and source reconstructions are separated
in the notes. General arguments are not inferred from finite sample agreement.
No production validator imports, candidate updates, selection or held-out test.
"""
from fractions import Fraction as F
from itertools import combinations, permutations, product
from math import prod
import json


def sign(order):
    inversions = sum(order[i] > order[j] for i in range(len(order))
                     for j in range(i + 1, len(order)))
    return -1 if inversions % 2 else 1


def determinant(matrix):
    n = len(matrix)
    assert all(len(row) == n for row in matrix)
    return sum(sign(p) * prod(matrix[i][p[i]] for i in range(n))
               for p in permutations(range(n)))


def components(n, edges):
    adj = [set() for _ in range(n)]
    for a, b in edges:
        adj[a].add(b)
        adj[b].add(a)
    remaining = set(range(n))
    out = []
    while remaining:
        stack = [min(remaining)]
        vertices = set()
        while stack:
            x = stack.pop()
            if x in vertices:
                continue
            vertices.add(x)
            stack.extend(adj[x] - vertices)
        remaining -= vertices
        rows = [i for i, (a, _) in enumerate(edges) if a in vertices]
        out.append((sorted(vertices), rows))
    return out


def has_cycle(n, edges):
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            x = parent[x]
        return x
    for a, b in edges:
        a, b = find(a), find(b)
        if a == b:
            return True
        parent[a] = b
    return False


def incidence(n, edges):
    return [[int(v in edge) for v in range(n)] for edge in edges]


def interval_overlap(a, b):
    # Positive-length overlap; avoids attributing sleep at a shared endpoint.
    return max(a[0], b[0]) < min(a[1], b[1])


def p06():
    graph_cases = forest_cases = 0
    for n in range(1, 6):
        possible = list(combinations(range(n), 2))
        for included in product([False, True], repeat=len(possible)):
            edges = [edge for edge, use in zip(possible, included) if use]
            degrees = [sum(v in e for e in edges) for v in range(n)]
            assert sum(degrees) == 2 * len(edges)
            cycle = has_cycle(n, edges)
            if not cycle:
                assert len(edges) == n - len(components(n, edges))
                forest_cases += 1
            if len(edges) >= n:
                assert cycle
            graph_cases += 1
    assert graph_cases == 1099

    # Engel's permutation digraphs, compared with all finite self-maps.
    map_cases = cycle_cover_cases = 0
    for n in range(1, 5):
        for mapping in product(range(n), repeat=n):
            all_cyclic = True
            for start in range(n):
                x = start
                seen = set()
                while x not in seen:
                    seen.add(x)
                    x = mapping[x]
                all_cyclic &= x == start
            bijective = len(set(mapping)) == n
            assert all_cyclic == bijective
            cycle_cover_cases += bijective
            map_cases += 1
    assert (map_cases, cycle_cover_cases) == (288, 33)
    assert (1, 1)[0] == (1, 1)[1]  # A non-bijection: 0 -> 1 -> 1.

    # Original interval-cycle controls for the source's nap representation.
    pool = list(combinations(range(5), 2))
    interval_families = interval_cycle_cases = 0
    for family in product(pool, repeat=4):
        interval_families += 1
        if all(interval_overlap(family[i], family[(i + 1) % 4]) for i in range(4)):
            j = max(range(4), key=lambda i: family[i][0])
            triple = [family[(j - 1) % 4], family[j], family[(j + 1) % 4]]
            assert max(t[0] for t in triple) < min(t[1] for t in triple)
            interval_cycle_cases += 1
    assert interval_families == 10000
    c4 = [(0, 1), (1, 2), (2, 3), (0, 3)]
    assert has_cycle(4, c4)
    assert not any(all(tuple(sorted(e)) in c4 for e in combinations(t, 2))
                   for t in combinations(range(4), 3))

    # Pairwise overlaps of unions do not imply one common time for three people.
    schedules = [[(0, 1), (4, 5)], [(0, 1), (2, 3)], [(2, 3), (4, 5)]]
    assert all(any(interval_overlap(x, y) for x in a for y in b)
               for a, b in combinations(schedules, 2))
    assert not any(max(t[0] for t in chosen) < min(t[1] for t in chosen)
                   for chosen in product(*schedules))

    # New component-product check, not a rerun of P01's reduction enumeration.
    matrix_cases = unbalanced_cases = balanced_cases = balanced_nonzero = 0
    for n in range(2, 5):
        edge_types = list(combinations(range(n), 2))
        for edges in product(edge_types, repeat=n):
            matrix = incidence(n, edges)
            actual = determinant(matrix)
            comps = components(n, edges)
            if any(len(vertices) != len(rows) for vertices, rows in comps):
                assert sum(min(len(v), len(r)) for v, r in comps) < n
                assert actual == 0
                unbalanced_cases += 1
            else:
                row_order = [i for _, rows in comps for i in rows]
                col_order = [j for vertices, _ in comps for j in vertices]
                block_product = prod(determinant([[matrix[i][j] for j in vertices]
                                                  for i in rows])
                                     for vertices, rows in comps)
                assert actual == sign(row_order) * sign(col_order) * block_product
                balanced_cases += 1
                balanced_nonzero += actual != 0
            matrix_cases += 1
    assert matrix_cases == 1324
    rectangular_edges = [(0, 1), (1, 2), (3, 4), (3, 4), (3, 4)]
    rectangular_components = [(len(r), len(v)) for v, r in components(5, rectangular_edges)]
    assert rectangular_components == [(2, 3), (3, 2)]
    assert determinant(incidence(5, rectangular_edges)) == 0

    return {
        'simpleGraphsExhausted': graph_cases,
        'forestsInFiniteCorpus': forest_cases,
        'finiteSelfMapsExhausted': map_cases,
        'permutationCycleCovers': cycle_cover_cases,
        'nonPermutationTail': [1, 1],
        'intervalFamiliesExhausted': interval_families,
        'positiveOverlapFourCycles': interval_cycle_cases,
        'abstractFourCycleHasNoTriangle': True,
        'threePeopleTwoNapsPairwiseWithoutTriple': True,
        'orderedIncidenceMatricesExhausted': matrix_cases,
        'unbalancedComponentCases': unbalanced_cases,
        'balancedComponentCases': balanced_cases,
        'balancedNonzeroDeterminants': balanced_nonzero,
        'rectangularComponentShapesRowsColumns': rectangular_components,
        'rectangularComponentExampleDeterminant': 0
    }


def add(a, b):
    return tuple(x + y for x, y in zip(a, b))


def sub(a, b):
    return tuple(x - y for x, y in zip(a, b))


def scale(k, a):
    return tuple(k * x for x in a)


def cross(a, b):
    return a[0] * b[1] - a[1] * b[0]


def dot(a, b):
    return sum(x * y for x, y in zip(a, b))


def midpoint(a, b):
    return scale(F(1, 2), add(a, b))


def line_intersection(p, d, q, e):
    denominator = cross(d, e)
    if denominator == 0:
        return None  # No unique point; could be parallel or coincident.
    t = F(cross(sub(q, p), e), denominator)
    return add(p, scale(t, d))


def sides_squared(triangle):
    return sorted(dot(sub(a, b), sub(a, b)) for a, b in combinations(triangle, 2))


def circle(center, radius_squared):
    x, y = center
    return (-2 * x, -2 * y, x * x + y * y - radius_squared)


def power(c, point):
    u, v, w = c
    x, y = point
    return x * x + y * y + u * x + v * y + w


def radical_axis(a, b):
    return (a[0] - b[0], a[1] - b[1], b[2] - a[2])


def axis_intersection(first, second):
    a, b, c = first
    d, e, f = second
    denominator = a * e - b * d
    if denominator == 0:
        return None
    return (F(c * e - b * f, denominator), F(a * f - c * d, denominator))


def second_circle_intersection(c, first, direction):
    assert power(c, first) == 0 and dot(direction, direction) != 0
    u, v, _ = c
    linear = 2 * dot(first, direction) + u * direction[0] + v * direction[1]
    t = -F(linear, dot(direction, direction))
    return add(first, scale(t, direction))


def p07():
    origin = (F(0), F(0))
    points = [tuple(map(F, p)) for p in product(range(-2, 3), repeat=2)]
    triangles = 0
    for b, c in product(points, repeat=2):
        if cross(b, c) == 0:
            continue
        a = origin
        d, e, f = midpoint(b, c), midpoint(a, c), midpoint(a, b)
        e_prime = line_intersection(f, sub(c, b), a, sub(c, a))
        d_prime = line_intersection(f, sub(c, a), b, sub(c, b))
        assert (d_prime, e_prime) == (d, e)
        small = [(a, e, f), (b, f, d), (c, d, e), (d, e, f)]
        assert all(sides_squared(t) == sides_squared(small[0]) for t in small)
        double_area = abs(cross(sub(b, a), sub(c, a)))
        assert all(abs(cross(sub(t[1], t[0]), sub(t[2], t[0]))) == double_area / 4
                   for t in small)

        g = line_intersection(a, sub(d, a), b, sub(e, b))
        g_prime = line_intersection(a, sub(d, a), c, sub(f, c))
        barycenter = scale(F(1, 3), add(add(a, b), c))
        assert g == g_prime == barycenter
        assert sub(g, a) == scale(F(2, 3), sub(d, a))

        # Ordinary auxiliary diagonal, with fresh cyclic parallelogram labels.
        pa, pb, pc, pd = origin, b, add(b, c), c
        assert sides_squared((pa, pb, pc)) == sides_squared((pc, pd, pa))
        triangles += 1

    a, b, c = origin, (F(2), F(0)), (F(4), F(0))
    f = midpoint(a, b)
    assert line_intersection(f, sub(c, b), a, sub(c, a)) is None
    assert cross(sub(a, f), sub(c, b)) == 0  # Coincident lines, not no points.

    # Original radical-axis lemma controls. Pairwise circle intersection is not
    # assumed in this more general line statement.
    centers = [(0, 0), (1, 0), (0, 1), (1, 1)]
    circles = [circle(center, r2) for center in centers for r2 in [1, 4, 9]]
    radical_cases = 0
    for a, b, c in combinations(circles, 3):
        x = axis_intersection(radical_axis(a, c), radical_axis(b, c))
        if x is not None:
            assert power(a, x) == power(b, x) == power(c, x)
            radical_cases += 1
    assert radical_cases == 108

    # Genuine nondegenerate fixture for the phantom second-intersection step.
    centers = [(2, 0), (0, 2), (1, 2)]
    c1, c2, c3 = [circle(center, 4) for center in centers]
    assert all(0 < dot(sub(a, b), sub(a, b)) < 16
               for a, b in combinations(centers, 2))  # Every pair crosses twice.
    x = axis_intersection(radical_axis(c1, c3), radical_axis(c2, c3))
    assert x == (F(1, 2), F(1, 2))
    assert power(c1, x) == power(c2, x) == power(c3, x) == -F(3, 2)
    first = origin
    direction = sub(x, first)
    e1 = second_circle_intersection(c1, first, direction)
    e2 = second_circle_intersection(c2, first, direction)
    assert e1 == e2 == (F(2), F(2))
    assert e1 != first and power(c1, e1) == power(c2, e1) == 0

    # Original scope counterexample: every pair of circles intersects twice,
    # but their three chord lines are parallel.
    parallel_centers = [(0, 0), (1, 0), (2, 0)]
    parallel_circles = [circle(center, 4) for center in parallel_centers]
    assert all(0 < dot(sub(a, b), sub(a, b)) < 16
               for a, b in combinations(parallel_centers, 2))
    axes = [radical_axis(a, b) for a, b in combinations(parallel_circles, 2)]
    x_coordinates = [F(rhs, a) for a, b, rhs in axes if b == 0]
    assert sorted(x_coordinates) == [F(1, 2), F(1), F(3, 2)]
    assert all(axis_intersection(a, b) is None for a, b in combinations(axes, 2))

    # Equal unsigned distance alone does not identify a point.
    e1, e2 = (F(1), F(0)), (F(-1), F(0))
    assert e1 != e2 and dot(e1, e1) == dot(e2, e2)
    assert 0 * 1 == 0 * 2 and 1 != 2  # Cancellation requires nonzero factor.

    return {
        'nondegenerateIntegerTrianglesChecked': triangles,
        'midpointPhantomCoincidenceChecks': triangles,
        'fourCongruentSubtriangleChecks': triangles,
        'centroidTwoIntersectionCoincidenceChecks': triangles,
        'ordinaryAuxiliaryDiagonalChecks': triangles,
        'degenerateTriangleDoesNotGiveUniqueIntersection': True,
        'nonparallelRadicalAxisTriplesChecked': radical_cases,
        'phantomCircleFixture': {
            'equalRadiusCenters': centers, 'radiusSquared': 4,
            'X': ['1/2', '1/2'], 'commonPower': '-3/2',
            'commonFirstPoint': [0, 0], 'coincidentSecondPoint': [2, 2]
        },
        'pairwiseCrossingParallelChordCounterexample': {
            'centers': parallel_centers, 'radiusSquared': 4,
            'chordLinesX': ['1/2', '1', '3/2']
        },
        'equalDistanceWithoutCoincidenceFalsified': True,
        'zeroFactorCancellationFalsified': True
    }


if __name__ == '__main__':
    print(json.dumps({
        'status': 'P06_P07_MATHEMATICAL_CHECKS_OK',
        'publicDevelopmentOnly': True,
        'acceptedCandidateEvidence': False,
        'heldOutEvaluation': False,
        'formalCandidateDispositions': 0,
        'formalRelationRecords': 0,
        'P06': p06(),
        'P07': p07()
    }, indent=2))
