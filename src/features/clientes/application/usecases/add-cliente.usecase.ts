import { ICliente } from '../../domain/entities/cliente.entity';
import { IClienteRepository } from '../../domain/repositories/cliente.repository.interface';

export class AddClienteUseCase {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  execute(data: Omit<ICliente, 'id'>): Promise<ICliente> {
    return this.clienteRepository.create(data);
  }
}
