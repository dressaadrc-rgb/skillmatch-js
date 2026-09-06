# SkillMatch JS

## Sobre o projeto

O **SkillMatch JS** é um simulador que compara o perfil de uma pessoa candidata com algumas vagas de Front-End Júnior.

A ideia do projeto é verificar o quanto o candidato combina com cada vaga, mostrando a porcentagem de compatibilidade, as habilidades que estão faltando e qual vaga teve o melhor resultado.

O projeto foi feito somente com **JavaScript**, sem React, HTML, CSS ou DOM.

**Curso:** Análise e Desenvolvimento de Sistemas
**Módulo:** 01
**Autora:** Andressa da Rosa Costa

---

## O que o sistema faz

* Cadastra o perfil do candidato;
* Possui 4 vagas fictícias;
* Compara as habilidades do candidato com os requisitos das vagas;
* Calcula a porcentagem de compatibilidade;
* Classifica o resultado como alta, média ou baixa;
* Mostra as habilidades que estão faltando;
* Encontra a vaga com maior compatibilidade;
* Indica uma habilidade para estudar;
* Simula o carregamento das vagas de um servidor.

---

## Como executar

O projeto pode ser executado pelo Node.js.

No terminal do VS Code:

```bash
node skillmatch.js
```

Também é possível executar o código pelo console do navegador ou por algum site que permita rodar JavaScript.

---

## Regra de compatibilidade

Para calcular a compatibilidade, comparei a quantidade de requisitos que o candidato possui com o total de requisitos da vaga.

A fórmula utilizada foi:

```text
(quantidade de requisitos atendidos / quantidade total de requisitos) × 100
```

Escolhi essa regra porque é uma forma simples de mostrar o quanto o candidato atende aos requisitos de cada vaga.

### Classificação

| Porcentagem | Resultado |
| ----------- | --------- |
| 80% a 100%  | Alta      |
| 50% a 79%   | Média     |
| 0% a 49%    | Baixa     |

---

## Recomendação de estudo

Para indicar o que estudar, o programa verifica as habilidades que estão faltando nas vagas.

A habilidade que aparece mais vezes entre os requisitos que ainda não possuo é considerada a prioridade de estudo.

---

## Conceitos utilizados

Durante o projeto foram utilizados os conteúdos estudados no módulo, como:

* Variáveis com `let` e `const`;
* Tipos de dados;
* Operadores;
* `if/else`;
* Operador ternário;
* Laços de repetição;
* Funções;
* Arrow functions;
* Arrays e objetos;
* `map()`;
* `filter()`;
* `find()`;
* `every()`;
* `reduce()`;
* Classes;
* Constructor;
* Herança;
* `this`;
* Callback;
* Closure;
* Promise;
* `async/await`.

---

## Promise e simulação de servidor

O projeto possui uma função que simula o carregamento das vagas de um servidor.

Foi utilizado `Promise` com um pequeno atraso para representar esse carregamento.

Também foi utilizado `async/await` e `try/catch` para tratar o resultado.

---

## Como a internet funciona

De forma simples, quando acessamos um site ou sistema, o computador ou celular faz uma solicitação para um servidor. O servidor processa essa solicitação e envia uma resposta.

No projeto, essa ideia foi apenas simulada, já que não foi utilizada uma API ou servidor real.

---

## Git e GitHub

O projeto foi desenvolvido utilizando Git e GitHub para acompanhar as alterações.

Também utilizei branches para organizar as partes do desenvolvimento e o Trello para organizar as tarefas.

**Trello:** [
](https://trello.com/b/Eepjy1ax/skilmatch-js-mini-projeto-sctec)
---

## Estrutura do projeto

```text
skillmatch-js/
│
├── skillmatch.js
├── README.md
│
└── planning/
    └── tasks-kanban.md
```

---

## Vídeo

No vídeo será apresentada a execução do projeto e explicadas as principais partes do código.

**Link do vídeo:** inserir link

---

## Uso de Inteligência Artificial

Utilizei inteligência artificial (**Claude**) durante o desenvolvimento como apoio para tirar algumas dúvidas e revisar conceitos de JavaScript.

Usei principalmente para tirar dúvidas sobre **Promise, async/await, closure e herança**.

Depois adaptei o código para a atividade, testei no VS Code e revisei o funcionamento das partes utilizadas.
