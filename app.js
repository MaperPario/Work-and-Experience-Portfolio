// Import Express and set up the app
const express = require('express');
const app = express();
const data = require('./data.json');
const port = 3000;

//middleware
app.set('view engine', 'pug');
app.use("/static", express.static('public'));

//routes
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

//error handlers
app.use(function (req, res, next) {
    res.status(404).send("Sorry, this route is inaccessible. Please try another route!");
    console.log('Error 404. This route could not be found.');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('A Server Error Occurred');
});

app.listen(port);
console.log(`This app is running on port ${port}`);
