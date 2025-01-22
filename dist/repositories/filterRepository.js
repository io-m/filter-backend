"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterRepository = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../db/schema");
class FilterRepository {
    constructor(db) {
        this.db = db;
    }
    /** Write you DB calls here */
    // Fetch all modules
    async getModules() {
        return await this.db.select().from(schema_1.modules);
    }
    // Fetch units based on selected module IDs
    async getUnitsByModuleIds(moduleIds) {
        return await this.db
            .select()
            .from(schema_1.units)
            .innerJoin(schema_1.moduleUnitMapping, (0, drizzle_orm_1.eq)(schema_1.units.id, schema_1.moduleUnitMapping.unitId))
            .where((0, drizzle_orm_1.inArray)(schema_1.moduleUnitMapping.moduleId, moduleIds))
            .then((results) => results.map((result) => result.units));
    }
    async getLocationsByModuleAndUnitIds(moduleIds, unitIds) {
        try {
            console.log('Fetching locations for modules:', moduleIds, 'and units:', unitIds);

            const results = await this.db
                .select({
                    id: schema_1.locations.id,
                    name: schema_1.locations.name,
                })
                .from(schema_1.locations)
                .innerJoin(
                    schema_1.unitLocationMapping,
                    drizzle_orm_1.eq(schema_1.locations.id, schema_1.unitLocationMapping.locationId)
                )
                .innerJoin(
                    schema_1.moduleUnitMapping,
                    drizzle_orm_1.eq(schema_1.unitLocationMapping.unitId, schema_1.moduleUnitMapping.unitId)
                )
                .where(
                    drizzle_orm_1.and(
                        drizzle_orm_1.inArray(schema_1.moduleUnitMapping.moduleId, moduleIds),
                        drizzle_orm_1.inArray(schema_1.unitLocationMapping.unitId, unitIds)
                    )
                )
                .distinct(); // Add this to prevent duplicates

            console.log('Query results:', results);

            return results;
        } catch (error) {
            console.error('Error in getLocationsByModuleAndUnitIds:', error.message, error.stack);
            throw error;
        }
    }

    /** DO NOT TOUCH this DB call - it checks your provided filters combination and return whether it is valid or not */
    async validateFilterCombination(moduleIds, unitIds, locationIds) {
        const validUnitsForModules = await this.db
            .select({ unitId: schema_1.moduleUnitMapping.unitId })
            .from(schema_1.moduleUnitMapping)
            .where((0, drizzle_orm_1.inArray)(schema_1.moduleUnitMapping.moduleId, moduleIds));
        const validUnitIds = validUnitsForModules.map(u => u.unitId);
        const areAllUnitsValid = unitIds.every(unitId => validUnitIds.includes(unitId));
        if (!areAllUnitsValid)
            return false;
        const validLocationsForUnits = await this.db
            .select({ locationId: schema_1.unitLocationMapping.locationId })
            .from(schema_1.unitLocationMapping)
            .where((0, drizzle_orm_1.inArray)(schema_1.unitLocationMapping.unitId, unitIds));
        const validLocationIds = validLocationsForUnits.map(l => l.locationId);
        const areAllLocationsValid = locationIds.every(locationId => validLocationIds.includes(locationId));
        return areAllLocationsValid;
    }
}
exports.FilterRepository = FilterRepository;
