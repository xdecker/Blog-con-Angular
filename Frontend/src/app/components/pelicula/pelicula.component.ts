import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Pelicula} from "../../models/pelicula";

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  //Asi tengo un componente hijo para cada pelicula
  @Input() pelicula: Pelicula;
  @Output() MarcarFavorita: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  seleccionar(event, pelicula){
    this.MarcarFavorita.emit({
      pelicula: pelicula
    })

  }
}
