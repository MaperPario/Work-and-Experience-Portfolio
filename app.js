// Import Express and set up the app
const express = require('express');
const app = express();
const data = require('./data.json');
const port = 3000;

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { projects: data.projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = data.projects.find(({ id }) => id === parseInt(projectId));
    if (project) {
        res.render('project', {project});
    } else {
        res.sendStatus(404);
    }
});

app.listen(port);
console.log(`This app is running on port ${port}`);
