//#region okvir
/// <reference path="../otter/lib-00-GameSettings.js"/>
/// <reference path="../otter/lib-01-tiled.js"/>
/// <reference path="../otter/lib-02-sensing.js"/>
/// <reference path="../otter/lib-03-display.js"/>
/// <reference path="../otter/lib-04-engine.js"/>
/// <reference path="../otter/lib-05-game.js"/>
/// <reference path="../otter/lib-06-main.js"/>
//#endregion

// ovdje pišete svoje klase

class Kukac extends Sprite{
    //bodovi, pucanje, skupljanje
    constructor(layer){
        super(2, 3, 32 , 32 );
        this.frame_sets = {
            "up": [6],
            "walk-up": [6],
            "right": [5],
            "walk-right": [3,4,6],
            "down": [6],
            "walk-down": [6],
            "left": [7],
            "walk-left": [10,9,8]
        };
        this.layer = layer;
        this.visible = true;
    }
    moveRight() {
        this.direction = 90;
        this.velocity_x += 1.3;
    }
    moveLeft() {
        this.direction = 270;
        this.velocity_x -= 1.3;
    }
    jump(h = 35) {

        if (!this.jumping) {
            this.jumping = true;
            this.velocity_y -= h;
        }
    }
    ispali(proj){
        proj.put = 0;
        proj.x = this.x;
        proj.y = this.y - 5;
        proj.visible = true;
        proj.move = true;
    }
    skupi(nov){
        nov.visible = false;
        nov.start();
    }
}

class Zmija extends Sprite{
    constructor(x, y,layer){
        super(x, y, 32, 32);
        this.frame_sets = {
            "up": [23],
            "walk-up": [23],
            "right": [23],
            "walk-right": [23,24,25],
            "down": [23],
            "walk-down": [23],
            "left": [26],
            "walk-left": [26,27,28]
        }
        this.layer = layer;
        this.visible = true;
        this.desno = true;
    }
    moveRight() {
        this.direction = 90;
        this.velocity_x += 1.0;
    }
    moveLeft() {
        this.direction = 270;
        this.velocity_x -= 1.0;
    }
}

class Biljka extends Sprite{
    constructor(x, y, layer){
        super(x, y, 32 ,32);
        this.frame_sets = {
            "up": [5],
            "walk-up": [5],
            "right": [5],
            "walk-right": [5],
            "down": [5],
            "walk-down": [5],
            "left": [5],
            "walk-left": [5]
        }
        this.layer = layer;
        this.visible = true;
    }
}

class Biljkap extends Biljka{
    constructor(x, y, layer){
        super(x, y, layer);
        this.frame_sets = {
            "up": [4],
            "walk-up": [4],
            "right": [4],
            "walk-right": [4],
            "down": [4],
            "walk-down": [4],
            "left": [4],
            "walk-left": [4]
        }
    }
    ispali(proj){
        proj.put = 0;
        proj.x = this.x;
        proj.y = this.y - 5;
        proj.visible = true;
        proj.move = true;
    }
}

class projektilkukac extends Item{
    #put;
    constructor(layer){
        super(layer);
        this.visible = false;
        this.#put = 0;
        this.move = true;
    }
    get put() {
        return this.#put;
    }
    set put(v) {
        if (v >= 140) {
            this.#put = 0;
            this.move = false;
            this.visible = false;
        }
        else {
            this.#put = v;
        }
    }
    updatePosition(){
        if (this.move) {
            this.x += 5;
            this.put +=5;
        }
    }
    
}
class projektilkukac2 extends projektilkukac{
    constructor(layer){
        super(layer);
    }
    updatePosition(){
        if (this.move) {
            this.x -= 5;
            this.put +=5;
        }
    }
}
class projektilbiljka extends projektilkukac{
    #put;
    constructor(layer){
        super(layer);
        this.#put = 0;
    }
    updatePosition(){
        if (this.move) {
            this.x -= 7;
            this.put +=7;
        }
    }
    get put() {
        return this.#put;
    }
    set put(v) {
        if (v >= 350) {
            this.#put = 0;
            this.move = false;
            this.visible = false;
        }
        else {
            this.#put = v;
        }
    }
}
class projektilsova extends projektilkukac2{
    #put;
    constructor(layer){
        super(layer);
        this.#put = 0;
    }
    updatePosition(){
        if (this.move) {
            this.x -= 10;
            this.put +=10;
        }
    }
    get put() {
        return this.#put;
    }
    set put(v) {
        if (v >= 400) {
            this.#put = 0;
            this.move = false;
            this.visible = false;
        }
        else {
            this.#put = v;
        }
    }
}
class Sova extends Biljkap{
    constructor(x, y, layer){
        super(x, y, layer);
        this.frame_sets = {
            "up": [6],
            "walk-up": [6],
            "right": [6],
            "walk-right": [6],
            "down": [6],
            "walk-down": [6],
            "left": [6],
            "walk-left": [6]
        }
        this.layer = layer;
        this.visible = true;
    }
    ispali(proj){
        proj.put = 0;
        proj.x = this.x;
        proj.y = this.y - 5;
        proj.visible = true;
        proj.move = true;
    }
}
class Collectable extends Item {

    constructor(layer) {
      super(layer);
      if (this.constructor==Collectable){
        throw new Error("apstraktna klasa se ne moze instancirati");
      }
    }
  
    getType() {
      return this.constructor.name;
    }
  
  }
  class Novcic extends Collectable{
    constructor(layer){
      super(layer);
      this.value=1;
    }
    start(){
      let s = Postavke.random(0,20*32);
      this.x = s;
      this.y = 0;
      this.visible = true;
    }
  }
  