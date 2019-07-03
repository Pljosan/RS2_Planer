export class Task {
  constructor(id) {
    this.id = id;
  }

  id: string;
  userId: string;
  name: string;
  date: string;
  time: string;
}
