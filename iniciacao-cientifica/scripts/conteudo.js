// Conteudo do trabalho. Marcacao simples nos textos: **negrito** e *italico*.
// Todos os dados numericos vem dos artigos fichados (ver REFERENCIAS).

const ACESSO = "Acesso em: 14 nov. 2026.";

exports.meta = {
  escola: "ESCOLA SESI DE REFERÊNCIA PARAGOMINAS",
  autores: [
    "MATHEUS DOS SANTOS ROSA",
    "MARCOS VINÍCIUS VILLACORTE ARAÚJO",
    "RAUL CONCEIÇÃO AREAS",
    "YANDRA VICTORIA ALMEIDA SOUZA",
    "DANIEL OLIVEIRA",
    "FELYPE MENDES",
  ],
  titulo: "CONTAMINAÇÃO DENTRO DAS ESCOLAS",
  subtitulo: "o que a água, a areia, a merenda, as mãos e o ar revelam sobre a saúde dos estudantes",
  natureza:
    "Trabalho de Iniciação Científica apresentado à Unidade Curricular Aplicando Conhecimentos e Propondo Soluções, da 3ª Série do Ensino Médio da Escola SESI de Referência Paragominas.",
  orientadora: "Orientadora: Profa. Viviane Farias Chaves Gabriel",
  local: "PARAGOMINAS – PA",
  ano: "2026",
};

exports.resumo = {
  texto:
    "A escola é o lugar onde crianças e adolescentes passam boa parte do dia e, por isso, é também um lugar em que microrganismos, parasitas e poluentes encontram muitas oportunidades de circular. Este trabalho de iniciação científica teve como objetivo compreender por quais caminhos a contaminação acontece dentro do ambiente escolar e o que a literatura científica aponta como solução. Trata-se de uma pesquisa bibliográfica, de abordagem qualitativa, realizada na biblioteca eletrônica SciELO. Foram selecionados cinco artigos, um para cada via de contaminação investigada (água, solo, alimentos, mãos e ar), e cada um foi registrado em uma ficha de estudo com referência, objetivo, método, resultados e citação, seguida de um comentário do grupo. Os estudos mostram que todas as amostras de água de bebedouros de doze escolas de Santa Rita (PB) continham coliformes totais; que havia larvas de *Ancylostoma* spp. na areia de até 46,4% das escolas infantis de Araçatuba (SP); que 57,0% de 235 cantinas escolares de Salvador (BA) apresentavam condições higiênico-sanitárias insatisfatórias; que estudantes cobriam pouco mais da metade do dorso das mãos ao higienizá-las; e que 47 de 51 escolas de Coimbra, em Portugal, tinham salas com dióxido de carbono acima do limite de referência. Conclui-se que a contaminação escolar está mais ligada à falta de manutenção, de estrutura e de hábito do que a situações raras, e que medidas simples, como limpar reservatórios, proteger a areia, capacitar quem prepara a merenda, ensinar a técnica de higienização das mãos e ventilar as salas, estão ao alcance da comunidade escolar.",
  chaves:
    "saúde escolar; contaminação; qualidade da água; higiene das mãos; qualidade do ar interior.",
};

exports.abstract = {
  texto:
    "School is where children and teenagers spend a large part of their day, which also makes it a place where microorganisms, parasites and pollutants have many chances to circulate. This scientific initiation project aimed to understand the routes through which contamination happens inside the school environment and what the scientific literature points to as solutions. It is a qualitative bibliographic study carried out in the SciELO electronic library. Five articles were selected, one for each contamination route investigated (water, soil, food, hands and air), and each was recorded on a study sheet containing its reference, objective, method, results and a quotation, followed by the group's comments. The studies show that every drinking fountain water sample from twelve schools in Santa Rita (Paraíba, Brazil) contained total coliforms; that *Ancylostoma* spp. larvae were found in the sand of up to 46.4% of the preschools in Araçatuba (São Paulo, Brazil); that 57.0% of 235 school kitchens in Salvador (Bahia, Brazil) had unsatisfactory hygiene and sanitary conditions; that students covered little more than half of the back of their hands when cleaning them; and that 47 of 51 schools in Coimbra, Portugal, had classrooms with carbon dioxide above the reference limit. We conclude that contamination at school is linked to lack of maintenance, infrastructure and habit rather than to rare events, and that simple measures, such as cleaning water tanks, protecting sandboxes, training food handlers, teaching the handwashing technique and ventilating classrooms, are within reach of the school community.",
  chaves: "school health; contamination; water quality; hand hygiene; indoor air quality.",
};

// --------------------------------------------------------------------------
// Fichas de estudo
// --------------------------------------------------------------------------
exports.fichas = [
  {
    id: "ficha1",
    via: "Água",
    titulo: "Ficha de estudo 1 – Água dos bebedouros",
    fonteCit: "Moraes *et al.* (2018)",
    ref: "MORAES, Maria Suiane de *et al.* Avaliação microbiológica de fontes de água de escolas públicas e privadas da cidade de Santa Rita (PB). **Engenharia Sanitária e Ambiental**, Rio de Janeiro, v. 23, n. 3, p. 431-435, maio/jun. 2018.",
    tipo: "Estudo de campo com análise em laboratório, feito em 12 escolas de ensino infantil e fundamental de Santa Rita (PB): 4 municipais, 4 estaduais e 4 particulares.",
    objetivo: "Verificar a qualidade microbiológica da água fornecida nos bebedouros das escolas.",
    metodo:
      "A água foi coletada em 3 bebedouros de cada escola, depois de as torneiras serem higienizadas com álcool 70% e flambadas. As amostras foram analisadas em triplicata para coliformes totais, coliformes termotolerantes e bactérias heterotróficas, e os resultados foram comparados com a Portaria nº 2.914/2011 do Ministério da Saúde.",
    resultados:
      "Coliformes totais em 100% das amostras; coliformes termotolerantes em 33,33% (4 das 12 escolas); bactérias heterotróficas entre 1,5 × 10² e 1,6 × 10³ UFC/mL, para um limite de 500 UFC/mL. Nenhuma escola tinha tratamento físico da água; quatro usavam cloro, mas só em uma o sistema funcionava bem. Em 30% das escolas a caixa-d'água era limpa em intervalos maiores que dois anos e 20% nem sabiam quando tinha sido a última limpeza.",
    conclusao:
      "A água estava em desacordo com o padrão brasileiro de potabilidade, o que traz risco de doenças transmitidas pela água, agravado por envolver crianças e adolescentes. Os autores pedem controle e monitoramento por parte de gestores e educadores.",
    citacao:
      "“[...] verificou-se que 100% das amostras apresentavam-se impróprias para consumo [...]” (Moraes *et al.*, 2018, p. 431).",
    comentario:
      "Foi o resultado que mais nos assustou, porque o bebedouro é o lugar em que mais confiamos. O estudo deixa claro que a água sai tratada da companhia e se contamina depois, na caixa-d'água, no encanamento e no próprio bebedouro. Percebemos também um detalhe: o menor valor de bactérias heterotróficas (150 UFC/mL) fica abaixo do limite de 500, então a afirmação de que todas as amostras estavam irregulares nesse critério merece cuidado. Mesmo assim, todas já estavam reprovadas pelos coliformes totais.",
    doi: "https://doi.org/10.1590/S1413-41522018159099",
    qr: "qr1_agua.png",
  },
  {
    id: "ficha2",
    via: "Solo",
    titulo: "Ficha de estudo 2 – Areia das áreas de lazer",
    fonteCit: "Nunes *et al.* (2000)",
    ref: "NUNES, Cáris M. *et al.* Ocorrência de larva migrans na areia de áreas de lazer das escolas municipais de ensino infantil, Araçatuba, SP, Brasil. **Revista de Saúde Pública**, São Paulo, v. 34, n. 6, p. 656-658, dez. 2000.",
    tipo: "Estudo de campo com análise parasitológica, feito nas 28 escolas municipais de ensino infantil (EMEI) da zona urbana de Araçatuba (SP).",
    objetivo:
      "Avaliar a ocorrência de agentes de larva migrans (*Ancylostoma* spp. e *Toxocara* spp.) na areia das áreas de lazer das escolas.",
    metodo:
      "Foram colhidas 535 amostras de areia, uma a cada 15–20 m² de pátio, a cerca de 5 cm de profundidade, de preferência em pontos úmidos e sombreados, em janeiro (verão) e julho (inverno) de 1997. As larvas foram procuradas pelo método de Baermann modificado e os ovos, por centrífugo-flutuação.",
    resultados:
      "Larvas de *Ancylostoma* spp. em pelo menos uma amostra de 35,7% das escolas no verão (10 de 28) e de 46,4% no inverno (13 de 28), diferença que não foi estatisticamente significante. Ovos de *Ancylostoma* spp. em 0,56% das amostras (3 de 535), todas da mesma escola. Nenhum ovo de *Toxocara* spp. foi encontrado.",
    conclusao:
      "A contaminação da areia por *Ancylostoma* spp. é alta e aumenta o risco de as crianças pegarem larva migrans cutânea, conhecida como bicho-geográfico. O risco de larva migrans visceral foi considerado mínimo.",
    citacao:
      "Para os autores, a areia das áreas de lazer pode ser via de transmissão de zoonoses parasitárias, “[...] representando risco potencial para as crianças que brincam nesses locais” (Nunes *et al.*, 2000, p. 656).",
    comentario:
      "Chamou nossa atenção que os pátios eram fechados e, mesmo assim, quase metade das escolas tinha larvas na areia. Os autores explicam que gatos adultos conseguem entrar nesses espaços. É o artigo mais antigo da nossa seleção, com coletas de 1997, e por isso seria importante repetir esse tipo de análise hoje. A lição prática continua valendo: areia sem cobertura e sem troca é um convite para os animais.",
    doi: "https://doi.org/10.1590/S0034-89102000000600015",
    qr: "qr2_areia.png",
  },
  {
    id: "ficha3",
    via: "Alimentos",
    titulo: "Ficha de estudo 3 – Produção da merenda escolar",
    fonteCit: "Cardoso *et al.* (2010)",
    ref: "CARDOSO, Ryzia de Cassia Vieira *et al.* Programa nacional de alimentação escolar: há segurança na produção de alimentos em escolas de Salvador (Bahia)? **Revista de Nutrição**, Campinas, v. 23, n. 5, p. 801-811, set./out. 2010.",
    tipo: "Estudo transversal com visitas de inspeção a 235 escolas estaduais e municipais de Salvador (BA) atendidas pelo Programa Nacional de Alimentação Escolar (PNAE), de maio a dezembro de 2005.",
    objetivo: "Avaliar a segurança da produção de alimentos nas escolas atendidas pelo PNAE.",
    metodo:
      "Os pesquisadores aplicaram um formulário do tipo *check-list*, baseado na Resolução RDC nº 216/2004 da Anvisa, com nove blocos (edificação, higienização, pragas, água, resíduos, manipuladores, matérias-primas, preparo e exposição dos alimentos). Conforme a pontuação, cada escola foi classificada como crítica, insatisfatória, regular, boa ou excelente.",
    resultados:
      "57,0% das escolas (134) ficaram na faixa insatisfatória, 42,6% (100) na regular e só 0,4% (1) na boa. Em 96,6% das cantinas não havia lavatório de mãos na área de manipulação e em 98,3% faltava sabonete líquido. 88,1% dos manipuladores não faziam a antissepsia das mãos antes de servir, 80,9% das escolas não ofereciam capacitação semestral e 74,5% não tinham refeitório. Em 46,0% foram vistos insetos ou vestígios deles na área de produção.",
    conclusao:
      "A produção das refeições não atendia aos requisitos de segurança de alimentos e envolvia riscos à saúde dos estudantes. Os autores indicam a necessidade de medidas de intervenção para garantir a qualidade do serviço.",
    citacao:
      "O objetivo declarado do estudo foi “Avaliar a segurança da produção de alimentos em escolas atendidas pelo Programa Nacional de Alimentação Escolar, em Salvador (BA)” (Cardoso *et al.*, 2010, p. 801).",
    comentario:
      "Aqui ficou evidente que o problema não está em quem cozinha. Não dá para cobrar mãos limpas de quem trabalha em uma cozinha sem pia e sem sabonete. Os dados são de 2005 e de uma única cidade, então não servem para julgar todas as escolas do país, mas o *check-list* usado pelos autores é um bom modelo para olhar qualquer cantina, inclusive a nossa.",
    doi: "https://doi.org/10.1590/S1415-52732010000500010",
    qr: "qr3_merenda.png",
  },
  {
    id: "ficha4",
    via: "Mãos",
    titulo: "Ficha de estudo 4 – Higienização das mãos",
    fonteCit: "Costa *et al.* (2023)",
    ref: "COSTA, Michael Gabarron *et al.* Atividade lúdica com robô para higienização das mãos de estudantes do ensino fundamental: estudo quase-experimental. **Revista Gaúcha de Enfermagem**, Porto Alegre, v. 44, e20220344, 2023.",
    tipo: "Estudo quase-experimental (antes e depois) com 203 estudantes da 3ª à 5ª série de duas escolas municipais de Álvares Machado (SP), realizado em 2019.",
    objetivo:
      "Avaliar a efetividade da higienização das mãos depois de uma atividade educativa com um robô tutor.",
    metodo:
      "Cada estudante espalhou nas mãos uma solução alcoólica marcada com fluoresceína, primeiro do jeito que já sabia e depois seguindo um robô programado em Arduino, que orientava por voz e por texto os seis passos recomendados pela Organização Mundial da Saúde. As mãos foram fotografadas em uma câmara escura com luz negra e a área coberta pela solução foi medida nas imagens.",
    resultados:
      "Antes da atividade, a solução cobria 55,2% do dorso da mão direita, contra 87,5% da palma. Depois do robô, todas as condições melhoraram: no dorso da mão direita, a cobertura passou de 61,1% para 76,8% entre estudantes da área urbana e de 49,5% para 75,9% entre os da área rural. Sexo e mão dominante não fizeram diferença no desempenho.",
    conclusao:
      "A atividade com o robô tutor foi um recurso importante de educação em saúde sobre higienização das mãos e pode ser testada em outros cenários e populações.",
    citacao:
      "“Todas as condições estudadas melhoraram o processo de higienização das mãos após atividade com o robô tutor” (Costa *et al.*, 2023, p. 1).",
    comentario:
      "Foi o estudo de que mais gostamos, porque transforma o invisível em imagem. Todo mundo acha que sabe lavar as mãos, mas quase metade do dorso ficava de fora. O artigo mede a técnica com solução alcoólica, não a quantidade de micróbios, e a amostra ficou abaixo do tamanho planejado pelos autores (203 de 246 estudantes). Ainda assim, mostra que ensinar o passo a passo funciona melhor do que apenas mandar lavar.",
    doi: "https://doi.org/10.1590/1983-1447.2023.20220344.pt",
    qr: "qr4_maos.png",
  },
  {
    id: "ficha5",
    via: "Ar",
    titulo: "Ficha de estudo 5 – Qualidade do ar das salas de aula",
    fonteCit: "Ferreira e Cardoso (2013)",
    ref: "FERREIRA, Ana Maria Conceição; CARDOSO, Salvador Massano. Estudo exploratório da qualidade do ar em escolas de educação básica, Coimbra, Portugal. **Revista de Saúde Pública**, São Paulo, v. 47, n. 6, p. 1059-1068, dez. 2013.",
    tipo: "Estudo exploratório com medições no local, em 51 escolas de educação básica de Coimbra, Portugal (81 salas de aula e 1.019 crianças), entre novembro de 2010 e junho de 2011.",
    objetivo:
      "Analisar a qualidade do ar das escolas e suas condições estruturais e funcionais.",
    metodo:
      "Com aparelhos portáteis, os autores mediram temperatura, umidade e a concentração de dióxido de carbono (CO₂), monóxido de carbono, ozônio, compostos orgânicos voláteis, formaldeído e material particulado, dentro e fora das salas, no outono/inverno e na primavera/verão. As medições foram feitas durante as aulas, na altura em que os alunos respiram quando estão sentados.",
    resultados:
      "Em 47 das 51 escolas a concentração média de CO₂ dentro das salas estava acima do limite de referência da legislação portuguesa (984 ppm). A maior média chegou a 1.942 ppm e o maior pico, a 5.320 ppm. Nenhuma escola tinha sistema mecânico de ventilação; o ar só era renovado ao abrir portas e janelas. As salas que mantinham portas e janelas abertas e tinham menos alunos apresentaram os melhores valores.",
    conclusao:
      "Havia mais poluentes dentro das salas do que fora delas, e a ventilação inadequada está associada à concentração elevada de CO₂.",
    citacao:
      "“Houve maior concentração de poluentes no interior das salas, comparativamente com o exterior” (Ferreira; Cardoso, 2013, p. 1059).",
    comentario:
      "O CO₂ vem da nossa própria respiração e, no estudo, funciona como um indicador: quanto mais alto, menos o ar da sala está sendo renovado. É importante dizer que os autores não mediram microrganismos no ar, por falta de recursos, e que a pesquisa é de Portugal, onde as salas ficam fechadas por causa do frio. No nosso clima, o que fecha a sala é o ar-condicionado, e por isso achamos que a pergunta do artigo vale também para cá.",
    doi: "https://doi.org/10.1590/S0034-8910.2013047004810",
    qr: "qr5_ar.png",
  },
];

// --------------------------------------------------------------------------
// Referencias (ordem alfabetica, NBR 6023:2018)
// --------------------------------------------------------------------------
exports.referencias = [
  "BRASIL. Agência Nacional de Vigilância Sanitária. Resolução RDC nº 216, de 15 de setembro de 2004. Dispõe sobre Regulamento Técnico de Boas Práticas para Serviços de Alimentação. **Diário Oficial da União**: seção 1, Brasília, DF, 16 set. 2004.",
  "BRASIL. Decreto nº 6.286, de 5 de dezembro de 2007. Institui o Programa Saúde na Escola – PSE, e dá outras providências. **Diário Oficial da União**: seção 1, Brasília, DF, 6 dez. 2007.",
  "BRASIL. Ministério da Saúde. Portaria GM/MS nº 888, de 4 de maio de 2021. Altera o Anexo XX da Portaria de Consolidação GM/MS nº 5, de 28 de setembro de 2017, para dispor sobre os procedimentos de controle e de vigilância da qualidade da água para consumo humano e seu padrão de potabilidade. **Diário Oficial da União**: seção 1, Brasília, DF, 7 maio 2021.",
  "CARDOSO, Ryzia de Cassia Vieira *et al.* Programa nacional de alimentação escolar: há segurança na produção de alimentos em escolas de Salvador (Bahia)? **Revista de Nutrição**, Campinas, v. 23, n. 5, p. 801-811, set./out. 2010. DOI: https://doi.org/10.1590/S1415-52732010000500010. Disponível em: https://www.scielo.br/j/rn/a/zb4zzwdB5RnHbjyhFcXnmgC/. " + ACESSO,
  "COSTA, Michael Gabarron *et al.* Atividade lúdica com robô para higienização das mãos de estudantes do ensino fundamental: estudo quase-experimental. **Revista Gaúcha de Enfermagem**, Porto Alegre, v. 44, e20220344, 2023. DOI: https://doi.org/10.1590/1983-1447.2023.20220344.pt. Disponível em: https://www.scielo.br/j/rgenf/a/MLpM8BB6WpnsSfsgnqpC7fs/. " + ACESSO,
  "FERREIRA, Ana Maria Conceição; CARDOSO, Salvador Massano. Estudo exploratório da qualidade do ar em escolas de educação básica, Coimbra, Portugal. **Revista de Saúde Pública**, São Paulo, v. 47, n. 6, p. 1059-1068, dez. 2013. DOI: https://doi.org/10.1590/S0034-8910.2013047004810. Disponível em: https://www.scielo.br/j/rsp/a/cv3XqSrMrgyBrcPbRL8GV3f/. " + ACESSO,
  "GIL, Antonio Carlos. **Como elaborar projetos de pesquisa**. 6. ed. São Paulo: Atlas, 2017.",
  "MARCONI, Marina de Andrade; LAKATOS, Eva Maria. **Fundamentos de metodologia científica**. 8. ed. São Paulo: Atlas, 2017.",
  "MORAES, Maria Suiane de *et al.* Avaliação microbiológica de fontes de água de escolas públicas e privadas da cidade de Santa Rita (PB). **Engenharia Sanitária e Ambiental**, Rio de Janeiro, v. 23, n. 3, p. 431-435, maio/jun. 2018. DOI: https://doi.org/10.1590/S1413-41522018159099. Disponível em: https://www.scielo.br/j/esa/a/PgsBtJyXMbFhBMJrWpcGVsp/. " + ACESSO,
  "NATIONAL INSTITUTE OF ALLERGY AND INFECTIOUS DISEASES. **E. coli bacteria**. 2002. 1 micrografia eletrônica de varredura. Imagem em domínio público. Disponível em: https://commons.wikimedia.org/wiki/File:E._coli_Bacteria_(7316101966).jpg. " + ACESSO,
  "NUNES, Cáris M. *et al.* Ocorrência de larva migrans na areia de áreas de lazer das escolas municipais de ensino infantil, Araçatuba, SP, Brasil. **Revista de Saúde Pública**, São Paulo, v. 34, n. 6, p. 656-658, dez. 2000. DOI: https://doi.org/10.1590/S0034-89102000000600015. Disponível em: https://www.scielo.br/j/rsp/a/6MR3dxSxnyjs6ZzTwgd3ZsN/. " + ACESSO,
];

// --------------------------------------------------------------------------
// Corpo do texto. Tipos de bloco:
// h1/h2/h3, p, cit (citacao longa), alineas, fig, quadro, ficha
// --------------------------------------------------------------------------
const AUT = "Fonte: elaborada pelos autores (2026)";
const AUTQ = "Fonte: elaborado pelos autores (2026)";

exports.corpo = [
  { h1: "1 INTRODUÇÃO", id: "s1" },
  { p: "Quem estuda em tempo integral passa mais horas acordado na escola do que em casa. É na escola que bebemos água do bebedouro, almoçamos, dividimos carteiras, cadernos e celulares, usamos o mesmo banheiro que centenas de colegas e ficamos horas na mesma sala, com as janelas fechadas por causa do ar-condicionado. Nada disso parece perigoso, justamente porque quase nada do que contamina pode ser visto." },
  { p: "Em um dos estudos que lemos para este trabalho, os pesquisadores precisaram usar uma solução fluorescente e uma câmara com luz negra para enxergar as partes das mãos que os alunos deixavam de higienizar (Costa *et al.*, 2023). A imagem ficou na cabeça do grupo: e se fosse possível acender uma luz negra sobre a escola inteira? O que apareceria na água, na areia do pátio, na cozinha, nas mãos e no ar?" },
  { p: "Neste trabalho, chamamos de contaminação a presença, em um ambiente, de agentes capazes de prejudicar a saúde de quem o frequenta. Esses agentes podem ser biológicos, como bactérias e parasitas, ou químicos e físicos, como gases e partículas em suspensão. Crianças e adolescentes são considerados um grupo de risco para doenças transmitidas pela água e pelos alimentos (Moraes *et al.*, 2018; Cardoso *et al.*, 2010), e as doenças infecciosas podem se espalhar rapidamente no ambiente escolar, como se viu na pandemia de gripe H1N1, em 2009 (Costa *et al.*, 2023)." },
  { p: "Para responder a essas perguntas sem sair do que a ciência já publicou, fizemos uma pesquisa bibliográfica na biblioteca eletrônica SciELO e organizamos o que encontramos em cinco fichas de estudo, uma para cada caminho pelo qual a contaminação pode chegar ao estudante: a água, o solo, os alimentos, as mãos e o ar." },

  { h2: "1.1 PROBLEMA DE PESQUISA", id: "s1_1" },
  { p: "Por quais caminhos a contaminação chega aos estudantes dentro da escola e quais medidas, apontadas pela literatura científica, podem reduzir esse risco?" },

  { h2: "1.2 JUSTIFICATIVA", id: "s1_2" },
  { p: "O tema nos interessa primeiro porque fala da nossa rotina. Somos nós que usamos o bebedouro, o refeitório e as salas de aula todos os dias. Entender como a contaminação acontece é uma forma de cuidar de nós mesmos e de quem estuda conosco, principalmente dos alunos menores, que levam a mão à boca com mais frequência e brincam no chão." },
  { p: "Há também uma razão social. O Programa Nacional de Alimentação Escolar atende cerca de 36 milhões de estudantes brasileiros (Cardoso *et al.*, 2010). Quando a água ou a merenda de uma escola não são seguras, o problema deixa de ser individual e passa a atingir muita gente ao mesmo tempo, com reflexo em faltas e no rendimento escolar." },
  { p: "Por fim, o tema combina com a proposta da unidade curricular Aplicando Conhecimentos e Propondo Soluções. Os artigos que lemos, além de apontarem problemas, indicam medidas simples e baratas, que podem ser discutidas com a gestão da escola e colocadas em prática pelos próprios alunos." },

  { h2: "1.3 OBJETIVOS", id: "s1_3" },
  { h3: "1.3.1 Objetivo geral", id: "s1_3_1" },
  { p: "Compreender, com base em artigos científicos, por quais vias a contaminação ocorre dentro do ambiente escolar e quais medidas de prevenção são recomendadas." },
  { h3: "1.3.2 Objetivos específicos", id: "s1_3_2" },
  { p: "São objetivos específicos deste trabalho:" },
  { alineas: [
    "selecionar, na SciELO, cinco estudos sobre contaminação dentro de escolas;",
    "registrar cada estudo em uma ficha, com referência, objetivo, método, resultados e comentário crítico;",
    "comparar as fichas e identificar o que as cinco vias têm em comum;",
    "propor medidas de prevenção aplicáveis a uma escola como a nossa.",
  ] },

  { h1: "2 REFERENCIAL TEÓRICO", id: "s2" },
  { p: "Esta seção reúne os conceitos de que precisamos para ler os artigos: o que os pesquisadores procuram quando avaliam um ambiente, por quais vias um contaminante chega ao corpo e o que as normas brasileiras exigem das escolas." },

  { h2: "2.1 CONTAMINAÇÃO E AMBIENTE ESCOLAR", id: "s2_1" },
  { p: "Não é possível procurar, um por um, todos os microrganismos que podem existir em uma amostra de água. Por isso, os laboratórios trabalham com indicadores, que são organismos fáceis de detectar e que denunciam a presença de sujeira ou de fezes. Os mais usados são os coliformes totais e os coliformes termotolerantes (Moraes *et al.*, 2018). Dentro desse grupo está a bactéria *Escherichia coli* (Figura 1), que vive no intestino do ser humano e de outros animais de sangue quente. Quando ela aparece na água, é sinal de que houve contato com material fecal." },
  { fig: {
    n: 1, id: "fig1", arquivo: "fig2_ecoli.jpg", tipo: "jpg", largCm: 11, prop: 0.62,
    titulo: "Bactérias *Escherichia coli* vistas ao microscópio eletrônico de varredura",
    fonte: "Fonte: National Institute of Allergy and Infectious Diseases (2002).",
  } },
  { p: "A mesma lógica vale para os outros ambientes. Na areia, procuram-se ovos e larvas de parasitas deixados por fezes de cães e gatos (Nunes *et al.*, 2000). Na cozinha, avaliam-se as condições que permitem a um alimento se contaminar, como a falta de pia ou de controle de temperatura (Cardoso *et al.*, 2010). No ar, mede-se o dióxido de carbono, que indica se o ar da sala está sendo renovado (Ferreira; Cardoso, 2013). Em todos os casos, o que se mede é um sinal de que as barreiras de proteção falharam." },
  { p: "A escola merece atenção especial porque reúne, no mesmo espaço e por muitas horas, um grande número de pessoas jovens. Ferreira e Cardoso (2013) lembram que as crianças passam pelo menos um terço do seu tempo dentro dos edifícios escolares. Moraes *et al.* (2018) descrevem a escola como a segunda casa do estudante, e é nessa segunda casa que os cuidados costumam depender de muita gente ao mesmo tempo." },

  { h2: "2.2 CINCO VIAS DE CONTAMINAÇÃO", id: "s2_2" },
  { p: "A partir das leituras, organizamos a contaminação escolar em cinco vias, resumidas na Figura 2. Cada via tem uma origem diferente dentro da escola e uma porta de entrada diferente no corpo." },
  { fig: {
    n: 2, id: "fig2", arquivo: "fig1_caminhos.png", tipo: "png", largCm: 14.5,
    titulo: "Cinco vias de contaminação no ambiente escolar",
    fonte: AUT + ".",
  } },
  { p: "A água e os alimentos entram pelo mesmo caminho, a ingestão, e por isso costumam causar doenças gastrointestinais. O solo contaminado age principalmente pelo contato com a pele, como acontece com a larva migrans cutânea. As mãos funcionam como uma ponte: carregam para a boca, para os olhos e para os objetos aquilo que tocaram antes. Já o ar leva para os pulmões os gases e as partículas que se acumulam em salas cheias e fechadas." },

  { h2: "2.3 O QUE A LEGISLAÇÃO BRASILEIRA PREVÊ", id: "s2_3" },
  { p: "O cuidado com a saúde dentro da escola não depende só de boa vontade. O Decreto nº 6.286/2007 instituiu o Programa Saúde na Escola, que tem a finalidade de contribuir para a formação integral dos estudantes da rede pública de educação básica por meio de ações de prevenção, promoção e atenção à saúde (Brasil, 2007)." },
  { p: "Para a merenda, a referência é a Resolução RDC nº 216/2004, da Agência Nacional de Vigilância Sanitária, que estabelece as boas práticas para serviços de alimentação (Brasil, 2004). Foi com base nela que Cardoso *et al.* (2010) montaram o formulário usado para avaliar as cantinas de Salvador." },
  { p: "Para a água, a norma que hoje define o padrão de potabilidade é a Portaria GM/MS nº 888/2021 (Brasil, 2021). O estudo de Moraes *et al.* (2018) usou a portaria que estava em vigor na época da pesquisa, a nº 2.914/2011. Nos dois casos, a ideia central é a mesma: a água oferecida para consumo humano não pode apresentar sinais de contaminação fecal." },

  { h1: "3 METODOLOGIA", id: "s3" },
  { p: "Este trabalho é uma pesquisa bibliográfica, isto é, uma pesquisa desenvolvida com base em material já publicado, como livros e artigos científicos (Gil, 2017). A abordagem é qualitativa e o objetivo é exploratório: o grupo não coletou amostras nem fez medições, mas leu, organizou e comparou resultados de outros pesquisadores." },
  { p: "A busca foi feita em novembro de 2026 na biblioteca eletrônica SciELO, escolhida por reunir periódicos científicos de acesso aberto e em língua portuguesa. Usamos combinações de palavras ligadas a cada via, como “água de bebedouros em escolas”, “areia de escolas e parasitas”, “higiene da alimentação escolar”, “higienização das mãos de escolares” e “qualidade do ar em escolas”." },
  { p: "Entraram na seleção os artigos que atendiam aos seguintes critérios:" },
  { alineas: [
    "texto completo disponível gratuitamente e em português;",
    "coleta de dados realizada dentro de escolas de educação básica;",
    "apresentação de resultados próprios, e não apenas revisão de outros trabalhos;",
    "relação direta com uma das cinco vias, ficando um estudo para cada via.",
  ] },
  { p: "Os cinco artigos selecionados estão no Quadro 1. Cada um foi lido na íntegra e registrado em uma ficha de estudo. O fichamento é uma técnica de registro que ajuda a guardar, de forma organizada, as ideias principais e os dados de uma obra (Marconi; Lakatos, 2017). Todas as fichas têm os mesmos campos: referência, tipo de estudo e local, objetivo, método, resultados, conclusão dos autores e uma citação direta. O comentário do grupo vem logo depois, junto de um gráfico." },
  { quadro: {
    n: 1, id: "q1", titulo: "Artigos selecionados para as fichas de estudo",
    fonte: AUTQ + ".",
    larguras: [1300, 2500, 2871, 2400],
    cabecalho: ["Via", "Autores e ano", "Periódico", "Local do estudo"],
    linhas: [
      ["Água", "Moraes *et al.* (2018)", "Engenharia Sanitária e Ambiental", "Santa Rita (PB)"],
      ["Solo", "Nunes *et al.* (2000)", "Revista de Saúde Pública", "Araçatuba (SP)"],
      ["Alimentos", "Cardoso *et al.* (2010)", "Revista de Nutrição", "Salvador (BA)"],
      ["Mãos", "Costa *et al.* (2023)", "Revista Gaúcha de Enfermagem", "Álvares Machado (SP)"],
      ["Ar", "Ferreira e Cardoso (2013)", "Revista de Saúde Pública", "Coimbra (Portugal)"],
    ],
  } },

  { h1: "4 FICHAS DE ESTUDO", id: "s4" },
  { p: "As fichas seguem a ordem das vias da Figura 2. Depois de cada uma vêm um gráfico feito pelo grupo e o nosso comentário. O código QR leva ao artigo original." },

  { h2: "4.1 ÁGUA: O BEBEDOURO EM QUE TODO MUNDO CONFIA", id: "s4_1" },
  { p: "O primeiro estudo analisou a água que sai dos bebedouros de doze escolas da Paraíba (Quadro 2)." },
  { ficha: 0, n: 2 },
  { p: "A Figura 3 reúne os dois resultados que, para nós, contam a história completa: de um lado, a água reprovada; de outro, a frequência com que as caixas-d'água eram limpas. Metade das escolas limpava o reservatório em intervalos maiores que dois anos ou nem sabia informar quando tinha sido a última limpeza." },
  { fig: {
    n: 3, id: "fig3", arquivo: "fig3_agua.png", tipo: "png", largCm: 15,
    titulo: "Amostras de água fora do padrão e frequência de limpeza dos reservatórios em 12 escolas de Santa Rita (PB)",
    fonte: "Fonte: elaborada pelos autores (2026), com dados de Moraes *et al.* (2018).",
  } },
  { comentario: 0 },

  { h2: "4.2 SOLO: O QUE FICA NA AREIA DO PARQUINHO", id: "s4_2", novaPagina: true },
  { p: "O segundo estudo procurou parasitas na areia em que as crianças brincam, em todas as escolas municipais de ensino infantil de uma cidade do interior de São Paulo (Quadro 3)." },
  { ficha: 1, n: 3 },
  { p: "Como mostra a Figura 4, as larvas apareceram nas duas estações do ano. O parasita não depende do calor do verão para estar presente; basta que os animais tenham acesso à areia." },
  { fig: {
    n: 4, id: "fig4", arquivo: "fig4_areia.png", tipo: "png", largCm: 10.5,
    titulo: "Escolas com larvas de *Ancylostoma* spp. na areia, por estação do ano, em Araçatuba (SP)",
    fonte: "Fonte: elaborada pelos autores (2026), com dados de Nunes *et al.* (2000).",
  } },
  { comentario: 1 },

  { h2: "4.3 ALIMENTOS: A COZINHA POR TRÁS DA MERENDA", id: "s4_3", novaPagina: true },
  { p: "O terceiro estudo é o maior da nossa seleção. Em vez de analisar a comida pronta, os pesquisadores visitaram 235 cozinhas escolares para observar as condições em que a merenda era preparada (Quadro 4)." },
  { ficha: 2, n: 4 },
  { p: "Nenhuma das 235 escolas alcançou a classificação excelente e apenas uma chegou à faixa boa (Figura 5). O dado de que mais de 96% das cantinas não tinham lavatório de mãos na área de manipulação ajuda a entender por quê." },
  { fig: {
    n: 5, id: "fig5", arquivo: "fig5_merenda.png", tipo: "png", largCm: 14.5,
    titulo: "Classificação higiênico-sanitária de 235 cantinas escolares de Salvador (BA)",
    fonte: "Fonte: elaborada pelos autores (2026), com dados de Cardoso *et al.* (2010).",
  } },
  { comentario: 2 },

  { h2: "4.4 MÃOS: A PARTE QUE NINGUÉM LAVA", id: "s4_4", novaPagina: true },
  { p: "O quarto estudo é o mais recente e o único que testou uma solução, em vez de apenas medir um problema (Quadro 5)." },
  { ficha: 3, n: 5 },
  { p: "A Figura 6 compara o dorso da mão direita antes e depois da atividade. Os estudantes da área rural começaram com o pior resultado e, depois do robô, praticamente alcançaram os da área urbana. Para nós, isso mostra que a diferença inicial era de oportunidade de aprender, e não de capacidade." },
  { fig: {
    n: 6, id: "fig6", arquivo: "fig6_maos.png", tipo: "png", largCm: 12,
    titulo: "Área do dorso da mão direita coberta pela solução fluorescente, antes e depois da atividade com o robô tutor",
    fonte: "Fonte: elaborada pelos autores (2026), com dados de Costa *et al.* (2023).",
  } },
  { comentario: 3 },

  { h2: "4.5 AR: O QUE SE ACUMULA NA SALA FECHADA", id: "s4_5", novaPagina: true },
  { p: "O quinto estudo saiu do Brasil. Ele foi publicado em uma revista brasileira, mas as medições foram feitas em escolas portuguesas (Quadro 6)." },
  { ficha: 4, n: 6 },
  { p: "A Figura 7 compara o limite de referência usado pelos autores com os valores medidos. O maior pico registrado foi mais de cinco vezes superior ao limite." },
  { fig: {
    n: 7, id: "fig7", arquivo: "fig7_ar.png", tipo: "png", largCm: 13,
    titulo: "Concentração de dióxido de carbono em salas de aula de Coimbra (Portugal), em comparação com o limite de referência",
    fonte: "Fonte: elaborada pelos autores (2026), com dados de Ferreira e Cardoso (2013).",
  } },
  { comentario: 4 },

  { h1: "5 DISCUSSÃO", id: "s5" },
  { p: "Lidas separadamente, as fichas tratam de assuntos distantes: bactérias na água, larvas na areia, pias na cozinha, um robô que ensina a lavar as mãos e um gás na sala de aula. Lidas em conjunto, elas contam quase a mesma história. O Quadro 7 coloca os cinco estudos lado a lado." },
  { quadro: {
    n: 7, id: "q7", titulo: "Síntese das cinco fichas de estudo",
    fonte: AUTQ + ", com base nos artigos fichados.",
    larguras: [1250, 2700, 2600, 2521],
    cabecalho: ["Via", "O que foi encontrado", "Causa apontada pelos autores", "Medida indicada"],
    linhas: [
      ["Água", "Coliformes totais em 100% das amostras", "Caixas-d'água, filtros e bebedouros sem limpeza e sem manutenção", "Limpeza periódica e monitoramento da água"],
      ["Solo", "Larvas de *Ancylostoma* spp. em até 46,4% das escolas", "Acesso de gatos às áreas de areia", "Impedir o acesso de animais à areia"],
      ["Alimentos", "57,0% das cantinas em condição insatisfatória", "Estrutura precária e falta de capacitação dos manipuladores", "Adequar as cozinhas e capacitar as equipes"],
      ["Mãos", "Só 55,2% do dorso da mão coberto", "Estudantes não conheciam a técnica correta", "Ensinar o passo a passo de forma lúdica"],
      ["Ar", "CO₂ acima do limite em 47 de 51 escolas", "Salas cheias e sem renovação de ar", "Abrir janelas e monitorar o ar"],
    ],
  } },
  { p: "O primeiro ponto em comum é que, em nenhum dos estudos, a contaminação veio de um acidente raro. Ela apareceu onde faltava uma rotina de cuidado: a caixa-d'água que ninguém lembrava de limpar, a areia sem proteção, a cozinha sem pia, a mão lavada pela metade, a janela que ficava fechada. No caso da coluna “Medida indicada”, vale um esclarecimento: no estudo da areia, os autores apontam o acesso dos gatos como a causa, e a medida de impedir esse acesso é uma conclusão nossa a partir do que eles descrevem." },
  { p: "O segundo ponto é que a responsabilidade raramente é de uma pessoa só. Cardoso *et al.* (2010) encontraram manipuladores de alimentos que não higienizavam as mãos antes de servir, mas encontraram também cozinhas em que não havia lavatório, sabonete nem papel. Moraes *et al.* (2018) relatam que o cloro era manuseado por pessoas sem preparo para isso. Antes de cobrar comportamento, é preciso oferecer condição." },
  { p: "O terceiro ponto é a desigualdade. No estudo das mãos, os estudantes da área rural tiveram desempenho inicial pior que os da área urbana (Costa *et al.*, 2023). No estudo da merenda, os autores comparam seus resultados com os de uma pesquisa feita em Curitiba e interpretam o contraste como sinal de diferenças importantes na forma como o programa de alimentação escolar funciona no Nordeste e no Sul do país (Cardoso *et al.*, 2010). A contaminação não se distribui de maneira igual entre as escolas." },
  { p: "Por último, os estudos mostram que medir muda a conversa. Enquanto a água parece limpa e a mão parece lavada, ninguém vê motivo para agir. Foi a análise de laboratório, o *check-list* e a luz negra que transformaram uma impressão em um dado. Essa é, para o grupo, a principal contribuição da ciência para o tema." },

  { h1: "6 PROPOSTAS DE SOLUÇÃO", id: "s6" },
  { p: "A unidade curricular pede que o conhecimento seja aplicado. Com base nas fichas, o grupo propõe cinco ações que cabem na realidade de uma escola e que podem ser discutidas com a gestão, com os professores e com o grêmio estudantil:" },
  { alineas: [
    "água: pedir à gestão o registro da última limpeza da caixa-d'água e da troca dos filtros dos bebedouros, e sugerir que essas datas fiquem em um aviso ao lado de cada bebedouro;",
    "solo: verificar se as áreas de areia e de terra ficam protegidas do acesso de animais quando não estão em uso;",
    "alimentos: conferir, com a equipe da cozinha, se há lavatório, sabonete líquido e papel-toalha na área de preparo, usando os blocos da RDC nº 216/2004 como roteiro;",
    "mãos: organizar com as turmas menores uma oficina de higienização das mãos com tinta ou gel fluorescente e luz negra, inspirada no estudo de Costa *et al.* (2023);",
    "ar: combinar com os professores a abertura de portas e janelas nos intervalos, principalmente nas salas com ar-condicionado e mais cheias.",
  ] },
  { p: "A primeira ação segue diretamente a recomendação feita pelos autores do estudo da água:" },
  { cit: "Sugere-se um rigoroso controle de qualidade e a adoção de boas práticas, tais como tratamento da água, limpezas periódicas e manutenção dos reservatórios, filtros e bebedouros, bem como medidas preventivas e corretivas para manutenção da higiene e do controle microbiológico dos reservatórios de água, de forma a ser disponibilizada água com qualidade (Moraes *et al.*, 2018, p. 431)." },
  { p: "Para dar o primeiro passo, montamos um roteiro de observação (Apêndice A) com doze itens tirados dos próprios artigos. Ele pode ser preenchido em uma caminhada pela escola e serve como ponto de partida para uma futura pesquisa de campo, na qual o grupo deixaria de ler dados de outras escolas para produzir os da sua." },

  { h1: "7 CONSIDERAÇÕES FINAIS", id: "s7" },
  { p: "Começamos este trabalho imaginando o que uma luz negra revelaria se fosse acesa sobre a escola. Os cinco artigos que fichamos funcionaram como essa luz. Eles mostraram coliformes na água de todos os bebedouros analisados em Santa Rita, larvas na areia de quase metade das escolas infantis de Araçatuba, cozinhas sem pia em Salvador, mãos higienizadas pela metade em Álvares Machado e salas com o ar saturado em Coimbra." },
  { p: "O objetivo geral foi alcançado: identificamos cinco vias pelas quais a contaminação chega ao estudante e, para cada uma, as medidas de prevenção indicadas pela literatura. A resposta ao nosso problema de pesquisa é que a contaminação escolar percorre caminhos comuns do dia a dia e que as soluções passam por manutenção, estrutura e educação, três coisas que dependem de decisão e de rotina." },
  { p: "O trabalho tem limites. Cinco artigos não representam tudo o que já foi publicado sobre o assunto. Os estudos foram feitos em épocas e lugares diferentes, entre 1997 e 2019, um deles vem de Portugal e nenhum foi realizado no Pará. Por isso, os resultados devem ser lidos como exemplos bem documentados de cada via, e não como um retrato de todas as escolas. Não sabemos, portanto, como está a nossa própria escola. Essa é a pergunta que fica para a continuação da pesquisa, e o roteiro do Apêndice A foi pensado para começar a respondê-la." },
  { p: "Fica também um aprendizado sobre o método. Fichar um artigo obriga a separar o que os autores mediram do que eles concluíram e do que nós achamos. Fazer essa separação cinco vezes mudou a forma como o grupo lê uma notícia, um gráfico ou uma afirmação sobre saúde." },
];

// --------------------------------------------------------------------------
// Apendice A
// --------------------------------------------------------------------------
exports.apendice = {
  id: "apA",
  titulo: "APÊNDICE A – ROTEIRO DE OBSERVAÇÃO DA ESCOLA",
  intro:
    "Roteiro elaborado pelo grupo a partir dos artigos fichados. Para cada item, marque Sim ou Não e anote o que foi observado.",
  larguras: [1350, 4821, 650, 650, 1600],
  cabecalho: ["Via", "O que observar", "Sim", "Não", "Observações"],
  linhas: [
    ["Água", "A data da última limpeza da caixa-d'água é conhecida e tem menos de seis meses?"],
    ["Água", "Os filtros dos bebedouros têm registro de troca?"],
    ["Água", "As torneiras dos bebedouros estão inteiras e limpas?"],
    ["Solo", "As áreas de areia ou terra ficam protegidas do acesso de cães e gatos?"],
    ["Solo", "A areia é trocada ou revolvida com alguma frequência?"],
    ["Alimentos", "Há lavatório de mãos, sabonete líquido e papel-toalha na área de preparo da merenda?"],
    ["Alimentos", "A equipe da cozinha recebeu capacitação no último semestre?"],
    ["Alimentos", "Existe refeitório, com mesas limpas, para os alunos comerem?"],
    ["Mãos", "Os banheiros dos alunos têm sabonete e papel para secar as mãos?"],
    ["Mãos", "Há pia disponível perto do local onde os alunos lancham?"],
    ["Ar", "As salas ficam com portas e janelas abertas em algum momento do turno?"],
    ["Ar", "Os filtros dos aparelhos de ar-condicionado têm registro de limpeza?"],
  ],
};
