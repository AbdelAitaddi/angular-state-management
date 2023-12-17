import { RelatedResourceDataSnapshot } from './related-resource-data-snapshot.model';

export interface RelatedResource {
  loading: boolean;
  loaded: boolean;
  data: RelatedResourceDataSnapshot[];
  errorMessage: string;
}
