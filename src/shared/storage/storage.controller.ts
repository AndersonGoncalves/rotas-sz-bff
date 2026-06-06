import * as restify from 'restify';
import { BadRequestError, NotFoundError } from 'restify-errors';
import * as path from 'path';
import { BaseRouter } from '../router/base.router';
import { S3Service } from './s3.service';

export class StorageController extends BaseRouter {
  constructor(private readonly s3: S3Service) {
    super();
  }

  applyRoutes(application: restify.Server): void {
    // POST /storage/upload — recebe multipart/form-data com campo "file"
    application.post('/storage/upload', async (req, res, next) => {
      try {
        const file = (req as any).files?.file;
        if (!file) return next(new BadRequestError('Envie o arquivo no campo "file" como multipart/form-data'));

        const ext = path.extname(file.name || '');
        const key = `uploads/${Date.now()}${ext}`;
        const contentType = file.type || 'application/octet-stream';

        await this.s3.uploadFile(key, file.path, contentType);
        const url = await this.s3.getPresignedUrl(key);

        res.json(201, { key, url });
        return next();
      } catch (e) { return next(e); }
    });

    // GET /storage/presigned-url?key=uploads/... — retorna URL temporária de acesso
    application.get('/storage/presigned-url', async (req, res, next) => {
      try {
        const key = req.query.key as string;
        if (!key) return next(new BadRequestError('Parâmetro "key" é obrigatório'));

        const url = await this.s3.getPresignedUrl(key);
        res.json({ key, url });
        return next();
      } catch (e) { return next(e); }
    });

    // DELETE /storage?key=uploads/... — remove o arquivo do S3
    application.del('/storage', async (req, res, next) => {
      try {
        const key = req.query.key as string;
        if (!key) return next(new BadRequestError('Parâmetro "key" é obrigatório'));

        await this.s3.deleteFile(key);
        res.send(204);
        return next();
      } catch (e) { return next(e); }
    });
  }
}
