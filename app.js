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
        res.render('project', { project });
    } else {
        const err = new Error();
        err.status = 404;
        next(err);
    }
});

//error handlers
//404
app.use((req, res, next) => {
    render404(res);
});

//global
app.use((err, req, res, next) => {
    if (err) {
        console.log('Global Error Handler Called', err);
    }

    if (err.status === 404) {
        render404(res);
    } else {
        err.message = err.message || `Oops! It looks like something went wrong on the server!`;
        res
            .status(err.status || 500)
            .render('error', { err });
    }
});

function render404(res) {
    res.status(404).render('not-found');
}

app.listen(port);
console.log(`This app is running on port ${port}`);
