import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideComponentStore } from '@ngrx/component-store';

// components
import { CharacterPreviewComponent } from '../../components/character-preview/character-preview.component';

// services
import { CharactersListPageStore, CharactersPageVm } from '../../store';

@Component({
  standalone: true,
  selector: 'app-character-list',
  imports: [CommonModule, MatCardModule, MatButtonModule, CharacterPreviewComponent, MatProgressSpinnerModule],
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  providers: [provideComponentStore(CharactersListPageStore)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CharacterListComponent {
  viewModel: Signal<CharactersPageVm> = inject(CharactersListPageStore).charactersPageVm$;
}
