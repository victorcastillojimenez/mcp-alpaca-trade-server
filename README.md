# mcp-alpaca-trade-server

Servidor MCP para la API de Alpaca Markets, generado con el Postman MCP Generator
y configurado sobre el entorno de **paper trading** (simulación sin dinero real).
Expone 6 herramientas que permiten a Claude Desktop u otro cliente MCP compatible
interactuar con una cuenta de trading algorítmico simulado.

> **Aviso:** Este proyecto opera exclusivamente sobre la API de paper trading de Alpaca
> (`paper-api.alpaca.markets`). No involucra dinero real.
> No cambies `pan_mcp_base_url` a la API de producción: la herramienta `create_an_order`
> enviaría órdenes con dinero real.
> Este repositorio es un ejercicio técnico y **no constituye asesoramiento financiero**.

Desarrollado durante el Curso de Especialización en IA y Big Data — Instituto Nebrija (2026).

## Qué hace

Traduce operaciones de trading en herramientas MCP invocables desde cualquier cliente
compatible (Claude Desktop, Postman, etc.) sin necesidad de escribir código adicional.
Cada herramienta mapea directamente a un endpoint de la API REST de Alpaca v2.

## Herramientas disponibles

| Herramienta MCP | Endpoint Alpaca | Descripción |
|---|---|---|
| `get_account` | GET /v2/account | Información de la cuenta: saldo, poder de compra, estado |
| `all_open_positions` | GET /v2/positions | Lista todas las posiciones abiertas |
| `get_an_open_position` | GET /v2/positions/{symbol} | Detalle de una posición concreta por ticker |
| `create_an_order` | POST /v2/orders | Crea una orden (market, limit, stop, etc.) — solo paper trading |
| `create_watchlist` | POST /v2/watchlists | Crea una lista de seguimiento de activos |
| `get_an_asset_by_id_or_symbol` | GET /v2/assets/{symbol_or_id} | Datos de un activo por ticker o ID |

## Stack

| Componente | Tecnología |
|---|---|
| Servidor MCP | Node.js >= 18, @modelcontextprotocol/sdk ^1.17 |
| Ejecución de peticiones | postman-runtime ^7.36 (mismo motor que Postman Desktop) |
| Transporte | stdio (por defecto), SSE (`--sse`), Streamable HTTP (`--streamable-http`) |
| Contenerización | Docker (node:22.12-alpine) |
| API de trading | Alpaca Markets v2 — paper trading |

## Requisitos previos

- Node.js >= 18 (recomendado >= 20)
- Cuenta gratuita en Alpaca Markets con claves de paper trading
  (no se requiere depositar dinero real)

## Configuración

```bash
cp .env.example .env
# Edita .env y añade tus claves de paper trading de Alpaca
```

```
pan_mcp_apca_api_key_id=      # API Key ID de tu cuenta paper
pan_mcp_apca_api_secret_key=  # Secret Key de tu cuenta paper
pan_mcp_base_url=https://paper-api.alpaca.markets
```

Las claves de paper trading se obtienen gratuitamente en el panel de Alpaca.

## Cómo ejecutarlo

```bash
# 1. Instalar dependencias
npm install

# 2. Modo stdio — compatible con Claude Desktop (por defecto)
node mcpServer.js

# 3. Modo SSE — servidor HTTP con endpoint /sse (puerto 3001 por defecto)
node mcpServer.js --sse

# 4. Modo Streamable HTTP — endpoint POST /mcp (puerto 3001 por defecto)
node mcpServer.js --streamable-http

# 5. Listar todas las herramientas disponibles
node index.js tools
```

## Conectar a Claude Desktop

Añade esta entrada en `claude_desktop_config.json`
(en Windows: `%APPDATA%\Claude\claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "alpaca-paper": {
      "command": "node",
      "args": ["C:/ruta/al/proyecto/mcpServer.js"]
    }
  }
}
```

Sustituye `C:/ruta/al/proyecto` por la ruta absoluta al repositorio clonado.
Reinicia Claude Desktop tras añadir la configuración.

## Despliegue con Docker

```bash
# Construir imagen
docker build -t mcp-alpaca-trade-server .

# Ejecutar (las variables de entorno se pasan desde .env)
docker run -i --rm --env-file=.env mcp-alpaca-trade-server
```

## Qué demuestra este proyecto

- Integración de un servidor MCP con una API REST de terceros mediante postman-runtime
- Uso del Model Context Protocol con tres modos de transporte: stdio, SSE y Streamable HTTP
- Despliegue contenerizado con Docker
- Gestión de autenticación por cabeceras HTTP en herramientas MCP

## Sobre el código

Este servidor fue generado con la herramienta Postman MCP Generator (licencia MIT,
Postman Inc.) a partir de una colección de Postman con los endpoints de la API de Alpaca.
Seleccioné los 6 endpoints y configuré el servidor para el entorno de paper trading.

## Aviso legal

Este proyecto es un ejercicio técnico desarrollado durante el Curso de Especialización
en IA y Big Data (Instituto Nebrija). Opera únicamente sobre la API de paper trading
de Alpaca (simulación). No constituye asesoramiento financiero ni recomendación
de inversión de ningún tipo.

## Autor

Victor Castillo Jiménez
