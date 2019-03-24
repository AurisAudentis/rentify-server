import cookieParser from "cookie-parser";
import morgan from "morgan";

import express from "express";
import {indexRouter} from "./Routers";
import config from "../config/config";
import {logger} from "./Infrastructure/Logger";
import { connectMongo } from "./Database/handler";
import passport = require("passport");
import { bearerStrategy } from "./Auth/BearerStrategy";
import { authRouter } from "./Routers/AuthRouter";
import { issueRouter } from "./Routers/IssueRouter";
import { roomRouter } from "./Routers/RoomRouter";
import { groupRouter } from "./Routers/GroupRouter";


export class app {
    public app = express();
    private instance;

    private setupLogging =
        { 'dev': this.debugLogging,
            'prod': this.prodLogging};

    public launch(port: number) {
        this.setup();
        this.routes();
        this.instance = this.app.listen(port);
        connectMongo(this);
        logger.info(`Started server at port ${port}.`)
    }

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
        this.initAuth()
    }

    private debugLogging() {
        this.app.use(morgan('dev'));
    }

    private prodLogging() {
        this.app.use(morgan('combined', { skip: function(req, res) { return res.statusCode < 400 }, stream: {write: message => logger.info(message.trim())} }));
    }

    private routes(): void {
        this.app.use(`${config.mountpoint}/auth`, authRouter);
        this.app.use(`${config.mountpoint}/`, indexRouter);
        this.app.use(`${config.mountpoint}/issues`, issueRouter);
        this.app.use(`${config.mountpoint}/rooms`, roomRouter);
        this.app.use(`${config.mountpoint}/groups`, groupRouter)
    }

    private initAuth(): void {
        this.app.use(passport.initialize());
        passport.use(bearerStrategy);
    }
}




