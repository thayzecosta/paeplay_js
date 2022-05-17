import { range, cartesianProduct } from './funcoes.js'
import { mov_possible } from './movimentacao'
import { GameStatus } from './movimentacao'


status = GameStatus()
movimentos = mov_possible()
    
let players = {
    1: 'Player1',
    2: 'Player2',
    3: 'Player3',
    4: 'Player4',
    5: 'Player5'
  };
  
let n_players = 5;

let cargos = {
    A: 'Coordenador executivo do PAE',
    B: 'Cordenador tecnico civil',
    C: 'Equipe de plantao de operacao hidraulica',
    D: 'Equipe de seguranca de barragens',
    E: 'Equipe local'
  };
var personagens = {};
const geometric = ['triangulo', 'circulo', 'quadrado'];
const locais = range(1, 44);
var initial_game_cards = cartesianProduct(geometric, locais);
// const lista_locais = range(1, 44);
