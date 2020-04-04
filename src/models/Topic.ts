export class Topic {
  constructor(id: string, title: string, description: string) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
  public id!: string;
  public title!: string;
  public description!: string;
}
