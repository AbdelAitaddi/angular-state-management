import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatLineModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// models
import { NavItem } from '../../models';

@Component({
  selector: 'app-menu-nav-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatLineModule, MatIconModule, RouterModule],
  templateUrl: './menu-nav-list.component.html',
  styleUrls: ['./menu-nav-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuNavListComponent {
  @Input({ required: true }) navList: NavItem[] = [];
}
