import { FeatureConfig, Selector } from '@ngrx/store';
import { FeatureSelector, NestedSelectors } from '@ngrx/store/src/feature_creator_models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Feature<AppState extends Record<string, any>, FeatureName extends keyof AppState & string, FeatureState extends AppState[FeatureName]> = FeatureConfig<FeatureName, FeatureState> & BaseSelectors<AppState, FeatureName, FeatureState>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FeatureWithExtraSelectors<FeatureName extends string, FeatureState, ExtraSelectors extends SelectorsDictionary> = string extends keyof ExtraSelectors ? Feature<Record<string, any>, FeatureName, FeatureState> : Omit<Feature<Record<string, any>, FeatureName, FeatureState>, keyof ExtraSelectors> & ExtraSelectors;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseSelectors<AppState extends Record<string, any>, FeatureName extends keyof AppState & string, FeatureState extends AppState[FeatureName]> = FeatureSelector<AppState, FeatureName, FeatureState> & NestedSelectors<AppState, FeatureState>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SelectorsDictionary = Record<string, Selector<Record<string, any>, unknown> | ((...args: any[]) => Selector<Record<string, any>, unknown>)>;
