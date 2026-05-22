import { ICliente } from '../../domain/entities/cliente.entity';
import { IClienteRepository } from '../../domain/repositories/cliente.repository.interface';

export class UpdateClienteUseCase {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  execute(id: string, data: Partial<Omit<ICliente, 'id'>>): Promise<ICliente | null> {
    return this.clienteRepository.update(id, data);
  }
}
