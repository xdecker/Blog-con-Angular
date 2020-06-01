//Importar los modulos del router de angular
import { ModuleWithProviders} from "@angular/core";
//importar clases para generar objetos de rutas
import {Routes, RouterModule} from "@angular/router";

//Importar componentes a los cuales les quiero hacer una pagina exclusiva
import {HomeComponent} from "./components/home/home.component";
import {BlogComponent} from "./components/blog/blog.component";
import {FormularioComponent} from "./components/formulario/formulario.component";
import {PeliculasComponent} from "./components/peliculas/peliculas.component";
import {PaginaComponent} from "./components/pagina/pagina.component";
import {ErrorComponent} from "./components/error/error.component";
import {ArticleComponent} from "./components/article/article.component";
import {SearchComponent} from "./components/search/search.component";
import {ArticleNewComponent} from "./components/article-new/article-new.component";
import {ArticleEditComponent} from "./components/article-edit/article-edit.component";
//ARRAY DE RUTAS en forma de JSON
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'blog/articulo/:id', component: ArticleComponent},
  {path: 'blog/crear', component: ArticleNewComponent},
  {path: 'blog/editar/:id', component: ArticleEditComponent},
  {path: 'buscar/:search', component: SearchComponent},
  {path: 'formulario', component: FormularioComponent},
  {path: 'peliculas', component: PeliculasComponent},
  {path: 'pagina-de-pruebas', component: PaginaComponent},
  //esta ruta tiene un parametro llamado nombre
  {path: 'pagina-de-pruebas/:nombre/:apellidos', component: PaginaComponent},
  {path: '**', component: ErrorComponent} //esto siempre debe ir de ultimo para que funcione
];

//Exportar el modulo de rutas para usarlo en la aplicacion
//servicio
export const appRoutingProviders: any[] = [];
//provider
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

//debo cargarloo en el app.module
