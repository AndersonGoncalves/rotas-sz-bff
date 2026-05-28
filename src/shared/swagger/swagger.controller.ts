import * as restify from 'restify';
import { BaseRouter } from '../router/base.router';
import { swaggerSpec } from './swagger.spec';

const swaggerHtml = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Rotas SZ BFF - API Docs</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css">
</head>
<body>
<div id="swagger-ui"></div>
<script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
<script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>
<script>
window.onload = function () {
  SwaggerUIBundle({
    url: '/swagger.json',
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    layout: 'StandaloneLayout',
  });
};
</script>
</body>
</html>`;

export class SwaggerController extends BaseRouter {
  applyRoutes(application: restify.Server): void {
    application.get('/swagger.json', (_req, res, next) => {
      res.json(swaggerSpec);
      return next();
    });

    application.get('/docs', (_req, res, next) => {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.sendRaw(200, swaggerHtml);
      return next();
    });
  }
}
