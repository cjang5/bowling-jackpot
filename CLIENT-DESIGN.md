#Dashboard Design docs
*How I'm going to structure the dashboard*

##Features
###Legend - Group features into different sections of the dashboard
**(1) - Bowlers**

**(2) - Leagues**

**(3) - Lotteries**
+ **(1)** Create a bowler ✓
+ **(1)** List all bowlers ✓
+ **(1)** Get a specific bowler ✓
+ **(1)/(2)** Add a bowler to a league
 + Select bowler in (1) and type in league ID to add
 + Select league in (2) and redirect to (1) if you want to add someone
+ **(2)** List all bowlers in a league
 + have a separate view for this (2 views for leagues)
+ **(2)** Create a league
 + Same as (1)
+ **(2)** List all leagues
 + Same as (1)
+ **(2)** Get a specific league
 + Same as (1)
+ **(2)/(3)** List all lotteries for a league
+ **(2)/(3)** Get a specific lottery for a league
+ **(1)/(3)** Buy a ticket for a bowler
 + Buy from bowlers view (1)
 + Redirect to (1) from (3)
+ **(3)** List all tickets for a lottery (jackpot)
+ **(3)** Draw a winning ticket for a jackpot
+ **(3)** Record the result of a roll