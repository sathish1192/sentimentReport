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
  let participatedUsers = [];
  let sentimentScore = 0;
  sampeData.VOTES_DATA.forEach(vote => {
    const userId = vote.userId;
    if (usersList.includes(userId)) {
      if (!participatedUsers.includes(userId)) {
        participatedUsers.push(userId);
      }
      const voteVal = vote.Vote;
      if (voteVal === 4 || voteVal === 5) {
        sentimentScore = sentimentScore + 1;
      } else if (voteVal === 1 || voteVal === 2) {
        sentimentScore = sentimentScore - 1;
      } else if (voteVal === 3) {
        // nothing
      } else {
        // nothing
      }
    }
  });
  const participationCount = participatedUsers.length;
  let participationPercentage = 0;
  if (participationCount != 0) {
    participationPercentage = Number(
      ((participationCount / usersList.length) * 100).toFixed(2)
    );
  }
  return {
    sentimentScore,
    participationPercentage
  };
};

module.exports = {
  generateSentimentData
};
