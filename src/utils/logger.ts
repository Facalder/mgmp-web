import pino, { type LoggerOptions } from 'pino'
import env from '@/configs/env'

const { nodeEnv, logLevel } = env.app
const isDev = nodeEnv === 'development' && !process.env.VERCEL

const devOptions: LoggerOptions = {
    level: logLevel,
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            colorizeObjects: true,
            singleLine: false,
            levelFirst: true,
            translateTime: 'SYS:HH:MM:ss',
            ignore: 'pid,hostname',
            messageFormat: '  ▸  {msg}',
            errorLikeObjectKeys: ['err', 'error'],
            errorProps: 'stack,type,statusCode,isOperational',
            customColors: [
                'trace:gray',
                'debug:cyanBright',
                'info:greenBright',
                'warn:yellowBright',
                'error:redBright',
                'fatal:magentaBright'
            ].join(',')
        }
    }
}

const prodOptions: LoggerOptions = {
    level: logLevel,
    base: null,
    timestamp: pino.stdTimeFunctions.isoTime,
    formatters: {
        level(label) {
            return { level: label.toUpperCase() }
        }
    },
    serializers: {
        err: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res
    },

    redact: {
        paths: [
            '*.password',
            '*.passwordHash',
            '*.token',
            '*.accessToken',
            '*.refreshToken',
            '*.secret',
            '*.authorization',
            'req.headers.cookie',
            'req.headers.authorization'
        ],
        censor: '[REDACTED]'
    }
}

export const logger = pino(isDev ? devOptions : prodOptions)
