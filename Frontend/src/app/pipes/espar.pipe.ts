//pipe para comprobar si resultado es par
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'espar'
})
export class EsParPipe implements PipeTransform {

  transform(value: any)  {

    var espar = "no es par";

    if (value % 2 == 0){
      espar = "el numero es par";
    }

    return "El anio es: " + value + " y "+espar;
  }
}
