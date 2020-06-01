import {Component, OnInit, DoCheck, OnDestroy,} from '@angular/core';
import {Pelicula} from "../../models/pelicula";
import {PeliculaService} from "../../services/pelicula.service";

@Component({
  selector: 'peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  //para aplicar mi servicio uso el directorio providers
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {

  public titulo: string;
  //hacer un array de peliculas
  public peliculas: Pelicula[];
  public favorita; Pelicula;
  public fecha: any;

  //asigna valor a diferentes propiedades, no se le debe meter logica
  constructor(
    //siempre se pone _ a los servicios
    private _peliculaService: PeliculaService

  ) {
    this.titulo = 'Componente Peliculas';
    this.peliculas = this._peliculaService.getPeliculas();

    this.fecha = new Date(2020, 8,12);
  }

  //este hook se ejecuta cuando cargamos el componente,
  ngOnInit(): void {
    console.log(this.peliculas);
    console.log('Componente iniciado');
    console.log(this._peliculaService.holaMundo());
  }

  //metodo que se ejecuta cada vez que hay un cambio
  ngDoCheck(): void {
    console.log('DoCheck lanzado');
  }

  cambiarTitulo()
  {
    this.titulo = 'El titulo ha sido cambiado';
  }

  ngOnDestroy(): void {
    console.log('El componente se va a eliminar');
  }

  mostrarFavorita(event){
    this.favorita = event.pelicula;
  }

}
