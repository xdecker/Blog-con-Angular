//TODO MODELO VA A TENER UN SERVICIO

export class Pelicula {
  /*
  public title: string;
  public year: number;
  public image: string;

  constructor(title, year, image) {
    this.title = title;
    this.year = year;
    this.image = image;
  }
  */

  //manera mas sencilla: definir en los parametros
  //mismos del constructor el tipo de dato
  constructor(
    public title: string,
  public year: number,
  public image: string,
  ) {
  }


}
