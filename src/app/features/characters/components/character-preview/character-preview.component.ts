import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { MatMenuModule } from '@angular/material/menu';
import { Character } from '../../models';

@Component({
  selector: 'app-character-preview',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatMenuModule, RouterLink, MatButtonModule],
  templateUrl: './character-preview.component.html',
  styleUrls: ['./character-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterPreviewComponent {
  @Input({ required: true }) character: Character;
}
