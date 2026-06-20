# GitHub Issues — Documentação Funcional e Técnica

---

## Issue 9 — Validação OpenAPI — Pré-Cadastro

> **Nota:** Este issue é independente da documentação funcional e técnica. Refere-se à validação da especificação OpenAPI produzida pelo backend, a ser revista antes da integração frontend.

**Título:** `[API] Validação OpenAPI — Pré-Cadastro`

**Descrição:**

Validar a especificação OpenAPI produzida pelo backend para o módulo Pré-Cadastro, com foco nos payloads de cada endpoint:

- Campos, tipos de dados e obrigatoriedade nos request bodies (POST/PUT/PATCH)
- Estrutura e completude das respostas (GET) — campos retornados, tipos, nesting
- Filtros de pesquisa presentes e corretos como query params
- Códigos de resposta de erro documentados (400, 422, 404, etc.)

**Resultado:** spec aprovada ou lista de correções devolvida ao backend.

---

## Issue 1 — Pessoa / Pré-Cadastro

**Título:** `[DOC] Especificação Funcional e Técnica — Pessoa / Pré-Cadastro`

**Descrição:**

Módulo responsável pela receção e gestão das solicitações de registo vindas do SIGO. O operador acede a uma lista de solicitações filtráveis por Nº Ocorrência, Nº Registo, Unidade, Data de Receção (intervalo, acessível em modo de filtros avançados) e Estado (`Por Associar` / `Concluído`).

Ao abrir uma solicitação, o sistema tenta automaticamente fazer match com uma ficha existente por número de documento ou por combinação nome + data de nascimento. O operador pode:

- **Aceitar a correspondência automática** — valida o match sugerido pelo sistema;
- **Associar manualmente** — pesquisar e vincular a solicitação a uma ficha existente;
- **Criar nova ficha** — pré-preenchida com os dados biográficos recebidos do SIGO (nome, data de nascimento, morada, contactos, documentos de identificação).

Após associar ou criar, o operador pode adicionar observações e anexos e concluir o processo, alterando o estado para `Concluído`.

**Âmbito da documentação:** estados da solicitação, lógica de auto-match, campos pré-preenchidos via SIGO, modo de filtros avançados, permissões por perfil e integração técnica com a API do SIGO.

---

## Issue 2 — Gestão de Ficha de Cadastro

**Título:** `[DOC] Especificação Funcional e Técnica — Gestão de Ficha de Cadastro`

**Descrição:**

Módulo de visualização e edição completa da ficha de identificação individual. A ficha está organizada em secções colapsáveis e editáveis:

- **Dados biográficos** — nome, data de nascimento, filiação, naturalidade, nacionalidade, profissão, estado civil;
- **Alcunhas** — lista de nomes alternativos conhecidos;
- **Moradas** — tipo (residência, trabalho, etc.), ilha, concelho, freguesia, localidade;
- **Contactos** — telefone, telemóvel, email;
- **Redes Sociais** — Facebook, Instagram, entre outros;
- **Documentos de Identificação** — CNI, Passaporte, BI, TRE;
- **Grupos / Associações** — vínculos a grupos ou organizações;
- **Sinais Complementares** — características físicas como altura, constituição, tipo e cor de cabelo, cor de pele, barba, bigode, olhos, rosto, tatuagens, cicatrizes, marcas de nascença;
- **Motivo de Cadastro** — histórico de ocorrências com tipo (Criminal/Policial), auto, natureza, enquadramento legal, unidade, medidas aplicadas e estado (Ativo / Reabilitado / Aguardando Reabilitação);
- **Observações** — notas internas com autor e data;
- **Anexos** — ficheiros associados à ficha.

A ficha suporta exportação em PDF com seleção dos blocos a incluir (foto, sinais complementares, outras informações, motivos específicos).

**Âmbito da documentação:** estrutura completa da ficha, fluxo de adição/edição por secção, regras de validação, exportação PDF, histórico de alterações e permissões de acesso.

---

## Issue 3 — Gestão de Reconhecimento

**Título:** `[DOC] Especificação Funcional e Técnica — Gestão de Reconhecimento`

**Descrição:**

Módulo de pesquisa avançada para identificação de indivíduos no sistema. A pesquisa biográfica base inclui: nome completo, data de nascimento, nome do pai, nome da mãe e número de documento.

O operador pode ativar via toggle os **Sinais Complementares**, que expande campos adicionais de caracterização física parametrizados no sistema: constituição física, cabelo, cor de cabelo, cor de pele, barba, bigode, olhos, rosto, tatuagem, cicatriz, marca de nascença, entre outros.

Os resultados são apresentados como lista de fichas correspondentes, permitindo navegar para o detalhe de cada uma.

**Âmbito da documentação:** critérios de pesquisa, algoritmo de matching biográfico e por sinais complementares, apresentação de resultados, integração com parametrizações e permissões de acesso.

---

## Issue 4 — Reabilitação

**Título:** `[DOC] Especificação Funcional e Técnica — Reabilitação`

**Descrição:**

Módulo de gestão de solicitações de reabilitação de registos criminais/policiais. Lista de forma agregada todos os registos com estado `Aguardando Reabilitação` de todas as fichas, pesquisáveis por Número de Ficha, Nome, Data de Nascimento e Estado.

Para cada solicitação, o operador pode:

- **Ver Detalhes** — consultar a ficha completa, o motivo do cadastro e o motivo da reabilitação submetido pelo operador de origem, com possibilidade de anexos;
- **Aceitar** — altera o estado do registo de cadastro para `Reabilitado`;
- **Recusar** — regista a recusa com motivo, podendo incluir indicação de data de elegibilidade futura.

O sistema exibe o motivo de recusa quando aplicável e mantém o histórico de decisões sobre cada registo.

**Âmbito da documentação:** estados do processo (Aguardando / Reabilitado / Recusado), regras de elegibilidade, fluxo de submissão e aprovação/rejeição, modais de confirmação, notificações e permissões por perfil.

---

## Issue 5 — Documentos e Pesquisa de Documentos

**Título:** `[DOC] Especificação Funcional e Técnica — Documentos e Pesquisa de Documentos`

**Descrição:**

**Cadastro de Documentos** — registo de documentos encontrados em 3 passos sequenciais:

1. **Identificação** — tipo de documento (CNI, Passaporte, TRE, BI), número do documento e identificação do titular com pesquisa biográfica integrada (pesquisa por tipo + número de documento, com possibilidade de pré-preenchimento a partir de ficha existente);
2. **Quem Encontrou** — nome, contacto e informação de quem entregou o documento;
3. **Localização / Observações** — local onde o documento foi encontrado e notas adicionais.

**Pesquisa de Documentos** — consulta do histórico de documentos registados, com filtros por tipo, número, titular e data de registo, e acesso ao detalhe completo de cada registo.

**Âmbito da documentação:** fluxo dos 3 passos, campos obrigatórios por passo, pesquisa biográfica integrada, estados do documento registado e permissões de acesso.

---

## Issue 6 — Certificado de Cadastro

**Título:** `[DOC] Especificação Funcional e Técnica — Certificado de Cadastro`

**Descrição:**

Módulo de emissão de certificados de cadastro e antecedentes policiais, composto por 4 sub-módulos que refletem o ciclo de vida de cada pedido:

### Pedido (Solicitação)
Registo de novo pedido de certificado em 2 passos:
1. **Identificação** — dados biográficos do requerente com pesquisa integrada na ficha de cadastro (por NIF ou número de documento); finalidade do certificado (Concurso Público, Emprego Privado, Visto/Emigração, Processo Judicial, Uso Pessoal, Licença/Alvará);
2. **DUC** — geração do Documento Único de Cobrança associado ao pedido.

### Análise
Lista de pedidos em fase de análise. O analista abre o detalhe de cada pedido, consulta a ficha de cadastro associada (com auto-match por NIF ou número de documento) e valida a correspondência antes de encaminhar para decisão.

### Decisão
Lista de pedidos que aguardam decisão após análise. O decisor consulta o pedido com a pessoa já associada e toma a decisão final de emissão ou recusa do certificado.

### Histórico
Vista consolidada de todos os pedidos em qualquer fase (Análise, Decisão, Concluído), com filtros e acesso ao detalhe de cada um.

**Âmbito da documentação:** fluxo completo do pedido ao histórico, transições de estado, lógica de auto-match, geração do DUC, finalidades parametrizáveis, permissões por fase e perfil.

---

## Issue 7 — Certificado de Extravio

**Título:** `[DOC] Especificação Funcional e Técnica — Certificado de Extravio`

**Descrição:**

Módulo de gestão de comunicações e certificados para documentos extraviados, composto por 4 sub-módulos que refletem o ciclo de vida de cada comunicação:

### Certificado de Extravio (Pedido)
Registo de uma nova comunicação de extravio de documento, com dados do titular, tipo e número do documento extraviado, e circunstâncias do extravio.

### Análise
Lista de comunicações de extravio em análise. O analista verifica os dados submetidos, cruza com registos existentes e valida antes de encaminhar para decisão.

### Decisão
Lista de comunicações que aguardam decisão. O decisor aprova ou recusa a emissão do certificado de extravio com base na análise efetuada.

### Histórico de Comunicações de Extravio
Vista completa de todas as comunicações em qualquer estado (análise, decisão, concluído), com filtros e acesso ao detalhe.

**Âmbito da documentação:** fluxo completo de comunicação ao histórico, transições de estado, campos obrigatórios por passo, permissões por fase e perfil.

---

## Issue 8 — Parametrizações

**Título:** `[DOC] Especificação Funcional e Técnica — Parametrizações`

**Descrição:**

Módulo de gestão dos domínios e valores parametrizáveis do sistema, acessível na secção **Gestão do Sistema**. Organizado em dois separadores:

### Domínios
Lista lateral de domínios do sistema com indicador de valores ativos/total. Para cada domínio selecionado, o operador pode:
- **Adicionar** novo valor (código/valor + descrição), que entra com estado `Ativo`;
- **Editar** valor e descrição de um registo existente;
- **Ativar / Desativar** um valor sem o eliminar.

Domínios presentes no sistema:
- Tipo de Auto, Natureza, Enquadramento Legal, Tipologia, Medida Aplicada
- Tipo de Documento, Finalidade de Certificado, Sinal Complementar, entre outros.

### Grupos
Gestão de grupos ou organizações que podem ser associados a fichas de indivíduos.

**Âmbito da documentação:** lista completa de domínios, regras de ativação/desativação, impacto nos módulos que consomem os valores parametrizados, controlo de acesso e auditoria de alterações.
