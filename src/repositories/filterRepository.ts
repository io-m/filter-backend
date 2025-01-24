import { and, eq, inArray, sql } from 'drizzle-orm';
import { Database } from '../types/database';
import {
  modules,
  units,
  locations,
  moduleUnitMapping,
  unitLocationMapping,
} from '../db/schema';
import { Module, Unit, Location } from '../types';

export class FilterRepository {
  constructor(private db: Database) { }

  /** Write you DB calls here */

  /** Fetch all modules */
  async getAllModules(): Promise<Module[]> {
    return this.db.select().from(modules);
  }

  /** Fetch units based on selected modules */
  async getUnitsByFilters(moduleIds?: number[]): Promise<Unit[]> {
    // If no moduleIds are provided, return an empty array
    if (!moduleIds || moduleIds.length === 0) {
      return [];
    }

    // Fetch unit IDs from the module-unit mapping table
    const unitMappings = await this.db
      .select({ unitId: moduleUnitMapping.unitId })
      .from(moduleUnitMapping)
      .where(inArray(moduleUnitMapping.moduleId, moduleIds));

    // Extract unit IDs and filter out null values
    const unitIds = unitMappings
      .map((row) => row.unitId)
      .filter((id): id is number => id !== null);

    if (unitIds.length === 0) {
      return [];
    }

    // Fetch and return all units matching the filtered unit IDs
    return this.db.select().from(units).where(inArray(units.id, unitIds));
  }

  /** Fetch locations based on selected modules and units */
  async getLocationsByFilters(
    moduleIds?: number[],
    unitIds?: number[],
  ): Promise<Location[]> {
    let filteredUnitIds: number[] = [];

    // If moduleIds are provided, fetch corresponding unitIds
    if (moduleIds && moduleIds.length > 0) {
      const moduleUnitMappings = await this.db
        .select({ unitId: moduleUnitMapping.unitId })
        .from(moduleUnitMapping)
        .where(inArray(moduleUnitMapping.moduleId, moduleIds));

      filteredUnitIds = moduleUnitMappings
        .map((row) => row.unitId)
        .filter((id): id is number => id !== null);
    }

    // If unitIds are provided, combine with filteredUnitIds
    if (unitIds && unitIds.length > 0) {
      filteredUnitIds = filteredUnitIds.length
        ? filteredUnitIds.filter((id) => unitIds.includes(id))
        : unitIds;
    }

    // If no unitIds remain, return an empty array
    if (filteredUnitIds.length === 0) {
      return [];
    }

    // Fetch locations based on the filtered unitIds
    const locationMappings = await this.db
      .select({ locationId: unitLocationMapping.locationId })
      .from(unitLocationMapping)
      .where(inArray(unitLocationMapping.unitId, filteredUnitIds));

    const locationIds = locationMappings
      .map((row) => row.locationId)
      .filter((id): id is number => id !== null);

    if (locationIds.length === 0) {
      return [];
    }

    return this.db
      .select()
      .from(locations)
      .where(inArray(locations.id, locationIds));
  }


  /** DO NOT TOUCH this DB call - it checks your provided filters combination and return whether it is valid or not */
  async validateFilterCombination(
    moduleIds: number[],
    unitIds: number[],
    locationIds: number[],
  ): Promise<boolean> {
    const validUnitsForModules = await this.db
      .select({ unitId: moduleUnitMapping.unitId })
      .from(moduleUnitMapping)
      .where(inArray(moduleUnitMapping.moduleId, moduleIds));

    const validUnitIds = validUnitsForModules.map(u => u.unitId);

    const areAllUnitsValid = unitIds.every(unitId =>
      validUnitIds.includes(unitId),
    );

    if (!areAllUnitsValid) return false;

    const validLocationsForUnits = await this.db
      .select({ locationId: unitLocationMapping.locationId })
      .from(unitLocationMapping)
      .where(inArray(unitLocationMapping.unitId, unitIds));

    const validLocationIds = validLocationsForUnits.map(l => l.locationId);

    const areAllLocationsValid = locationIds.every(locationId =>
      validLocationIds.includes(locationId),
    );

    return areAllLocationsValid;
  }
}
