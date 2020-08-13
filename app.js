/** Required Modules */
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const locationRouter = require('./routes/location');
require('./config/env.config');

/** Creating app here */
class App {

    constructor() {
        this.initiateExpress();
        this.appendMiddlewares();
        this.initiateRoutes();
    }

    initiateExpress() {
        this.app = express();
    }

    appendMiddlewares() {
        this.app.use(bodyParser.json({ limit: '100kb' }));
        this.app.use(bodyParser.urlencoded({ limit: '100kb', extended: true }));
        const whitelist = process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : `${process.env.APP_REST_PROTOCOL}://${process.env.APP_HOST}`;
        const corsOptions = {
            origin: whitelist,
            credentials: true
        }
        this.app.use(cors(corsOptions));
    }

    initiateRoutes() {
        this.app.use(process.env.APP_REST_BASE_URL, locationRouter);
    }

}

const Server = new App();
module.exports = Server.app;