import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentStore, OnStateInit, tapResponse } from '@ngrx/component-store';

// services
import { CharactersService } from '../services';
import { buildRoute, isFilmResource } from '../../../shared/core/helpers/helpers.service';

// models
import { Character } from '../models';
import { Film } from '../../films/models';
import { Planet } from '../../planets/models';
import { RelatedResource, RelatedResourceDataSnapshot, Species, Starship, Vehicle } from '../../../shared/core/models';

// rxjs
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { filter, from, mergeMap, Observable, of, tap } from 'rxjs';
import { filterNullish } from '../../../../support/rxjs-operators';

export interface CharacterState {
  character: Character | null;
  characterId: string | null;
  loaded: boolean;
  loading: boolean;
  planets: RelatedResource;
  films: RelatedResource;
  species: RelatedResource;
  starships: RelatedResource;
  vehicles: RelatedResource;
}

export const characterInitialState: CharacterState = {
  character: null,
  characterId: null,
  loaded: false,
  loading: false,
  planets: {
    loading: false,
    loaded: false,
    data: [],
    errorMessage: '',
  },
  films: {
    loading: false,
    loaded: false,
    data: [],
    errorMessage: '',
  },
  species: {
    loading: false,
    loaded: false,
    data: [],
    errorMessage: '',
  },
  starships: {
    loading: false,
    loaded: false,
    data: [],
    errorMessage: '',
  },
  vehicles: {
    loading: false,
    loaded: false,
    data: [],
    errorMessage: '',
  },
};

export interface CharacterDetailPageVm {
  character: Character | null;
  loading: boolean;
  loaded: boolean;
  films: RelatedResource;
  species: RelatedResource;
  starships: RelatedResource;
  vehicles: RelatedResource;
  planets: RelatedResource;
}

@Injectable({
  providedIn: 'root',
})
export class CharacterDetailPageStore extends ComponentStore<CharacterState> implements OnStateInit {
  private readonly charactersService = inject(CharactersService);
  private readonly router = inject(Router);
  constructor() {
    super();
  }

  ngrxOnStateInit() {
    this.characterId$.pipe(filterNullish, take(1)).subscribe((id: string) => this.getCharacterDetail$(id));

    this.character$.pipe(filterNullish, take(1)).subscribe((character: Character) => {
      this.loadRelatedFilms$({ collection: character.films, route: 'films' });
      this.loadRelatedSpecies$({ collection: character.species, route: 'species' });
      this.loadRelatedStarships$({ collection: character.starships, route: 'starships' });
      this.loadRelatedVehicles$({ collection: character.vehicles, route: 'vehicles' });
      this.loadRelatedPlanets$({ url: character.homeworld, route: 'planets' });
    });
  }

  private readonly character$: Observable<Character | null> = this.select((state: CharacterState) => state.character);
  private readonly characterId$: Observable<string | null> = this.select((state: CharacterState) => state.characterId);
  private readonly loading$: Observable<boolean> = this.select((state: CharacterState) => state.loading);
  private readonly loaded$: Observable<boolean> = this.select((state: CharacterState) => state.loaded);
  private readonly films$: Observable<RelatedResource> = this.select((state: CharacterState) => state.films);
  private readonly species$: Observable<RelatedResource> = this.select((state: CharacterState) => state.species);
  private readonly starships$: Observable<RelatedResource> = this.select((state: CharacterState) => state.starships);
  private readonly vehicles$: Observable<RelatedResource> = this.select((state: CharacterState) => state.vehicles);
  private readonly planets$: Observable<RelatedResource> = this.select((state: CharacterState) => state.planets);

  readonly getCharacterDetail$ = this.effect((trigger$: Observable<string>) => {
    return trigger$.pipe(
      tap(() => this.patchState({ loading: true, loaded: false })),
      switchMap((id: string) =>
        this.charactersService.getCharacter(id).pipe(
          tapResponse({
            next: (character: Character) => this.patchState({ character, loaded: true }),
            error: () => this.router.navigateByUrl('/app-unavailable', { skipLocationChange: true }),
            complete: () => this.patchState({ loading: false }),
          })
        )
      )
    );
  });

  private addFilms = this.updater((state: CharacterState, data: RelatedResourceDataSnapshot) => ({
    ...state,
    films: {
      loading: false,
      loaded: true,
      errorMessage: '',
      data: [...state.films.data.slice(), data],
    },
  }));

  private addSpecies = this.updater((state: CharacterState, data: RelatedResourceDataSnapshot) => ({
    ...state,
    species: {
      loading: false,
      loaded: true,
      errorMessage: '',
      data: [...state.species.data.slice(), data],
    },
  }));

  private addStarship = this.updater((state: CharacterState, data: RelatedResourceDataSnapshot) => ({
    ...state,
    starships: {
      loading: false,
      loaded: true,
      errorMessage: '',
      data: [...state.starships.data.slice(), data],
    },
  }));

  private addVehicle = this.updater((state: CharacterState, data: RelatedResourceDataSnapshot) => ({
    ...state,
    vehicles: {
      loading: false,
      loaded: true,
      errorMessage: '',
      data: [...state.vehicles.data.slice(), data],
    },
  }));

  private addPlanet = this.updater((state: CharacterState, data: RelatedResourceDataSnapshot) => ({
    ...state,
    planets: {
      loading: false,
      loaded: true,
      errorMessage: '',
      data: [...state.planets.data.slice(), data],
    },
  }));

  readonly loadRelatedFilms$ = this.effect((trigger$: Observable<{ collection: string[]; route: string }>) => {
    return trigger$.pipe(
      filter(({ collection }) => !!collection.length),
      tap(() => this.patchState({ films: { loading: true, loaded: false, data: [], errorMessage: '' } })),
      mergeMap(({ collection, route }) =>
        this.requestData<Film>(collection, route).pipe(
          tapResponse({
            next: this.addFilms,
            error: (error: Error) =>
              this.patchState({ films: { loading: false, loaded: false, data: [], errorMessage: error.message } }),
          })
        )
      )
    );
  });

  readonly loadRelatedSpecies$ = this.effect((trigger$: Observable<{ collection: string[]; route: string }>) => {
    return trigger$.pipe(
      filter(({ collection }) => !!collection.length),
      tap(() => this.patchState({ species: { loading: true, loaded: false, data: [], errorMessage: '' } })),
      mergeMap(({ collection, route }) =>
        this.requestData<Species>(collection, route).pipe(
          tapResponse({
            next: this.addSpecies,
            error: (error: Error) =>
              this.patchState({ species: { loading: false, loaded: false, data: [], errorMessage: error.message } }),
          })
        )
      )
    );
  });

  readonly loadRelatedStarships$ = this.effect((trigger$: Observable<{ collection: string[]; route: string }>) => {
    return trigger$.pipe(
      filter(({ collection }) => !!collection.length),
      tap(() => this.patchState({ starships: { loading: true, loaded: false, data: [], errorMessage: '' } })),
      mergeMap(({ collection, route }) =>
        this.requestData<Starship>(collection, route).pipe(
          tapResponse({
            next: this.addStarship,
            error: (error: Error) =>
              this.patchState({ starships: { loading: false, loaded: false, data: [], errorMessage: error.message } }),
          })
        )
      )
    );
  });

  readonly loadRelatedVehicles$ = this.effect((trigger$: Observable<{ collection: string[]; route: string }>) => {
    return trigger$.pipe(
      filter(({ collection }) => !!collection.length),
      tap(() => this.patchState({ vehicles: { loading: true, loaded: false, data: [], errorMessage: '' } })),
      mergeMap(({ collection, route }) =>
        this.requestData<Vehicle>(collection, route).pipe(
          tapResponse({
            next: this.addVehicle,
            error: (error: Error) =>
              this.patchState({ vehicles: { loading: false, loaded: false, data: [], errorMessage: error.message } }),
          })
        )
      )
    );
  });

  readonly loadRelatedPlanets$ = this.effect((trigger$: Observable<{ url: string; route: string }>) => {
    return trigger$.pipe(
      filter(({ url }) => !!url),
      tap(() => this.patchState({ planets: { loading: true, loaded: false, data: [], errorMessage: '' } })),
      mergeMap(({ url, route }) =>
        this.requestData<Planet>([url], route).pipe(
          tapResponse({
            next: this.addPlanet,
            error: (error: Error) =>
              this.patchState({ planets: { loading: false, loaded: false, data: [], errorMessage: error.message } }),
          })
        )
      )
    );
  });

  private requestData<T extends { url: string; name?: string }>(
    collection: string[],
    route: string
  ): Observable<RelatedResourceDataSnapshot> {
    return from(collection).pipe(
      mergeMap((url: string) =>
        this.charactersService.loadDataByUrl<T>(url).pipe(
          map((item: T) => ({
            url: item.url,
            name: isFilmResource(item) ? item.title : item.name || '-',
            route: buildRoute(item.url, route),
          })),
          catchError(() =>
            of({
              url,
              name: ' unknown name',
              route: buildRoute(url, route),
            })
          )
        )
      )
    );
  }

  readonly characterDetailPageVm$: Observable<CharacterDetailPageVm> = this.select(
    this.character$,
    this.loaded$,
    this.loading$,
    this.planets$,
    this.films$,
    this.species$,
    this.starships$,
    this.vehicles$,
    (character, loaded, loading, planets, films, species, starships, vehicles) => ({
      character,
      loaded,
      loading,
      planets,
      films,
      species,
      starships,
      vehicles,
    })
  );
}
