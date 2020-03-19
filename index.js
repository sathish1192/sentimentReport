const processor = require("./dataProcessor");

const provideSentimentReport = function provideSentimentReport(dimension) {
  const resultArray = processor.generateSentimentData(dimension);

  console.log(JSON.stringify(resultArray));

  if (resultArray && resultArray.length > 0) {
    console.log("*****************************************");
    console.log(`Dimension : ${dimension}`);
    console.log("*****************************************");

    console.table(resultArray);
  } else {
    console.log("Invalid Dimension. Cannot generate report");
  }
};

provideSentimentReport("location");
provideSentimentReport("department");
provideSentimentReport("designation");
