export class Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;

  constructor() {
    this.id = Math.random().toString(36).substr(2, 9);
    this.title = "";
    this.description = "";
    this.createdAt = new Date();
  }
}