const express = require('express');
const path = require('path');
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

if (process.env.NODE_ENV !== 'development') {
  app.use(express.static(path.resolve(__dirname, './../client/build')));
  app.use('/admin', express.static(path.resolve(__dirname, './../admin/build')));

  app.get('/admin', (req, res) => {
    console.log(path.resolve(__dirname + './../admin/build'));
    res.sendFile(path.resolve(__dirname + './../admin/build/index.html'));
  });

  app.get('/*', (req, res) => {
    console.log(path.resolve(__dirname + './../client/build'));
    res.sendFile(path.resolve(__dirname + './../client/build/index.html'));
  });  
}


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`THE SERVER IS LISTENING ON PORT ${PORT}...`);
});
