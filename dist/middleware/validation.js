"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFilterPayload = void 0;
const validateFilterPayload = (req, res, next) => {
    const { moduleIds, unitIds, locationIds } = req.body;
    const errors = [];
    if (!Array.isArray(moduleIds) || !moduleIds.every(Number.isInteger)) {
        errors.push('moduleIds must be an array of integers');
    }
    if (!Array.isArray(unitIds) || !unitIds.every(Number.isInteger)) {
        errors.push('unitIds must be an array of integers');
    }
    if (!Array.isArray(locationIds) || !locationIds.every(Number.isInteger)) {
        errors.push('locationIds must be an array of integers');
    }
    if (moduleIds?.length === 0) {
        errors.push('At least one module must be selected');
    }
    if (unitIds?.length === 0) {
        errors.push('At least one unit must be selected');
    }
    if (locationIds?.length === 0) {
        errors.push('At least one location must be selected');
    }
    if (errors.length > 0) {
        res.status(400).json({ valid: false, errors });
        return;
    }
    next();
};
exports.validateFilterPayload = validateFilterPayload;
