import { type Response } from "express";

interface DefaultErrorMessage {
    message: string;
    code: number;
}

export class ErrorResponse {
    public error: string;
    public errorCode?: number;
    public errorMessage?: string;
    public responseObject?: any;

    public sendResponse(res: Response) {
        const defaultErrorMessages: Record<string, DefaultErrorMessage> = {
            MISSING_PARAMETERS: {
                message: "Niepoprawne parametry!",
                code: 400,
            },
            NOT_LOGGED_IN: {
                message: "Trzeba być zalogowanym, aby wykonać tę akcję!",
                code: 401,
            },
            INTERNAL_SERVER_ERROR: {
                message: "Natrafiono na niespodziewany błąd serwera!",
                code: 500,
            },
            ACCESS_DENIED: {
                message: "Musisz być administratorem, aby wykonać tę akcję!",
                code: 403,
            },
            default: {
                message: "Natrafiono na niespodziewany błąd!",
                code: 500,
            },
        };

        const defaultError: DefaultErrorMessage =
            defaultErrorMessages[this.error] || defaultErrorMessages.default;

        res.status(this.errorCode || defaultError.code).send({
            error: this.error,
            errorMessage: this.errorMessage || defaultError.message,
            ...this.responseObject,
            statusCode: this.errorCode || defaultError.code,
            success: false,
        });
    }

    constructor(properties: {
        error: string;
        errorCode?: number;
        errorMessage?: string;
        responseObject?: any;
    }) {
        this.error = properties.error;
        this.errorCode = properties.errorCode;
        this.errorMessage = properties.errorMessage;
        this.responseObject = properties.responseObject;
    }
}
