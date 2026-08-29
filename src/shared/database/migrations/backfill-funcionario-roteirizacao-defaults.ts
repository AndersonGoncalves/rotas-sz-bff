import { FuncionarioModel } from '../../../features/funcionarios/infra/models/funcionario.mongoose.model';

// Mesmos valores declarados como `default` no schema (ver
// funcionario.mongoose.model.ts) — o `default` do Mongoose só se aplica a
// documentos criados DAQUI PRA FRENTE, nunca retroage aos que já existiam
// no banco antes do campo ser adicionado ao schema. Mantido separado do
// schema (em vez de importar de lá) para não acoplar essa migração a uma
// mudança futura no default do schema — o valor gravado aqui é sempre o
// que valia no momento em que os campos de roteirização foram criados.
const DEFAULTS: Record<string, string | number> = {
  origemRotaPadrao: 'atual',
  enderecoEmpresaRota: 'Av. Duque de Caxias, 68, Centro Fortaleza - CE',
  destinoRotaPadrao: 'empresa',
  enderecoFinalRota: 'Av. Duque de Caxias, 68, Centro Fortaleza - CE',
  modoTransporteRota: 'moto',
  tempoMedioAtendimentoMinutos: 15,
  consumoMedioKmPorLitro: 10.0,
};

/**
 * Preenche com os valores padrão os campos de preferências de roteirização
 * dos funcionários cadastrados ANTES desses campos existirem no schema —
 * sem isso, eles ficariam com `null` pra sempre (o `default` do Mongoose
 * não retroage), e o gerente veria os campos em branco no cadastro do
 * funcionário em vez do padrão que o técnico já usava implicitamente.
 *
 * Roda a cada boot do BFF (chamada em `server.ts`), mas é idempotente: só
 * atualiza documentos onde o campo ainda não existe ou está `null`, então
 * depois da primeira execução vira uma consulta rápida sem nenhum efeito.
 */
export async function backfillFuncionarioRoteirizacaoDefaults(): Promise<void> {
  for (const [campo, valor] of Object.entries(DEFAULTS)) {
    const resultado = await FuncionarioModel.updateMany(
      { $or: [{ [campo]: { $exists: false } }, { [campo]: null }] },
      { $set: { [campo]: valor } },
    );
    if (resultado.modifiedCount > 0) {
      console.log(
        `[Migration] Funcionario.${campo}: ${resultado.modifiedCount} documento(s) preenchido(s) com o padrão "${valor}".`,
      );
    }
  }
}
