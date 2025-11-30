import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Project validation schemas
export const projectValidation = {
  create: Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).max(300).required(),
    longDescription: Joi.string().min(1).required(),
    images: Joi.array().items(Joi.string().uri()).min(1).required(),
    points: Joi.array().items(Joi.string()),
    tech: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      icon: Joi.string().required(),
      color: Joi.string().required()
    })),
    links: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      url: Joi.string().uri().required()
    })),
    featured: Joi.boolean().default(false),
    order: Joi.number().min(0).default(0)
  }),

  update: Joi.object({
    title: Joi.string().min(1).max(100),
    description: Joi.string().min(1).max(300),
    longDescription: Joi.string().min(1),
    images: Joi.array().items(Joi.string().uri()).min(1),
    points: Joi.array().items(Joi.string()),
    tech: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      icon: Joi.string().required(),
      color: Joi.string().required()
    })),
    links: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      url: Joi.string().uri().required()
    })),
    featured: Joi.boolean(),
    order: Joi.number().min(0)
  })
};

// Service validation schemas
export const serviceValidation = {
  create: Joi.object({
    title: Joi.string().min(1).max(100).required(),
    description: Joi.string().min(1).required(),
    price: Joi.string().required(),
    ctaText: Joi.string().required(),
    ctaLink: Joi.string().uri().required(),
    icon: Joi.string().required(),
    order: Joi.number().min(0).default(0),
    active: Joi.boolean().default(true)
  }),

  update: Joi.object({
    title: Joi.string().min(1).max(100),
    description: Joi.string().min(1),
    price: Joi.string(),
    ctaText: Joi.string(),
    ctaLink: Joi.string().uri(),
    icon: Joi.string(),
    order: Joi.number().min(0),
    active: Joi.boolean()
  })
};

// Tech Stack validation schemas
export const techStackValidation = {
  create: Joi.object({
    category: Joi.string().min(1).max(50).required(),
    technologies: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      icon: Joi.string().required(),
      color: Joi.string().required()
    })).min(1).required(),
    order: Joi.number().min(0).default(0)
  }),

  update: Joi.object({
    category: Joi.string().min(1).max(50),
    technologies: Joi.array().items(Joi.object({
      name: Joi.string().required(),
      icon: Joi.string().required(),
      color: Joi.string().required()
    })).min(1),
    order: Joi.number().min(0)
  })
};

// Experience validation schemas
export const experienceValidation = {
  create: Joi.object({
    type: Joi.string().valid('education', 'experience').required(),
    title: Joi.string().min(1).max(100).required(),
    subtitle: Joi.string().min(1).max(100).required(),
    date: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    order: Joi.number().min(0).default(0)
  }),

  update: Joi.object({
    type: Joi.string().valid('education', 'experience'),
    title: Joi.string().min(1).max(100),
    subtitle: Joi.string().min(1).max(100),
    date: Joi.string().min(1),
    description: Joi.string().min(1),
    order: Joi.number().min(0)
  })
};

// Contact validation schemas
export const contactValidation = {
  create: Joi.object({
    name: Joi.string().min(1).max(100).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(10).max(2000).required()
  })
};

// About validation schemas
export const aboutValidation = {
  create: Joi.object({
    section: Joi.string().valid('hero', 'bio', 'approach', 'interests').required(),
    title: Joi.string().min(1).max(200).required(),
    content: Joi.string().min(1).required(),
    technologies: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
    image: Joi.string().uri(),
    order: Joi.number().min(0).default(0)
  }),

  update: Joi.object({
    section: Joi.string().valid('hero', 'bio', 'approach', 'interests'),
    title: Joi.string().min(1).max(200),
    content: Joi.string().min(1),
    technologies: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
    image: Joi.string().uri(),
    order: Joi.number().min(0)
  })
};

// Auth validation schemas
export const authValidation = {
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  }),

  register: Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })
};

// Validation middleware
export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        message: 'Validation failed',
        errors
      });
    }

    next();
  };
};
