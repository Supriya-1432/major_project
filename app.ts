// app.js
import express = require('express');
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import { Server } from "@overnightjs/core";
import cors from 'cors';
import * as config from './config';
import * as controllers from './controllers';
import { logger } from './utilities/logger';
import morganMiddleware from './middleware/morgan.middleware';
import { urlencoded } from 'express';
import { json } from 'body-parser';



export default class Main extends Server {
  PORT: any;
  dbUrl = 'mongodb://' + config.DB_HOST + '/' + config.DB_NAME;
  whitelist = [/http:\/\/localhost:[0-9]+/]


  constructor() {
    super();
    this.corsPolicy();
    this.middleWare();
    this.PORT = process.env.PORT || 3000;
    this.connectToDatabase();
    this.loadControllers();
  }

  private corsPolicy() {
    express.Router()
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE,OPTIONS");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, user, authorization, Client-Type");
      next();
    });
    this.app.use(cors({
      origin: this.whitelist,
      credentials: true,
    }))
  }

  private middleWare() {
    this.app.use(json({ limit: '5mb' }));
    this.app.use(urlencoded({ limit: '5mb', extended: true }));
    this.app.use(cookieParser());
    this.app.use(morganMiddleware);
  }

  connectToDatabase() {
    mongoose.connection.on('connected', () => { logger.info(`Db connected to ${config.DB_HOST}`); });
    mongoose.connection.on('close', () => { logger.error('lost Db connection'); });
    mongoose.connection.on('reconnected', () => { logger.info('Db reconnected'); });
    mongoose.connection.on('error', () => { logger.error('Db connection error'); });
    mongoose.connect(this.dbUrl)
  }

  private loadControllers() {
    const controllerInstances = [];
    for (const name of Object.keys(controllers)) {
      const controller = (controllers as any)[name];
      if (typeof controller === 'function') {
        controllerInstances.push(new controller());
      }
    }
    this.addControllers(controllerInstances, undefined);
  }

  private setupShutDownProcess(server: any) {
    process.on('SIGINT', () => {
      const cleanUp = async () => {
        await mongoose.connection.close();
      }
      logger.info('Closing server...')
      server.close(() => {
        logger.info('Server closed !!! ')
        cleanUp()
        process.exit()
      });
      setTimeout((e) => {
        logger.info('Forcing server close !!!', e)
        cleanUp()
        process.exit(1)
      }, 5000);
    });
  }

  public start() {
    const server: any = this.app.listen(this.PORT, () => {
      logger.info("Server Started at Port :" + this.PORT);
      this.setupShutDownProcess(server);
    })
  }

}



