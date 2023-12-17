import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideComponentStore } from '@ngrx/component-store';

// components
import { RelatedItemListComponent } from '../../../../shared/core/components';

// services
import { CharacterDetailPageStore, CharacterDetailPageVm, characterInitialState } from '../../store';

// rxjs
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RouterModule, RelatedItemListComponent],
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss'],
  providers: [provideComponentStore(CharacterDetailPageStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CharacterDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(CharacterDetailPageStore);

  constructor() {
    this.store.setState({
      ...characterInitialState,
      characterId: this.route.snapshot.paramMap.get('characterId') || null,
    });
  }

  viewModel$: Observable<CharacterDetailPageVm> = this.store.characterDetailPageVm$;
}
