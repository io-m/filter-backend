const swaggerPaths = {
  '/api/filters/modules': {
    get: {
      summary: 'Fetch all modules',
      responses: {
        200: {
          description: 'List of all modules',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  modules: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'integer',
                          description: 'Module ID',
                        },
                        title: {
                          type: 'string',
                          description: 'Module title',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/filters/units': {
    get: {
      summary: 'Fetch available units based on selected modules',
      parameters: [
        {
          in: 'query',
          name: 'moduleIds',
          schema: {
            type: 'string',
            example: '[1,2]', // JSON-style array example
          },
          required: true,
          description: 'List of module IDs in JSON array format (e.g., [1,2])',
        },
      ],
      responses: {
        200: {
          description: 'List of filtered units',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  units: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'integer',
                          description: 'Unit ID',
                        },
                        name: {
                          type: 'string',
                          description: 'Unit Name',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Invalid request',
        },
      },
    },
  },
  '/api/filters/locations': {
    get: {
      summary: 'Fetch available locations based on selected modules and units',
      parameters: [
        {
          in: 'query',
          name: 'moduleIds',
          schema: {
            type: 'string',
            example: '[1,2]', // JSON-style array example
          },
          required: false,
          description: 'List of module IDs in JSON array format (e.g., [1,2])',
        },
        {
          in: 'query',
          name: 'unitIds',
          schema: {
            type: 'string',
            example: '[3,4]', // JSON-style array example
          },
          required: false,
          description: 'List of unit IDs in JSON array format (e.g., [3,4])',
        },
      ],
      responses: {
        200: {
          description: 'List of filtered locations',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  locations: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'integer',
                          description: 'Location ID',
                        },
                        name: {
                          type: 'string',
                          description: 'Location Name',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/filters/validate': {
    post: {
      summary: 'Validate the selected combination of filters',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                moduleIds: {
                  type: 'array',
                  items: {
                    type: 'integer',
                  },
                  description: 'Array of module IDs',
                },
                unitIds: {
                  type: 'array',
                  items: {
                    type: 'integer',
                  },
                  description: 'Array of unit IDs',
                },
                locationIds: {
                  type: 'array',
                  items: {
                    type: 'integer',
                  },
                  description: 'Array of location IDs',
                },
              },
              required: ['moduleIds', 'unitIds', 'locationIds'], // Required fields
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Validation result of the selected filters',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  valid: {
                    type: 'boolean',
                    description: 'Whether the filter combination is valid',
                  },
                  errors: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'List of validation errors, if any',
                  },
                },
              },
            },
          },
        },
        400: {
          description: 'Invalid request payload',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  valid: {
                    type: 'boolean',
                    description: 'Always false for invalid requests',
                  },
                  errors: {
                    type: 'array',
                    items: {
                      type: 'string',
                    },
                    description: 'List of errors describing what is invalid',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default swaggerPaths;
