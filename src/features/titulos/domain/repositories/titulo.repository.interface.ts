import { ITitulo } from '../entities/titulo.entity';

export interface ITituloRepository {
  findAll(month?: number, year?: number): Promise<ITitulo[]>;
  findById(id: string): Promise<ITitulo | null>;
  create(data: Omit<ITitulo, 'id'>): Promise<ITitulo>;
  updateByTpgCodigo(tpgCodigo: number, data: Partial<ITitulo>): Promise<ITitulo | null>;
  deleteByTpgCodigo(tpgCodigo: number): Promise<boolean>;
}
