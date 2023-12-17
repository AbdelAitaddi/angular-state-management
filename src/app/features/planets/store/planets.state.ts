// models
import { Planet } from '../models';
import { RelatedResource } from '../../../shared/core/models';

export interface PlanetsState {
  planets: Planet[];
  selectedPlanet: Planet | null;
  loaded: boolean;
  loading: boolean;
  residents: RelatedResource;
  films: RelatedResource;
}
