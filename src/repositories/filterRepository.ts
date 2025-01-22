import { and, eq, inArray, sql } from "drizzle-orm";
import { Database } from "../types/database";
import {
  modules,
  units,
  locations,
  moduleUnitMapping,
  unitLocationMapping,
} from "../db/schema";
import { Module, Unit, Location } from "../types";

export class FilterRepository {
  constructor(private db: Database) { }

  /** Fetch modules */
  async getModules(unitIds?: number[], locationIds?: number[]): Promise<Module[]> {
    const results = await this.db
      .selectDistinct({ id: modules.id, title: modules.title })
      .from(modules)
      .innerJoin(moduleUnitMapping, eq(modules.id, moduleUnitMapping.moduleId))
      .innerJoin(unitLocationMapping, eq(moduleUnitMapping.unitId, unitLocationMapping.unitId))
      .where(
        and(
          unitIds?.length ? inArray(moduleUnitMapping.unitId, unitIds) : sql`1=1`,
          locationIds?.length ? inArray(unitLocationMapping.locationId, locationIds) : sql`1=1`
        )
      );

    return results.map((result) => ({
      id: result.id,
      title: result.title,
    }));
  }

  /** Fetch units */
  async getUnits(moduleIds?: number[], locationIds?: number[]): Promise<Unit[]> {
    const results = await this.db
      .selectDistinct({ id: units.id, name: units.name })
      .from(units)
      .innerJoin(moduleUnitMapping, eq(units.id, moduleUnitMapping.unitId))
      .innerJoin(unitLocationMapping, eq(moduleUnitMapping.unitId, unitLocationMapping.unitId))
      .where(
        and(
          moduleIds?.length ? inArray(moduleUnitMapping.moduleId, moduleIds) : sql`1=1`,
          locationIds?.length ? inArray(unitLocationMapping.locationId, locationIds) : sql`1=1`
        )
      );

    return results.map((result) => ({
      id: result.id,
      name: result.name,
    }));
  }

  /** Fetch locations */
  async getLocations(moduleIds?: number[], unitIds?: number[]): Promise<Location[]> {
    const results = await this.db
      .selectDistinct({ id: locations.id, name: locations.name })
      .from(locations)
      .innerJoin(unitLocationMapping, eq(locations.id, unitLocationMapping.locationId))
      .innerJoin(moduleUnitMapping, eq(unitLocationMapping.unitId, moduleUnitMapping.unitId))
      .where(
        and(
          moduleIds?.length ? inArray(moduleUnitMapping.moduleId, moduleIds) : sql`1=1`,
          unitIds?.length ? inArray(unitLocationMapping.unitId, unitIds) : sql`1=1`
        )
      );

    return results.map((result) => ({
      id: result.id,
      name: result.name,
    }));
  }

  /** Validate filter combination (kept as is) */
  async validateFilterCombination(
    moduleIds: number[],
    unitIds: number[],
    locationIds: number[]
  ): Promise<boolean> {
    const validUnitsForModules = await this.db
      .select({ unitId: moduleUnitMapping.unitId })
      .from(moduleUnitMapping)
      .where(inArray(moduleUnitMapping.moduleId, moduleIds));

    const validUnitIds = validUnitsForModules.map((u) => u.unitId);

    const areAllUnitsValid = unitIds.every((unitId) =>
      validUnitIds.includes(unitId)
    );

    if (!areAllUnitsValid) return false;

    const validLocationsForUnits = await this.db
      .select({ locationId: unitLocationMapping.locationId })
      .from(unitLocationMapping)
      .where(inArray(unitLocationMapping.unitId, unitIds));

    const validLocationIds = validLocationsForUnits.map((l) => l.locationId);

    const areAllLocationsValid = locationIds.every((locationId) =>
      validLocationIds.includes(locationId)
    );

    return areAllLocationsValid;
  }
}
