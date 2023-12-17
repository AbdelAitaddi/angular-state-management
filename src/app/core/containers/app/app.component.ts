import { ChangeDetectionStrategy, Component, HostBinding, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenOutletContexts, RouterModule } from '@angular/router';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatLineModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';

// rxjs
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

// components
import { SidenavComponent } from '../../components/sidenav-item/sidenav.component';
import { MenuNavListComponent } from '../../components/menu-nav-list/menu-nav-list.component';
import { InputRefDirective } from '../../../shared/core/directives/input-ref.directive';

// service
import * as fromRoot from '../../store';

// models
import { NavItem } from '../../models';

// config
import { Breakpoints, nav_List } from '../../config';
import { SearchComponent } from '../../components/search/search.component';
import { PlanetsFacadeService } from '../../../features/planets/facades';
import { toSignal } from '@angular/core/rxjs-interop';
import { slideInAnimation } from '../../config/route-animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonModule,
    MatLineModule,
    MatSelectModule,
    MatTooltipModule,
    CommonModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MenuNavListComponent,
    SidenavComponent,
    InputRefDirective,
    SearchComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideInAnimation],
})
export default class AppComponent {
  @HostBinding('@.disabled') animationsDisabled = false;
  private contexts = inject(ChildrenOutletContexts);
  private readonly store: Store<fromRoot.State> = inject(Store);
  private readonly planetsFacade = inject(PlanetsFacadeService);
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly logo: string = '../assets/img/app_logo.png';
  readonly navList: NavItem[] = nav_List;

  readonly loading: Signal<boolean> = toSignal(
    combineLatest([this.store.select(fromRoot.selectIsLoading), this.planetsFacade.loading$]).pipe(
      map(([filmsLoading, planetsLoading]) => filmsLoading || planetsLoading),
    ),
    { requireSync: true },
  );

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  get isSmallScreen$(): Observable<boolean> {
    return this.breakpointObserver.observe([Breakpoints.smallScreen]).pipe(
      distinctUntilChanged(),
      map((result) => result.matches),
    );
  }

  get sidenavMode$(): Observable<MatDrawerMode> {
    return this.breakpointObserver.observe([Breakpoints.largeScreen]).pipe(
      distinctUntilChanged(),
      map((result) => (result.matches ? 'over' : 'side') as MatDrawerMode),
    );
  }
}
