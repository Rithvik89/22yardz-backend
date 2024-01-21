import winston from "winston";

//firstly create a log config file ... saying how the loggers
// should be transported

const logConfiguration = {
    'transports':[
        new winston.transports.Console({
            level:'info'
        }),
        new winston .transports.File({
            level:'error',
            filename:'logs/backend-error.log'
        })
    ],
    'format': winston.format.combine(
        winston.format.label({
            label: `Label🏷️`
        }),
        winston.format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
       }),
        winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
    )
}

// now create a logger from above configurations.

const logger = winston.createLogger(logConfiguration)

export default logger

