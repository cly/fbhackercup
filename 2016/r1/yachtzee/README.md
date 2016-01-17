Yachtzee25
===

A rich, retired programmer has decided to invest his (possibly) massive savings into constructing custom yachts for himself.

Initially, he has a real amount of dollars, chosen uniformly at random from the range `[A, B]`. Constructing a yacht consists of `N` sequential steps, with the `ith` step requiring `Ci` dollars.

The programmer blindly pays for the steps in order, until he's either completed all of them, or can't afford the cost of the next step. If the former occurs, he puts his completed yacht aside and restarts the process from the first step with his remaining money - he wants as many yachts as possible! Otherwise, in the latter case, he immediately stops his project entirely, without spending any additional money on other steps.

What's the expected amount of money which the programmer will be left with once he stops spending it on yachts? Your output should have at most 10^-6 absolute or relative error.

Input
---
Input begins with an integer `T`, the number of times the programmer embarks on a yacht-creation spree. For each spree, there is first a line containing the space-separated integers `N`, `A`, and `B` in that order, then a line containing N space-separated integers, the `ith` of which is `Ci`.

Output
---
For the `ith` spree, print a line containing "Case #i: " followed by the expected amount of money the programmer will have left.

Constraints
---
```
1 ≤ T ≤ 50 
0 ≤ A < B ≤ 1,000,000,000 
1 ≤ N ≤ 100,000 
1 ≤ Ci ≤ 1,000,000,000 
```

Explanation of Sample
---
In the first case, the programmer starts with between 5 and 8 dollars. The programmer's initial amount of money will fall into one of the ranges [5, 6), or [6, 8), or [8, 8]. If it falls into the first range, the programmer will end with [1, 2) dollars. If it falls into the second range, the programmer will end with [0, 2) dollars. If the programmer starts with exactly 8 dollars, he'll end with 0 dollars.

Example Input
---
```
5
1 5 8
2
1 0 777777777
7
1 777777 7777777
777777777
2 9 20
8 2
5 40 140
4 9 1 12 7
```

Example output
---
```
Case #1: 1.166666667
Case #2: 3.500000000
Case #3: 4277777.000000000
Case #4: 3.227272727
Case #5: 4.400000000
```

Ideas
---
- Split [A, B] by the modulus range.
- So [5, 8] becomes [5, 6, 8] since 6 % 2 = 0
- So [0, 777777777] becomes [0, 7, 14,... 777777777]
- 
