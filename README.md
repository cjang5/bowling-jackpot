![alt text](http://i.imgur.com/Ho5xHfE.png)
------
#Overview
I covered all the requirements outline in the nextcapital spec (at least I'm pretty sure I did, there may be some edge cases).

You can start by registering or logging in to an account which will redirect you to the client dashboard.

Here are there a bunch of features I've yet to implement, and didn't enough time to finish, such as: 
+ **News Feed** *(I was thinking of posting an item here whenever an action was performed on a different page of the dashboard)*
+ **Jackpots Page** *(I was going to have a list of every jackpot in the account here, but instead just implemented that in the Leagues page)*
+ **Options dialog** in the navbar of the client 

You may find some kinks I haven't ironed out, but I needed to get my submission to you guys soon or it'd be pointless *(sorry by the way for my really delayed submission)*

#Usage
You can open a console in the browser of your choice (preferably Chrome or Firefox) to see all the requests being logged i.e Creating bowlers, creating leagues, etc.

##Bowlers tab
Here you can create a bowler by clicking the button in the navigation bar, search for bowlers by providing the id, and select individual bowlers and add them to leagues by specifying the league id. 

*Note:* The process for adding bowlers to leagues is not very streamlined, as you must **know** the league id at the moment you want to add a bowler to it, and if you don't you must go to the leagues tab to find the league id, and then go back... very unintuitive. But it serves the minimum purpose, I may go back and fix this afterwards