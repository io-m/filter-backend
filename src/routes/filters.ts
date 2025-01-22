import express, { Router } from 'express';
import { FilterHandler } from '../handlers/filterHandler';

export const createFilterRouter = (filterHandler: FilterHandler): Router => {
  const router = Router();
  /** Write you routes here */

  // Fetch available modules based on selected locations and units
  router.get('/modules', filterHandler.getModules);

  // Fetch available units based on selected modules and locations
  router.get('/units', filterHandler.getUnits);

  // Fetch available locations based on selected modules and units
  router.get('/locations', filterHandler.getLocations);


  /** DO NOT TOUCH THIS ROUTE - it checks your body payload to validate whether you fetched correct filters
 * body payload type --> 
 * export interface FilterValidationRequest {
    moduleIds: number[];
    unitIds: number[];
    locationIds: number[];
   }
*/
  router.post('/validate', filterHandler.validateFilters);

  return router;
};
