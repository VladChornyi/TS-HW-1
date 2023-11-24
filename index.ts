class School {
  directions: Direction[] = [];

  addDirection(direction: Direction): void {
    this.directions.push(direction);
  }
}

class Direction {
  private _name: string;
  levels: Level[] = [];

  get name(): string {
    return this._name;
  }
  constructor(name: string) {
    this._name = name;
  }

  addLevel(level: Level): void {
    this.levels.push(level);
  }
}

class Level {
  groups: Group[] = [];
  _name: string;
  _program: string | number;

  constructor(name: string, program: string | number) {
    this._name = name;
    this._program = program;
  }

  get name(): string {
    return this._name;
  }

  get program(): string | number {
    return this._program;
  }

  addGroup(group: Group): void {
    this.groups.push(group);
  }
}

class Group {
  _students: Student[] = [];
  directionName: string;
  levelName: string;

  get students(): Student[] {
    return this._students;
  }

  constructor(directionName: string, levelName: string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  showPerformance(): Student[] {
    const sortedStudents = this.students.toSorted(
      (a: Student, b: Student) =>
        b.getPerformanceRating() - a.getPerformanceRating()
    );

    return sortedStudents;
  }
}

class Student {
  grades: Object = {};
  attendance: boolean[] = [];
  firstName: string;
  lastName: string;
  birthYear: number;

  constructor(firstName: string, lastName: string, birthYear: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }

  get fullName(): string {
    return `${this.lastName} ${this.firstName}`;
  }

  set fullName(value: string) {
    [this.lastName, this.firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this.birthYear;
  }

  setGrade(subject: string | symbol, grade: number | string): void {
    this.grades[subject] = grade;
  }

  markAttendance(present: boolean): void {
    this.attendance.push(present);
  }

  getPerformanceRating(): number {
    const gradeValues: Array<string | number> = Object.values(this.grades);

    if (gradeValues.length === 0) return 0;

    const averageGrade: number =
      gradeValues.reduce(
        (sum: number, grade: number | string) => sum + Number(grade),
        0
      ) / gradeValues.length;

    const attendancePercentage: number =
      (this.attendance.filter((present: boolean) => present).length /
        this.attendance.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
