Laundro, Matt
===

Matt Laundro is about to engage in his favourite activity - doing laundry! He's brought `L` indistinguishable loads of laundry to his local laundromat, which has `N` washing machines and `M` dryers. The `i`th washing machine takes `Wi` minutes to wash one load of laundry, and each dryer takes `D` minutes to dry a load of laundry. At any point in time, each machine may only be processing at most one load of laundry.

As one might expect, Matt wants to wash and then dry each of his `L` loads of laundry. Each load of laundry will go through the following steps in order:

1. A non-negative amount of time after Matt arrives at the laundromat, Matt places the load in an unoccupied washing machine `i`
2. `Wi` minutes later, he removes the load from the washing machine, placing it in a temporary holding basket (which has unlimited space)
3. A non-negative amount of time later, he places the load in an unoccupied dryer
4. `D` minutes later, he removes the load from the dryer

Matt can instantaneously add laundry to or remove laundry from a machine. Help Matt minimize the amount of time (in minutes after he arrives at the laundromat) after which he can be done drying all L loads of laundry!

Input
---
Input begins with an integer `T`, the number of times Matt goes to the laundromat. For each trip to the laundromat, there is first a line containing the space-separated integers `L`, `N`, `M`, and `D` in that order. After that is a line containing `N` space-separated integers, the `i`th of which is `Wi`.

Output
---
For the ith trip, print a line containing "Case #i: " followed by the minimum time it will take Matt to finish his laundry.

Constraints
---
```
1 ≤ T ≤ 50 
1 ≤ L ≤ 1,000,000 
1 ≤ N ≤ 10,000 
1 ≤ M ≤ 1,000,000,000 
1 ≤ D ≤ 1,000,000,000 
1 ≤ Wi ≤ 1,000,000,000 
```

Explanation of Sample
---
In the first case, Matt has just one load of laundry. He washes it for 1200 seconds, and dries it for 34 seconds. In the second case, Matt uses the 1-second washer for both loads of laundry. The second load finishes at the 2-second mark, so it finishes drying at the 12-second mark.

Example Input
---
```
5
1 1 1 34
1200
2 3 2 10
100 10 1
3 3 3 3
1 2 3
4 2 2 7
5 8
999 1 999 6
3
```

Example output
---
```
Case #1: 1234
Case #2: 12
Case #3: 5
Case #4: 22
Case #5: 3003
```

Ideas
---
