import { IClienteRepository } from '../../domain/repositories/cliente.repository.interface';

export class RemoveClienteUseCase {
  constructor(private readonly clienteRepository: IClienteRepository) {}

  execute(id: string): Promise<boolean> {
    return this.clienteRepository.delete(id);
  }
}
