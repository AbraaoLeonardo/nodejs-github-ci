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
  return Math.floor(Math.random() * 6) + 1;
};

async function logDiceRoll(characterName, block, diceResult, atrribute) {
  console.log(`${characterName} rolou um dado ${block} ${diceResult} + ${atrribute} = ${diceResult + atrribute}`);
};

async function getRandomBlock(){
  let random = Math.random();
  let result;
  switch (true){
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
    }
    return result;
};

async function startCombat(power1, power2){
  if (power2 > power1 && character1.pontos !== 0){
    character1.poder--
    return [-1,0]
  }

  if(power1 > power2 && character2.pontos !== 0){
    character2.poder--
    return [0,-1]
  }

  if(power2 === power1){
    return [0,0]
  };

  return [NaN, NaN]
}

async function calculateSkills(block, diceResult1, diceResult2) {
  switch(block){
    case "RETA":
      return [
        diceResult1 + character1.velocidade,
        diceResult2 + character2.velocidade
      ];
    case "CURVA":
      return [diceResult1 + character1.manobrabilidade,
              diceResult2 + character2.manobrabilidade
            ];
    case "CONFRONTO":
      power1 = diceResult1 + character1.poder
      power2 = diceResult2 + character2.poder
      const [combatReturn1, combatReturn2] = await startCombat(power1, power2)
      return [combatReturn1, combatReturn2];
    default:
      console.log("The block has not been implemented yet.")
      return [-2,-2];
  }
}

async function displayFinalSkillPointMessage(block, diceResult1, diceResult2) {
  switch (block){
    case "RETA": 
      logDiceRoll(character1.name,"velocidade", diceResult1, character1.velocidade);
      logDiceRoll(character2.name,"velocidade", diceResult2, character2.velocidade);
      break;
    case "CURVA":
      logDiceRoll(character1.name,"Manobrabilidade", diceResult1, character1.manobrabilidade);
      logDiceRoll(character2.name,"Manobrabilidade", diceResult2, character2.manobrabilidade);
      break;
    case "CONFRONTO":
      logDiceRoll(character1.name,"Poder", diceResult1, character1.poder);
      logDiceRoll(character2.name,"Poder", diceResult2, character2.poder);
      break;
  }
}

async function addPoint(totalTestSkill1, totalTestSkill2) {
  
  if (totalTestSkill1 > totalTestSkill2 && totalTestSkill2 >= 0){
    console.log(`${character1.name} marcou um ponto!!`);
    character1.pontos += 1;
  };
  
  if (totalTestSkill2 > totalTestSkill1 && totalTestSkill1 >= 0){
    console.log(`${character2.name} marcou um ponto!!`);
    character2.pontos += 1;
  };

  if (totalTestSkill1 === totalTestSkill2){
    console.log("Empate!!");
  };

  if (totalTestSkill1 === -1){
    console.log(`${character1.name} perdeu um ponto`);
  }
  
  if (totalTestSkill2 === -1){
    console.log(`${character2.name} perdeu um ponto`);
  } 
}

async function startingRace(){
  for (let round = 1; round <= 5 ; round++){
    const block = await getRandomBlock();
    console.log(`======== round ${round} ${block} ========`);
    
    // get dice result
    const [diceResult1, diceResult2] = await Promise.all([rollDice(), rollDice()]);
        
    // set point variable
    const [totalTestSkill1, totalTestSkill2] = await calculateSkills(block, diceResult1, diceResult2);
    
    displayFinalSkillPointMessage(block, diceResult1, diceResult2)
    addPoint(totalTestSkill1, totalTestSkill2)
    console.log("\n");
  }
};

async function winnerMessage() {
  console.log("********************************* Resultado *********************************")
  console.log(`character1 ${character1.pontos}`)
  console.log(`character2 ${character2.pontos}\n`)

  var winner = `Resultado empate`
  if (character2.pontos > character1.pontos){
    winner = `** com ${character2.pontos} ponto(s), personagem ${character2.name} eh o vencedor **`
  }
  if (character1.pontos > character2.pontos){
    winner = `** com ${character1.pontos} ponto(s), personagem ${character1.name} eh o vencedor **`
  }
  console.log(winner)
  console.log("Fim da corrida")
}

(async function main(){
  console.log(`Corrida entre ${character1.name} e ${character2.name} esta comecando...\n`);
  await startingRace();
  await winnerMessage();

})();