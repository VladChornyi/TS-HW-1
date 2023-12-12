enum ColorEnam {
  Green = "Green",
  Red = "Red",
  Blue = "Blue",
  Yellow = "Yellow",
  Black = "Black",
}

type PrintType = () => string;

interface IRectangle {
  width: number;
  height: number;
  print: PrintType;
}

interface ISquare {
  sideLength: number;
  print: PrintType;
}

abstract class Figure {
  public readonly _name: string;
  public readonly _color: ColorEnam;

  constructor(name: string, color: ColorEnam) {
    this._name = name;
    this._color = color;
  }

  public get color(): ColorEnam {
    return this._color;
  }

  public get name(): string {
    return this._name;
  }

  public abstract calculateArea(): number;
}

class Circle extends Figure {
  private _radius: number;

  constructor(name: string, color: ColorEnam, radius: number) {
    super(name, color);
    this._radius = radius;
  }

  calculateArea() {
    return Math.PI * Math.pow(this._radius, 2);
  }
}

class Triangle extends Figure {
  private _base: number;
  private _height: number;

  constructor(name: string, color: ColorEnam, base: number, height: number) {
    super(name, color);
    this._base = base;
    this._height = height;
  }

  public get base(): number {
    return this._base;
  }

  public get height(): number {
    return this._height;
  }

  calculateArea() {
    return (this._base * this._height) / 2;
  }
}

class Square extends Figure implements ISquare {
  private _sideLength: number;

  constructor(name: string, color: ColorEnam, sideLength: number) {
    super(name, color);
    this._sideLength = sideLength;
  }

  public get sideLength(): number {
    return this._sideLength;
  }

  calculateArea() {
    return Math.pow(this._sideLength, 2);
  }

  public print() {
    return "S = a * a";
  }
}

class Rectangle extends Figure implements IRectangle {
  private _width: number;
  private _height: number;

  constructor(name: string, color: ColorEnam, width: number, height: number) {
    super(name, color);
    this._height = height;
    this._width = width;
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }

  calculateArea() {
    return this._height * this._width;
  }

  public print() {
    return "S = a * b";
  }
}
