const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser');

const app = express()
let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Tom' },
    { id: 3, name: 'Bunny' },
    { id: 4, name: 'Shark' },
    { id: 5, name: 'Monkey' },
]

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/users', (req, res) => {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);

    if (Number.isNaN(limit)) return res.status(400).end()

    res.json(users.slice(0, limit));
})


app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) return res.status(400).end();

    const user = users.filter((user) => user.id === id)[0];
    if (!user) return res.status(404).end();

    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    if (Number.isNaN(id)) return res.status(400).end();

    users = users.filter(user => user.id !== id);
    res.status(200).end();
})

app.post('/users', (req, res) => {
    const name = req.body.name;
    if (!name) return res.status(400).end();

    const isConflict = users.filter(user => user.name === name).length;
    if (isConflict) return res.status(409).end();

    //const id = Date.now();
    let max_id = users.reduce((max , num) => max > num ? max : num)
    const id = max_id + 1;
    const user = { id, name };
    users.push(user);
    res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if (!name) return res.status(400).end();

    const isConflict = users.filter(user => user.name === name).length;
    if (isConflict) return res.status(409).end();

    const user = users.filter(user => user.id === id)[0];
    if (!user) return res.status(404).end();

    user.name = name;

    res.json(user);
});

module.exports = app;