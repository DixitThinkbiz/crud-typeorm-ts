// Import necessary modules and validation schemas
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { constants } from "../../infrastructure/config/constant";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../../domain/models/dummy";


export const validateDummyData =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate({ ...req.body, ...req.params });
    // If validation fails, return a 400 Bad Request response with the validation error details
    if (error) {
      return res
        .status(constants.ERROR_STATUS.BAD_REQUEST)
        .json({ error: error.details[0].message });
    }
    // Move to the next middleware or route handler
    next();
  };
  
  
export const isAuthenticated = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;

    const data = jwt.verify(token, "dixit") as JwtPayload;
    if (!req.locals) {
      req.locals = {};
    }
    req.locals.id = Number(data.id);
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res
      .status(constants.ERROR_STATUS.AUTHENTICATION_FAILED)
      .json({ error: constants.ERROR_MESSAGE.ACCESS_TOKEN_MISSING });
    }

    if (error instanceof jwt.NotBeforeError) {
      return res
      .status(constants.ERROR_STATUS.AUTHENTICATION_FAILED)
      .json({ error: constants.ERROR_MESSAGE.JWT_NOT_BEFORE_ERROR });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res
      .status(constants.ERROR_STATUS.ACCESS_TOKEN_MISSING)
      .json({ error: constants.ERROR_MESSAGE.JWT_TOKEN_EXPIRED_ERROR });
    }
    return res
      .status(constants.ERROR_STATUS.AUTHENTICATION_FAILED)
      .json({ error: constants.ERROR_MESSAGE.AUTHENTICATION_FAILED });
  }
};
