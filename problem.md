Problem statement:
Write a program which takes 1 input (Dimension = “location” or “department” or “designation”) and generates a list of sorted sentiment scores grouped by segments in the given input dimension.
Example:
For Input: location,
Sample output:
Segment
Bangalore Sydney London SF Mumbai
Sentiment Score
4 2 -3 -5 -8
Participation Percentage
100 0 50 25 10
Sentiment Score​ = number of positive votes - number of negative votes.
Participation Percentage​ = Number of people Who voted / Number of people in Dimension \* 100
In addition to the above,
Also calculate the overall sentiment of the company with the above example output - the overall sentiment would be “​-10​”(sum of each sentiment score in the vote)
Mapping of Sentiment to numeric value 5, 4 is positive
1, 2 is negative
3 is neutral
