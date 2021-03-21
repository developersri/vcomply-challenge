const scheduleController = require('./controllers/schedule');
const weeklyoffsController = require('./controllers/weeklyoffs');
const holidaysController = require('./controllers/holidays');

const routesConfig = {
    '/schedule/create': {
        method: 'put',
        handlers: [
            /* validation, authentication, authorization middleware can be added to this list */
            scheduleController.createSchedule,
        ],
    },
    '/schedule/list': {
        method: 'get',
        handlers: [
            /* validation, authentication, authorization middleware can be added to this list */
            scheduleController.getList,
        ],
    },
    '/weeklyoffs/list': {
        method: 'get',
        handlers: [
            /* validation, authentication, authorization middleware can be added to this list */
            weeklyoffsController.getList,
        ],
    },
    '/holidays/list': {
        method: 'get',
        handlers: [
            /* validation, authentication, authorization middleware can be added to this list */
            holidaysController.getList,
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