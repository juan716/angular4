export class User {
  public constructor (
    public id?: string,
    public username?: string,
    public password?: string,
    public email?: string,
    public status?: string,
    public token?: string,
    public created?: Date,
    public updated?: Date
  ) {}
}
