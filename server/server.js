const express = require('express');
// const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(express.json());
// app.use(cors());

routes.configure(app);

app.listen(3001, () => {
    console.log('Backend server listening at http://localhost:3001');
});