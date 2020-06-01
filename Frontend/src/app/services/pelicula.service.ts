//SERVICIO ES COMO CONTROLADOR
//metodo que me permite aplicar un decorador a la clase
import {Injectable} from "@angular/core";
import {Pelicula} from "../models/pelicula";

//USAR DECORADOR
@Injectable()
export class PeliculaService{

  public peliculas: Pelicula[];


  constructor() {
    this.peliculas = [
      new Pelicula("Spiderman 4", 2019,"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spiderman-sony-spiderverso-1567749360.jpeg?resize=640:*" ),
      new Pelicula("Los Vengadore Endgame", 2018, "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spiderman-sony-spiderverso-1567749360.jpeg?resize=640:*"),
      new Pelicula("Batman vs Superman", 2016, "https://dam.smashmexico.com.mx/wp-content/uploads/2018/04/24160545/batman_v_superman_dawn_of_justice-cover-768x432.jpg"),
    ];
  }

  holaMundo(){
    return 'Hola Mundo desde un servicio de Angular !!';
  }

  getPeliculas(){
    return this.peliculas;
  }
}
