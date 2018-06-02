import {
  Action,
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

export interface User {
  name: string;
}

// import { environment } from '../../environments/environment';

export interface State {
  user: User;
  switches: any;
  activeCollectionIndex: number;
}

export function userReducer (state: User, action: Action ): User {
  switch (action.type) {
    case 'set-user': return (action as any).user;
    default: return state;
  }
}
export function switchesReducer (state: any, action: Action ): any {
  switch (action.type) {
    case 'set-switches': return (action as any).switches;
    default: return state;
  }
}

export function activeCollectionIndexReducer (state: number = 0, action: Action ): number {
  switch (action.type) {
    case 'set-active-collection-index': return (action as any).collectionIndex;
    default: return state;
  }
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  switches: switchesReducer,
  activeCollectionIndex: activeCollectionIndexReducer
};

export const activeCollectionSelector = (state: State) =>
  state.switches && state.switches.length ? state.switches[state.activeCollectionIndex] : null;

// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
