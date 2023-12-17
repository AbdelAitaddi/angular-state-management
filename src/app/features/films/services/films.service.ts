import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// models
import { Film, FilmsResults } from '../models';

// rxjs
import { Observable, retry, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly ApiUrl: string = 'https://swapi.dev/api/films';

  getFilms(): Observable<FilmsResults> {
    return this.http.get<FilmsResults>(this.ApiUrl).pipe(catchError((err) => throwError(() => err)));
  }

  getFilm(id: string): Observable<Film> {
    return this.http.get<Film>(`${this.ApiUrl}/${id}`).pipe(catchError((err) => throwError(() => err)));
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
