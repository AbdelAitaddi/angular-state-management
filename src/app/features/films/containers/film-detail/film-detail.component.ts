import { ChangeDetectionStrategy, Component, inject, OnDestroy, Signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

// components
import { RelatedItemListComponent } from '../../../../shared/core/components';

// models
import { RelatedResource } from '../../../../shared/core/models';
import { Film } from '../../models';
import * as fromStore from '../../store';

export interface ViewModel {
  filmDetail: Film | null;
  characters: RelatedResource;
  planets: RelatedResource;
  starships: RelatedResource;
  vehicles: RelatedResource;
  species: RelatedResource;
}

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RelatedItemListComponent],
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FilmDetail implements OnDestroy {
  private readonly store: Store<fromStore.State> = inject(Store);

  vm: Signal<ViewModel> = this.store.selectSignal(fromStore.selectFilmDetailPageVm);

  ngOnDestroy() {
    this.store.dispatch(fromStore.FilmDetailPageActions.cancelRequest());
  }
}
