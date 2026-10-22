/**
 * Places a new order for the account, supporting various order types and assets. Requires env vars: apca_api_key_id, apca_api_secret_key, base_url
 * 
 * This tool uses postman-runtime to execute the request,
 * ensuring full compatibility with Postman collections.
 */
import { executeRequest } from '../../../lib/postmanExecutor.js';

// Original Postman request definition
const requestDefinition = {
  "name": "Create an Order",
  "request": {
    "method": "POST",
    "url": {
      "raw": "{{pan_mcp_base_url}}/v2/orders",
      "host": [
        "{{pan_mcp_base_url}}"
      ],
      "path": [
        "v2",
        "orders"
      ]
    },
    "header": [
      {
        "key": "Content-Type",
        "value": "application/json"
      },
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
    "body": {
      "mode": "raw",
      "raw": "{\n  \"symbol\": \"AAPL\",\n  \"qty\": \"2\",\n  \"side\": \"buy\",\n  \"type\": \"limit\",\n  \"limit_price\": \"150\",\n  \"time_in_force\": \"gtc\"\n}",
      "options": {
        "raw": {
          "headerFamily": "json",
          "language": "json"
        }
      }
    },
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
 * Tool definition for Create an Order
 */
export const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_an_order',
      description: 'Places a new order for the account, supporting various order types and assets. Requires env vars: apca_api_key_id, apca_api_secret_key, base_url',
      parameters: {
        type: 'object',
        properties: {

        },
        required: []
      }
    }
  }
};
