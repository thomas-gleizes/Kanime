export default abstract class PrismaMiddleware<Model, Output> {
  public abstract parse(resource: Model): Output;

  public parseMany(resources: Model[]) {
    return resources.map((resource) => this.parse(resource));
  }

  public async onResult(result: Model | Model[]) {
    if (Array.isArray(result)) {
      const values = [];
      for (const item of result) values.push(await this.parse(item));
      return values;
    } else {
      return this.parse(result);
    }
  }
}
