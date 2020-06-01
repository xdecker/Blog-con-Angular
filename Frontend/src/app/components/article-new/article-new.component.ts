import { Component, OnInit } from '@angular/core';
//CREAR UN OBJETO PARA Q EL FORM LO RELLENE
import {Article} from "../../models/article";
import {ArticleService} from "../../services/article.service";
//Biblioteca para los alerts
import swal from "sweetalert";

//para redireccionar
import {Router, ActivatedRoute, Params} from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http';
//file
import {Global} from "../../services/global";


@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {

  public article: Article;
  public status: string;
  public page_title: string;
  public selectedFile: File;
  public url: string;
  public is_edit: boolean;
  image: string;
  imageDefault: string;
  urlImage: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private http: HttpClient,
    private _articleService : ArticleService,


  ) {
    this.article = new Article('','','',null,null);
    this.page_title = 'Crear Articulo';
    this.url = Global.url;
    this.is_edit = false;
    this.imageDefault = `http://localhost:4200/assets/images/default.png`;
    this.urlImage = Global.url + 'upload-image/';
  }

  ngOnInit(): void {

  }

  onSubmit(){

    this._articleService.create(this.article).subscribe(
      response => {

        if(response.status == 'success'){
          this.status = 'success';
          this.article = response.article;
          //ALERT
          swal(
            'Articulo creado!!',
            'El articulo ha sido creado correctamente',
            'success'
          );

          //console.log(this.article);
          this._router.navigate(['/blog']);
        } else {
          this.status = 'error';
        }

      },
      error =>{
        console.log(error);
        this.status = error;

      });

      //ya guardo el articulo, falta la imagen

    const uploadFormData = new FormData();
    uploadFormData.append('image', this.selectedFile);

  //let header = new HttpHeaders().set('Content-Type', 'image/jpeg,jpg,png,gif');
    this.http.post(this.urlImage + this.article._id, uploadFormData
    ).subscribe(resp => {
      console.log('success');
      // console.log(resp);

    }, (err) => {

      console.log('error');
      // console.log(err);

    });

  }

  onFileUpload(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

}
