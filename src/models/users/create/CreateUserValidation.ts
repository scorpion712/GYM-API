import Joi from 'joi';

export const userSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).required().messages({
        'string.base': 'El nombre debe ser una cadena de caracteres',
        'any.required': 'El nombre es requerido',
    }),
    lastName: Joi.string().min(2).max(50).optional().messages({
        'string.base': 'El apellido debe ser una cadena de caracteres',
    }),
    age: Joi.number().integer().min(18).max(100).optional().messages({
        'number.base': 'La edad debe ser un número',
    }),
    dni: Joi.string().pattern(/^[0-9]{7,9}$/).optional().messages({
        'string.pattern.base': 'El DNI debe entre 7 y 9 dígitos',
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).optional().messages({
        'string.pattern.base': 'El teléfono debe tener 10 dígitos',
    }),
    email: Joi.string().email().optional().messages({
        'string.email': 'El email no es válido',
    }),
    considerations: Joi.string().max(255)
        .allow('')
        .optional().messages({
            'string.base': 'Las consideraciones deben ser una cadena de caracteres',
            'string.max': 'Las consideraciones no pueden ser más de 255 caracteres',
        }),
    daysPerWeek: Joi.number().integer().min(1).max(7).required().messages({
        'number.base': 'Los días de la semana deben ser un número',
        'number.min': 'Los días de la semana deben ser al menos 1',
        'number.max': 'Los días de la semana deben ser máximo 7',
    }),
});

