import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { MatMenuModule } from '@angular/material/menu';
import { Planet } from '../../models';

@Component({
  selector: 'app-planet-preview',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatMenuModule, RouterLink, MatButtonModule],
  templateUrl: './planet-preview.component.html',
  styleUrls: ['./planet-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetPreviewComponent {
  @Input({ required: true }) planet: Planet;

  get route(): [string, string] {
    const fragments = this.planet.url.split('/');
    const id = fragments[fragments.length - 2];
    return ['/planets', id];
  }
}
