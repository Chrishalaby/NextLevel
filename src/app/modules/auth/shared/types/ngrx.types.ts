import { Selector } from '@ngrx/store';
export type SelectorsDictionary = Record<
  string,
  | Selector<Record<string, any>, unknown>
  | ((...args: any[]) => Selector<Record<string, any>, unknown>)
>;
