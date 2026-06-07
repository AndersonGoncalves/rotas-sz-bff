import { IChecklistAssistenciaAguaNatural } from '../../domain/entities/checklist-assistencia-agua-natural.entity';
import { IChecklistAssistenciaAguaNaturalRepository } from '../../domain/repositories/checklist-assistencia-agua-natural.repository.interface';
import { ChecklistAssistenciaAguaNaturalModel } from '../models/checklist-assistencia-agua-natural.mongoose.model';

export class ChecklistAssistenciaAguaNaturalMongooseRepository implements IChecklistAssistenciaAguaNaturalRepository {
  private toEntity(doc: any): IChecklistAssistenciaAguaNatural {
    return {
      id: doc._id.toString(),
      pedidoId: doc.pedidoId,
      codigoCliente: doc.codigoCliente,
      idCliente: doc.idCliente,
      nomeCliente: doc.nomeCliente,
      numeroSerie: doc.numeroSerie,
      modelo: doc.modelo,
      trincado: doc.trincado,
      volante: doc.volante,
      adesivoDesgastado: doc.adesivoDesgastado,
      amarelado: doc.amarelado,
      torneira: doc.torneira,
      rabicho: doc.rabicho,
      maisInformacoes: doc.maisInformacoes,
      descricaoDoDefeito: doc.descricaoDoDefeito,
      dataChecklist: doc.dataChecklist,
      importado: doc.importado,
    };
  }

  async findAll(importado?: boolean): Promise<IChecklistAssistenciaAguaNatural[]> {
    const query: any = {};
    if (importado !== undefined) {
      query.importado = importado === false ? { $ne: true } : true;
    }
    const docs = await ChecklistAssistenciaAguaNaturalModel.find(query).sort({ dataChecklist: -1 });
    return docs.map((d) => this.toEntity(d));
  }

  async findById(id: string): Promise<IChecklistAssistenciaAguaNatural | null> {
    const doc = await ChecklistAssistenciaAguaNaturalModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async create(
    data: Omit<IChecklistAssistenciaAguaNatural, 'id'>,
  ): Promise<IChecklistAssistenciaAguaNatural> {
    const doc = new ChecklistAssistenciaAguaNaturalModel(data);
    const saved = await doc.save();
    return this.toEntity(saved);
  }

  async update(
    id: string,
    data: Partial<Omit<IChecklistAssistenciaAguaNatural, 'id'>>,
  ): Promise<IChecklistAssistenciaAguaNatural | null> {
    const doc = await ChecklistAssistenciaAguaNaturalModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
    return doc ? this.toEntity(doc) : null;
  }
}
