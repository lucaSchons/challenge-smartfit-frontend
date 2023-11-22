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
    academias: Academia[] = [];
    @Input() resultado!: number;
    academiaAlteracao!: Observable<Academia[]>;
    
    constructor(private service: AcademiasService){
        this.resultado = 0;
        this.service.getObservable().subscribe(result => {
            this.academias = result;
            console.log("resultado dentro do form", this.academias.length);
            this.resultado = this.academias.length;
        })
    }
    ngOnInit(){}

    filtrarUnidades() {
        const manha = document.querySelector("#check-manha") as HTMLInputElement;
        const tarde = document.querySelector("#check-tarde") as HTMLInputElement;
        const noite = document.querySelector("#check-noite") as HTMLInputElement;
        const unidades_fechadas = document.querySelector("#check-un-fechadas") as HTMLInputElement;

        this.service.filtrarUnidades(manha.checked, tarde.checked, noite.checked, unidades_fechadas.checked);
    }


}