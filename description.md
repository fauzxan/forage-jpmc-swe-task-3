# Explanation
In order to display more meaningful information, we are required to display the ratio directly instead of the stock prices. 
We already have the information required to calculate the ratio between the prices of the two stocks. As such, we will use this information to calculate the ratio, and send those values into the graph. 
In order to do this, we may do the following:

- Modify the schema of the data to be sent. 
- Modify the attributes sent via perspective viewer element

We are also provided with a data manipulator class, which will help us render the final graph. At this point, we have already received the necessary information from `Graph.tsx` to display the ratios. We now simply just compute the ratio as `ratio = price_abc / price_def` and return it. Additionally, we can also need to set the trigger rules such that if the ratio goes beyond a certain threshold range, an alert will be triggered. 

In my code, however, I have introduced two thresholds- one is conservative, to enable those traders who would like to get notified earlier if the ratio goes beyond a certain range. This is set at 5%. The other threshold is a hard indicative threshold that 'confirms' that the correlation is off and there is an arbitrage-like opportunity.