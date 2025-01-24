import { Request, Response } from 'express';
import { FilterService } from '../services/filterService';

export class FilterController {
  constructor(private service: FilterService) { }

  /** Fetch all modules */
  getModules = async (req: Request, res: Response) => {
    try {
      const modules = await this.service.getAllModules();
      res.json({ modules });
    } catch (error) {
      console.error('Error fetching modules:', error);
      res.status(500).json({ modules: [] });
    }
  };

  /** Fetch units based on selected modules */
  getUnitsByModules = async (req: Request, res: Response) => {
    try {
      const { moduleIds } = req.query;
      const parsedModuleIds = moduleIds ? JSON.parse(moduleIds as string) : undefined;
      const units = await this.service.getUnitsByModules(parsedModuleIds);
      res.json({ units });
    } catch (error) {
      console.error('Error fetching units:', error);
      res.status(500).json({ units: [] });
    }
  };

  /** Fetch locations based on filters */
  getLocationsByFilters = async (req: Request, res: Response) => {
    try {
      const { moduleIds, unitIds } = req.query;
      const parsedModuleIds = moduleIds ? JSON.parse(moduleIds as string) : undefined;
      const parsedUnitIds = unitIds ? JSON.parse(unitIds as string) : undefined;
      const locations = await this.service.getLocationsByFilters(parsedModuleIds, parsedUnitIds);
      res.json({ locations });
    } catch (error) {
      console.error('Error fetching locations:', error);
      res.status(500).json({ locations: [] });
    }
  };

  /** Validate filters */
  validateFilters = async (req: Request, res: Response) => {
    try {
      const { moduleIds, unitIds, locationIds } = req.body;
      const isValid = await this.service.validateFilters(moduleIds, unitIds, locationIds);
      res.json({ valid: isValid });
    } catch (error) {
      console.error('Error validating filters:', error);
      res.status(500).json({ valid: false });
    }
  };
}
