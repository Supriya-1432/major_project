export enum RES_TYPES {
    ERROR = 'error',
    WARNING = 'warning'
}

export enum CODES {
    DEFAULT = 1000,
    PERMISSION_DENIED = 1001,
    TOKEN_EXPIRED = 1002
}

export class HTTPError extends Error {
    statusCode: number = 500;
    errorCode: number = 1000;
    constructor(message?: string, statusCode?: number, errorCode?: number) {
        super(message);
        this.statusCode = statusCode ? statusCode : 500;
        this.errorCode = errorCode ? errorCode : 1000;
    }
}

export function resError(res: any, message: string, statusCode: number = 500, code:CODES = CODES.DEFAULT) {
    return res.status(statusCode).send({
        success: false,
        error: message,
        code: code,
        type: RES_TYPES.ERROR
    });
}