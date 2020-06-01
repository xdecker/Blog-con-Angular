import { Component, OnInit } from '@angular/core';
//CREAR UN OBJETO PARA Q EL FORM LO RELLENE
import {Article} from "../../models/article";
import {ArticleService} from "../../services/article.service";

//para redireccionar
import {Router, ActivatedRoute, Params} from "@angular/router";
import {HttpClient, HttpHeaders} from '@angular/common/http';
//file
import {Global} from "../../services/global";
import swal from "sweetalert";

@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {

  public article: Article;
  public status: string;
  public is_edit: boolean;
  public page_title: string;
  public selectedFile: File;
  public url; string
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
    this.is_edit = true;
    this.page_title = 'Editar Articulo';
    this.url = Global.url;
    this.imageDefault = `http://localhost:4200/assets/images/default.png`;
    this.urlImage = Global.url + 'upload-image/';
  }


  ngOnInit(): void {
    this.getArticle();
  }

  onSubmit(){

    this._articleService.update(this.article._id ,this.article).subscribe(
      response => {

        if(response.status == 'success'){
          this.status = 'success';
          this.article = response.article;

          //ALERT
          swal(
            'Articulo editado!!',
            'El articulo ha sido editado correctamente',
            'success'
          );

          //console.log(this.article);
          this._router.navigate(['/blog/articulo', this.article._id]);
        } else {
          this.status = 'error';
          //ALERT
          swal(
            'Edicion fallida!!',
            'El articulo no ha sido editado correctamente',
            'error'
          );
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

  getArticle(){
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




}
