/**
 * Fetches all open positions for the account, including market value and cost basis. Requires env vars: apca_api_key_id, apca_api_secret_key, base_url
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "All Open Positions",
  "request": {
    "method": "GET",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v2/positions",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v2",
        "positions"
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
const executeFunction = async ({}) => {
  return executeRequest(requestDefinition, {}, collectionVariables);
};

/**
 * Tool definition for All Open Positions
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'all_open_positions',
      description: 'Fetches all open positions for the account, including market value and cost basis. Requires env vars: apca_api_key_id, apca_api_secret_key, base_url',
      parameters: {
        type: 'object',
        properties: {

        },
        required: []
      }
    }
  }
};
