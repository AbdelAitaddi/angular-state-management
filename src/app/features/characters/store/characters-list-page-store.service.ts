import { inject, Injectable, Signal } from '@angular/core';
import { ComponentStore, OnStateInit, tapResponse } from '@ngrx/component-store';
import { Router } from '@angular/router';

// models
import { Character, CharactersResults } from '../models';

// services
import { CharactersService } from '../services';
import { extractItemId } from '../../../shared/core/helpers/helpers.service';

// rxjs
import { Observable, tap } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface CharactersState {
  characters: Character[];
  loaded: boolean;
  loading: boolean;
}

export const charactersInitialState: CharactersState = {
  characters: [],
  loaded: false,
  loading: false,
};

export interface CharactersPageVm {
  characters: Character[];
  loaded: boolean;
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CharactersListPageStore extends ComponentStore<CharactersState> implements OnStateInit {
  private readonly router = inject(Router);
  private readonly charactersService = inject(CharactersService);
  constructor() {
    super(charactersInitialState);
  }

  ngrxOnStateInit() {
    this.getCharacters$();
  }

  private readonly characters$: Signal<Character[]> = this.selectSignal((state: CharactersState) => state.characters);
  private readonly loading$: Signal<boolean> = this.selectSignal((state: CharactersState) => state.loading);
  private readonly loaded$: Signal<boolean> = this.selectSignal((state: CharactersState) => state.loaded);

  readonly getCharacters$ = this.effect((trigger$: Observable<void>) => {
    return trigger$.pipe(
      tap(() => this.patchState({ loading: true, loaded: false })),
      switchMap(() =>
        this.charactersService.getCharacters().pipe(
          map((data: CharactersResults) => data.results),
          tapResponse({
            next: (characters: Character[]) =>
              this.patchState({
                characters: characters.map((item) => ({ ...item, id: extractItemId(item.url) })),
                loaded: true,
              }),
            error: () => this.router.navigateByUrl('/app-unavailable', { skipLocationChange: true }),
            complete: () => this.patchState({ loading: false }),
          })
        )
      )
    );
  });

  readonly charactersPageVm$: Signal<CharactersPageVm> = this.selectSignal(
    this.characters$,
    this.loaded$,
    this.loading$,
    (characters, loaded, loading) => ({
      characters,
      loaded,
      loading,
    })
  );
}
