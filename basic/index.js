var express = require('express');
var app = express();
var morgan = require('morgan');
var users = [
  {id: 1, name: 'alice'},
  {id: 2, name: 'bek'},
  {id: 3, name: 'chris'}
];

app.use(morgan('dev'));

app.get('/users', (req, res) => {
  req.query.limit
  res.json(users)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = app;
/*
const express = require('express')
const logger = require('morgan')
const app = express();

const mw = (req, res, next) => {
    console.log('mw!')
    throw Error('error!')
    //next()
}

const errorMw = (err, req, res, next) => {
    console.log(err.message)
}

app.use(mw)
app.use(errorMw)
app.use(logger('dev'))

const users = [{name: 'Alice'}]

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/users', (req, res) => res.json(users))
// for test reason 
//app.listen(3000, () => console.log('running'))

module.exports = app
*/