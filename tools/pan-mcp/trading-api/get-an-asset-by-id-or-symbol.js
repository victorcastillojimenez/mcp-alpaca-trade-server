/**
 * Fetches details of a specific asset by symbol or asset ID. Requires env vars: apca_api_key_id, apca_api_secret_key, base_url
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Get an Asset by ID or Symbol",
  "request": {
    "method": "GET",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v2/assets/:symbol_or_asset_id",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v2",
        "assets",
        ":symbol_or_asset_id"
      ],
      "variable": [
        {
          "id": "eb8b22be-bd08-4eab-87b3-1cea4fb83748",
          "key": "symbol_or_asset_id",
          "value": "proident Ut",
          "description": "(Required) symbol or assetId"
        }
      ]
    },
    "header": [
      {
        "key": "Accept",
        "value": "application/json"
      },
      {
        "key": "Apca-Api-Key-Id",
        "value": "{{pan_mcp_apca_api_key_id}}",
        "type": "text"
      },
      {
        "key": "Apca-Api-Secret-Key",
        "value": "{{pan_mcp_apca_api_secret_key}}",
        "type": "text"
      }
    ],
    "body": null,
    "auth": {
      "type": "apikey",
      "apikey": [
        {
          "key": "value",
          "value": "{{pan_mcp_apca_api_secret_key}}",
          "type": "string"
        },
        {
          "key": "key",
          "value": "{{pan_mcp_apca_api_key_id}}",
          "type": "string"
        }
      ]
    }
  }
};

// Collection variables (will be merged with environment)
const collectionVariables = [
  {
    "key": "baseUrl",
    "value": "https://paper-api.alpaca.markets"
  }
];

/**
 * Executes the API request
 *
 * @param {Object} args - Function arguments
 * @returns {Promise<Object>} API response
 */
const executeFunction = async ({ symbol_or_asset_id }) => {
  return executeRequest(requestDefinition, { symbol_or_asset_id }, collectionVariables);
};

/**
 * Tool definition for Get an Asset by ID or Symbol
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_an_asset_by_id_or_symbol',
      description: 'Fetches details of a specific asset by symbol or asset ID. Requires env vars: apca_api_key_id, apca_api_secret_key, base_url',
      parameters: {
        type: 'object',
        properties: {
          'symbol_or_asset_id': {
            type: 'string',
            description: 'The symbol_or_asset_id parameter'
          }
        },
        required: ['symbol_or_asset_id']
      }
    }
  }
};
