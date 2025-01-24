import { Request, Response, RequestHandler } from 'express';
import { FilterRepository } from '../repositories/filterRepository';
import {
  FilterValidationBody,
  ModuleResponse,
  UnitResponse,
  LocationResponse,
  ValidationResponse,
} from '../types';

export class FilterHandler {
  constructor(private repository: FilterRepository) { }

  /** HERE, you should write handlers to get modules, units and locations
   * BE AWARE, they are inter-dependent which means some units have certain modules and some locations have multiple units
   */

  /** Fetch all modules */
  getModules = async (req: Request, res: Response<ModuleResponse>) => {
    try {
      const modules = await this.repository.getAllModules();
      res.json({ modules });
    } catch (error) {
      console.error('Error fetching modules:', error);
      res.status(500).json({ modules: [] });
    }
  };

  /** Fetch units based on selected modules */
  getUnitsByFilters = async (req: Request, res: Response<UnitResponse>) => {
    try {
      const { moduleIds } = req.query;

      // Parse moduleIds from query string into an array of numbers
      const parsedModuleIds = moduleIds ? JSON.parse(moduleIds as string) : undefined;

      // Fetch units from the repository
      const units = await this.repository.getUnitsByFilters(parsedModuleIds);

      res.json({ units });
    } catch (error) {
      console.error('Error fetching units by filters:', error);
      res.status(500).json({ units: [] });
    }
  };

  /** Fetch locations based on selected modules and units */
  getLocationsByFilters = async (req: Request, res: Response<LocationResponse>) => {
    try {
      const { moduleIds, unitIds } = req.query;

      // Parse query parameters into arrays
      const parsedModuleIds = moduleIds ? JSON.parse(moduleIds as string) : undefined;
      const parsedUnitIds = unitIds ? JSON.parse(unitIds as string) : undefined;

      // Fetch locations from the repository
      const locations = await this.repository.getLocationsByFilters(
        parsedModuleIds,
        parsedUnitIds,
      );

      res.json({ locations });
    } catch (error) {
      console.error('Error fetching locations by filters:', error);
      res.status(500).json({ locations: [] });
    }
  };


  /** DO NOT CHANGE THIS HANDLER - this one checks you provided body payload of selected filters */
  validateFilters = async (
    req: Request,
    res: Response<ValidationResponse>,
  ): Promise<void> => {
    try {
      const { moduleIds, unitIds, locationIds } =
        req.body as FilterValidationBody;

      if (!moduleIds?.length || !unitIds?.length || !locationIds?.length) {
        res.status(400).json({
          valid: false,
          errors: [
            'All filter arrays (moduleIds, unitIds, locationIds) are required and must not be empty',
          ],
        });
        return;
      }

      const isValid = await this.repository.validateFilterCombination(
        moduleIds,
        unitIds,
        locationIds,
      );

      if (!isValid) {
        res.json({
          valid: false,
          errors: ['The selected combination of filters is not valid'],
        });
        return;
      }

      res.json({ valid: true });
    } catch (error) {
      console.error('Error validating filters:', error);
      res.status(500).json({
        valid: false,
        errors: ['An error occurred while validating filters'],
      });
    }
  };
}
