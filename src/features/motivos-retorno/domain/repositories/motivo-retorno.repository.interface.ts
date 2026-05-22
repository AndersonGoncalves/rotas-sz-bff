import { IMotivoRetorno } from '../entities/motivo-retorno.entity';

export interface IMotivoRetornoRepository {
  findAll(): Promise<IMotivoRetorno[]>;
  findById(id: string): Promise<IMotivoRetorno | null>;
  create(data: Omit<IMotivoRetorno, 'id'>): Promise<IMotivoRetorno>;
  update(id: string, data: Partial<Omit<IMotivoRetorno, 'id'>>): Promise<IMotivoRetorno | null>;
  delete(id: string): Promise<boolean>;
}
