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
};

export default swaggerPaths;
