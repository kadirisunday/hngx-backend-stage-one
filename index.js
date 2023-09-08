const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  const dayOfWeek = date.getDay();
  const currentDay = daysOfWeek[dayOfWeek];
  const isoStringWithMilliseconds = date.toISOString();
  const isoStringWithoutMilliseconds = isoStringWithMilliseconds.replace(
    /\.\d{3}Z$/,
    "Z"
  );

  res.json({
    slack_name,
    track,
    utc_time: isoStringWithoutMilliseconds,
    current_day: currentDay,
    github_file_url:
      "https://github.com/josephden16/hngx-backend-stage-one/blob/main/index.js",
    github_repo_url: "https://github.com/josephden16/hngx-backend-stage-one",
    status_code: 200,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
