import { Request, Response } from 'express';
import { FilterRepository } from '../repositories/filterRepository';
import {
  FilterValidationBody,
  ModuleResponse,
  UnitResponse,
  LocationResponse,
  ValidationResponse,
} from '../types';

export class FilterHandler {
  constructor(private repository: any) { }

  getModules = async (req: Request, res: Response): Promise<void> => {
    try {
      const moduleIds = this.parseQueryParam(req.query.moduleIds as string | string[]);
      console.log("Parsed moduleIds:", moduleIds);

      const modules = await this.repository.getModules(moduleIds);
      res.json({ modules });
    } catch (error) {
      console.error("Error fetching modules:", error);
      res.status(500).json({ error: "Failed to fetch modules" });
    }
  };

  getUnits = async (req: Request, res: Response): Promise<void> => {
    try {
      const moduleIds = this.parseQueryParam(req.query.moduleIds as string | string[]);
      const unitIds = this.parseQueryParam(req.query.unitIds as string | string[]);
      console.log("Parsed moduleIds:", moduleIds);
      console.log("Parsed unitIds:", unitIds);

      const units = await this.repository.getUnits(moduleIds, unitIds);
      res.json({ units });
    } catch (error) {
      console.error("Error fetching units:", error);
      res.status(500).json({ error: "Failed to fetch units" });
    }
  };

  getLocations = async (req: Request, res: Response): Promise<void> => {
    try {
      const moduleIds = this.parseQueryParam(req.query.moduleIds as string | string[]);
      const unitIds = this.parseQueryParam(req.query.unitIds as string | string[]);
      console.log("Parsed moduleIds:", moduleIds);
      console.log("Parsed unitIds:", unitIds);

      const locations = await this.repository.getLocations(moduleIds, unitIds);
      res.json({ locations });
    } catch (error) {
      console.error("Error fetching locations:", error);
      res.status(500).json({ error: "Failed to fetch locations" });
    }
  };

  private parseQueryParam(param: string | string[]): string[] {
    if (!param) return [];
    return Array.isArray(param) ? param : param.split(",");
  }


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
