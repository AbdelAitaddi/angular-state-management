import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// models
import { Planet, PlanetsResults } from '../models';

// rxjs
import { Observable, retry, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  readonly http = inject(HttpClient);
  readonly ApiUrl = 'https://swapi.dev/api/planets/';

  getPlanets(): Observable<Planet[]> {
    return this.http.get<PlanetsResults>(this.ApiUrl).pipe(
      map((data: PlanetsResults) => data.results),
      catchError((err) => throwError(() => err))
    );
  }

  getPlanet(id: string): Observable<Planet> {
    return this.http.get<Planet>(`${this.ApiUrl}/${id}`).pipe(catchError((err) => throwError(() => err)));
  }

  loadDataByUrl<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      retry({
        count: 2,
        delay: 200,
        resetOnSuccess: true,
      })
    );
  }
}
