import { Component, OnInit } from '@angular/core';

//para recoger parametros
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.css']
})
export class PaginaComponent implements OnInit {

  //propiedad publica para verlo en vistas
  public nombre: string;
  public apellidos: string;

  //para utilizar los parametros los cargo en el constructor
  //EN EL PARENTESIS
  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {

    //capturando parametro de url
    this._route.params.subscribe((params: Params) => {
      this.nombre = params.nombre;
      this.apellidos = params.apellidos;
    });
  }

  redireccion(){
    this._router.navigate(['/pagina-de-pruebas','Xavier','Decker']);
  }

}
