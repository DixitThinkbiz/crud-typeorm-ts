// Import necessary modules and validation schemas
import { NextFunction, Request, Response } from "express";
import { constants } from "../../config/constant";
import jwt, { JwtPayload } from "jsonwebtoken";

export const isAuthenticated = (
    req:Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
  
      const data = jwt.verify(token, "dixit") as JwtPayload;
      
      res.locals.id = Number(data.id);
      
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
  