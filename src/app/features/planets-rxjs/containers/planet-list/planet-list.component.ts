import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// components
import { PlanetPreviewComponent } from '../../components';

// services
import { PlanetsFacadeService } from '../../facades';

// models
import { Planet } from '../../models';

// rxjs
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-planet-list',
  imports: [CommonModule, MatCardModule, MatButtonModule, PlanetPreviewComponent, MatProgressSpinnerModule],
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetListComponent {
  planets$: Observable<Planet[]> = inject(PlanetsFacadeService).planets$;
}
