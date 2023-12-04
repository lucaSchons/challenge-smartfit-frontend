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
    academias: Observable<Academia[]> = this.service.getObservable();

    constructor(private service: AcademiasService) {}

    ngOnInit() {}
}


