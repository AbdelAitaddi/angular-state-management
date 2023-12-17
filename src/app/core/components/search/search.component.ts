import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { InputRefDirective } from '../../../shared/core/directives/input-ref.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [InputRefDirective, MatFormFieldModule, MatIconModule, MatInputModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @ViewChild(InputRefDirective)
  InputRef: InputRefDirective;

  get width() {
    return this.InputRef?.focus ? '400px' : '100%';
  }
}
