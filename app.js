// Import Express and set up the app
const express = require('express');
const app = express();
const data = require('./data.json');
const path = require('path');

app.set('view engine', 'pug');
app.set('views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render(data.projects);
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find(({ id }) => id === +projectId);
    if (project) {
        res.render('project', {project});
    } else {
        res.sendStatus(404);
    }
});

app.listen(3000);