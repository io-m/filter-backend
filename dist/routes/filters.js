"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFilterRouter = void 0;
const express_1 = require("express");
const createFilterRouter = (filterHandler) => {
  const router = (0, express_1.Router)();
  /** Write you routes here */

  // Fetch all available modules
  router.get('/modules', filterHandler.getModules);
  // Fetch available units based on selected modules
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
exports.createFilterRouter = createFilterRouter;
