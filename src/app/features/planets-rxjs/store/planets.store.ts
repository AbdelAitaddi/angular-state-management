import { Injectable } from '@angular/core';

// services
import { Store } from '../../../shared/core/store';

import { PlanetsState } from './planets.state';

// Initial state
const initialState: PlanetsState = {
  planets: [],
  selectedPlanet: null,
  loaded: false,
  loading: false,
  residents: {
    loading: false,
    loaded: false,
    data: [],
    errorMessage: '',
  },
  films: {
    loading: false,
    loaded: false,
    data: [],
    errorMessage: '',
  },
};

@Injectable({
  providedIn: 'root',
})
export class PlanetsStore extends Store<PlanetsState> {
  constructor() {
    super(initialState);
  }
}
