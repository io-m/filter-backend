import { Request, Response } from 'express';

// Align with database schema types
export interface Module {
  id: number;
  title: string | null;
}

export interface Unit {
  id: number;
  name: string | null;
}

export interface Location {
  id: number;
  name: string | null;
}

export interface FilterValidationBody {
  moduleIds: number[];
  unitIds: number[];
  locationIds: number[];
}

// Response interfaces
export interface ModuleResponse {
  modules: Module[];
}

export interface UnitResponse {
  units: Unit[];
}

export interface LocationResponse {
  locations: Location[];
}

export interface ValidationResponse {
  valid: boolean;
  errors?: string[];
}
