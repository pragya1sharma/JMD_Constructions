const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (result.success) {
            req.body = result.data;

            return next();
        }

        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: result.error.issues.map(e => ({
                field: e.path.join('.'),
                message: e.message
            }))
        });
    };
};

export { validateRequest };