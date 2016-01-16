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
- Should've paid more attention in class. This seems like a classical queueing or bucketing problem.
- M can be very big. Number of dryers.
- For Case 1: 1 washer (1200), 1 dryer at (34) and 1 load.
- For Case 2: 3 washers (100, 10, 1), 2 dryers at (1) and 2 loads.
    + First load put in to fast washer.
    + Second load can be put into fast washer sooner than the first load finishes.
    + Second load waits until first washer is available.
    + If there were more than 10 loads, then the second washer becomes viable.
    + There seems to be no dependency on the dryers since they are all same. Just add an additional 1 to all loads? No. Must wait until they are washed.
- For Case 3: 3 washers (1, 2, 3), 3 dryers (3) and 3 loads.
    + First load put into 1, Second load put into 2, third load wait for first load then put into 1.
    + First load done at t = 4
    + Second load done at t = 5
    + Third load done at t = 5
- For Case 4: 2 washers (5, 8), 2 dryers (7) and 4 loads.
    + At T0, L1 into W1. At T5, W1 free. At T5, L1 into D1. At T12, D1 free.
    + At T0, L2 into W2. At T8, W2 free. At T8, L2 into D2. At T15, D2 free.
    + At T5, L3 into W1. At T10, W1 free. At T12, L3 into D1. At T19, D1 free.
    + At T10, L4 into W1. At T15, W1 free. At T15, L4 into D2. At T22, D2 free.
- Seems like a greedy algorithm will work? Is there a case where spacing out washing schedule finishes faster than just shortest washing schedule? Probably, otherwise the dryer wouldn't be part of this question.
- For Case 5: 1 washer (3) and 999 dryers (6) and 999 loads.
    + T0 first load
    + T3 second load
    + T6 third load
    + T(999 * 3 - 3) 999th load, T(1000 * 3 - 6) start. T(1000 * 3 - 3) done.
    + T(1000 * 3 - 3) start dryer load. T(1000 * 3 - 3 + 6) done.
- Sounds like greedily applying washer should work?
    + For any given load, determine whether to wait on occupied washers (assuming another load has not already scheduled for it already) or to use fastest available washer.
- For every washer, determine time to completion from T0. Initially it is just work time, after a load has been scheduled it changes to `Wi + Wi`.
- For each dryer, can do the same but there are a lot more dryers.
- For washer can maintain a BST, for dryers cannot.
- After washers, can get a list of washer finish times.
    + Iterate through load washer finish times.
    + For each add D time as long as M is not saturated.
    + 
