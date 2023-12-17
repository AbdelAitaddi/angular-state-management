import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

// services
import { PlanetsFacadeService } from '../facades';

// models
import { Planet } from '../models';

// rxjs
import { Observable, of } from 'rxjs';
import { switchMap, catchError, take } from 'rxjs/operators';

export const planetExistsGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const guard = inject(PlanetExistsGuardService);
  const { planetId } = route.params;

  return guard.checkStore(planetId).pipe(
    switchMap(() => of(true)),
    catchError(() => of(false))
  );
};

@Injectable({
  providedIn: 'root',
})
export class PlanetExistsGuardService {
  readonly router = inject(Router);
  readonly facade = inject(PlanetsFacadeService);

  checkStore(planetId: string) {
    return this.facade.loaded$.pipe(
      take(1),
      switchMap((loaded) => {
        if (!loaded) {
          return this.getPlanetById(planetId);
        }

        return this.hasPlanet(planetId);
      })
    );
  }

  getPlanetById(planetId: string): Observable<boolean> {
    return this.facade.getPlanet(planetId).pipe(
      switchMap(() => of(true)),
      catchError(() => {
        this.router.navigateByUrl('/app-unavailable', { skipLocationChange: true }).then();
        return of(false);
      })
    );
  }

  hasPlanet(planetId: string): Observable<boolean> {
    return this.facade.planets$.pipe(
      switchMap((planets: Planet[]) => {
        const planetExists = planets.find((planet: Planet) => planet.id === planetId);
        if (planetExists) {
          this.facade.selectedPlanet = planetExists;
          return of(true);
        }

        return this.getPlanetById(planetId);
      })
    );
  }
}
