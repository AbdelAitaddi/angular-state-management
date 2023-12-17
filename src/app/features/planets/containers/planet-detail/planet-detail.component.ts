import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// services
import { PlanetsFacadeService } from '../../facades';

// models
import { Planet } from '../../models';
import { RelatedResource } from '../../../../shared/core/models';

// components
import { RelatedItemListComponent } from '../../../../shared/core/components';

// rxjs
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ViewModel<T> {
  selectedPlanet: Planet;
  filmsResource: T;
  residentsResource: T;
}

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, RouterModule, RelatedItemListComponent],
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanetDetail implements OnInit {
  private destroyRef = inject(DestroyRef);
  private readonly facade = inject(PlanetsFacadeService);

  ngOnInit() {
    this.facade.loadRelatedResource().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  viewModel$: Observable<ViewModel<RelatedResource>> = combineLatest([
    this.facade.selectedPlanet$,
    this.facade.filmsResource$,
    this.facade.charactersResource$,
  ]).pipe(
    map(([selectedPlanet, filmsResource, residentsResource]) => ({
      selectedPlanet,
      filmsResource,
      residentsResource,
    }))
  );
}
