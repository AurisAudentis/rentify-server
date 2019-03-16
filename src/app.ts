import cookieParser from "cookie-parser";
import morgan from "morgan";

import express from "express";
import {indexRouter} from "./Routers";
import config from "../config/config";
import {logger} from "./Infrastructure/Logger";
import { connectMongo } from "./Database/handler";


export class app {
    public app = express();
    private instance;

    private setupLogging =
        { 'dev': this.debugLogging,
            'prod': this.prodLogging};

    public launch(port: number) {
        this.setup();
        this.routers();
        this.instance = this.app.listen(port);
        connectMongo(this);
        logger.info(`Started server at port ${port}.`)
    }
hhhhggbb
    public exit(){
        if (this.instance){
            this.instance.close();
        }
    }

    private setup(): void {
        this.setupLogging[config.logging].bind(this)();
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cookieParser());
    }

    private debugLogging() {
        this.app.use(morgan('dev'));
    }

    private prodLogging() {
        this.app.use(morgan('combined', { skip: function(req, res) { return res.statusCode < 400 }, stream: {write: message => logger.info(message.trim())} }));
    }

    private routers(): void {
        this.app.use('/', indexRouter);
    }
}




