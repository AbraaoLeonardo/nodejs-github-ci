var character1 = {
  name: "Mario",
  velocidade: 3,
  manobrabilidade: 3,
  poder: 3,
  pontos: 0 
};

var character2 = {
  name: "Luigi",
  velocidade: 4,
  manobrabilidade: 2,
  poder: 3,
  pontos: 0 
};

async function rollDice(){
  return Math.floor(Math.round() * 6) + 1;
}

(async function main(){
  console.log(`Corrida entre ${character1.name} e ${character2.name} esta comecando...\n`)
})()
