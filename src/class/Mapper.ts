export default abstract class Mapper<Input, Output> {
  abstract one(resource: Input): Output

  many(resources: Input[]): Output[] {
    return resources.map((resource) => this.one(resource))
  }
}
