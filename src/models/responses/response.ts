import { type Response } from "express";

export class CustomResponse {
    public statusCode?: number;
    public statusMessage?: string;
    public responseObject?: any;

    public sendResponse(res: Response) {
        if (!this.statusCode) this.statusCode = 200;
        res.status(this.statusCode).send({
            msg: this.statusMessage,
            ...this.responseObject,
            statusCode: this.statusCode,
            success: true,
        });
    }

    constructor(properties: { statusCode?: number; statusMessage?: string; responseObject?: any }) {
        this.statusCode = properties.statusCode;
        this.statusMessage = properties.statusMessage;
        this.responseObject = properties.responseObject;
    }
}
