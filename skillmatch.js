/* =========================================================================
   SkillMatch JS - Simulador de Compatibilidade com Vaga Front-End Júnior
   Mini-Projeto Avaliativo - Módulo 01 - Semana 06
   Curso de Programação Front-End React - SCTEC, Turma 04
   Autora: Andressa da Rosa Costa
   ========================================================================= */

// ---------------------------------------------------------------------------
// RF01 - Perfil do candidato
// ---------------------------------------------------------------------------
const candidato = {
  nome: "Andressa da Rosa Costa",
  areaInteresse: "Front-End e Desenvolvimento de Sistemas",
  habilidades: [
    "HTML",
    "CSS",
    "JavaScript",
    "Git",
    "Lógica de Programação",
    "Responsividade",
  ],
  tempoExperiencia:
    "8 meses em transição de carreira (cursando Análise e Desenvolvimento de Sistemas)",
};

// ---------------------------------------------------------------------------
// RF09 - Classe principal | RF11 - uso do this
// ---------------------------------------------------------------------------
class Vaga {
  constructor(empresa, cargo, requisitos, modalidade) {
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos; // array de strings
    this.modalidade = modalidade; // "Remoto" | "Híbrido" | "Presencial"
  }

  // RF03 - calcula o percentual de compatibilidade (RF08 - filter)
  calcularCompatibilidade(habilidadesCandidato) {
    const requisitosAtendidos = this.requisitos.filter((requisito) =>
      habilidadesCandidato.includes(requisito)
    );

    return Math.round((requisitosAtendidos.length / this.requisitos.length) * 100);
  }

  // RF05 - lista as habilidades que faltam (RF08 - filter)
  habilidadesFaltantes(habilidadesCandidato) {
    return this.requisitos.filter(
      (requisito) => !habilidadesCandidato.includes(requisito)
    );
  }

  resumo() {
    return `${this.cargo} na ${this.empresa} (${this.modalidade})`;
  }
}

// ---------------------------------------------------------------------------
// RF10 - Herança
// VagaComBeneficios herda de Vaga porque nem toda vaga divulga benefícios;
// quando divulga, faz sentido existir um "tipo mais completo" de vaga, sem
// obrigar todas as vagas a carregarem esse dado extra.
// ---------------------------------------------------------------------------
class VagaComBeneficios extends Vaga {
  constructor(empresa, cargo, requisitos, modalidade, beneficios) {
    super(empresa, cargo, requisitos, modalidade);
    this.beneficios = beneficios; // array de strings
  }

  // sobrescreve o método resumo() para incluir os benefícios
  resumo() {
    return `${super.resumo()} | Benefícios: ${this.beneficios.join(", ")}`;
  }
}

// ---------------------------------------------------------------------------
// RF02 - Lista de vagas fictícias
// ---------------------------------------------------------------------------
const vagas = [
  new Vaga(
    "TechNova",
    "Desenvolvedora Front-End Júnior",
    ["HTML", "CSS", "JavaScript", "Git", "React"],
    "Remoto"
  ),
  new VagaComBeneficios(
    "InovaWeb",
    "Front-End Júnior",
    ["HTML", "CSS", "JavaScript", "Responsividade", "Figma"],
    "Híbrido",
    ["Vale-refeição", "Plano de saúde", "Horário flexível"]
  ),
  new Vaga(
    "StartFlow",
    "Desenvolvedora Web Júnior",
    ["HTML", "CSS", "JavaScript", "Git", "Node.js", "TypeScript"],
    "Presencial"
  ),
];

// ---------------------------------------------------------------------------
// RF04 - Classificação da compatibilidade (estrutura de decisão: if-else)
// ---------------------------------------------------------------------------
function classificarCompatibilidade(percentual) {
  let classificacao;

  if (percentual >= 80) {
    classificacao = "Alta compatibilidade";
  } else if (percentual >= 50) {
    classificacao = "Média compatibilidade";
  } else {
    classificacao = "Baixa compatibilidade";
  }

  return classificacao;
}

// ---------------------------------------------------------------------------
// Analisa uma vaga por completo, reunindo RF03, RF04 e RF05.
// (RF08 - every: verifica se TODOS os requisitos são atendidos)
// ---------------------------------------------------------------------------
function analisarVaga(vaga) {
  const percentual = vaga.calcularCompatibilidade(candidato.habilidades);
  const classificacao = classificarCompatibilidade(percentual);
  const faltantes = vaga.habilidadesFaltantes(candidato.habilidades);

  const atendeTodosRequisitos = vaga.requisitos.every((requisito) =>
    candidato.habilidades.includes(requisito)
  );

  return {
    numeroAnalise: proximoNumeroDeAnalise(),
    vaga,
    percentual,
    classificacao,
    faltantes,
    atendeTodosRequisitos,
  };
}

// ---------------------------------------------------------------------------
// RF06 - Encontra a vaga com maior compatibilidade (RF08 - reduce)
// ---------------------------------------------------------------------------
function encontrarMelhorVaga(analises) {
  return analises.reduce((melhorAteAgora, analiseAtual) =>
    analiseAtual.percentual > melhorAteAgora.percentual
      ? analiseAtual
      : melhorAteAgora
  );
}

// ---------------------------------------------------------------------------
// RF07 - Recomendação de estudo
// Critério adotado: priorizamos a habilidade que falta com MAIS frequência
// entre as vagas analisadas, pois estudá-la aumenta a compatibilidade com o
// maior número de vagas ao mesmo tempo.
// ---------------------------------------------------------------------------
function gerarRecomendacaoDeEstudo(analises) {
  const contagemFaltantes = {};

  analises.forEach((analise) => {
    analise.faltantes.forEach((habilidade) => {
      contagemFaltantes[habilidade] = (contagemFaltantes[habilidade] || 0) + 1;
    });
  });

  const habilidadesOrdenadas = Object.keys(contagemFaltantes).sort(
    (a, b) => contagemFaltantes[b] - contagemFaltantes[a]
  );

  if (habilidadesOrdenadas.length === 0) {
    return "Parabéns! Seu perfil já atende a todos os requisitos das vagas analisadas.";
  }

  const habilidadePrioritaria = habilidadesOrdenadas[0];
  const vezes = contagemFaltantes[habilidadePrioritaria];

  return `Estude "${habilidadePrioritaria}" primeiro: essa habilidade falta em ${vezes} de ${analises.length} vaga(s) analisada(s) e é a que mais aumentaria sua compatibilidade geral.`;
}

// ---------------------------------------------------------------------------
// RF13 - Closure
// criarContadorDeAnalises guarda o valor de "contador" na memória da função
// interna (fechada sobre a variável), sem usar nenhuma variável global.
// ---------------------------------------------------------------------------
function criarContadorDeAnalises() {
  let contador = 0;

  return function () {
    contador += 1;
    return contador;
  };
}

const proximoNumeroDeAnalise = criarContadorDeAnalises();

// ---------------------------------------------------------------------------
// RF12 - Callback
// processarVagas recebe uma função (callback) e a aplica a cada vaga da
// lista — quem decide COMO analisar cada vaga é quem chama processarVagas.
// (RF08 - map)
// ---------------------------------------------------------------------------
function processarVagas(listaDeVagas, callback) {
  return listaDeVagas.map(callback);
}

// ---------------------------------------------------------------------------
// RF14 - Promise
// Simula a busca das vagas em um servidor remoto, com um atraso antes de os
// dados ficarem disponíveis (como aconteceria em uma chamada de API real).
// ---------------------------------------------------------------------------
function buscarVagasDoServidor(listaDeVagas) {
  return new Promise((resolve, reject) => {
    const tempoDeResposta = 1500; // simula latência de rede em ms

    setTimeout(() => {
      const servidorDisponivel = true; // troque para false para simular erro

      if (servidorDisponivel) {
        resolve(listaDeVagas);
      } else {
        reject(new Error("Não foi possível carregar as vagas do servidor."));
      }
    }, tempoDeResposta);
  });
}

// ---------------------------------------------------------------------------
// Fluxo principal do programa.
// RF14 - async/await para aguardar a Promise do "servidor"
// Também demonstra: laço for, operador ternário e método find (RF08).
// ---------------------------------------------------------------------------
async function iniciarSkillMatch() {
  console.log("=========================================================");
  console.log(" SKILLMATCH JS - Simulador de Compatibilidade Front-End ");
  console.log("=========================================================\n");

  console.log(`Candidata: ${candidato.nome}`);
  console.log(`Área de interesse: ${candidato.areaInteresse}`);
  console.log(`Tempo de experiência: ${candidato.tempoExperiencia}`);
  console.log(`Habilidades: ${candidato.habilidades.join(", ")}\n`);

  console.log("Carregando vagas do servidor simulado...\n");

  try {
    const vagasCarregadas = await buscarVagasDoServidor(vagas);

    // RF08 - find: localiza a primeira vaga remota da lista
    const vagaRemota = vagasCarregadas.find((vaga) => vaga.modalidade === "Remoto");
    if (vagaRemota) {
      console.log(`Encontrada vaga remota: ${vagaRemota.resumo()}\n`);
    }

    // RF12 - a função analisarVaga é passada como callback
    const analises = processarVagas(vagasCarregadas, analisarVaga);

    // laço for clássico para percorrer e imprimir cada análise
    for (let i = 0; i < analises.length; i++) {
      const analise = analises[i];

      // operador ternário encadeado para escolher o emoji da faixa
      const emoji =
        analise.percentual >= 80 ? "🟢" : analise.percentual >= 50 ? "🟡" : "🔴";

      console.log(`--- Análise #${analise.numeroAnalise} ---`);
      console.log(`Vaga: ${analise.vaga.resumo()}`);
      console.log(`Requisitos: ${analise.vaga.requisitos.join(", ")}`);
      console.log(
        `Compatibilidade: ${analise.percentual}% ${emoji} (${analise.classificacao})`
      );

      const mensagemFaltantes =
        analise.faltantes.length > 0
          ? `Habilidades faltantes: ${analise.faltantes.join(", ")}`
          : "Habilidades faltantes: nenhuma! Você atende a todos os requisitos.";

      console.log(mensagemFaltantes);
      console.log(
        `Atende a todos os requisitos? ${analise.atendeTodosRequisitos ? "Sim" : "Não"}\n`
      );
    }

    const melhorAnalise = encontrarMelhorVaga(analises);
    console.log("=========================================================");
    console.log(`Vaga com maior compatibilidade: ${melhorAnalise.vaga.resumo()}`);
    console.log(
      `Compatibilidade: ${melhorAnalise.percentual}% (${melhorAnalise.classificacao})\n`
    );

    const recomendacao = gerarRecomendacaoDeEstudo(analises);
    console.log("Recomendação de estudo:");
    console.log(recomendacao);
    console.log("=========================================================");
  } catch (erro) {
    console.error("Erro ao carregar vagas:", erro.message);
  }
}

iniciarSkillMatch();
