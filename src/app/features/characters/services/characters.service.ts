import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// models
import { Character, CharactersResults } from '../models';

// rxjs
import { catchError, map } from 'rxjs/operators';
import { Observable, retry, throwError } from 'rxjs';

const retryConfig = {
  count: 2,
  delay: 1000,
  resetOnSuccess: true,
};

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  readonly http = inject(HttpClient);
  readonly ApiUrl = 'https://swapi.dev/api/people/';

  getCharacters(): Observable<CharactersResults> {
    return this.http.get<CharactersResults>(this.ApiUrl).pipe(
      retry(retryConfig),
      catchError((err) => throwError(() => err))
    );
  }

  getCharacter(id: string): Observable<Character> {
    return this.http.get<Character>(`${this.ApiUrl}/${id}`).pipe(
      retry(retryConfig),
      catchError((err) => throwError(() => err))
    );
  }

  loadDataByUrl<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(retry(retryConfig));
  }
}
