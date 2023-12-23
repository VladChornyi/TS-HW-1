// Фільтрація масиву

// Напишіть узагальнену функцію filterArray(array, condition), яка фільтрує масив елементів на основі наданої умови.

function filterArray<T>(array: T[], condition: (item: T) => boolean): T[] {
  return array.filter((item) => condition(item));
}

// Узагальнений стек

// Створіть узагальнений клас Stack, який являє собою стек елементів з методами push, pop і peek.

class Stack<T> {
  public items: T[] = [];

  public push(item: T): number {
    this.items = [...this.items, item];
    return this.items.length;
  }

  public pop(): T {
    const deletedItem = this.items[this.items.length - 1];
    this.items = this.items.slice(0, -1);
    return deletedItem;
  }

  public peek(): T {
    return this.items[this.items.length - 1];
  }
}

// Узагальнений словник

// Створіть узагальнений клас Dictionary, який являє собою словник (асоціативний масив) з методами set, get і has. Обмежте ключі тільки валідними типами для об'єкта

class Dictionary<T> {
  private items: {
    [key: string | number]: T;
  } = {};

  public set<U extends string | number>(key: U, value: T): void {
    this.items[key] = value;
  }

  public get<U extends string | number>(key: U): T | undefined {
    return this.items[key];
  }

  public has<U extends string | number>(key: U): boolean {
    return !!this.items[key];
  }
}
