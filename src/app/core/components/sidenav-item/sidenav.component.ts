import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, booleanAttribute } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatLineModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

// models

@Component({
  selector: 'app-sidenav-item',
  standalone: true,
  imports: [MatListModule, MatLineModule, MatIconModule, RouterModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  @Input({ required: true, transform: booleanAttribute }) exact: boolean;
  @Input({ required: true }) name = '';
  @Input({ required: true }) routerLink = '/';
  @Output() toggle = new EventEmitter();
}
