// Напишіть функцію isString, яка перевірятиме, чи є передане значення рядком. Потім використовуйте її для звуження типу змінної.

function isString(value: unknown): value is string {
  return typeof value === "string";
}

// У вас є масив з елементами різних типів. Напишіть функцію, яка приймає цей масив і фільтрує його так, щоб у підсумку в ньому залишилися тільки рядки. Використовуйте захисника типу для цього завдання.

function filterString(array: unknown[]): string[] {
  return array.filter(isString);
}

// У вас є об'єкт, який може містити довільні властивості. Напишіть функцію, яка приймає цей об'єкт і повертає значення однієї з властивостей, якщо воно існує і має певний тип.

type MyValueType = string;

type MyObjectType = {
  [key: string]: MyValueType;
};

const valueToFind = "name";

const typeToFind = "string";

function findValue(obj: MyObjectType): MyValueType | undefined {
  if (valueToFind in obj) {
    if (typeof obj[valueToFind] === typeToFind) {
      return obj[valueToFind];
    }
  }
  return undefined;
}

// Створіть кілька захисників типу, кожен з яких перевіряє певний аспект об'єкта (наприклад, наявність певної властивості або її тип). Потім напишіть функцію, яка використовує цих захисників у комбінації для звуження типу об'єкта до більш конкретного типу.

enum NamesEnum {
  Serhii = "Serhii",
  Vitaliy = "Vitaliy",
  Illya = "Illya",
}

enum SurnamesEnum {
  Klymov = "Klimov",
  Babich = "Babich",
  Ruban = "Ruban",
}

type TeacherName = `${NamesEnum} ${SurnamesEnum}`;
type TeacherType = {
  name: string;
  surname: string;
  price: number;
};

function isValidName(name: string): name is NamesEnum {
  switch (name) {
    case NamesEnum.Serhii:
    case NamesEnum.Vitaliy:
    case NamesEnum.Illya:
      return true;
    default:
      return false;
  }
}

function isValidSurname(surname: string): surname is SurnamesEnum {
  switch (surname) {
    case SurnamesEnum.Babich:
    case SurnamesEnum.Klymov:
    case SurnamesEnum.Ruban:
      return true;
    default:
      return false;
  }
}

function namesValueGuard(course: TeacherType): boolean {
  return "name" in course && "surname" in course;
}

function getTeacherName(teacher: TeacherType): TeacherName | never {
  if (
    namesValueGuard(teacher) &&
    isValidName(teacher.name) &&
    isValidSurname(teacher.surname)
  ) {
    return `${teacher.name} ${teacher.surname}`;
  }
  throw new Error("This teacher does not work for us");
}

// У вас є змінна, яка може бути одного з декількох типів (наприклад, рядок або число). Напишіть функцію, яка приймає цю змінну і виконує довільні операції, специфічні для кожного з типів.

type SomeVarType = string | number;

function doSmthWithThis(value: SomeVarType): number | never {
  if (typeof value === "number") {
    return Math.sqrt(value);
  } else if (typeof value === "string") {
    return Math.sqrt(value.length);
  }
  throw new Error("unexpected value type");
}

// Створіть захисник типу, який перевірятиме, чи є передане значення функцією. Потім напишіть функцію, яка використовує цей гард для звуження типу змінної і викликає передану функцію, якщо вона існує.

type FuncType = () => unknown;

function funcGuard(value: unknown): boolean {
  return typeof value === "function";
}

function runCallback(callback: FuncType): unknown | never {
  if (callback && funcGuard(callback)) {
    return callback();
  }
  throw new Error("Oooops, smth went wrong");
}

// Створіть класи з ієрархією успадкування і потім напишіть функцію, яка використовує захисник типу для звуження типу об'єктів, що базуються на цій ієрархії.

class Animal {
  constructor(public name: string) {}

  eat(): string {
    return "Om nom nom";
  }
}

class Dog extends Animal {
  bark(): string {
    return "Woof! Woof!";
  }
}

class Cat extends Animal {
  meow(): string {
    return "Meow!";
  }
}

function animalSound(animal: Animal): string {
  if (animal instanceof Dog) {
    return animal.bark();
  } else if (animal instanceof Cat) {
    return animal.meow();
  } else {
    return animal.eat();
  }
}
