import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Academia } from "./academia.model"
import { Observable, Subject, Subscription, catchError, map, of } from "rxjs";
import { formComponent } from "./form-component/form.component";

@Injectable()
export class AcademiasService {
    private apiURL!: string;
    academias: Academia[] = [];
    somaUnidadesFiltradas = new Subject<Academia[]>();

    constructor(private http: HttpClient) {
        this.apiURL = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json';
    }

    getAcademias() {
        return this.academias.slice();
    }

    getObservable() {
        return this.somaUnidadesFiltradas.asObservable();
    }

    verificaDuplicidade(academia: Academia): Observable<boolean> {
        return this.somaUnidadesFiltradas.asObservable().pipe(
            map(res => res.some(academiaFiltrada => academiaFiltrada.title === academia.title)),
            catchError(error => {
                console.error(error);
                return of(false);
            })
        );
    }

    filtrarUnidades(manha: boolean, tarde: boolean, noite: boolean, fechadas: boolean) {
        this.getObservable();
        this.http.get<{ locations: Academia[] }>(this.apiURL)
            .subscribe(data => {
                this.academias = data.locations;
                const academiasFiltradas: Academia[] = [];

                this.academias.forEach((academia: any) => {

                    if (academia.schedules && Array.isArray(academia.schedules)) {
                        const hours = academia.schedules.map((schedule: any) => schedule.hour);

                        if(hours !== 'Fechada'){
                            if (manha) {
                                if (hours.some((hour: any) => {
                                    const [inicio, fim] = hour.split(" às ");
                                    const inicioInt = parseInt(inicio);
                                    const fimInt = parseInt(fim);
                                    return inicioInt <= 6 && fimInt >= 12;
                                })) {
                                    this.verificaDuplicidade(academia).subscribe(duplicidade => {
                                        if (!duplicidade) {
                                            academiasFiltradas.push(academia);
                                        }
                                    });
                                }
                            }
                            if (tarde) {
                                if (hours.some((hour: any) => {
                                    const [inicio, fim] = hour.split(" às ");
                                    const inicioInt = parseInt(inicio);
                                    const fimInt = parseInt(fim);
                                    return inicioInt <= 12 && fimInt >= 18;
    
                                })) {
                                    this.verificaDuplicidade(academia).subscribe(duplicidade => {
                                        if (!duplicidade) {
                                            academiasFiltradas.push(academia);
                                        }
                                    });
                                }
                            }
                            if (noite) {
                                if (hours.some((hour: any) => {
                                    const [inicio, fim] = hour.split(" às ");
                                    const inicioInt = parseInt(inicio);
                                    const fimInt = parseInt(fim);
                                    return inicioInt <= 18 && fimInt <= 23;
                                })) {
                                    this.verificaDuplicidade(academia).subscribe(duplicidade => {
                                        if (!duplicidade) {
                                            academiasFiltradas.push(academia);
                                        }
                                    });
                                }
                            }
                        }

                        if (fechadas && hours === 'Fechada') {  
                            this.verificaDuplicidade(academia).subscribe(duplicidade => {
                                if (!duplicidade) {
                                    academiasFiltradas.push(academia);
                                }
                            });
                            

                        }

                    } else {
                        if (fechadas) {
                            this.verificaDuplicidade(academia).subscribe(duplicidade => {
                                if (!duplicidade) {
                                    academiasFiltradas.push(academia);
                                }
                            });
                        }
                    }

                })
                this.somaUnidadesFiltradas.next(academiasFiltradas);
            });
    }
}