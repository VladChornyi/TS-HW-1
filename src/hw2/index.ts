type Lecturer = {
  name: string;
  surname: string;
  position: string;
  company: Companies;
  experience: number | string;
  courses: [];
  contacts: [home: Object, mobile: Object, work: Object];
};

enum Companies {
  SoftServe,
  MacPaw,
  Epam,
  DrumNCode,
  Luxoft,
}

enum Statuses {
  FirstYear = "First_year",
  SecondYear = "Second_year",
  Bachelors = "Bachelors",
  Masters = "Masters",
}

enum LevelName {
  HTML,
  CSS,
  JS,
  TS,
  React,
  Node,
}

enum DirectionName {
  FrontEnd,
  BackEnd,
}

class School {
  _areas: Area[] = [];
  _lecturers: Lecturer[] = [];

  get areas(): Area[] {
    return this._areas;
  }

  get lecturers(): Object[] {
    return this._lecturers;
  }

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(name: string): void {
    this._areas = this._areas.filter((item: Area) => item._name !== name);
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer);
  }

  removeLecturer(name: string): void {
    this._lecturers = this._lecturers.filter(
      (item: Lecturer) => item.name !== name
    );
  }
}

class Area {
  _levels: Level[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get levels(): Level[] {
    return this._levels;
  }

  get name(): string {
    return this._name;
  }

  addLevel(level: Level): void {
    this._levels.push(level);
  }

  removeLevel(name: string): void {
    this._levels = this._levels.filter((item: Level) => item._name !== name);
  }
}

class Level {
  _groups: Group[] = [];
  _name: string;
  _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  get groups(): Group[] {
    return this._groups;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  addGrooup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(levelName: LevelName, status: Statuses): void {
    this._groups = this._groups.filter(
      (item: Group) => item._levelName !== levelName && item._status !== status
    );
  }
}

class Group {
  _area: Area;
  _status: Statuses;
  _students: Student[] = [];
  _directionName: DirectionName;
  _levelName: LevelName;

  constructor(directionName: DirectionName, levelName: LevelName) {
    this._directionName = directionName;
    this._levelName = levelName;
  }
  get area(): Area {
    return this._area;
  }

  get status(): Statuses {
    return this._status;
  }

  get students(): Student[] {
    return this._students;
  }

  get directionName(): DirectionName {
    return this._directionName;
  }

  get levelName(): LevelName {
    return this._levelName;
  }

  set status(status: Statuses) {
    this._status = status;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(student: Student): void {
    this._students = this._students.filter(
      (item: Student) =>
        item._firstName !== student._firstName &&
        item._lastName !== student._lastName
    );
  }

  showPerformance(): Student[] {
    const sortedStudents = this._students.toSorted(
      (a: Student, b: Student) =>
        b.getPerformanceRating() - a.getPerformanceRating()
    );
    return sortedStudents;
  }
}

class Student {
  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: { [workName: string]: number } = {};
  _visits: boolean[] = [];

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(" ");
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  setGrade(workName: string, grade: number): void {
    this._grades[workName] = grade;
  }

  setVisit(present: boolean): void {
    this._visits.push(present);
  }

  getPerformanceRating(): number {
    const gradeValues: number[] = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade: number =
      gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage: number =
      (this._visits.filter((present) => present).length / this._visits.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}
