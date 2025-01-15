# Backend Technical Challenge: Dynamic Filter System

## Overview
Create a backend service for a dynamic filtering system that manages the relationships between modules, units, and locations. The system should provide endpoints for fetching available filter options based on previous selections and validate filter combinations. SO for instance if you select Modules with id 1 and 3 they maybe only available in Units 2 and 7. Same for locations, cause Unit 2 and 7 might be only available in locations 3 and 5. So make endpoints and queries to fetch correct list of modules, units and locations filters based on the provided selected filters. When you click Apply filters button you should call POST method endpoint (/api/filters/validate) that is already provided here in the repository, that we wrote to check validity of the provided filter ids.

## Technical Requirements

### Technology Stack
- Node.js
- Express.js
- TypeScript
- SQLite
- Drizzle ORM

### Database Structure
The SQLite database consists of the following tables:
- Modules (id, title)
- Units (id, name)
- Locations (id, name)
- Module-Unit mappings (module_id, unit_id)
- Unit-Location mappings (unit_id, location_id)

### Required API Endpoints

#### 1. GET /api/filters/modules
Fetch all available modules
- Response: `{ modules: Array<{ id: number, title: string }> }`

#### 2. GET /api/filters/units
Fetch available units based on selected modules
- Response: `{ units: Array<{ id: number, name: string }> }`

#### 3. GET /api/filters/locations
Fetch available locations based on selected modules and units
- Response: `{ locations: Array<{ id: number, name: string }> }`

#### 4. POST /api/filters/validate
Validate if the selected combination of filters is valid
- Request body:
```typescript
{
  moduleIds: number[];
  unitIds: number[];
  locationIds: number[];
}
```
- Response: `{ valid: boolean, errors?: string[] }`

### Implementation Requirements

#### 1. Database Queries
- Implement efficient SQL queries using Drizzle ORM
- Handle the bidirectional relationships between entities
- Optimize queries to avoid N+1 problems

#### 2. Type Safety
- Define proper TypeScript interfaces for all entities
- Implement type-safe database schema using Drizzle
- Ensure type safety in API request/response handling

#### 3. Error Handling
- Implement proper error handling for database operations
- Validate input parameters
- Return appropriate HTTP status codes
- Provide meaningful error messages

#### 4. Filter Backend Project Structure

```plaintext
filter-backend/
├── sqlite/                  # SQLite database directory
├── src/                    # Source code directory
│   ├── config/             # Configuration files
│   ├── db/                 # Database schemas and migrations
│   ├── handlers/           # Request handlers
│   ├── middleware/         # Express middleware
│   ├── repositories/       # Data access layer
│   ├── routes/            # Express routes
│   ├── types/             # TypeScript type definitions
│   └── index.ts           # Application entry point and dependency injection
├── .gitignore             # Git ignore configuration
├── .prettierignore        # Prettier ignore configuration
├── .prettierrc            # Prettier configuration
├── drizzle.config.ts      # Drizzle ORM configuration
├── package-lock.json      # NPM dependencies lock file
├── package.json           # Project configuration and dependencies
├── README.md              # Project documentation
└── tsconfig.json          # TypeScript configuration

### Example SQL Queries using Drizzle ORM

#### Check the validity of provided filters
```typescript
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
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Evaluation Criteria

### Required
- Proper TypeScript usage
- Efficient SQL queries
- Error handling
- Input validation
- API documentation

### Bonus Points
- Query optimization
- Performance considerations
- Documentation quality
- Code organization (some design pattern)

## Notes
- Focus on query optimization as the data relationships are complex
- Implement proper input validation for all endpoints
- Consider adding rate limiting for production use
- Document any assumptions made during implementation