import express, { Request, Response } from "express";
import * as path from "path";
import {ErrorResponse} from "../models/responses/error-response";
import {CustomResponse} from "../models/responses/response";

const router = express();

router.get("/download", async (req: Request, res: Response) => {
    const jarFilePath = path.join(__dirname, '../../mod', "zelotymod.jar");
    res.download(jarFilePath, "mod/zelotymod.jar", (err) => {
        if (err) {
            console.error('Error downloading JAR file:', err);
            return new ErrorResponse({
                error: "DOWNLOAD_ERROR",
                errorMessage: "Błąd podczas pobierania pliku!",
            }).sendResponse(res);
        }
    });
});

router.get("/version", async (req: Request, res: Response) => {
    new CustomResponse({
        statusCode: 200,
        responseObject: {
            version: "0.2.1",
        }
    }).sendResponse(res);
});

export default router;
