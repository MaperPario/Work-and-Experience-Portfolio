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
        const err = new Error();
        err.status = 404;
        err.message = 'Oops! This route does not exist, try another!';
        next(err);
    }
});

//error handlers
app.use(function (req, res, next) {
    // res.status(404).send("Sorry, this route is inaccessible. Please try another route!");
    console.log();
    const err = new Error();
    err.status = 404;
    err.message = 'Oops! This route does not exist, try another!';
    next(err);
});

app.use(function (err, req, res, next) {
    err.status = err.status || 500;
    err.message = err.message || 'Server Error Occurred';
    console.log(err.status, err.message);
    res.status(err.status).send(err.message);
});

app.listen(port);
console.log(`This app is running on port ${port}`);
