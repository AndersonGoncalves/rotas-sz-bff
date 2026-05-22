import * as restify from 'restify';
import { MongooseConnection } from '../database/mongoose.connection';
import { handleError } from './error.handler';
import { BaseRouter } from '../router/base.router';
import { environment } from '../config/environment';

export class Server {
  application!: restify.Server;

  private initializeServer(): void {
    this.application = restify.createServer({ name: 'rotas-sz-bff' });

    this.application.use(restify.plugins.queryParser());
    this.application.use(restify.plugins.bodyParser());

    // CORS headers para permitir chamadas do app Flutter (web)
    this.application.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
      return next();
    });

    this.application.opts('.*', (req, res, next) => {
      res.send(200);
      return next();
    });

    this.application.on('restifyError', handleError);
  }

  private initializeRoutes(controllers: BaseRouter[]): void {
    controllers.forEach((controller) => {
      controller.applyRoutes(this.application);
    });
  }

  bootstrap(controllers: BaseRouter[]): Promise<Server> {
    this.initializeServer();
    this.initializeRoutes(controllers);

    const db = new MongooseConnection();
    return db
      .connect()
      .then(() => {
        console.log(`[DB] Conectado ao MongoDB: ${environment.db.url}`);
        return new Promise<Server>((resolve) => {
          this.application.listen(environment.server.port, () => {
            console.log(`[Server] ${this.application.name} rodando na porta ${environment.server.port}`);
            resolve(this);
          });
        });
      })
      .catch((err) => {
        console.error('[DB] Erro ao conectar ao MongoDB:', err);
        throw err;
      });
  }
}
