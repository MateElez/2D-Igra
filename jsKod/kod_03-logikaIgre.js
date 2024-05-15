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
/// <reference path="kod_02-postavke.js"/>

/**
 * Promjena stanja likova - interakcije
 */
function update_main() {

  if (GAME.activeWorldMap.name == "mapa1"){
    prvarazina();
  }
    

  GAME.update();

};
let vrijeme;
let kra;
let br = 0;
function prvarazina() {
  if (SENSING.keyD.active) {
    Postavke.kukac.moveRight();
  }
  if (SENSING.keyA.active) {
    Postavke.kukac.moveLeft();
  }
  if(SENSING.keyW.active){
    Postavke.kukac.jump();
  }
  if (SENSING.right.active && Postavke.kukac.frame_value <7 && Postavke.projektilkl.put == 0 && Postavke.projektilk.put == 0 ) {
    Postavke.projektilk.visible = false;
    Postavke.projektilkl.visible = false;
    Postavke.kukac.ispali(Postavke.projektilk);
  }
  if (SENSING.right.active && Postavke.kukac.frame_value >=7 && Postavke.projektilkl.put == 0 && Postavke.projektilk.put == 0  ) {
    Postavke.projektilk.visible = false;
    Postavke.projektilkl.visible = false;
    Postavke.kukac.ispali(Postavke.projektilkl);
  }
  if (Postavke.kukac.touching(Postavke.novcic)) {
    Postavke.kukac.skupi(Postavke.novcic);
    br++;
  }
  if (Postavke.kukac.touching(Postavke.biljka1) || Postavke.kukac.touching(Postavke.biljka2) || Postavke.kukac.touching(Postavke.biljka5) || Postavke.kukac.touching(Postavke.zmija1) || Postavke.kukac.touching(Postavke.projektilb) ||  Postavke.kukac.touching(Postavke.sova) || Postavke.kukac.touching(Postavke.zmija2)) {
    btnIgra.dispatchEvent(poraz);
  }
  if (Postavke.zmija1.visible == true) {
    //vidit kad ce setat di
    if (Postavke.zmija1.x-Postavke.kukac.x>150) {
      if (Postavke.zmija1.desno == true) {
        Postavke.zmija1.moveRight();
      }
      else{
        Postavke.zmija1.moveLeft();
      }
      if (Postavke.zmija1.x >= 350) {
        Postavke.zmija1.desno = false;
      }
      if (Postavke.zmija1.x < 250) {
        Postavke.zmija1.desno = true;
      }
    }
    //slucaj kad je kukac livo 5 - 1
    else if ((Postavke.zmija1.x-Postavke.kukac.x)>0) {
      Postavke.zmija1.moveLeft();
    }
    //5 - 6 = -1 pa gledat uvjet da je negativno 
    else if ((Postavke.zmija1.x-Postavke.kukac.x)<0) {
      Postavke.zmija1.moveRight();
    }
    //posli za projektil kad ga takne da je visible false
    if (Postavke.zmija1.touching(Postavke.projektilk) ) {
      Postavke.zmija1.visible = false;
      Postavke.projektilk.visible = false;
      Postavke.projektilk.put = 0;
    }
    if (Postavke.zmija1.touching(Postavke.projektilkl) ) {
      Postavke.zmija1.visible = false;
      Postavke.projektilkl.visible = false;
      Postavke.projektilkl.put = 0;
    }
  }
  if (Postavke.biljka1.visible == true) {
    if (Postavke.biljka1.touching(Postavke.projektilk) ) {
      Postavke.biljka1.visible = false;
      Postavke.projektilk.visible = false;
      Postavke.projektilk.put = 0;
    }
    if (Postavke.biljka1.touching(Postavke.projektilkl) ) {
      Postavke.biljka1.visible = false;
      Postavke.projektilkl.visible = false;
      Postavke.projektilkl.put = 0;
    }
  }
  
  if (Postavke.biljka5.visible == true && Postavke.projektilb.put == 0) {
    Postavke.biljka5.ispali(Postavke.projektilb);
  }
  if (Postavke.biljka2.visible == true) {
    if (Postavke.biljka2.touching(Postavke.projektilk) ) {
      Postavke.biljka2.visible = false;
      Postavke.projektilk.visible = false;
      Postavke.projektilk.put = 0;
    }
    if (Postavke.biljka2.touching(Postavke.projektilkl) ) {
      Postavke.biljka2.visible = false;
      Postavke.projektilkl.visible = false;
      Postavke.projektilkl.put = 0;
    }
  }
  if (Postavke.biljka5.visible == true) {
    if (Postavke.biljka5.touching(Postavke.projektilk) ) {
      Postavke.biljka5.visible = false;
      Postavke.projektilk.visible = false;
      Postavke.projektilb.visible = false;
      Postavke.projektilk.put = 0;
      // btnIgra.dispatchEvent(novilvl);
    }
    if (Postavke.biljka5.touching(Postavke.projektilkl) ) {
      Postavke.biljka5.visible = false;
      Postavke.projektilkl.visible = false;
      Postavke.projektilb.visible = false;
      Postavke.projektilkl.put = 0;
      // btnIgra.dispatchEvent(novilvl);
    }
  }
  if (Postavke.sova.visible && Postavke.projs.put == 0) {
    Postavke.sova.ispali(Postavke.projs);
  }
  if (Postavke.sova.visible == true && Postavke.projs.put == 0) {
    Postavke.sova.ispali(Postavke.projs);
  }
  if (Postavke.sova.visible == true) {
    if (Postavke.sova.touching(Postavke.projektilk)) {
      kra = new Date().getTime();
      vrijeme = (kra - poc)/1000;
      btnIgra.dispatchEvent(pobjeda);
      return;
    }
    if (Postavke.sova.touching(Postavke.projektilkl)) {
      kra = new Date().getTime();
      vrijeme = (kra - poc)/1000;
      btnIgra.dispatchEvent(pobjeda);
      return;
    }
  }
  
  if (Postavke.kukac.touching(Postavke.projs) ) {
    btnIgra.dispatchEvent(poraz);
  }
  if (Postavke.zmija1.visible == false && Postavke.biljka1.visible == false && Postavke.biljka2.visible == false && Postavke.biljka5.visible == false ) {
    if (Postavke.sova.visible == true) {
      return;
    }
    btnIgra.dispatchEvent(novilvl);
  }
  if (Postavke.zmija2.visible) {
    //vidit kad ce setat di
    if (Postavke.zmija2.x-Postavke.kukac.x>150) {
      if (Postavke.zmija2.desno == true) {
        Postavke.zmija2.moveRight();
      }
      else{
        Postavke.zmija2.moveLeft();
      }
      if (Postavke.zmija2.x >= 350) {
        Postavke.zmija2.desno = false;
      }
      if (Postavke.zmija2.x < 250) {
        Postavke.zmija2.desno = true;
      }
    }
    //slucaj kad je kukac livo 5 - 1
    else if ((Postavke.zmija2.x-Postavke.kukac.x)>0) {
      Postavke.zmija2.moveLeft();
    }
    //5 - 6 = -1 pa gledat uvjet da je negativno 
    else if ((Postavke.zmija2.x-Postavke.kukac.x)<0) {
      Postavke.zmija2.moveRight();
    }
    //posli za projektil kad ga takne da je visible false
    if (Postavke.zmija2.touching(Postavke.projektilk) ) {
      Postavke.zmija2.visible = false;
      Postavke.projektilk.visible = false;
      Postavke.projektilk.put = 0;
    }
    if (Postavke.zmija2.touching(Postavke.projektilkl) ) {
      Postavke.zmija2.visible = false;
      Postavke.projektilkl.visible = false;
      Postavke.projektilkl.put = 0;
    }
  }
}
