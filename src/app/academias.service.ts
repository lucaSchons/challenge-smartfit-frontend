import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Academia } from "./academia.model"
import { Observable, Subject, Subscription } from "rxjs";
import { formComponent } from "./form-component/form.component";

@Injectable()
export class AcademiasService {
    private apiURL!: string;
    academias: Academia[] = [];
    academiasManha: Academia[] = [];
    academiasTarde!: Observable<Academia[]>;
    academiasNoite!: Observable<Academia[]>;
    academiasFechadas: Academia[] = [];
    somaUnidadesFiltradas = new Subject<Academia[]>();

    // const OPENNING_HOURS = {
    //     morning: {
    //         first: '06',
    //         last: '12',

    //     },
    //     afternoon: {
    //         first: '12',
    //         last: '18'
    //     },
    //     night: {
    //         first: '18',
    //         last: '23'
    //     }
    // }

    // type HOUR_INDEX = 'mornig' | 'afternoon' | 'night'

    constructor(private http: HttpClient) {
        this.apiURL = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';
    }

    getAcademias() {
        return this.academias.slice();
    }

    getObservable() {
        return this.somaUnidadesFiltradas.asObservable();
    }

    filtrarUnidades(manha: boolean, tarde: boolean, noite: boolean, fechadas: boolean) {
        this.http.get<{ locations: Academia[] }>(this.apiURL)
            .subscribe(data => {
                this.academias = data.locations;
                const academiasFiltradas: Academia[] = []

                this.academias.forEach((academia: any) => {
                    if (academia.schedules && Array.isArray(academia.schedules)) {
                        const hours = academia.schedules.map((schedule: any) => schedule.hour);
                        if (hours !== 'Fechada') {
                            if (manha) {
                                if (hours.some((hour: any) => {
                                    const [inicio, fim] = hour.split(" às ");
                                    const inicioInt = parseInt(inicio);
                                    const fimInt = parseInt(fim);
                                    return inicioInt <= 6 && fimInt >= 12;
                                })) {
                                    academiasFiltradas.push(academia);
                                }
                            }
                            if (tarde) {
                                if (hours.some((hour: any) => {
                                    const [inicio, fim] = hour.split(" às "); //"08h às 18h"
                                    const inicioInt = parseInt(inicio);
                                    const fimInt = parseInt(fim);
                                    return inicioInt <= 12 && fimInt >= 18;
                                })) {
                                    academiasFiltradas.push(academia);
                                }
                            }
                            if (noite) {
                                if (hours.some((hour: any) => {
                                    const [inicio, fim] = hour.split(" às ");
                                    const inicioInt = parseInt(inicio);
                                    const fimInt = parseInt(fim);
                                    return inicioInt <= 18 && fimInt <= 23;
                                })) {
                                    academiasFiltradas.push(academia);

                                }
                            }
                        }

                        if (fechadas) {
                            academiasFiltradas.push(academia);
                        }
                    }
                })
                this.somaUnidadesFiltradas.next(academiasFiltradas);
            });
    }
}

