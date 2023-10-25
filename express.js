const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: process.env.REACT_APP_OPENAI_ORGANIZATION,
  apiKey: process.env.REACT_APP_OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/chatbot", async (req, res) => {
  const inputValue = req.body;
  let contents = [];

  console.log(inputValue);
  inputValue.map((ele, idx) => {
    let role;
    if (ele.isUser) role = "user";
    else role = "assistant";

    const content = ele.content;
    contents.push({ role, content });
  });

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "국내 여행지를 추천해주고 정보를 제공하는 챗봇",
      },
      ...contents,
    ],
  });

  console.log(response.data.choices[0].message);

  if (response.data) {
    if (response.data.choices) {
      res.json({
        message: response.data.choices[0].message.content,
      });
    }
  }
});

app.listen(port, () => {
  console.log("Example app port: " + port);
});