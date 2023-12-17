import { ChangeDetectionStrategy, Component, DoCheck, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { Observable, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-planet-list',
  imports: [CommonModule, MatCardModule, MatButtonModule, PlanetPreviewComponent, MatProgressSpinnerModule],
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetListComponent implements DoCheck {
  route = inject(ActivatedRoute);
  planets$: Observable<Planet[]> = inject(PlanetsFacadeService).planets$;

  random: string | null;

  ngDoCheck() {
    // ?random=01ngABHgO1jzuuvEces/h+b3eth/2mBSraHEQ2cyFkRTYd2mo+/pVmTLwIhkny8wCHFdoKYJ6apQgxDGxZ7M4Q==
    this.random = this.route.snapshot.queryParamMap.get('random');
    if (this.random) {
      this.random = this.random.replace(/\s/g, '+');
      console.log(this.random); //you'll see the exact value in the  console
    }
  }
}
