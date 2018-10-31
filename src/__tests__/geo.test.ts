import { point, polygon } from '@turf/helpers';
import { makeStatePolygons, findContainingStates, StateFeatures } from '../geo';

describe('makeStatePolygons', () => {
  it('transforms the states.json blob shape into geoJson polygons', () => {
    expect(
      makeStatePolygons([
        {
          state: 'Pennsylvania',
          border: [
            [-77.475793, 39.719623],
            [-80.524269, 39.721209],
            [-80.520592, 41.986872],
            [-74.705273, 41.375059],
            [-75.142901, 39.881602],
            [-77.475793, 39.719623]
          ]
        }
      ])
    ).toMatchObject([
      {
        type: 'Feature',
        properties: { state: 'Pennsylvania' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-77.475793, 39.719623],
              [-80.524269, 39.721209],
              [-80.520592, 41.986872],
              [-74.705273, 41.375059],
              [-75.142901, 39.881602],
              [-77.475793, 39.719623]
            ]
          ]
        }
      }
    ]);
  });
});

describe('findContainingStates', () => {
  it('finds a geoJson polygon from an array of geoJson polygons, which contains a given point, else returns undefined', () => {
    const [PAResult] = findContainingStates(point([-77.036133, 40.513799]), [
      {
        type: 'Feature',
        properties: { state: 'Pennsylvania' },
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [-77.475793, 39.719623],
              [-80.524269, 39.721209],
              [-80.520592, 41.986872],
              [-74.705273, 41.375059],
              [-75.142901, 39.881602],
              [-77.475793, 39.719623]
            ]
          ]
        }
      }
    ] as StateFeatures);
    expect(PAResult.properties.state).toBe('Pennsylvania');
    expect(
      findContainingStates(point([3, 4]), [
        polygon([[[1, 2], [1, 0], [0, 2], [1, 2]]])
      ])
    ).toMatchObject([]);
  });
});
