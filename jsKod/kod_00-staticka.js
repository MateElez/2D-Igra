class Postavke {
  constructor() {
    if (this instanceof Postavke) {
      throw new Error("Statička klasa nema instance!");
    }
  }
  static random(min, maks){
    return Math.floor(Math.random() * (maks-min)) + min;
  }
}