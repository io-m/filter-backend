import express from 'express';
import { db } from '../config/database';
import { FilterRepository } from '../repositories/filterRepository';
import { FilterService } from '../services/filterService';
import { FilterController } from '../controllers/filterController';

// Dependency Injection
const repository = new FilterRepository(db);
const service = new FilterService(repository);
const controller = new FilterController(service);

const router = express.Router();

// Routes
router.get('/modules', controller.getModules);
router.get('/units', controller.getUnitsByModules);
router.get('/locations', controller.getLocationsByFilters);
router.post('/validate', controller.validateFilters);

export default router;
