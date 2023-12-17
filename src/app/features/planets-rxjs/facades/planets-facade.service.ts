import { inject, Injectable } from '@angular/core';

// models
import { Planet } from '../models';
import { Film } from '../../films/models';
import { Character } from '../../characters/models';
import { RelatedResource, RelatedResourceDataSnapshot } from '../../../shared/core/models';

// services
import { PlanetsStore } from '../store';
import { PlanetsService } from '../services';
import { buildRoute, extractItemId, isFilmResource } from '../../../shared/core/helpers/helpers.service';

// rxjs
import { catchError, map, startWith } from 'rxjs/operators';
import {
  filter,
  finalize,
  from,
  merge,
  mergeMap,
  Observable,
  of,
  retry,
  switchMap,
  tap,
  throwError,
  toArray,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanetsFacadeService {
  private planetsService = inject(PlanetsService);
  private store = inject(PlanetsStore);

  set planets(planets: Planet[]) {
    this.store.set('planets', planets);
  }

  get planets$(): Observable<Planet[]> {
    return this.store.select<Planet[]>('planets');
  }

  set selectedPlanet(planet: Planet) {
    this.store.set('selectedPlanet', planet);
  }

  get selectedPlanet$(): Observable<Planet> {
    return this.store.select<Planet>('selectedPlanet');
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

  get charactersResource$(): Observable<RelatedResource> {
    return this.store.select<RelatedResource>('residents');
  }

  get filmsResource$(): Observable<RelatedResource> {
    return this.store.select<RelatedResource>('films');
  }

  loadRelatedResource(): Observable<RelatedResourceDataSnapshot[]> {
    return merge(this.loadDataByUrl<Film>('films', 'films'), this.loadDataByUrl<Character>('residents', 'characters'));
  }

  getPlanets(): Observable<Planet[]> {
    this.loaded = false;
    this.loading = true;
    return this.planetsService.getPlanets().pipe(
      tap((planets: Planet[]) => {
        this.loaded = true;
        this.planets = planets.map((item: Planet) => ({ ...item, id: extractItemId(item.url) }));
      }),
      finalize(() => (this.loading = false))
    );
  }

  getPlanet(id: string): Observable<Planet> {
    this.loading = true;
    return this.planetsService.getPlanet(id).pipe(
      tap((planet: Planet) => (this.selectedPlanet = planet)),
      retry({
        count: 2,
        delay: 1000,
        resetOnSuccess: true,
      }),
      finalize(() => (this.loading = false)),
      catchError((error) => throwError(() => error))
    );
  }

  private loadDataByUrl<T extends { url: string; name?: string }>(
    resource: keyof Planet,
    route: string
  ): Observable<RelatedResourceDataSnapshot[]> {
    return this.selectedPlanet$.pipe(
      filter(Boolean),
      tap(() => {
        this.store.patch({
          [resource]: {
            loading: true,
            loaded: false,
            data: [],
          },
        });
      }),
      switchMap((planet: Planet) =>
        from(planet[resource] as string[]).pipe(
          mergeMap(
            (url: string) =>
              this.planetsService
                .loadDataByUrl<T>(url)
                .pipe(catchError(() => of({ url, name: ' unknown name' }))) as Observable<T>
          ),
          toArray()
        )
      ),
      map((data: T[]) =>
        data.map((item: T) => ({
          url: item.url,
          name: isFilmResource(item) ? item.title : (item.name as string),
          route: buildRoute(item.url, route),
        }))
      ),
      tap((data) => {
        this.store.patch({
          [resource]: {
            loading: false,
            loaded: true,
            data,
          },
        });
      }),
      startWith([])
    );
  }
}
