import { FilterRepository } from '../repositories/filterRepository';

export class FilterService {
  constructor(private repository: FilterRepository) { }

  /** Fetch all modules */
  async getAllModules() {
    return this.repository.getAllModules();
  }

  /** Fetch units based on selected modules */
  async getUnitsByModules(moduleIds?: number[]) {
    return this.repository.getUnitsByFilters(moduleIds);
  }

  /** Fetch locations based on selected modules and units */
  async getLocationsByFilters(moduleIds?: number[], unitIds?: number[]) {
    return this.repository.getLocationsByFilters(moduleIds, unitIds);
  }

  /** Validate filter combinations */
  async validateFilters(moduleIds: number[], unitIds: number[], locationIds: number[]) {
    return this.repository.validateFilterCombination(moduleIds, unitIds, locationIds);
  }
}
