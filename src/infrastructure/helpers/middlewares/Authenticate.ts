// Import necessary modules and validation schemas
import { NextFunction, Request, Response } from "express";
import { constants } from "../../config/constant";
import jwt, { JwtPayload } from "jsonwebtoken";

export const isAuthenticated =
  (key: string) => (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.headers.authorization);
      const token = req.headers.authorization;

      const data = jwt.verify(token, key) as JwtPayload;

      res.locals.user = { id: data.id, role: data.role };

      next();
    } catch (error) {
      console.log(error);

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
      if (error instanceof jwt.JsonWebTokenError) {
        return res
          .status(constants.ERROR_STATUS.AUTHENTICATION_FAILED)
          .json({ error: constants.ERROR_MESSAGE.ACCESS_TOKEN_MISSING });
      }
      return res
        .status(constants.ERROR_STATUS.AUTHENTICATION_FAILED)
        .json({ error: constants.ERROR_MESSAGE.AUTHENTICATION_FAILED });
    }
  };
