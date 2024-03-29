export interface Planet {
  id: string;
  name: string;
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
  url: string;
  created: Date;
  edited: Date;
}

export interface PlanetsResults {
  count: 6;
  next: null;
  previous: null;
  results: Planet[];
}
