const fs = require('fs/promises');


export async function leitura(arq) {
  try {
    const data = await fs.readFile(arq, { encoding: 'utf8' });
    console.log(arq.toString() + " lida com sucesso")
    return data
    
  } catch (err) {
    console.log(err);
  }
}

//data = leitura('./planilha.json')