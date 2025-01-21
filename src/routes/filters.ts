import express, { Router } from 'express';
import { FilterHandler } from '../handlers/filterHandler';

export const createFilterRouter = (filterHandler: FilterHandler): Router => {
  const router = Router();
  /** Write you routes here */


  // Fetch all available modules
  router.get('/modules', filterHandler.getModules);

  // Fetch available units based on selected modules
  router.get('/units', filterHandler.getUnits);

  // Fetch available locations based on selected modules and units
  router.get('/locations', filterHandler.getLocations.bind(filterHandler));


  router.post("/validate", (req, res, next) => {
    console.log("Received request at /validate");
    console.log("Request body:", req.body);
    next(); // 继续到 FilterHandler.validateFilters 方法
  }, filterHandler.validateFilters.bind(filterHandler));
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
