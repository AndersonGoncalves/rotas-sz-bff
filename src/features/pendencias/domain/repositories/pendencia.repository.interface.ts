import { IPendencia } from '../entities/pendencia.entity';

export interface IPendenciaRepository {
  findAll(importado?: boolean): Promise<IPendencia[]>;
  findById(id: string): Promise<IPendencia | null>;
  create(data: Omit<IPendencia, 'id'>): Promise<IPendencia>;
  update(id: string, data: Partial<Omit<IPendencia, 'id'>>): Promise<IPendencia | null>;
  delete(id: string): Promise<boolean>;
}
