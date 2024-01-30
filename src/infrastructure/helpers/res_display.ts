import { Response } from "express";
import { Dummy } from "../../domain/models/dummy";

export const displayFunction = (
  code: number,
  res: Response,
  message: string | Dummy[] | Dummy
) => {
  if (typeof message == "string") {
    return res.status(code).json({
      message: message,
    });
  } else {
    return res.status(code).json(message);
  }
};
