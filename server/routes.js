const scheduleController = require('./controllers/schedule');

const routesConfig = {
    '/schedule/create': {
        method: 'put',
        handlers: [
            /* validation, authentication, authorization middleware can be added to this list */
            scheduleController.createSchedule,
        ],
    },
    '*': {
        method: 'use', 
        handlers: [
            (req, res) => {
                res.status(404).json({
                    message: 'Not Found',
                });
            }
        ]
    },
}

const configure = (app) => {
    Object.keys(routesConfig).forEach((path) => {
        app[routesConfig[path].method](path, routesConfig[path].handlers);
    });
};

module.exports = {
    configure
};