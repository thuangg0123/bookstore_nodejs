const express = require("express");
const path = require('path');

const dbConnect = require("./config/dbConnect");
const { initRoutes } = require('./routes/apis/index');
const routes = require('./routes/routeHTML/route');

const app = express();

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbConnect();
initRoutes(app);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route HTML paths
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
