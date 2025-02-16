import express, { Router } from 'express';
import { FilterHandler } from '../handlers/filterHandler';

export const createFilterRouter = (filterHandler: FilterHandler): Router => {
  const router = Router();
  /** Write you routes here */

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
