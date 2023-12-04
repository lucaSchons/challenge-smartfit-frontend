import { Component, Injectable, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { AcademiasService } from "../academias.service";
import { Academia } from "../academia.model";
import { Observable, Subject, Subscription } from "rxjs";


@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})

@Injectable()
export class formComponent implements OnInit {
    academias: Observable<Academia[]> = this.service.somaUnidadesFiltradas.asObservable();
    
    constructor(private service: AcademiasService){}

    ngOnInit(){}

    filtrarUnidades() {
        const manha = document.querySelector("#check-manha") as HTMLInputElement;
        const tarde = document.querySelector("#check-tarde") as HTMLInputElement;
        const noite = document.querySelector("#check-noite") as HTMLInputElement;
        const unidades_fechadas = document.querySelector("#check-un-fechadas") as HTMLInputElement;

        this.service.filtrarUnidades(manha.checked, tarde.checked, noite.checked, unidades_fechadas.checked);
    }

    onClean(){
        const manha = document.querySelector("#check-manha") as HTMLInputElement;
        const tarde = document.querySelector("#check-tarde") as HTMLInputElement;
        const noite = document.querySelector("#check-noite") as HTMLInputElement;
        const unidades_fechadas = document.querySelector("#check-un-fechadas") as HTMLInputElement;
        manha.checked = false;
        tarde.checked = false;
        noite.checked = false;
        unidades_fechadas.checked = false;
    }


}