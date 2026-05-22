import { IProdutosRecebido } from '../entities/produtos-recebido.entity';

export interface IProdutosRecebidoRepository {
  findAll(): Promise<IProdutosRecebido[]>;
  findById(id: string): Promise<IProdutosRecebido | null>;
  create(data: Omit<IProdutosRecebido, 'id'>): Promise<IProdutosRecebido>;
  update(id: string, data: Partial<Omit<IProdutosRecebido, 'id'>>): Promise<IProdutosRecebido | null>;
}
