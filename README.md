# SkillMatch JS

Simulador de compatibilidade entre um perfil de candidata e vagas de front-end júnior.

**Mini-Projeto Avaliativo — Módulo 01, Semana 06 — Curso de Programação Front-End React — SCTEC, Turma 04**
**Autora:** Andressa da Rosa Costa

Este projeto foi desenvolvido em JavaScript puro, sem uso de React, HTML, CSS ou DOM, como forma de encerrar e consolidar tudo o que foi estudado no Módulo 01 do curso — lógica de programação, tipos de dados, condicionais, laços, funções, arrays, objetos, classes, herança, closures, callbacks, Promises e async/await — antes de avançarmos para a construção de interfaces com React nos próximos módulos.

## O que o sistema faz

O `skillmatch.js` compara as habilidades da candidata (eu, Andressa) com os requisitos de 3 vagas fictícias de front-end júnior e, para cada vaga, calcula:

- o percentual de compatibilidade (0 a 100%);
- a classificação (Alta, Média ou Baixa compatibilidade);
- as habilidades que ainda faltam para atender aquela vaga;
- se a candidata atende a todos os requisitos ou não.

No final, o sistema aponta a vaga com maior compatibilidade e gera uma recomendação de qual habilidade estudar primeiro.

O carregamento das vagas é simulado como se viesse de um servidor (com atraso e tratamento de erro), para reforçar o conceito de arquitetura cliente-servidor mesmo sem uma API real.

## Como executar

Não é preciso instalar nada além de ter o Node.js instalado. Existem três formas de rodar:

**Opção 1 — Node.js (recomendado)**

```bash
git clone <link-do-repositorio>
cd skillmatch-js
node skillmatch.js
```

**Opção 2 — Console do navegador**

Abra o DevTools do navegador (F12), cole todo o conteúdo do arquivo `skillmatch.js` na aba "Console" e pressione Enter.

**Opção 3 — Ambiente online**

Cole o código em um ambiente online de JavaScript (ex: [replit.com](https://replit.com), [jsfiddle.net](https://jsfiddle.net) na aba de console) e execute.

O relatório completo é impresso no console.

## Regra de cálculo da compatibilidade (RF03)

```
percentual = (nº de requisitos da vaga que a candidata possui / nº total de requisitos da vaga) × 100
```

O resultado é arredondado com `Math.round()`. Escolhi essa regra porque é simples, justa e fácil de explicar: cada requisito da vaga "vale o mesmo", e a nota reflete exatamente qual fração dos requisitos é atendida. Essa mesma regra é aplicada a todas as vagas, sem exceção (método `calcularCompatibilidade` da classe `Vaga`).

A classificação segue a tabela do enunciado:

| Percentual | Classificação |
|---|---|
| 80% a 100% | Alta compatibilidade |
| 50% a 79% | Média compatibilidade |
| 0% a 49% | Baixa compatibilidade |

## Critério de recomendação de estudo (RF07)

A função `gerarRecomendacaoDeEstudo` conta, entre todas as vagas analisadas, quantas vezes cada habilidade faltante se repete. A habilidade que aparece em **mais vagas ao mesmo tempo** é priorizada, porque estudá-la é o que mais aumenta a compatibilidade geral da candidata com o conjunto de vagas — e não apenas com uma vaga isolada.

## Conceitos do Módulo 01 aplicados e onde estão no código

| Conceito | Onde está no `skillmatch.js` |
|---|---|
| Objetos, chaves e valores | `candidato`, cada `Vaga` |
| Arrays | `candidato.habilidades`, `vaga.requisitos`, `vagas` |
| Tipos de dados (string, number, array, boolean) | em todo o arquivo (ex: `percentual` é number, `atendeTodosRequisitos` é boolean) |
| `let` e `const` | usados em todo o projeto (ver seção sobre `var` abaixo) |
| Operadores lógicos e matemáticos | `!habilidadesCandidato.includes(...)`, `Math.round(...)`, comparações `>=` |
| `if / else` | `classificarCompatibilidade` |
| Operador ternário | escolha do emoji e da mensagem de faltantes em `iniciarSkillMatch` |
| Laço `for` | impressão de cada análise em `iniciarSkillMatch` |
| Funções e arrow functions | quase todas as funções do arquivo são arrow functions (`=>`) |
| Métodos de array (`map`, `filter`, `every`, `find`, `reduce`) | `filter` em `calcularCompatibilidade`/`habilidadesFaltantes`, `map` em `processarVagas`, `every` em `analisarVaga`, `find` em `iniciarSkillMatch`, `reduce` em `encontrarMelhorVaga` |
| Classe e construtor | `class Vaga { constructor(...) {...} }` |
| Herança | `class VagaComBeneficios extends Vaga` |
| Uso do `this` | dentro dos métodos da classe `Vaga` (ex: `this.requisitos`) |
| Callback | `analisarVaga` é passada como argumento para `processarVagas` |
| Closure | `criarContadorDeAnalises()` mantém `contador` vivo entre chamadas sem variável global |
| Promise | `buscarVagasDoServidor` |
| Async/await | `iniciarSkillMatch`, com `try/catch` tratando o erro simulado |

## Sobre `var`, `let` e `const`

O projeto usa apenas `let` e `const`. Não usei `var` porque `var` tem escopo de função (não de bloco), pode ser redeclarada sem erro e sofre "hoisting" de um jeito que facilita bugs difíceis de rastrear — por exemplo, uma variável `var` dentro de um `for` "vaza" para fora do laço. `let` e `const` têm escopo de bloco, o que deixa o código mais previsível. Uso `const` como padrão (para tudo que não é reatribuído) e `let` só quando o valor realmente precisa mudar (como o contador dentro da closure e a variável `i` do laço `for`).

## Como a internet funciona (resumo)

Quando um site ou aplicação pede dados, o navegador (cliente) envia uma requisição para um servidor através da internet. O servidor processa o pedido, busca ou calcula a informação, e devolve uma resposta pela mesma rede. Esse processo tem latência (não é instantâneo) e pode falhar (rede fora do ar, servidor indisponível), por isso o código que faz essas chamadas deve lidar com espera e com erro.

## Arquitetura cliente-servidor no projeto

Como o projeto é só JavaScript puro (sem back-end real), simulei essa arquitetura com a função `buscarVagasDoServidor`: ela devolve uma `Promise` que só resolve depois de um `setTimeout` (representando a latência de uma chamada de rede) e pode rejeitar com um erro (representando uma falha do servidor). A função `iniciarSkillMatch` é o "cliente": ela usa `await` para esperar a resposta e `try/catch` para tratar uma eventual falha, exatamente como aconteceria numa chamada real a uma API.

## Estrutura do projeto

```
skillmatch-js/
├── README.md
├── skillmatch.js
└── planejamento/
    └── tarefas-kanban.md
```

## VS Code e extensões usadas

- **Prettier - Code formatter**: formatação automática e consistente do código.
- **ESLint**: aponta erros e más práticas de JavaScript direto no editor.
- **GitLens**: facilita visualizar o histórico de commits e branches.
- **Live Server** (opcional): útil caso o código seja testado junto de um `index.html`.

## Versionamento — Git e GitHub

O projeto foi feito em branches, sem commits diretos na `main`, seguindo um GitFlow simplificado:

| Branch | Objetivo |
|---|---|
| `feature/perfil-candidato` | Criar o objeto do perfil da candidata (RF01) |
| `feature/modelo-vagas` | Criar as classes `Vaga`/`VagaComBeneficios` e a lista de vagas (RF02, RF09, RF10, RF11) |
| `feature/logica-compatibilidade` | Cálculo, classificação, habilidades faltantes, melhor vaga e recomendação (RF03–RF07) |
| `feature/assincronismo` | Closure, callback e simulação de servidor com Promise (RF12, RF13, RF14) |
| `feature/execucao-principal` | Fluxo principal com async/await e impressão do relatório |
| `docs/readme-kanban` | Documentação (README) e quadro Kanban |

Cada branch foi integrada à `main` por merge após a conclusão da tarefa correspondente.

## Vídeo de apresentação

🔗 *(adicionar aqui o link do vídeo, hospedado no Google Drive com permissão de visualização para qualquer pessoa com o link, ou como não listado no YouTube)*

## Sobre o uso de Inteligência Artificial

Usei o Claude (Anthropic) como apoio para estruturar o projeto, organizar os arquivos e escrever a primeira versão do código e deste README, a partir do meu perfil real e das minhas decisões de projeto (regra de cálculo, critério de recomendação, nomes de vagas). Revisei o código linha a linha para garantir que uso apenas conceitos vistos até a Semana 06 e para conseguir explicar cada parte com segurança no vídeo de apresentação, como pede o enunciado do mini-projeto.
