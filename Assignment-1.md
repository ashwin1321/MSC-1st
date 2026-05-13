# Assignment 1 — Asymptotic Notation, Logarithms & Master Theorem

---

## 1. Asymptotic Notation

Asymptotic notation describes how the running time (or space) of an algorithm grows as input size `n → ∞`. We ignore constants and lower-order terms.

---

### Big-O Notation — O(g(n)) [Upper Bound]

**Definition:** f(n) = O(g(n)) if there exist positive constants `c` and `n₀` such that:

```
f(n) ≤ c · g(n)   for all n ≥ n₀
```

**Example: Prove f(n) = 3n² + 5n + 2 = O(n²)**

We need to find `c` and `n₀` such that:

```
3n² + 5n + 2 ≤ c · n²   for all n ≥ n₀
```

Divide both sides by n² (for n ≥ 1):

```
3 + 5/n + 2/n² ≤ c
```

For n ≥ 1:  5/n ≤ 5  and  2/n² ≤ 2

So: `3 + 5 + 2 = 10 ≤ c`

Choose **c = 10, n₀ = 1**. Verified: `3n² + 5n + 2 ≤ 10n²` for all n ≥ 1. ✓

---

### Big-Omega Notation — Ω(g(n)) [Lower Bound]

**Definition:** f(n) = Ω(g(n)) if there exist positive constants `c` and `n₀` such that:

```
f(n) ≥ c · g(n)   for all n ≥ n₀
```

**Example: Prove f(n) = 3n² + 5n + 2 = Ω(n²)**

We need: `3n² + 5n + 2 ≥ c · n²`

Since `3n² + 5n + 2 ≥ 3n²` for all n ≥ 1 (because 5n + 2 > 0),

Choose **c = 3, n₀ = 1**. Verified. ✓

---

### Big-Theta Notation — Θ(g(n)) [Tight Bound]

**Definition:** f(n) = Θ(g(n)) if there exist constants `c₁, c₂, n₀ > 0` such that:

```
c₁ · g(n) ≤ f(n) ≤ c₂ · g(n)   for all n ≥ n₀
```

This means f(n) = O(g(n)) AND f(n) = Ω(g(n)).

**Example: Prove f(n) = 3n² + 5n + 2 = Θ(n²)**

From above:
- Upper bound: `3n² + 5n + 2 ≤ 10n²`  →  c₂ = 10
- Lower bound: `3n² + 5n + 2 ≥ 3n²`   →  c₁ = 3

So: `3n² ≤ 3n² + 5n + 2 ≤ 10n²` for all n ≥ 1.

Choose **c₁ = 3, c₂ = 10, n₀ = 1**. ✓

---

### Little-o Notation — o(g(n)) [Strict Upper Bound]

**Definition:**

```
lim (n→∞)  f(n) / g(n) = 0
```

**Example:** Prove n = o(n²)

```
lim (n→∞)  n / n²  =  lim (n→∞)  1/n  =  0   ✓
```

---

### Little-omega Notation — ω(g(n)) [Strict Lower Bound]

**Definition:**

```
lim (n→∞)  f(n) / g(n) = ∞
```

**Example:** Prove n² = ω(n)

```
lim (n→∞)  n² / n  =  lim (n→∞)  n  =  ∞   ✓
```

---

### Summary Table

| Notation | Meaning              | Analogy |
|----------|----------------------|---------|
| O(g)     | f grows ≤ g          | f ≤ g   |
| Ω(g)     | f grows ≥ g          | f ≥ g   |
| Θ(g)     | f grows same as g    | f = g   |
| o(g)     | f grows strictly < g | f < g   |
| ω(g)     | f grows strictly > g | f > g   |

---

## 2. Relation Between Logarithm and Exponential

They are **inverse functions** of each other.

### Core Identity

```
y = bˣ  ⟺  x = log_b(y)
```

If `b^x = y`, then `log_b(y) = x`.

**Example:** 2³ = 8  ⟺  log₂(8) = 3

---

### Why This Matters in Algorithm Analysis

When an algorithm **halves** its input each step, after `k` steps:

```
n / 2^k = 1
  ⟹  2^k = n
  ⟹  k = log₂(n)
```

So binary search has O(log n) steps because the exponential relationship `2^k = n` inverts to `k = log n`.

---

### Key Properties (with Proofs)

**Property 1: log(aᵏ) = k · log(a)**

Let x = log_b(a), so b^x = a.
Then a^k = (b^x)^k = b^(xk).
Taking log_b both sides: log_b(a^k) = xk = k · log_b(a) ✓

**Property 2: log_b(mn) = log_b(m) + log_b(n)**

Let p = log_b(m) and q = log_b(n).
Then m = b^p and n = b^q, so mn = b^(p+q).
Therefore log_b(mn) = p + q = log_b(m) + log_b(n) ✓

**Property 3: Change of Base**

```
log_a(n) = log_b(n) / log_b(a)
```

All logarithms differ only by a constant factor. So in Big-O:

```
log₂n = Θ(log₁₀n) = Θ(ln n)
```

The base does not matter asymptotically.

**Property 4: Exponential dominates polynomial**

```
lim (n→∞)  nᵏ / aⁿ = 0   for any k > 0, a > 1
```

So 2ⁿ = ω(n^1000) — exponential always overtakes any polynomial eventually.

**Property 5: Logarithm is dominated by any polynomial**

```
lim (n→∞)  log(n) / nᵏ = 0   for any k > 0
```

### Growth Rate Hierarchy

```
1  <  log(log n)  <  log n  <  n^ε  <  n  <  n·log n  <  n²  <  n³  <  2ⁿ  <  n!
```

---

## 3. Master Theorem

The Master Theorem gives a direct formula for solving recurrences that arise in divide-and-conquer algorithms.

---

## Part A — Master Theorem for Dividing Functions

### Recurrence Form

```
T(n) = a·T(n/b) + f(n)
```

Where:
- `a ≥ 1` — number of subproblems
- `b > 1` — factor by which input shrinks
- `f(n)` — cost of work done outside recursive calls

### The Three Cases

Let **p = log_b(a)** (the critical exponent).

| Case   | Condition                              | Result              |
|--------|----------------------------------------|---------------------|
| Case 1 | f(n) = O(n^(p−ε)) for some ε > 0      | T(n) = Θ(n^p)       |
| Case 2 | f(n) = Θ(n^p)                          | T(n) = Θ(n^p · log n) |
| Case 3 | f(n) = Ω(n^(p+ε)) + regularity holds  | T(n) = Θ(f(n))      |

**Regularity condition for Case 3:** `a·f(n/b) ≤ c·f(n)` for some c < 1

---

### Example 1 — Binary Search

```
T(n) = 1·T(n/2) + O(1)
```

- a = 1, b = 2, f(n) = 1
- p = log₂(1) = 0, so n^p = n⁰ = 1
- f(n) = Θ(1) = Θ(n⁰) → **Case 2**

**T(n) = Θ(log n)** ✓

---

### Example 2 — Merge Sort

```
T(n) = 2·T(n/2) + O(n)
```

- a = 2, b = 2, f(n) = n
- p = log₂(2) = 1, so n^p = n
- f(n) = Θ(n) = Θ(n¹) → **Case 2**

**T(n) = Θ(n log n)** ✓

---

### Example 3 — Strassen's Matrix Multiplication

```
T(n) = 7·T(n/2) + O(n²)
```

- a = 7, b = 2, f(n) = n²
- p = log₂(7) ≈ 2.807
- f(n) = O(n²) = O(n^(2.807 − 0.807)) → **Case 1**

**T(n) = Θ(n^log₂7) ≈ Θ(n^2.807)** ✓

(Faster than naive O(n³))

---

### Example 4 — Case 3

```
T(n) = 2·T(n/4) + O(n)
```

- a = 2, b = 4, f(n) = n
- p = log₄(2) = 0.5, so n^p = √n
- f(n) = Ω(n^(0.5 + 0.5)) = Ω(n) → Case 3 candidate
- Regularity check: `2·f(n/4) = 2·(n/4) = n/2 ≤ (1/2)·n` ✓

**T(n) = Θ(n)** ✓

---

## Part B — Master Theorem for Decreasing Functions

This applies when input decreases by a **constant amount** at each step (not divided).

### Recurrence Form

```
T(n) = a·T(n − b) + f(n)
```

Where:
- `a ≥ 1` — number of subproblems
- `b > 0` — constant amount subtracted each time
- `f(n)` — non-recursive work per call

### The Three Cases

| Case   | Condition | Result                  |
|--------|-----------|-------------------------|
| Case 1 | a < 1     | T(n) = O(f(n))          |
| Case 2 | a = 1     | T(n) = O(n · f(n))      |
| Case 3 | a > 1     | T(n) = O(aⁿ/ᵇ · f(n))  |

---

### Example 1 — Linear Search (a = 1, f(n) = 1)

```
T(n) = T(n − 1) + O(1)
```

- a = 1, b = 1, f(n) = 1 → **Case 2**
- T(n) = O(n · 1)

**T(n) = O(n)** ✓

---

### Example 2 — Selection Sort (a = 1, f(n) = n)

```
T(n) = T(n − 1) + O(n)
```

- a = 1, b = 1, f(n) = n → **Case 2**
- T(n) = O(n · n)

**T(n) = O(n²)** ✓

---

### Example 3 — Tower of Hanoi (a = 2)

```
T(n) = 2·T(n − 1) + O(1)
```

- a = 2, b = 1, f(n) = 1 → **Case 3**
- T(n) = O(2ⁿ/¹ · 1)

**T(n) = O(2ⁿ)** ✓

---

### Example 4 — Skipping by 2 (a = 1, b = 2)

```
T(n) = T(n − 2) + O(1)
```

- a = 1, b = 2, f(n) = 1 → **Case 2**
- Recursion depth = n/2, but still linear:

**T(n) = O(n)** ✓

---

## Comparison: Dividing vs Decreasing

| Property       | Dividing — T(n/b)         | Decreasing — T(n−b)          |
|----------------|---------------------------|------------------------------|
| Recursion Depth | O(log n)                 | O(n)                         |
| Typical Result  | O(n log n) or better     | O(n) to O(2ⁿ)               |
| Use Case        | Merge sort, binary search | Linear scan, Tower of Hanoi  |
| Efficiency      | Much more efficient       | Only when unavoidable        |

Dividing functions are almost always preferred because the recursion tree has **logarithmic depth** rather than linear depth, which makes a dramatic difference in practice.

---
