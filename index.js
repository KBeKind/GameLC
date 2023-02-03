const input = require('readline-sync');

class Player {
  constructor(name) {
  this.name =  name;
  this.attackPower = 3;
  this.healthPoints = 10;
  this.maxHealthPoints = 10;
  this.defense = 1;
  this.experience = 0;
  this.level = 0;
    }
}


class Monster extends Player {
  constructor(name, attackPower) {
    super(name, attackPower);
    this.defense = 0;
    this.experience = 10;
    }
}

const levelExpMax = [9, 25, 60, 100];

let hero = new Player('Klee');

let monster = new Monster('Meany', 2);

let monster2 = new Monster('Dirty', 2);


function attackRound (player, NPC) {
  let monsterDamage = (player.attackPower - NPC.defense);
  let heroDamage = (NPC.attackPower - player.defense);
  monster.healthPoints -= monsterDamage;
  player.healthPoints -= heroDamage;

  console.log(`${hero.name} attacks the monster for ${monsterDamage} damage.
The monster, ${monster.name}, attacks back for ${heroDamage} damage.`);

  }

function battle (player, NPC) {

  while (player.healthPoints > 0 && monster.healthPoints > 0){
    attackRound(player, NPC)
  
  }
   if (NPC.healthPoints <= 0) {

     console.log(`\n${player.name} has slain the ${NPC.name}, gaining ${NPC.experience} experience.`)
      player.experience += NPC.experience;

     calcExperience(player, NPC.experience)
     
     
   } else {
  
    console.log(`\nOur valiant hero has died.  GAME OVER`);
   }
  
}



function calcExperience(hero, newExperience){
   if (hero.experience > levelExpMax[hero.level]) {
     

     hero.level++;
     console.log(`\nCongratulations!\nOur hero, ${hero.name} has leveled up to level ${hero.level}`);
     levelUpChoice(hero);
     
     
   }
let restQuestion = input.question(`Your current health is ${hero.healthPoints}.  Would you like to rest to heal to full health?
Enter 'Y' or 'N' ----> `).toUpperCase();
  if (restQuestion === 'Y'){

    restHero(hero);
  }

}


function restHero(hero){
  hero.healthPoints = hero.maxHealthPoints;
  console.log(`Your hero has healed.  Your current health points are now at ${hero.healthPoints}`)
}

function levelUpChoice(hero){

  const heroChoice = input.question(`You can make a choice to give your hero more [H]ealth or [A]ttack
  Enter 'H' or 'A' ----> `).toUpperCase();
  
  if (heroChoice === 'H') {

    hero.maxHealthPoints++
    console.log(`Your hero's max health is now ${hero.maxHealthPoints}.`)
    
  } else if (heroChoice === 'A'){


    hero.attack++
    console.log(`Your hero's attack is now ${hero.attackPower}.`)
    
  }
  
  
}

  function askToContinue(hero, monster){
   let continueBattleQuestion = input.question(`Do you want to battle again?
  Enter 'Y' or 'N' ----> `).toUpperCase();

  

   if (continueBattleQuestion === 'Y') {
     battle(hero, monster);
    
   }
}

battle(hero, monster);

console.log(hero.healthPoints);
console.log(monster2.healthPoints);
askToContinue(hero, monster2);