import { polygon, Feature, Position, Coord, Polygon } from '@turf/helpers';
import pointInPolygon from '@turf/boolean-point-in-polygon';

interface State {
  state: string;
  border: Position[];
}

// Transform an array of State objects into an array of geoJSON polygons.
export const makeStatePolygons = (states: State[]) =>
  states.map(({ border, state }) => polygon([border], { state }));

export type StateFeatures = ReturnType<typeof makeStatePolygons>;

// Find the states which contain a given point.
export const findContainingStates = <ContainingProps>(
  target: Coord,
  polygons: Feature<Polygon, ContainingProps>[]
) => polygons.filter(polygon => pointInPolygon(target, polygon));
