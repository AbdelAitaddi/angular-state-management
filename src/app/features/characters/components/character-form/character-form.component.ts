import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterFormComponent {}
