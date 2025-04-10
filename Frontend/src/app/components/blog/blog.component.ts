import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../services/article.service";
import {Article} from "../../models/article";
import {Global} from "../../services/global";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  //cargar el servicio en el provider
  providers: [ArticleService]
})
export class BlogComponent implements OnInit {

  public articles: Article [];
  public url: string;

  constructor(
    private _articleService: ArticleService
  ) {
    this.url = Global.url;
  }

  ngOnInit(): void {

    //el observable tiene un metodo subscribe que me recoge resultados
    this._articleService.getArticles().subscribe(
      response => {
        if(response.articles){
          this.articles = response.articles;
        } else{

        }
      },
      error => {
        console.log(error);
      }
    );
  }

}
