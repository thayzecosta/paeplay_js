/* Classe com o status do game */
import { range } from './funcoes.js';
// import { leitura } from './leitura.cjs';

export class GameStatus {
    constructor() {
      this.num_rodada = 0;
      this.players_positions = {};
      this.lista_locais = range(1, 44);
      this.num_pino_class_verde = 20;
      this.num_pino_class_amarelo = 15;
      this.num_pino_class_laranja = 10;
      this.num_pino_class_vermelho = 5;
  
      // PINOS DE ANOMALIAS PRETOS representam aquelas que já foram identificadas.
      // PINOS DE ANOMALIAS BRANCOS representam as anomalias que ainda não foram 
      // identificadas.
  
      this.num_pinos_brancos = 60;
      this.num_pinos_pretos = 60;
      this.num_pino_restr_azul = 4;
      this.num_pino_restr_verde = 8;
      this.num_pino_restr_laranja = 4;
      this.num_pino_restr_vermelho = 1;
      this.num_pino_reparo = 15;;
      this.num_pino_placon = 15;
      this.num_pino_simulado = 3;
      this.volume = 100;
      this.nivel_dagua = 'espera';
      this.comportas_abertas = 0;
      this.n_comportas = 3;
  
      // Os JOGADORES que operam as COMPORTAS devem contabilizar na
      // RÉGUA DE NÍVEL D’ÁGUA a perda de 01 VOLUME para cada COMPORTA
      // aberta initerruptamente durante 01 TURNO e depois iniciar os
      // 03 passos das jogadas descritos no Capítulo 5.
  
      this.agua = {
        'volume': 0,  // Máximo = 15
        'nivel': 0    // 5 níveis
      };
      this.local_tab = this.criar_tabuleiro();
      this.reparos = {};
      this.legendas_paeweb = {};
      this.treinamento = {
        'numero_treinamentos': 0,
        'numero_simulacoes': 0
      };
      this.treinamento_io = false;
      this.sirene = false;
      this.sirene_quebrada = false;
      this.gerador = false;  // Gerador ativado
      this.falha_energia = false;  // Falha de energia na casa de força
      this.falha_comunicacao = false;
  
      //	FALHA NA COMUNICAÇÃO INTERNA COM O C.O.S.: É colocado
      // um CONE na CASA DE FORÇA (LOCAL 06) para indicar a falta
      // de comunicação da EQUIPE DE PLANTÃO DE OPERAÇÃO HIDRÁULICA
      // com a EQUIPE LOCAL. Nessa situação, o primeiro fica impedido
      // de operar as COMPORTAS, até que a manutenção seja feita;
  
      this.falha_gerador = false;
      this.nivel_azul = false;
      this.defesa_civil_alertada = {
        "nivel_azul": false,
        "nivel_vermelho": false,
        "nivel_laranja": false
      };
      this.zas_alertada = {
        "nivel_azul": false,
        "nivel_vermelho": false,
        "laranja": false
      };
      // Comitê Diretivo de Gestão de Contingência:
      this.cdgc_alertado = {
        "nivel_vermelho": false
      }
    }
  
    update_nivel_agua() {
      volume = this.agua['volume']
      if (volume <= 3 && volume >= 0) {
        return 'minimo';
      }
      if (volume <= 6) {
        return 'espera';
      }
      if (volume <= 10) {
        return 'normal'
      };
      if (volume <= 12) {
        return 'maximorum'
      };
      if (volume <= 15) {
        return 'crista'
      }
      else {
        return 'Volume inválido'
      }
    };
  
    carrega_anomalias() {

        // var jsonData = JSON.parse(theTextContentOfMyFile);
/*
      cwd = os.getcwd();
      console.log("Diretório atual: " + cwd);
  
      // Abrindo json com as anomalias e os reparos
      cwd = cwd.replace('/classes', '');
      cwd = cwd.replace('/paeplay_python', '');
      f = open(cwd + '/paeplay_python/paeplay_python/data/planilha.json');

      var jsonData = JSON.parse(theTextContentOfMyFile);
  
      try {
        f = open(cwd + '/paeplay_python/data/planilha.json');
      }
      except Exception{
        f = open(cwd + '/data/planilha.json');
      }
      */
     
      // retorna JSON como um dicionário:
      // this.anomalias_reparos = json.load(f);
      this.anomalias_reparos = leitura('./planilha.json')
      
      // fecha o arquivo
      // f.close();
      // Abrindo lista de reparos
      // reparos = [];
      /*
      with open(cwd + '/paeplay_python/paeplay_python/data/reparos.txt') as f:
        lines = f.readlines();
        reparos.append(lines);
      for (let i = 0; i < reparos.len; i++) {
        this.reparos[i] = reparos[i];
      }
      // Transforma lista de codigos em dicionário
      for (let j = 0; j < this.anomalias_reparos.len; j++) {
        item = this.anomalias_reparos[i];
        this.legendas_paeweb[item['termos']] = item;
      }
      // Descomente aqui se quiser gerar um json
      with open(cwd + '/paeplay_python/paeplay_python/data/casa_npinos_reparo.json',
        'w') as myfile:
      json.dump(this.legendas_paeweb, myfile);
      return;
      */
  
    }

    criar_tabuleiro() {
      var local_tab = {};
      this.lista_locais.forEach(function (key) {
        local_tab[key] = {
          'pinos_brancos': 0,
          'pinos_pretos': 0,
          'anomalia': 'Não há anomalia aqui.',
          'identificado': false,
          'classificado': false,
          'sinal': false
        }
      });
      return local_tab;
    };
  
    sorteia_anomalia(cartas_locais, n_pinos, tipo_pino) {
      // tipo_pino pode ser 'pinos_brancos' ou 'pinos_pretos'
      local = random.choice(cartas_locais);
      if (tipo_pino == 'pinos_brancos') {
        this.num_pinos_brancos -= n_pinos;
      }
      else if (tipo_pino == 'pinos_pretos') {
        this.num_pinos_pretos -= n_pinos;
      };
      this.local_tab[local][tipo_pino] += n_pinos;
      console.log(" Local com anomalia: " + local.toString +
        ", com " + this.local_tab[local][tipo_pino].toString
        + " pinos.");
      if (local.len == 1) {
        cod_local = '0' + local.toString;
      }
      else {
        cod_local = local.toString;
      };
      n_pinos_anomalias = min(20, this.local_tab[local]['pinos_brancos'] +
        this.local_tab[local]['pinos_pretos']);
      if (n_pinos_anomalias.len == 1) {
        cod_anomalias = '0' + n_pinos_anomalias.toString;
      }
      else {
        cod_anomalias = n_pinos_anomalias.toString;
      };
      cod_paeweb = cod_local + '-' + cod_anomalias;
      console.log('Código PAEWEB: ' + cod_paeweb);
      return cod_paeweb;
    }
    
    consulta_anomalia(cod_paeweb) {
      leg = this.legendas_paeweb[cod_paeweb];
      // pattern = r"^\d{2}\-\d{2}$";
      // if (!(bool(re.match(pattern, cod_paeweb))){
      //    console.log("Código PAEWEB fora do padrão")
      //    return false
      //  }
      local = cod_paeweb.slice(0, 2);
      this.local_tab[parseInt(local)]['anomalia'] = leg['acao'];
      return leg['acao'];
    };
  
    consulta_classificacao(cod_paeweb) {
      // Testa se a classificação de resposta sugerida está correta '''
      leg = this.legendas_paeweb[cod_paeweb];
      local = cod_paeweb.slice(0, 2);
      n_pinos = parseInt(cod_paeweb.slice(3, 5));
  
      var teste_npinos = false;
      if (n_pinos == parseInt(local_tab[parseInt(local)]['pinos_brancos'])
        + parseInt(local_tab[parseInt(local)]['pinos_pretos'])) {
        teste_npinos = True;
      };
  
      if (!(teste_npinos)) {
        console.log("Número errado de pinos no código inserido.");
        console.log("Você perdeu uma ação.");
        return false;
      }
      cor = {
        '96': 'verde',
        '97': 'amarelo',
        '98': 'laranja',
        '99': 'vermelho'
      };
  
      clas = cod_paeweb.slice(6);
      console.log("Local: " + local);
      console.log("Número de pinos: " + n_pinos.toString());
      console.log("Classificação sugerida: " + cor[clas]);
      console.log("Resultado: " + leg['acao']);
      resposta = leg['resposta'];
  
      if (resposta) {
        this.local_tab[parseInt(local)]['resposta'] = resposta;
        this.local_tab[parseInt(local)]['sinal'] = cor[clas];
        return True;
      }
      else {
        console.log("Você perdeu uma ação.");
        return false;
      };
    };
  
    consulta_reparo(cod_paeweb) {
        // Testa se o reparo sugerido está correto
  
        leg = this.legendas_paeweb[cod_paeweb];
        local = cod_paeweb.slice(0, 2);
        n_pinos = cod_paeweb.slice(3, 5);
        n_reparo = cod_paeweb.slice(6);
  
        console.log("Local: " + local);
        console.log("Número de pinos: " + n_pinos);
        console.log("Reparo sugerido: " + this.reparos[n_reparo]);
        console.log("Resultado: " + leg['acao']);
        acao = leg['acao'];
  
        if(acao.slice(0,5) == "Parab"){
            return True;
        }
        else {
            return false;
        };
    };
  };