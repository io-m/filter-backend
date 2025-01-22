"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterHandler = void 0;
class FilterHandler {
    constructor(repository) {
        this.repository = repository;
        /** HERE, you should write handlers to get modules, units and locations
         * BE AWARE, they are inter-dependent which means some units have certain modules and some locations have multiple units
         */
        // Handler to fetch all modules
        this.getModules = async (req, res) => {
            try {
                const modules = await this.repository.getModules();
                res.json({ modules });
            }
            catch (error) {
                console.error('Error fetching modules:', error);
                res.status(500).json({ modules: [], error: 'Failed to fetch modules' });
            }
        };
        // Handler to fetch units based on selected module IDs
        this.getUnits = async (req, res) => {
            try {
                const { moduleIds } = req.query;
                // Validate query parameter
                if (!moduleIds) {
                    res.status(400).json({ error: 'The "moduleIds" query parameter is required' });
                    return;
                }
                // Parse moduleIds to an array of numbers
                const moduleIdArray = Array.isArray(moduleIds) ? moduleIds.map(Number) : [Number(moduleIds)];
                // Fetch units from the repository
                const units = await this.repository.getUnitsByModuleIds(moduleIdArray);
                // Return the result
                res.json({ units });
            }
            catch (error) {
                console.error('Error fetching units:', error);
                res.status(500).json({ error: 'Failed to fetch units' });
            }
        };


        /** DO NOT CHANGE THIS HANDLER - this one checks you provided body payload of selected filters */
        this.validateFilters = async (req, res) => {
            try {
                const { moduleIds, unitIds, locationIds } = req.body;
                if (!moduleIds?.length || !unitIds?.length || !locationIds?.length) {
                    res.status(400).json({
                        valid: false,
                        errors: [
                            'All filter arrays (moduleIds, unitIds, locationIds) are required and must not be empty',
                        ],
                    });
                    return;
                }
                const isValid = await this.repository.validateFilterCombination(moduleIds, unitIds, locationIds);
                if (!isValid) {
                    res.json({
                        valid: false,
                        errors: ['The selected combination of filters is not valid'],
                    });
                    return;
                }
                res.json({ valid: true });
            }
            catch (error) {
                console.error('Error validating filters:', error);
                res.status(500).json({
                    valid: false,
                    errors: ['An error occurred while validating filters'],
                });
            }
        };
    }
}
exports.FilterHandler = FilterHandler;
