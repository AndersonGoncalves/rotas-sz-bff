import * as restify from 'restify';

export const handleError = (
  req: restify.Request,
  res: restify.Response,
  err: any,
  done: () => void,
) => {
  const defineToJSON = (fn: () => object) => {
    Object.defineProperty(err, 'toJSON', {
      value: fn,
      writable: true,
      configurable: true,
    });
  };

  defineToJSON(() => ({ message: err.message }));

  switch (err.name) {
    case 'MongoError':
    case 'MongoServerError':
      if (err.code === 11000) {
        err.statusCode = 409;
        defineToJSON(() => ({ message: 'Registro duplicado' }));
      }
      break;

    case 'ValidationError':
      err.statusCode = 400;
      const messages: any[] = [];
      for (const name in err.errors) {
        messages.push({ message: err.errors[name].message });
      }
      defineToJSON(() => ({ errors: messages }));
      break;

    case 'CastError':
      err.statusCode = 400;
      defineToJSON(() => ({ message: 'ID inválido' }));
      break;
  }

  return done();
};
