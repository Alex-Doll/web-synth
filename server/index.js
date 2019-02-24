const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let nums = [];

app.get('/api', (req, res) => {
  res.status(206);
  res.json('<h1>HI</h1>');
});

app.post('/api', (req, res) => {
  nums.push(req.body.num);
  console.log(nums);
  res.send('Success!');
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`THE SERVER IS LISTENING ON PORT ${PORT}...`);
});
