'use strict';

const configRoutesFunctions = [
    require('./task'),
    require('./user')
];
const routes = require('../../web/routes/index');
const Router = require('koa-router');
const router = new Router();
const setHeaders = require('../../web/middlewares/setHeaders');

module.exports = (app) => {
    function applyRoutes (routesNames) {
        routesNames.forEach((routeName) => {
            app.use(setHeaders);
            app.use(routes[routeName].apply());
            app.use(router.allowedMethods());
        });
    }

    configRoutesFunctions.forEach((configRoute) => {
        configRoute(applyRoutes);
    });
};