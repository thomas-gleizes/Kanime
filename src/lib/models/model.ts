abstract class Model<D = any> {
  protected connexion: D;

  protected constructor(connexionModule: D) {
    this.connexion = connexionModule;
  }
}

export default Model;
