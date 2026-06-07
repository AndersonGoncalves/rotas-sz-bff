import { IChecklistAssistencia } from '../../domain/entities/checklist-assistencia.entity';
import { IChecklistAssistenciaRepository } from '../../domain/repositories/checklist-assistencia.repository.interface';
import { ChecklistAssistenciaModel } from '../models/checklist-assistencia.mongoose.model';

export class ChecklistAssistenciaMongooseRepository implements IChecklistAssistenciaRepository {
  private toEntity(doc: any): IChecklistAssistencia {
    return {
      id: doc._id.toString(),
      pedidoId: doc.pedidoId,
      codigoCliente: doc.codigoCliente,
      idCliente: doc.idCliente,
      nomeCliente: doc.nomeCliente,
      numeroSerie: doc.numeroSerie,
      modelo: doc.modelo,
      botaoAguaGelada: doc.botaoAguaGelada,
      botaoAguaGeladaFuncionando: doc.botaoAguaGeladaFuncionando,
      botaoAguaNatural: doc.botaoAguaNatural,
      botaoAguaNaturalFuncionando: doc.botaoAguaNaturalFuncionando,
      painelSemTrinca: doc.painelSemTrinca,
      painelSemViolacaoEncaixes: doc.painelSemViolacaoEncaixes,
      painelComAdesivoFrontal: doc.painelComAdesivoFrontal,
      painelComColoracaoAmarelado: doc.painelComColoracaoAmarelado,
      torneiraPingando: doc.torneiraPingando,
      torneiraComPoucoVazao: doc.torneiraComPoucoVazao,
      semATorneira: doc.semATorneira,
      comAPingadeira: doc.comAPingadeira,
      pingadeiraAmassada: doc.pingadeiraAmassada,
      pingadeiraSemGrade: doc.pingadeiraSemGrade,
      pingadeiraArranhada: doc.pingadeiraArranhada,
      gabineteComFerrugem: doc.gabineteComFerrugem,
      pinturaDesgastada: doc.pinturaDesgastada,
      amassadoNoGabinete: doc.amassadoNoGabinete,
      gabineteComCaixaEletrica: doc.gabineteComCaixaEletrica,
      ausenciaFiltroCompartimento: doc.ausenciaFiltroCompartimento,
      ausenciaTampaCompartimento: doc.ausenciaTampaCompartimento,
      ausenciaEngate: doc.ausenciaEngate,
      violacaoEncaixeCompartimento: doc.violacaoEncaixeCompartimento,
      contemTodosPedais: doc.contemTodosPedais,
      condensadorSemArranhoes: doc.condensadorSemArranhoes,
      condensadorSemAmassado: doc.condensadorSemAmassado,
      condensadorSemFerrugem: doc.condensadorSemFerrugem,
      compressorSemBarulho: doc.compressorSemBarulho,
      caboCortado: doc.caboCortado,
      plugMachoTrocado: doc.plugMachoTrocado,
      caboResecado: doc.caboResecado,
      maisInformacoes: doc.maisInformacoes,
      descricaoDoDefeito: doc.descricaoDoDefeito,
      dataChecklist: doc.dataChecklist,
      importado: doc.importado,
    };
  }

  async findAll(importado?: boolean): Promise<IChecklistAssistencia[]> {
    const query: any = {};
    if (importado !== undefined) {
      query.importado = importado === false ? { $ne: true } : true;
    }
    const docs = await ChecklistAssistenciaModel.find(query).sort({ dataChecklist: -1 });
    return docs.map((d) => this.toEntity(d));
  }

  async findById(id: string): Promise<IChecklistAssistencia | null> {
    const doc = await ChecklistAssistenciaModel.findById(id);
    return doc ? this.toEntity(doc) : null;
  }

  async create(data: Omit<IChecklistAssistencia, 'id'>): Promise<IChecklistAssistencia> {
    const doc = new ChecklistAssistenciaModel(data);
    const saved = await doc.save();
    return this.toEntity(saved);
  }

  async update(
    id: string,
    data: Partial<Omit<IChecklistAssistencia, 'id'>>,
  ): Promise<IChecklistAssistencia | null> {
    const doc = await ChecklistAssistenciaModel.findByIdAndUpdate(id, data, {
      runValidators: true,
      new: true,
    });
    return doc ? this.toEntity(doc) : null;
  }
}
