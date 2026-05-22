import * as restify from 'restify';
import { EventEmitter } from 'events';
import { NotFoundError } from 'restify-errors';

export abstract class BaseRouter extends EventEmitter {
  abstract applyRoutes(application: restify.Server): void;

  render(response: restify.Response, next: restify.Next) {
    return (document: any) => {
      if (document !== null && document !== undefined) {
        this.emit('beforeRender', document);
        response.json(document);
      } else {
        throw new NotFoundError('Registro não encontrado');
      }
      return next();
    };
  }
}
