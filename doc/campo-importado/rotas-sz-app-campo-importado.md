# Alterações no rotas-sz-app: Campo `importado` para Controle de Sincronização

## Contexto

Com a adição do campo `importado` no Firebase e na API, o app precisa de ajustes em dois pontos:

1. **Quando cria registros**: incluir `importado: false` explicitamente no dado enviado
2. **Quando atualiza registros via PUT**: preservar o valor atual de `importado` para não sobrescrevê-lo

Sem essas mudanças, registros criados pelo app sem o campo `importado` **nunca serão retornados** pelo filtro do SACI, pois o Firebase só retorna registros onde o campo existe e é explicitamente `false`.

---

## Por que o App Precisa Mudar

### Caminho Firebase (crítico)

O Firebase Realtime Database, ao receber uma query com `?orderBy="importado"&equalTo=false`, retorna **somente registros onde o campo `importado` existe e é explicitamente `false`**.

Se o app criar uma pendência sem o campo:
```json
// O que o app envia hoje:
{ "pedidoId": "abc", "pendencia": "RETORNO", "observacao": "..." }
```

O Firebase salva sem `importado`. A query do SACI não retorna esse registro. **O SACI nunca importa a pendência.**

Com a mudança:
```json
// O que o app deve passar a enviar:
{ "pedidoId": "abc", "pendencia": "RETORNO", "observacao": "...", "importado": false }
```

### Caminho API (menos crítico, mas recomendado)

Na API (rotas-sz-bff), o schema Mongoose tem `default: false`, então registros criados sem o campo já recebem `importado = false` automaticamente no banco. O risco aqui é menor, mas enviar o campo explicitamente é mais seguro e explícito.

---

## Records Criados pelo App (fluxo App → SACI)

Somente esses precisam de mudança — são os que o SACI precisa importar:

| Record | Endpoint Firebase | Endpoint API |
|---|---|---|
| Pendência | `PUT pendencia/{id}.json` | `POST /pendencia` |
| Checklist Assistência | `PUT checklistAssistencia/{id}.json` | `POST /checklist-assistencia` |
| Checklist Água Natural | `PUT checklistAssistenciaAguaNatural/{id}.json` | `POST /checklist-assistencia-agua-natural` |
| Produtos Entregue | `PUT produtosEntregue/{id}.json` | `POST /produtos-entregue` |
| Produtos Recebido | `PUT produtosRecebido/{id}.json` | `POST /produtos-recebido` |

> **Pedidos** fluem no sentido oposto (SACI → App) — o app apenas lê pedidos, não precisa controlar `importado` neles.

---

## Alterações Necessárias no App

### 1. Modelos Dart — Adicionar Campo `importado`

Em cada model/entity Dart correspondente às features acima, adicionar o campo:

```dart
// Exemplo para Pendencia:
class Pendencia {
  final String id;
  final String pedidoId;
  // ... campos existentes ...
  final bool importado; // NOVO

  const Pendencia({
    required this.id,
    required this.pedidoId,
    // ...
    this.importado = false, // NOVO — default false
  });

  factory Pendencia.fromMap(Map<String, dynamic> map) {
    return Pendencia(
      id: map['id'] ?? '',
      pedidoId: map['pedidoId'] ?? '',
      // ...
      importado: map['importado'] ?? false, // NOVO — fallback false para registros antigos
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'pedidoId': pedidoId,
      // ...
      'importado': importado, // NOVO
    };
  }
}
```

O mesmo padrão nos models de: `ChecklistAssistencia`, `ChecklistAssistenciaAguaNatural`, `ProdutosEntregue`, `ProdutosRecebido`.

---

### 2. Ao Criar Novos Registros — Definir `importado: false`

Onde o app monta o objeto antes de enviar ao Firebase ou à API, garantir que `importado` seja `false`:

```dart
// Exemplo ao criar pendência:
final pendencia = Pendencia(
  id: uuid.v4(),
  pedidoId: pedido.id,
  pendencia: 'RETORNO',
  observacao: observacaoController.text,
  importado: false, // NOVO — sempre false ao criar
);

// Ao enviar ao Firebase:
await firebaseRef.child('pendencia/${pendencia.id}').set(pendencia.toMap());

// Ao enviar à API:
await apiClient.post('/pendencia', body: pendencia.toMap());
```

---

### 3. Ao Atualizar Registros via PUT no Firebase — Preservar `importado`

Se em algum ponto o app atualiza um registro existente fazendo um PUT completo (substituição total do nó), o valor atual de `importado` precisa ser mantido. Caso contrário, um registro já marcado como `importado = true` pelo SACI seria sobrescrito sem o campo, e o SACI o importaria novamente.

```dart
// Ao atualizar um registro existente no Firebase:

// 1. Ler o registro atual para preservar importado
final snapshot = await firebaseRef.child('pendencia/$id').get();
final atual = Pendencia.fromMap(Map<String, dynamic>.from(snapshot.value as Map));

// 2. Montar o objeto atualizado preservando importado
final atualizado = Pendencia(
  id: atual.id,
  pedidoId: novosPedidoId,
  observacao: novaObservacao,
  importado: atual.importado, // PRESERVAR o valor atual
);

// 3. Enviar o PUT
await firebaseRef.child('pendencia/$id').set(atualizado.toMap());
```

> **Alternativa mais simples**: usar `update()` (PATCH no Firebase) em vez de `set()` (PUT), passando apenas os campos que realmente mudaram. Assim `importado` nunca é tocado:
> ```dart
> await firebaseRef.child('pendencia/$id').update({
>   'observacao': novaObservacao,
>   // importado não está aqui — não será alterado
> });
> ```

---

### 4. Leitura de Registros — Tratar Campo `importado` nas Respostas

Com as mudanças no BFF e no Firebase, as respostas passarão a incluir `importado`. Os modelos Dart precisam aceitar esse campo sem quebrar. O `map['importado'] ?? false` no `fromMap` já resolve isso (ver item 1).

Para pedidos especificamente: o app receberá pedidos com `importado` na resposta. O app deve simplesmente ignorar esse campo no fluxo de negócio — ele é um controle interno do SACI.

---

## Resumo das Mudanças

| Situação | Firebase | API (BFF) |
|---|---|---|
| Criar novo registro | **Obrigatório** incluir `importado: false` no body | Recomendado (schema já faz default) |
| Atualizar via PUT (full replace) | **Obrigatório** preservar `importado` atual | Não aplicável (BFF usa PATCH) |
| Atualizar via PATCH | Não precisa incluir `importado` | Não precisa incluir `importado` |
| Ler registros | Tratar campo opcional `importado` no `fromMap` | Tratar campo opcional `importado` no `fromMap` |

---

## Checklist de Implementação

- [ ] Adicionar `importado: bool` em `Pendencia` model (Dart)
- [ ] Adicionar `importado: bool` em `ChecklistAssistencia` model (Dart)
- [ ] Adicionar `importado: bool` em `ChecklistAssistenciaAguaNatural` model (Dart)
- [ ] Adicionar `importado: bool` em `ProdutosEntregue` model (Dart)
- [ ] Adicionar `importado: bool` em `ProdutosRecebido` model (Dart)
- [ ] Garantir `importado: false` ao criar pendência no Firebase/API
- [ ] Garantir `importado: false` ao criar checklist assistência no Firebase/API
- [ ] Garantir `importado: false` ao criar checklist água natural no Firebase/API
- [ ] Garantir `importado: false` ao criar produtos entregue no Firebase/API
- [ ] Garantir `importado: false` ao criar produtos recebido no Firebase/API
- [ ] Verificar todos os pontos que fazem PUT completo no Firebase e garantir que `importado` é preservado (ou migrar para `update()`)
