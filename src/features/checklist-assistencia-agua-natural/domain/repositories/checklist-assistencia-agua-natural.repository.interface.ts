import { IChecklistAssistenciaAguaNatural } from '../entities/checklist-assistencia-agua-natural.entity';

export interface IChecklistAssistenciaAguaNaturalRepository {
  findAll(): Promise<IChecklistAssistenciaAguaNatural[]>;
  findById(id: string): Promise<IChecklistAssistenciaAguaNatural | null>;
  create(data: Omit<IChecklistAssistenciaAguaNatural, 'id'>): Promise<IChecklistAssistenciaAguaNatural>;
  update(id: string, data: Partial<Omit<IChecklistAssistenciaAguaNatural, 'id'>>): Promise<IChecklistAssistenciaAguaNatural | null>;
}
