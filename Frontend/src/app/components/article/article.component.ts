import { Component, OnInit } from '@angular/core';
//importacion para coger parametro id
import {Router, ActivatedRoute, Params} from "@angular/router";

import {ArticleService} from "../../services/article.service";
import {Article} from "../../models/article";
import {Global} from "../../services/global";
import swal from "sweetalert";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit {

  public article: Article;
  public url: string;

  constructor(
    private _articleService: ArticleService,
    //para recoger el parametro
    private _route: ActivatedRoute,
    private _router: Router
  ) {
      this.url = Global.url;

  }//fin constructor

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];

    this._articleService.getArticle(id).subscribe(
      response => {
        if(response.article){
          this.article = response.article;
          console.log('todo cargado');
        } else{
          this._router.navigate(['/home']);
        }
      },
      error =>{
        this._router.navigate(['/home']);
      }
    );
    });
  }

  delete(id){

    swal({
      title: "Estas seguro?",
      text: "Una vez eliminado, no podras recuperarlo!",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {

          //peticion ajax
          this._articleService.delete(id).subscribe(
            response =>{
              swal("Poof! El articulo ha sido eliminado!", {
                icon: "success",
              });
              this._router.navigate(['/blog']);
            },
            error => {
              console.log(error);
              this._router.navigate(['/blog']);
            }
          );


        } else {
          swal("No se ha borrado el articulo!");
        }
      });


  }

}
