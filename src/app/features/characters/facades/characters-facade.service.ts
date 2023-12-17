import { inject, Injectable } from '@angular/core';

// components

// models
import { Character } from '../models';
import { Film } from '../../films/models';
import { Planet } from '../../planets/models';
import { RelatedResourceDataSnapshot, Species, Starship, Vehicle } from '../../../shared/core/models';

// services
import { CharactersStore } from '../store';
import { CharactersService } from '../services';
import { buildRoute, extractItemId, isFilmResource } from '../../../shared/core/helpers/helpers.service';

// rxjs
import { filter, from, mergeMap, Observable, of, retry, switchMap, tap, throwError, toArray } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CharactersFacadeService {
  private charactersService = inject(CharactersService);
  private store = inject(CharactersStore);

  set characters(characters: Character[]) {
    this.store.set('characters', characters);
  }

  get characters$(): Observable<Character[]> {
    return this.store.select<Character[]>('characters');
  }

  set selectedCharacter(character: Character) {
    this.store.set('selectedCharacter', character);
  }

  get selectedCharacter$(): Observable<Character> {
    return this.store.select<Character>('selectedCharacter');
  }

  set loading(loading: boolean) {
    this.store.set('loading', loading);
  }

  get loading$(): Observable<boolean> {
    return this.store.select<boolean>('loading');
  }

  set loaded(loaded: boolean) {
    this.store.set('loaded', loaded);
  }

  get loaded$(): Observable<boolean> {
    return this.store.select<boolean>('loaded');
  }

  get films$(): Observable<RelatedResourceDataSnapshot[]> {
    return this.loadDataByUrl<Film>('films');
  }

  get species$(): Observable<RelatedResourceDataSnapshot[]> {
    return this.loadDataByUrl<Species>('species');
  }

  get starships$(): Observable<RelatedResourceDataSnapshot[]> {
    return this.loadDataByUrl<Starship>('starships');
  }

  get vehicles$(): Observable<RelatedResourceDataSnapshot[]> {
    return this.loadDataByUrl<Vehicle>('vehicles');
  }

  get homeWorld$(): Observable<RelatedResourceDataSnapshot | null> {
    return this.selectedCharacter$.pipe(
      filter(Boolean),
      switchMap((character: Character) =>
        this.charactersService
          .loadDataByUrl<Planet>(character.homeworld)
          .pipe(catchError(() => of({ url: character.homeworld, name: ' unknown name' } as Planet)))
      ),
      map((data: Planet) => ({
        url: data.url,
        name: data.name,
        route: buildRoute(data.url, 'planets'),
      })),
      startWith(null)
    );
  }

  getCharacters(): Observable<Character[]> {
    this.loaded = false;
    return this.charactersService.getCharacters().pipe(
      tap((characters: Character[]) => {
        this.loaded = true;
        this.characters = characters.map((item) => ({ ...item, id: extractItemId(item.url) }));
      })
    );
  }

  getCharacter(id: string): Observable<Character> {
    this.loading = true;
    return this.charactersService.getCharacter(id).pipe(
      tap((character: Character) => (this.selectedCharacter = character)),
      retry({
        count: 2,
        delay: 1000,
        resetOnSuccess: true,
      }),
      catchError((error) => throwError(error))
    );
  }

  private loadDataByUrl<T extends { url: string; name?: string }>(
    resource: keyof Character
  ): Observable<RelatedResourceDataSnapshot[]> {
    return this.selectedCharacter$.pipe(
      filter(Boolean),
      switchMap((character: Character) =>
        from(character[resource] as string[]).pipe(
          mergeMap(
            (url: string) =>
              this.charactersService
                .loadDataByUrl<T>(url)
                .pipe(catchError(() => of({ url, name: ' unknown name' }))) as Observable<T>
          ),
          toArray()
        )
      ),
      map(
        (data: T[]) =>
          data.map((item: T) => ({
            url: item.url,
            name: isFilmResource(item) ? item.title : item.name,
            route: buildRoute(item.url, resource),
          })) as RelatedResourceDataSnapshot[]
      ),
      startWith([])
    );
  }
}
