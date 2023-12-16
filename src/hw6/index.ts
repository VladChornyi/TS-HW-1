// Визначте інтерфейс, який використовує сигнатуру індексу з типами об'єднання. Наприклад, тип значення для кожного ключа може бути число | рядок.

interface IIndexSignatureInterface {
  [index: string]: string | number;
}

// Створіть інтерфейс, у якому типи значень у сигнатурі індексу є функціями. Ключами можуть бути рядки, а значеннями — функції, які приймають будь-які аргументи.

interface IIndexFunctionInterface {
  [index: string]: (...args: any[]) => any;
}

// Опишіть інтерфейс, який використовує сигнатуру індексу для опису об'єкта, подібного до масиву. Ключі повинні бути числами, а значення - певного типу.

type TargetType = {
  name: string;
  number: number;
};

interface IIndexObjectIntrface {
  [index: number]: TargetType;
}

// Створіть інтерфейс з певними властивостями та індексною сигнатурою. Наприклад, ви можете мати властивості типу name: string та індексну сигнатуру для додаткових динамічних властивостей.

interface IWithNameIntarface {
  name: string;
  [index: string]: string;
}

// Створіть два інтерфейси, один з індексною сигнатурою, а інший розширює перший, додаючи специфічні властивості.

interface BaseInterface {
  [index: string]: any;
}

interface ExtendedInterface extends BaseInterface {
  specificProperty: number;
}

// Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє, чи відповідають значення певних ключів певним критеріям (наприклад, чи всі значення є числами).

interface INumberIndexInterface {
  [index: string]: number;
}

function checkAreAllValuesNumbers(obj: INumberIndexInterface): boolean {
  for (let key in obj) {
    if (typeof obj[key] !== "number") {
      return false;
    }
    return true;
  }
}
