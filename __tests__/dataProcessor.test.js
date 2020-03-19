/* eslint-disable no-undef */
const processor = require("../dataProcessor");

describe("Test - Processor", () => {
  it("generateSentimentData - Test", () => {
    const TEST_INPUT = "location";

    const TEST_OUTPUT = [
      { segment: "Bangalore", sentimentScore: 5, participationPercentage: 100 },
      { segment: "London", sentimentScore: 3, participationPercentage: 100 },
      { segment: "Sydney", sentimentScore: 0, participationPercentage: 100 },
      { segment: "Mumbai", sentimentScore: -1, participationPercentage: 100 },
      { segment: "SF", sentimentScore: -3, participationPercentage: 100 }
    ];

    const output = processor.generateSentimentData(TEST_INPUT);

    expect(output).toEqual(TEST_OUTPUT);
  });
});
