import {
  afterNextRender,
  afterRender,
  AfterRenderPhase,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Injector,
  Input,
  OnInit,
  Signal,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, animation, keyframes, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { AnimationEvent } from '@angular/animations';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

/*
const asSignal = (defaultValue: T) => (source: Observable<T>) => toSignal(source, defaultValue);

const signal = someObservable$.pipe(
  asSignal('default value')
)
*/

@Component({
  selector: 'app-foo',
  standalone: true,
  template: '{{interval()}}',
})
export class FooComponent {
  interval: Signal<number> = this.getInterval(inject(Injector));
  private getInterval(injector: Injector): Signal<number> {
    return toSignal(interval(1000).pipe(tap(console.log)), { injector });
  }
}

export const transitionAnimation = animation([
  style({
    opacity: '{{ opacity }}',
  }),
  animate('{{ time }}'),
]);

@Component({
  standalone: true,
  imports: [CommonModule, FooComponent],
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          height: '400px',
          opacity: 1,
          backgroundColor: 'yellow',
        }),
      ),
      state(
        'closed',
        style({
          height: '100px',
          opacity: 0.2,
          backgroundColor: '#ccc',
        }),
      ),
      transition('open => closed', [
        animate(
          '3s ease-in',
          keyframes([
            style({ height: '300px', opacity: 0.2, backgroundColor: 'blue', offset: 0.1 }), //opacity: '*',
            style({ height: '200px', opacity: 0.6, backgroundColor: 'red', offset: 0.4 }),
            style({ height: '100px', opacity: 1, backgroundColor: 'orange', offset: 0.7 }),
          ]),
        ),
      ]),
      transition('closed => open', [animate('0.5s ease-out')]),
      transition('* => closed', [animate('1s')]),
      transition('* => open', [animate('0.5s')]),
      transition('open <=> closed', [animate('0.5s')]),
      transition('* => open', [
        useAnimation(transitionAnimation, {
          params: {
            opacity: '*',
            time: '1s',
          },
        }),
      ]),
      transition('* => *', [animate('1s')]),
      // transition('open => *', [animate('1s ease-in')]),
      // transition('open <=> closed', [animate('1s ease-in')]),
    ]),
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [style({ opacity: 0 }), animate('3s', style({ opacity: 1 }))]),
      transition(':leave', [animate('1s', style({ opacity: 0 }))]),
    ]),
  ],
})
export default class HomeComponent implements OnInit {
  private route = inject(ActivatedRoute);
  @HostBinding('@.disabled') animationsDisabled = false;
  isOpen = true;
  show = false;
  load = false;
  showComponent = false;
  loadComponent = false;

  @Input() permission!: string;
  permissionData = this.route.snapshot.data['permission'];
  permission$ = this.route.data.pipe(map((data) => data['permission']));
  @ViewChild('content') contentRef: ElementRef;
  constructor() {
    afterNextRender(
      () => {
        console.log('1 -afterNextRender content height: ' + this.contentRef.nativeElement.scrollHeight);
      },
      { phase: AfterRenderPhase.Read },
    );

    afterRender(
      () => {
        console.log('2 -afterRender content height: ' + this.contentRef.nativeElement.scrollHeight);
      },
      { phase: AfterRenderPhase.Read },
    );
  }
  ngOnInit() {
    console.log('-- permission -- ', this.permission);
    console.log('-- permissionData -- ', this.permissionData);
    this.permission$.subscribe((p) => console.log('-- permission -- ', p));
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  onAnimationEvent(_event: AnimationEvent) {
    // console.log('onAnimationEvent ', event);
  }

  isCheckedDefer = signal(false);
}
