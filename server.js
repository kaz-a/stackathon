const express = require('express');
const app = express();
const path = require('path');
const chalk = require('chalk');
const port = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, 'browser')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/word_list', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(port, () => {
  console.log(chalk.blue(`server listening on port ${port}...`));
});
