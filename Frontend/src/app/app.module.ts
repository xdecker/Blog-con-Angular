import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//importando mis rutas creadas
import {routing, appRoutingProviders} from "./app.routing";

//importando para funcionar formularios
import {FormsModule} from "@angular/forms";

//para las peticiones AJAX
import {HttpClientModule} from "@angular/common/http";
//modulo de moment fecha
import {MomentModule} from "angular2-moment";
//modulo para subir files

import { AppComponent } from './app.component';
import { MiComponente} from "./components/mi-componente/mi-componente.component";
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { PruebasComponent } from './components/pruebas/pruebas.component';
import { HeaderComponent } from './components/header/header.component';
import { SliderComponent } from './components/slider/slider.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { PaginaComponent } from './components/pagina/pagina.component';
import { ErrorComponent } from './components/error/error.component';
import { PeliculaComponent } from './components/pelicula/pelicula.component';
import {EsParPipe} from "./pipes/espar.pipe";
import { ArticlesComponent } from './components/articles/articles.component';
import { ArticleComponent } from './components/article/article.component';
import { SearchComponent } from './components/search/search.component';
import { ArticleNewComponent } from './components/article-new/article-new.component';
import { ArticleEditComponent } from './components/article-edit/article-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MiComponente,
    PeliculasComponent,
    PruebasComponent,
    HeaderComponent,
    SliderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    BlogComponent,
    FormularioComponent,
    PaginaComponent,
    ErrorComponent,
    PeliculaComponent,
    EsParPipe,
    ArticlesComponent,
    ArticleComponent,
    SearchComponent,
    ArticleNewComponent,
    ArticleEditComponent,

  ],
  //cualquier modulo creado y por libreria de angular debe cargarse aqui
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    MomentModule,
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
