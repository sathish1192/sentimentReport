const sampeData = require("./sampleData");
const validDimensions = ["location", "department", "designation"];

const groupUsersByDimension = function groupUsersByDimension(dimension) {
  if (!validDimensions.includes(dimension)) return null;

  const groupedUsersMap = {};

  sampeData.USER_DATA.forEach(user => {
    const key = user[dimension];

    if (!groupedUsersMap[key]) {
      groupedUsersMap[key] = [];
    }
    groupedUsersMap[key].push(user.User);
  });

  return groupedUsersMap;
};

const generateSentimentData = function generateSentimentData(dimension) {
  const retArray = [];

  const groupedUsersMap = groupUsersByDimension(dimension);
  if (!groupedUsersMap) null;

  Object.keys(groupedUsersMap).forEach(dimensionValue => {
    const usersList = groupedUsersMap[dimensionValue];
    const scoreObjectForUsersList = calculateSentimentScore(usersList);
    if (scoreObjectForUsersList) {
      retArray.push({
        segment: dimensionValue,
        ...scoreObjectForUsersList
      });
    }
  });

  if (retArray) {
    return retArray.sort((a, b) => {
      return b.sentimentScore - a.sentimentScore;
    });
  }

  return [];
};

const calculateSentimentScore = function calculateSentimentScore(usersList) {
  if (!usersList || usersList.length == 0) {
    return null;
  }

  let participationCount = 0;
  let sentimentScore = 0;

  usersList.forEach(userId => {
    const filtered = sampeData.VOTES_DATA.filter(
      vote => vote.userId === userId
    );
    if (filtered && filtered.length > 0) {
      participationCount++;

      const sentiScoreForUser = filtered.reduce((acc, vote) => {
        const voteVal = vote.Vote;
        let sentimentValue = 0;

        if (voteVal === 4 || voteVal === 5) {
          sentimentValue = 1;
        } else if (voteVal === 1 || voteVal === 2) {
          sentimentValue = -1;
        } else if (voteVal === 3) {
          // nothing
        } else {
          // nothing
        }

        acc = acc + sentimentValue;
        return acc;
      }, 0);

      sentimentScore = sentimentScore + sentiScoreForUser;
    }
  });

  const participationPercentage = (participationCount / usersList.length) * 100;

  return {
    sentimentScore,
    participationPercentage
  };
};

module.exports = {
  generateSentimentData
};
