import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { MatMenuModule } from '@angular/material/menu';
import { Film } from '../../models';

@Component({
  selector: 'app-film-preview',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatMenuModule, RouterLink, MatButtonModule],
  templateUrl: './film-preview.component.html',
  styleUrls: ['./film-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilmPreviewComponent {
  /*
  _film = signal<Film | null>(null);
  @Input({ required: true }) set film(value: Film) {
    this._film.set(value);
  }

*/

  @Input() film: Film;
}
