Coding Contest Creation
===

You've been put in charge of creating the problems for a certain high-profile programming contest series.

The series will consist of one or more contests of exactly 4 problems each. Every problem has a difficulty rating (an integer between 1 and 100, inclusive), and the ratings of the 4 problems in each contest must be strictly increasing, but with a difference of no more than 10 between consecutive problems. In other words, if the problems in a contest have difficulties `a`, `b`, `c`, and `d` (in order), then the inequalities `a < b < c < d`, `b - a ≤ 10`, `c - b ≤ 10`, `d - c ≤ 10` must all hold.

You've been given an ordered list of `N` problems to use. Being an experienced problemsetter, you may also write some new problems to insert at any positions in the list, each with an integer difficulty between 1 and 100, inclusive. The final list of problems must still include the original N problems in their original order, though (with your new problems optionally mixed in).

Once the problem list is finalized, the first 4 problems (in order) will form a contest, the next 4 problems will form another contest, and so on. Note that the number of problems in the list must be divisible by 4, and that each of the contests formed must feature a valid ordered set of 4 problems. What's the minimum number of additional problems you must write in order to create a set of valid contests?



Input
---
Input begins with an integer `T`, the number of contest series you need to create. For each series, there is first a line containing the integer `N`, then a line containing `N` space-separated integers, the ith of which is Di, the difficulty rating of the ith existing problem.

Output
---
For the ith series, print a line containing "Case #i: " followed by the minimum number of additional problems you'll need to write.

Constraints
---
```
1 ≤ T ≤ 50 
1 ≤ N ≤ 100,000 
1 ≤ Di ≤ 100 
```

Explanation of Sample
---
In the first series, the four problems given are already a valid contest, so no new problems need to be written. In the second series, the four existing problems most certainly do not form a valid contest, due to the gap between the third and fourth ones - one possible way to salvage the situation is to add three new problems with difficulties 30, 29, and 30 after the third problem, as well as a problem with difficulty 42 at the end, creating two valid contests: [15, 20, 25, 30] and [29, 30, 40, 42].

For 3, 3, 3, can we add 1 value? No, because would not be strictly increasing. Can we add 5 values to make 2 sets? No, because one of these sets will contain more than 1 3's. We need to make 3 sets of 4, therefore adding 9.

For 60 90 61 62 63 91 92 93, is we add 0 values? No because not increasing. Can we add 4 values? We can add 60, `70`, `80`, 90 to satisfy first 4. Second 4 can be satisifed with one more value, say `60` to make `60`, 61, 62, 63. Third 4 can be satisifed with one more value, 

Example Input
---
```
5
4
10 15 25 30
4
15 20 25 40
3
3 3 3
8
60 90 61 62 63 91 92 93
11
5 14 30 32 39 46 47 47 30 58 47
```

Example output
---
```
Case #1: 0
Case #2: 4
Case #3: 9
Case #4: 4
Case #5: 9
```

Ideas
---

- Can only insert 3 consecutive problems otherwise defeats the purpose. You can always insert 4 more.
- N can be 100,000 so that rules out N^2 solutions. Single pass maybe but is it optimal?
- If numbers decrease or equal, they form a new set. If they increase less than 10 they form the same set. Otherwise, additions are required.
- Starting from 5 14 30 32 39 46 47 47 30 58 47
    - Build based on increasing rule. If it's decreasing or equal, start a new list.
    - ```
      [
        [5, 14, 30, 32, 39, 46, 47],
        [47],
        [30, 58],
        [47]
      ]
    - If length is 1:
        + Then, need to add 3 values.
    - If length is 2:
        + Find difference between 2 values. If <= 30, then require 2 more. If more than 30, then require 6 more. ie if it's 1 and 31, then [1, 11, 21, 31].
    - If length is 3:
        + Case: 1, 50, 100 // Need 9 more
        + Case: 1, 2, 100 // Need 5 more
        + Case: 1, 2, 22 // Need 1 more
        + Case: 1, 99, 100 // Need 5 more
    - If length is 2 or more:
        + For every pair of values, if difference is <= 10, then continue.
        + If difference is <= 20, then add 1, and continue.
        + If difference is <= 30, then add 2 and continue.
        + If difference is > 30, then add 3 and continue.
        + Take subset sum and total number of original values and find the next multiple of 4.
    - Case [1, 100], difference is > 30, sum = 2 + 3 = 5, bump up to 8.
    - Case [1, 50, 100], differnce is > 30, sum = 3 + 3. Second difference is > 30 sum = 3 + 3 + 3. Next multiple of 4 is 12 so we are at 9 more.
    - Case [1, 2, 100], 2 - 1 <= 10. Sum = 3. Continue. 100 - 2 > 30. Sum = 3 + 3. Continue. Next multiple is 8.So need 5 more.
    - Case [1, 99, 100], 99 - 1 > 30. Sum = 3 + 3. Continue. 100 - 99 <= 10. Continue. Next multiple is 8. So need 5 more.
    - Case [1, 2, 22], 2 - 1 <= 10. Sum = 3. Continue. 22 - 2 <= 20, Sum = 3 + 1. Only need one more to complete it.

