import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

// components
import { FilmPreviewComponent } from '../../components';

// models
import { Film } from '../../models';

import * as fromStore from '../../store';

export interface ViewModel {
  films: Film[];
}

@Component({
  standalone: true,
  imports: [CommonModule, FilmPreviewComponent, MatProgressSpinnerModule],
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FilmListComponent {
  private readonly store: Store<fromStore.State> = inject(Store);

  vm: Signal<ViewModel> = this.store.selectSignal(fromStore.selectFilmsPageVm);
}
