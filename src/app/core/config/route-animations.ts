import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

export const slideInAnimation = trigger('routeAnimations', [
  transition('homePage <=> planetsListPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ left: '-100%' })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [animate('300ms ease-out', style({ left: '100%' }))], { optional: true }),
      query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], { optional: true }),
    ]),
  ]),
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(
      ':enter, :leave',
      [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ],
      { optional: true },
    ),
    query(':enter', [style({ left: '-100%' })], { optional: true }),
    query(':leave', animateChild(), { optional: true }),
    group([
      query(':leave', [animate('200ms ease-out', style({ left: '100%', opacity: 0 }))], { optional: true }),
      query(':enter', [animate('300ms ease-out', style({ left: '0%' }))], { optional: true }),
      query('@*', animateChild(), { optional: true }),
    ]),
  ]),
  /*
     // Transition between any two states
  transition('* <=> *', [
    // Events to apply
    // Defined style and animation function to apply
    // Config object with optional set to true to handle when element not yet added to the DOM
    query(':enter, :leave', style({ position: 'fixed', width: '100%', zIndex: 2 }), { optional: true }),
    // group block executes in parallel
    group([
      query(
        ':enter',
        [style({ transform: 'translateX(100%)' }), animate('0.5s ease-out', style({ transform: 'translateX(0%)' }))],
        { optional: true },
      ),
      query(
        ':leave',
        [style({ transform: 'translateX(0%)' }), animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))],
        { optional: true },
      ),
    ]),
  ]),
   */
]);
