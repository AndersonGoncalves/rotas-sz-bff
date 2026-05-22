import mongoose from 'mongoose';
import { environment } from '../config/environment';

export class MongooseConnection {
  connect(): Promise<typeof mongoose> {
    mongoose.set('strictQuery', true);
    return mongoose.connect(environment.db.url);
  }
}
