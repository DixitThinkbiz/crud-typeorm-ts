import  Express  from "express";
import { dummySchemaPost } from "../../domain/schemas/add_dummy.schema";
export const validateDummyPost = (req :Express.Request, res : Express.Response, next : Express.NextFunction) => {
  const { error } = dummySchemaPost.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

