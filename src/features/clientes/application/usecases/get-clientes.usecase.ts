import { ICliente } from '../../domain/entities/cliente.entity';
import { IClienteRepository } from '../../domain/repositories/cliente.repository.interface';

export class GetClientesUseCase {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  execute(): Promise<ICliente[]> {
    return this.clienteRepository.findAll();
  }
}
