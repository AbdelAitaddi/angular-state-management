import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { RelatedResourceDataSnapshot } from '../../models';

@Component({
  selector: 'app-related-item-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './related-item-list.component.html',
  styleUrls: ['./related-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RelatedItemListComponent {
  @Input({ required: true }) items: RelatedResourceDataSnapshot[] | null = [];
  @Input({ required: false, transform: booleanAttribute }) loading: boolean = false;

  @Output() add = new EventEmitter<void>();
}
