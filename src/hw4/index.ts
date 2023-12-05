interface ICalculator {
  add: (a: number, b: number) => number;
  substract: (a: number, b: number) => number;
  multiply: (a: number, b: number) => number;
  divide: (a: number, b: number) => number;
}

type OperationType = keyof typeof calculator;

const calculator: ICalculator = {
  add: (a, b) => a + b,
  substract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

function calculate(
  calculator: ICalculator,
  operation: OperationType,
  a: number,
  b: number
): number {
  return calculator[operation](a, b);
}
console.log(calculate(calculator, "add", 2, 2));

// ======================================================================================= //

enum CurrencyEnum {
  UAH = "UAH",
  USD = "USD",
  EUR = "EUR",
  GBR = "GBR",
}

interface IBook {
  id: number | string;
  name: string;
  author: IAuthor;
  price: number;
  currency: CurrencyEnum;
}

interface IAuthor {
  id: number | string;
  name: string;
  surname: string;
  nickname: string;
}

interface IBookService {
  getBooks: () => IBook[];
  getAuthors: () => IAuthor[];
  getAuthorBooks: (authorId: number | string) => IBook[];
}

const bookService: IBookService = {
  getBooks: () => [
    {
      id: 1,
      name: "JS",
      price: Infinity,
      currency: CurrencyEnum.UAH,
      author: {
        id: "1",
        name: "Serhii",
        surname: "Koterniak",
        nickname: "TS_hacker",
      },
    },
  ],
  getAuthors: () => [
    { id: "1", name: "Serhii", surname: "Koterniak", nickname: "TS_hacker" },
  ],
  getAuthorBooks: (authorId: string | number) =>
    bookService.getBooks().filter(({ author: { id } }) => authorId === id),
};

const allBooks = bookService.getBooks();
const allAuthors = bookService.getAuthors();
const SerhiiBooks = bookService.getAuthorBooks("1");
