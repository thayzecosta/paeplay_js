#!/usr/bin/node

export async function input(frase){
    const prompt = require('prompt-sync')();
    let name = prompt(frase);
    console.log(`Sua resposta ${name}`);
    return name
}

export function range(_start_, _end_){
    var A = [];
    for (let i=_start_; i < (_end_); i++){
        A.push(i);
    };
    return A;
};
  
export const cartesianProduct = (arr1, arr2) => {
    const res = [];
    for(let i = 0; i < arr1.length; i++){
        for(let j = 0; j < arr2.length; j++){
            res.push(
               [arr1[i]].concat(arr2[j])
            );
        };
    };
    return res;
};

export function dict_player_role(names, roles){
    // sorteia os personagens para os jogadores e retorna um dict
    // com nome do jogador e personagem
    sorteio = {};
    new_list =  Object.keys(roles);
    const role = 'erro'
    for (let i = 1; i <= names.len; i++){
        // sorteia um personagem da lista
        role = new_list[Math.floor(Math.random() * new_list.length)];
    }
    sorteio[i] = role;
    let index = new_list.indexOf(role);
    // apaga item na posição index:
    new_list.splice(index, 1);
    return sorteio;
}
  
export function choose_places(lista) {
    // lista: lista de lugares disponíveis
    choice = lista[Math.floor(Math.random() * new_list.length)];
    new_list = lista.pop(index = choice)
    return choice, new_list
}
  
export function definir_anom_iniciais(game_status, deck_of_cards){
    // Anomalias da primeira rodada
    console.log(">>> Sorteio das anomalias iniciais");
    // const n_pinos = 3;
    tipo_pino = 'pinos_brancos';
  
    for (i == 0; i < 5; i++){
        // Sorteio do local
        cod_paeweb = game_status.sorteia_anomalia(deck_of_cards.locais, n_pinos, tipo_pino);
        local = parseInt(cod_paeweb.slice(0, 2));
        // Atribuicao de anomalia ao local
        game_status.local_tab[local]['anomalia'] = game_status.consulta_anomalia(cod_paeweb);
        console.log('---');
    };
    game_status.num_pinos_brancos -= 4
  }

export function definir_anomalia(game_status, deck_of_cards){
    // Anomalias de outras rodadas (não a primeira)
    pinos = range(1, 4);
    n_pinos =  pinos[Math.floor(Math.random() * new_list.length)];
    tipo_pino = 'pinos_brancos';
  
    // Sorteio do local
    cod_paeweb = game_status.sorteia_anomalia(deck_of_cards.locais, n_pinos, tipo_pino);
    local = parseInt(cod_paeweb(0, 2));
  
    // Atribuicao de anomalia ao local
    game_status.local_tab[local]['anomalia'] = game_status.consulta_anomalia(cod_paeweb);
    return cod_paeweb;
};
  
export function choose_action(){
    // Opções de ações
    arg = None;
    while (!(arg in ['a', 'b', 'c', 'd']) || arg == undefined){
        console.log(
            'Escolha uma opcao: \n' +
            'a - Movimentacao usual \n' +
            'b - Movimentacao com carta de jogo \n' +
            'c - Identificar anomalia \n' +
            'd - Utilizar habilidades \n')
    }
        arg = input();
        return arg;
};

