const fs = require("fs");

// Declare an array to store questions
let questions = [];

// Read questions from the JSON file asynchronously
fs.readFile("questions.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading questions file:", err.message);
    return;
  }

  questions = JSON.parse(data);

  // Custom inputs calculate -> easy, medium, hard (20, 50, 30) percentage -> marks (5, 10, 15)
  const easyQues = [];
  const mediumQues = [];
  const hardQues = [];

  // (100 marks, Difficulty, {20% Easy, 50% Medium, 30% Hard })
  // according to the current assumption easyCnt = 4, mediumCnt = 5 , hardCnt = 2
  const totalmarks = 100;
  let easyCnt = (totalmarks * 0.2) / 5; // 4
  let mediumCnt = (totalmarks * 0.5) / 10; // 5
  let hardCnt = (totalmarks * 0.3) / 15; // 2

  // Shuffle questions array every time before creating paper
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  for (const question of questions) {
    if (question.difficulty === "Easy" && easyCnt > 0) {
      easyQues.push(question.question);
      easyCnt--;
    } else if (question.difficulty === "Meadium" && mediumCnt > 0) {
      mediumQues.push(question.question);
      mediumCnt--;
    } else if (question.difficulty === "Hard" && hardCnt > 0) {
      hardQues.push(question.question);
      hardCnt--;
    }
  }

  // handel all corner cases like if questions are less than requirement or if a specific difficulty question is not there
  if (easyCnt > 0 || mediumCnt > 0 || hardCnt > 0) {
    console.log("Not sufficient Questions to generate the required Paper");
  } else {
    console.log("Paper \n");
    //  easy questions
    console.log("Easy Questions \n");
    console.log(easyQues);
    // medium questions
    console.log("Meadium Questions \n");
    console.log(mediumQues);
    // hard questions
    console.log("Hard Questions \n");
    console.log(hardQues);
  }
});
