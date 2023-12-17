import { MonoTypeOperatorFunction, Observable, ReplaySubject } from 'rxjs';
import { filter, share } from 'rxjs/operators';

export function filterNull<T>(source$: Observable<T>): Observable<Exclude<T, null>> {
  return source$.pipe(filter((value): value is Exclude<T, null> => value !== null));
}

export function filterNullish<T>(source$: Observable<T>): Observable<Exclude<T, null | undefined>> {
  return source$.pipe(filter((value): value is Exclude<T, null | undefined> => value !== null && value !== undefined));
}

export function intShareReplay<T>(bufferSize?: number): MonoTypeOperatorFunction<T> {
  return (source$: Observable<T>): Observable<T> => {
    return source$.pipe(
      share<T>({
        connector: () => new ReplaySubject(bufferSize || Infinity),
        resetOnError: false,
        resetOnComplete: false,
        resetOnRefCountZero: false,
      })
    );
  };
}
