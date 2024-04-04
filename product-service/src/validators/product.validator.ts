import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

class ProductValidator {

  private static createProductSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string().required(),
    price: Joi.number().precision(2).positive().required()
  });

 
  private static idSchema = Joi.object({
    productId: Joi.string().required()
  });

  private static updateProductSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    description: Joi.string(),
    price: Joi.number().precision(2).positive()
  });

  // Validation
  static validateCreateProduct(req: Request, res: Response, next: NextFunction) {
    const validationResult = ProductValidator.createProductSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ success: false, error: validationResult.error.details[0].message });
    }
  
    next();
  }

  static validateID(req: Request, res: Response, next: NextFunction) {
    const { error } = ProductValidator.idSchema.validate(req.params, { allowUnknown: true });
    if (error) {
      return res.status(400).json({ success: false, error: 'Invalid user ID' });
    }
    next();
  }

  static validateProductUpdate(req: Request, res: Response, next: NextFunction) {
    const validationResult = ProductValidator.updateProductSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ success: false, error: validationResult.error.details[0].message });
    }
  
    next();
  }

}

export default ProductValidator;
