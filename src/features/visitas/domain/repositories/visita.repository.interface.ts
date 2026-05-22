import { IVisita } from '../entities/visita.entity';

export interface IVisitaRepository {
  findAll(): Promise<IVisita[]>;
  findById(id: string): Promise<IVisita | null>;
  create(data: Omit<IVisita, 'id'>): Promise<IVisita>;
  update(id: string, data: Partial<IVisita>): Promise<IVisita | null>;
  delete(id: string): Promise<boolean>;
}
