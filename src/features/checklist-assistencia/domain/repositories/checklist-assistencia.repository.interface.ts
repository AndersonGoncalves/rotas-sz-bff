import { IChecklistAssistencia } from '../entities/checklist-assistencia.entity';

export interface IChecklistAssistenciaRepository {
  findAll(): Promise<IChecklistAssistencia[]>;
  findById(id: string): Promise<IChecklistAssistencia | null>;
  create(data: Omit<IChecklistAssistencia, 'id'>): Promise<IChecklistAssistencia>;
  update(id: string, data: Partial<Omit<IChecklistAssistencia, 'id'>>): Promise<IChecklistAssistencia | null>;
}
