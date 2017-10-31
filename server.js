const express = require('express'),
  app = express(),
  path = require('path'),
  chalk = require('chalk'),
  port = process.env.PORT || 3000,
  db = require('./db'),
  bodyParser = require('body-parser');

app.use('/', express.static(path.join(__dirname, 'browser')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get("/api", (req, res, next) => {
  db.Word.findAll()
  .then(data => {
    res.send(data)
  })
  .catch(next);
})

app.post("/api", (req, res, next) => {
  db.Word.create(req.body)
  .then(() => res.sendStatus(204))
  .catch(next);
})

app.get("/api/transcripts", (req, res, next) => {
  db.Text.findAll()
    .then(data => {
      res.send(data)
    })
    .catch(next);
})

app.post("/api/transcripts", (req, res, next) => {
  db.Text.create(req.body)
    .then(() => res.sendStatus(204))
    .catch(next);
})


app.listen(port, () => {
  console.log(chalk.blue(`server listening on port ${port}...`));
})



