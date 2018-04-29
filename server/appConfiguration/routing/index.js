'use strict';

const configRoutesFunctions = [
    require('./task'),
    require('./user')
];
const routes = require('../../web/routes/index');

module.exports = (app) => {
    function applyRoutes (routesNames) {
        routesNames.forEach((routeName) => {
            app.use(routes[routeName].apply());
        });
    }

    configRoutesFunctions.forEach((configRoute) => {
        configRoute(applyRoutes);
    });
};