import { IMotivoSituacao } from '../entities/motivo-situacao.entity';

export interface IMotivoSituacaoRepository {
  findAll(): Promise<IMotivoSituacao[]>;
  findById(id: string): Promise<IMotivoSituacao | null>;
  create(data: Omit<IMotivoSituacao, 'id'>): Promise<IMotivoSituacao>;
  update(id: string, data: Partial<Omit<IMotivoSituacao, 'id'>>): Promise<IMotivoSituacao | null>;
  delete(id: string): Promise<boolean>;
}
