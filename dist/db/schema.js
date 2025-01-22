"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modules = exports.units = exports.locations = exports.moduleUnitMapping = exports.unitLocationMapping = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
/** This is Drizzle ORM schema that represents our DB tables structure.
 * Investigate it cause it will be helpful for you to understand our DB structure
 */
// The table for mapping units to locations
exports.unitLocationMapping = (0, sqlite_core_1.sqliteTable)('unit_locations', {
    unitId: (0, sqlite_core_1.integer)('unit_id'),
    locationId: (0, sqlite_core_1.integer)('location_id'),
});
// The table for mapping modules to units
exports.moduleUnitMapping = (0, sqlite_core_1.sqliteTable)('module_units', {
    moduleId: (0, sqlite_core_1.integer)('module_id'),
    unitId: (0, sqlite_core_1.integer)('unit_id'),
});
// The locations/units table
exports.locations = (0, sqlite_core_1.sqliteTable)('locations', {
    id: (0, sqlite_core_1.integer)('id').primaryKey(),
    name: (0, sqlite_core_1.text)('name'),
});
// The units table
exports.units = (0, sqlite_core_1.sqliteTable)('units', {
    id: (0, sqlite_core_1.integer)('id').primaryKey(),
    name: (0, sqlite_core_1.text)('name'),
});
// The modules table
exports.modules = (0, sqlite_core_1.sqliteTable)('modules', {
    id: (0, sqlite_core_1.integer)('id').primaryKey(),
    title: (0, sqlite_core_1.text)('title'),
});
