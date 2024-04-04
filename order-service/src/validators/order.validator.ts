import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

class OrderValidator {

  private static registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    fullname: Joi.string().required(), 
    password: Joi.string().min(6).required(),
  });

  private static loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  // Validation
  static validateRegister(req: Request, res: Response, next: NextFunction) {
    const validationResult = OrderValidator.registerSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ success: false, error: validationResult.error.details[0].message });
    }
  
    next();
  }

  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const validationResult = OrderValidator.loginSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ success: false, error: validationResult.error.details[0].message });
    }
    
    next();
  }

}

export default OrderValidator;
