//para poder utilizarlo afuera en el componente
import {Injectable} from "@angular/core";

//para comunicaciones http
import {HttpClient, HttpHeaders} from "@angular/common/http";

//para recoger los datos que devuelve el API
import {Observable} from "rxjs";
import {Article} from "../models/article";
import {Global} from "./global";

//DEFINIR LA CLASE CON EL DECORADOR
@Injectable()
export class ArticleService{

  public url: string;

  constructor(
    //para hacer peticiones (ponerlo en app.module)
    private _http: HttpClient
  ){
      this.url = Global.url;
  }

  prueba(){
    return "Soy el servicio de articulos !!";
  }

  //parametro opcional ya que en el backend esta igual
  getArticles(last:any = null):Observable<any>{

    var articles = 'articles';

    if(last != null){
      articles = 'articles/true';
    }

    return this._http.get(this.url+articles);
  }

  //peticion ajax para articulo especifico
  getArticle(articleId):Observable<any>{
    return this._http.get(this.url+'article/'+articleId);
  }

  search(searchString):Observable<any>{
    return this._http.get(this.url+'search/'+searchString);
  }

  //metodo para guadar articulo
  create(article):Observable<any>{
    //debo primero convertir ese objeto de parametro en JSON
    let params = JSON.stringify(article);
    //configurar el content type
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //peticion ajax para guardar
    return this._http.post(this.url+'save',params, {headers: headers});
  }

  update(id, article):Observable<any>{
    let params = JSON.stringify(article);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(this.url+'article/'+id, params, {headers: headers});
  }


  delete(id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url+'article/'+id, {headers: headers});
  }

}
