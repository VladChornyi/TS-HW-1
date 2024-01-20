// Вам необхідно написати додаток Todo list. У списку нотаток повинні бути методи для додавання нового запису, видалення, редагування та отримання повної інформації про нотаток за ідентифікатором, а так само отримання списку всіх нотатік. Крім цього, у користувача має бути можливість позначити нотаток, як виконаний, і отримання інформації про те, скільки всього нотаток у списку і скільки залишилося невиконаними. Нотатки не повинні бути порожніми.
// Кожний нотаток має назву, зміст, дату створення і редагування та статус. Нотатки бувають двох типів. Дефолтні та такі, які вимагають підтвердження при ридагуванні (окремі класи).
// Окремо необхідно розширити поведінку списку та додати можливість пошуку нотатка по будь-якому філду, або у якості опції вказувати по якому саме вести пошук.
// Також окремо необхідно розширити список можливістю сортування нотаток за статусом або часом створення.

interface ITodoData {
  name: string;
  description: string;
  isProtected?: boolean;
}

abstract class AbstractTodoItem {
  private _id: string;
  private _name: string;
  private _description: string;
  private readonly _createdAt: Date = new Date();
  private _updatedAt: Date | null = null;
  private _isDone: boolean = false;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
    this._id = generateId();
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get id(): string {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date | null {
    return this._updatedAt;
  }

  public get status(): boolean {
    return this._isDone;
  }

  protected setUpdatedAt() {
    this._updatedAt = new Date();
  }
  public set status(newStatus: boolean) {
    this._isDone = newStatus;
  }

  public set name(newName: string) {
    if (newName.trim()) {
      this._name = newName;
    }
  }

  public set description(newDescription: string) {
    if (newDescription.trim()) {
      this._description = newDescription;
    }
  }

  public abstract updateTodo: (data: ITodoData) => void;
}

class DefaultTodo extends AbstractTodoItem {
  constructor(name: string, description: string) {
    super(name, description);
  }

  updateTodo = ({ name, description }: ITodoData) => {
    this.name = name;
    this.description = description;
    this.setUpdatedAt();
  };
}

class ProtectedTodo extends AbstractTodoItem {
  constructor(name: string, description: string) {
    super(name, description);
  }

  updateTodo = ({ name, description }: ITodoData) => {
    const response = confirm("Are you sure you want to make changes?");
    if (response) {
      this.name = name;
      this.description = description;
      this.setUpdatedAt();
    }
  };
}

class TodoList {
  private _todos: (DefaultTodo | ProtectedTodo)[] = [];

  public get todos(): (DefaultTodo | ProtectedTodo)[] {
    return this._todos;
  }

  private set todos(newTodos: (DefaultTodo | ProtectedTodo)[]) {
    this._todos = newTodos;
  }

  public addTodo({ name, description, isProtected }: ITodoData): void | never {
    if (!name || !description) {
      throw new Error("Todo must have name and description");
    }
    if (isProtected) {
      this._todos.push(new ProtectedTodo(name, description));
    } else {
      this._todos.push(new DefaultTodo(name, description));
    }
  }

  public deleteTodo(id: string): void {
    this.todos = this.todos.filter((item) => item.id !== id);
  }

  public updateTodo(
    id: string,
    { name, description }: ITodoData
  ): ProtectedTodo | DefaultTodo | undefined {
    const foundItem = this.todos.find((item) => item.id === id);
    if (foundItem) {
      foundItem.name = name;
      foundItem.description = description;
      return foundItem;
    }
  }

  public getTodoById(id: string): DefaultTodo | ProtectedTodo | undefined {
    return this.todos.find((item) => item.id === id);
  }

  public completeTodo(id: string): void {
    const foundTodo = this.todos.find((item) => item.id === id);
    if (foundTodo) {
      foundTodo.status = true;
    }
  }

  public getTodoCount(): number {
    return this.todos.length;
  }

  public getUncomplitedTodosCount(): number {
    return this.todos.filter((item) => !item.status).length;
  }

  public getTodosByField(
    field: keyof AbstractTodoItem
  ): (DefaultTodo | ProtectedTodo)[] {
    return this.todos.filter((item) => item[field]);
  }

  public getSortedTodosByStatus(): (DefaultTodo | ProtectedTodo)[] {
    return this.todos.toSorted((a, b) => b.status - a.status);
  }

  public getSortedTodosByDate(): (DefaultTodo | ProtectedTodo)[] {
    return this.todos.toSorted((a, b) => b.createdAt - a.createdAt);
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}
