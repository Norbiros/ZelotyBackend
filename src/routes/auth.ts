import express, { Request, Response } from "express";
import {ErrorResponse} from "../models/responses/error-response";
import {AuthUtils} from "../utils/auth-utils";
import prisma from "../prisma";
import {randomBytes} from "crypto";
import {CustomResponse} from "../models/responses/response";

const router = express();

router.post("/register", async (req: Request, res: Response) => {
    console.log(req.body);
    if (!req.body.code || !req.body.uuid) {
        return new ErrorResponse({
            error: "MISSING_PARAMETERS",
        }).sendResponse(res);
    }

    for (const discordId in AuthUtils.map) {
        const pin = AuthUtils.map[discordId];
        if (pin  === req.body.code) {
            delete AuthUtils.map[discordId];
            const token  = randomBytes(16).toString("hex");
            try {
                await prisma.users.create({
                    data: {
                        discord: discordId,
                        token,
                        minecraft: req.body.uuid,
                    }
                })
            } catch (e) {
                return new ErrorResponse({
                    error: "INTERNAL_ERROR",
                    errorMessage: "Błąd podczas tworzenia użytkownika!",
                }).sendResponse(res);
            }
            return new CustomResponse({
                statusCode: 200,
                responseObject: {
                    token,
                }
            }).sendResponse(res);
        }
    }
    return new ErrorResponse({
        error: "INVALID_CODE",
        errorMessage: "Kod jest nieprawidłowy!",
    }).sendResponse(res);
});

export default router;
