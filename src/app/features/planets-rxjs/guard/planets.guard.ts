import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// services
import { PlanetsFacadeService } from '../facades';

// rxjs
import { of, Observable } from 'rxjs';
import { switchMap, catchError, take } from 'rxjs/operators';

export const planetsGuard: CanActivateFn = () => inject(PlanetsGuardService).checkStore();

@Injectable({
  providedIn: 'root',
})
export class PlanetsGuardService {
  readonly facade = inject(PlanetsFacadeService);
  readonly router = inject(Router);

  checkStore(): Observable<boolean> {
    return this.facade.loaded$.pipe(
      take(1),
      switchMap((loaded) => (loaded ? of(loaded) : this.loadPlanets())),
      catchError(() => {
        this.router.navigateByUrl('/app-unavailable', { skipLocationChange: true }).then();
        return of(false);
      })
    );
  }

  loadPlanets(): Observable<boolean> {
    return this.facade.getPlanets().pipe(switchMap(() => of(true)));
  }
}
