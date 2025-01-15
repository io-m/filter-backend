// src/types/filters.ts
import { Request } from 'express';

export interface FilterValidationRequest {
  moduleIds: number[];
  unitIds: number[];
  locationIds: number[];
}

export interface FilterValidationResponse {
  valid: boolean;
  errors?: string[];
}

export type FilterValidationRequestHandler = Request<
  {},
  FilterValidationResponse,
  FilterValidationRequest
>;
