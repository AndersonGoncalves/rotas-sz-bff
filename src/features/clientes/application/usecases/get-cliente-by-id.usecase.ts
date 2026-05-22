import { ICliente } from '../../domain/entities/cliente.entity';
import { IClienteRepository } from '../../domain/repositories/cliente.repository.interface';

export class GetClienteByIdUseCase {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  execute(id: string): Promise<ICliente | null> {
    return this.clienteRepository.findById(id);
  }
}
