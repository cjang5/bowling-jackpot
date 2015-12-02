![alt text](http://i.imgur.com/Ho5xHfE.png)
------
#Overview
I covered all the requirements outline in the nextcapital spec (at least I'm pretty sure I did, there may be some edge cases).

You can start by registering or logging in to an account which will redirect you to the client dashboard.

Here are there a bunch of features I've yet to implement, and didn't enough time to finish, such as: 
+ **News Feed** *(I was thinking of posting an item here whenever an action was performed on a different page of the dashboard)*
+ **Jackpots Page** *(I was going to have a list of every jackpot in the account here, but instead just implemented that in the Leagues page)*
+ **Options dialog** in the navbar of the client 
+ There will be a bunch of buttons and links that don't do anything, and this is again due to me not having the time to implement their features, although you will definitely be able to tell what they were supposed to do!

You may find some kinks I haven't ironed out, but I needed to get my submission to you guys soon or it'd be pointless *(sorry by the way for my really delayed submission)*

#Usage
You can open a console in the browser of your choice (preferably Chrome or Firefox) to see all the requests being logged i.e Creating bowlers, creating leagues, etc.

##Bowlers tab
Here you can create a bowler by clicking the button in the navigation bar, search for bowlers by providing the id, and select individual bowlers and add them to leagues by specifying the league id. 

**_Note:_** The process for adding bowlers to leagues is not very streamlined, as you must **know** the league id at the moment you want to add a bowler to it, and if you don't you must go to the leagues tab to find the league id, and then go back... very unintuitive. But it serves the minimum purpose, I may go back and fix this afterwards

##Leagues tab
Here you can do the same things as the Bowler's tab, i.e you can create leagues, search for leagues via league id, select leagues and add bowlers to them (again, unintuitively)

**In addition**, you can click "Detailed View" once a league is selected and get a more detailed overview of the league where you can see all the bowlers in that league, and all the lotteries (both completed and the current) in that league. You can then purchase lotto tickets for the bowler of your choice, check past results of lotteries and their winners, and roll for the current lottery for a chance to win someone some money!

**_Note:_** Here I wanted to add another input form so we could add bowlers to the league right away instead of having to go back to the Leagues main page and selecting the league again, but I did not have enough time to. I will definitely look into this afterwards.

#Final Thoughts
I hope you liked what I've built, it's definitely one of the most fun projects I've created so far, and I know it took a long time, but that's because I'm so meticulous about good UX (something I hope you're looking for). 

The landing page is not nearly what I wanted it to look like, it was going to have much more, but I hope what's there serves to show what I would have gone for given the time. I did my best to provide a good UX given a small amount of time (what with all my schoolwork and final exams coming up). 

Also, if you're using a Windows machine, the scrollbars may mess up margins and make it look uneven (something I will also fix when I have time!), so I hope you're not as much of a UI/UX freak as me!

###Thanks for checking it out!