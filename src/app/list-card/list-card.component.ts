import { Component, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Academia } from "../academia.model";
import { AcademiasService } from "../academias.service";

@Component({
    selector: 'app-list-card',
    templateUrl: './list-card.component.html',
    styleUrls: ['./list-card.component.scss']
})

export class listcardComponent implements OnInit {
    
    academias: Academia[] = [];
    
    academiaAlteracao!: Observable<Academia[]>;

    //tratar dados aqui pra enviar para o html
    constructor(private service: AcademiasService) {
        this.service.getObservable().subscribe(result => {
            this.academias = result;
            this.academias.forEach(academia => {
                const endereco = academia.content;
                console.log(endereco);
                // Expressão regular mais flexível para encontrar o endereço
                const regex = /<p>(.*?)<\/p>/;
                const resultado = regex.exec(endereco);

                if (resultado && resultado.length > 1) {
                    const conteudo = resultado[1];
                    const endereco = conteudo.replace(/&#8211;/g, ' - ').replace(/<br>/g, ', '); 
                    
                    console.log(endereco);
                    academia.content = endereco;
                } else {
                    console.log("Endereço não encontrado.");
                }

            })
        })
    }

    ngOnInit() { }
}


