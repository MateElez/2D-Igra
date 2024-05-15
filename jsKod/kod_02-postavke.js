//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion
/// <reference path="kod_01-likovi.js"/>


const btnIgra = document.getElementById("btnIgra");
const poraz = new CustomEvent("gameover", {
  detail: {
    win: false
  }
});
const novilvl = new CustomEvent("levelup");
const pobjeda = new CustomEvent("gameover", {
  detail: {
    win: true
  }
});
function kraj(dogadaj) {
  btnStop_click();
  if (dogadaj.detail.win == true) {
    GAME.clearSprites();
    alert("Pobijedili ste! Potrebno vrijeme za pobjedu je bilo: " + vrijeme + " sekunda i skupili ste " + br + " novčića!");
    console.log("Pobjeda!");
  }
  else{
    alert("Poraz!");
    console.log("Poraz!");
  }
}
btnIgra.addEventListener("gameover", kraj);
btnIgra.addEventListener("levelup", setupRazina2)
// što će se pokrenuti kad se klikne button Setup:
let btnSetupGame = document.getElementById("btnSetupGame");
btnSetupGame.addEventListener("click", setup);




function setup() {

  GAME.clearSprites();

  let odabrana = GAME.activeWorldMap.name;
  GameSettings.output(odabrana);

  switch (odabrana) {
    case "mapa1":
      setupRazina();
      break;

    default:
      throw "Ne postoji setup za " + GAME.activeWorldMap.name;
      break;
  }

  render_main();
}
let poc;
/* LEVELS */
function setupRazina() {
  GAME.clearSprites();
  Postavke.novcic = new Novcic(GAME.getSpriteLayer("novcic"));
  GAME.addSprite(Postavke.novcic);
  Postavke.novcic.start();
  GAME.activeWorldMap.setCollisions("Pod");
  Postavke.kukac = new Kukac(GAME.getSpriteLayer("Kukac"));
  GAME.addSprite(Postavke.kukac);
  Postavke.zmija1 = new Zmija(64* 3, 64*3, GAME.getSpriteLayer("Zmija1"));
  GAME.addSprite(Postavke.zmija1);
  Postavke.biljka1 = new Biljka(64* 5, 64*3, GAME.getSpriteLayer("Biljka1"));
  GAME.addSprite(Postavke.biljka1);
  Postavke.biljka2 = new Biljka(64*7, 64*3, GAME.getSpriteLayer("Biljka2"));
  GAME.addSprite(Postavke.biljka2);
  Postavke.biljka5 = new Biljkap(64*9, 64*3, GAME.getSpriteLayer("Biljka5"));
  GAME.addSprite(Postavke.biljka5);
  Postavke.projektilk = new projektilkukac(GAME.getSpriteLayer("projektilkukac"));
  GAME.addSprite(Postavke.projektilk);
  Postavke.projektilkl = new projektilkukac2(GAME.getSpriteLayer("projektilkukacl"));
  GAME.addSprite(Postavke.projektilkl);
  Postavke.projektilb = new projektilbiljka(GAME.getSpriteLayer("projektilbiljke"));
  GAME.addSprite(Postavke.projektilb);
  Postavke.zmija2 = new Zmija(64* 6, 64*3, GAME.getSpriteLayer("Zmija2"));
  GAME.addSprite(Postavke.zmija2);
  Postavke.sova = new Sova(64*9, 64*3, GAME.getSpriteLayer("sova"));
  GAME.addSprite(Postavke.sova);
  Postavke.projs = new projektilsova(GAME.getSpriteLayer("projektilsova"));
  GAME.addSprite(Postavke.projs);
  Postavke.zmija2.visible=false;
  Postavke.sova.visible = false;
  Postavke.projs.visible = false;
  poc = new Date().getTime();
  br = 0;
}

function setupRazina2() {
  btnStop_click();
  alert("Pobjedili ste prvi level, sada ste na drugome!");
  GAME.clearSprites();
  Postavke.novcic = new Novcic(GAME.getSpriteLayer("novcic"));
  GAME.addSprite(Postavke.novcic);
  Postavke.novcic.start();
  GAME.activeWorldMap.setCollisions("Pod");
  Postavke.kukac = new Kukac(GAME.getSpriteLayer("Kukac"));
  GAME.addSprite(Postavke.kukac);
  Postavke.projektilk = new projektilkukac(GAME.getSpriteLayer("projektilkukac"));
  GAME.addSprite(Postavke.projektilk);
  Postavke.projektilkl = new projektilkukac2(GAME.getSpriteLayer("projektilkukacl"));
  GAME.addSprite(Postavke.projektilkl);
  Postavke.projektilb = new projektilbiljka(GAME.getSpriteLayer("projektilbiljke"));
  GAME.addSprite(Postavke.projektilb);
  Postavke.zmija1 = new Zmija(64* 3, 64*3, GAME.getSpriteLayer("Zmija1"));
  GAME.addSprite(Postavke.zmija1);
  Postavke.zmija2 = new Zmija(64* 6, 64*3, GAME.getSpriteLayer("Zmija2"));
  GAME.addSprite(Postavke.zmija2);
  Postavke.biljka1 = new Biljka(64* 7, 64*3, GAME.getSpriteLayer("Biljka1"));
  GAME.addSprite(Postavke.biljka1);
  Postavke.biljka5 = new Biljkap(64*5, 64*3, GAME.getSpriteLayer("Biljka5"));
  GAME.addSprite(Postavke.biljka5);
  Postavke.sova = new Sova(64*9, 64*3, GAME.getSpriteLayer("sova"));
  GAME.addSprite(Postavke.sova);
  Postavke.projs = new projektilsova(GAME.getSpriteLayer("projektilsova"));
  GAME.addSprite(Postavke.projs);
  btnStart_click();
}
