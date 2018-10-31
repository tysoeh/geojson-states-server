import { parseLineSeparatedJSON } from "../data";

describe('parseLineSeparatedJson', () => {
  it('transforms line separated JSON blobs (with trailing whitespace) into an array of POJOs', () => {
    expect(parseLineSeparatedJSON('{}\n{}\n{}\n{}')).toMatchObject([
      {},
      {},
      {},
      {}
    ]);
    expect(parseLineSeparatedJSON('[1]\n[2]\n[3]  ')).toMatchObject([
      [1],
      [2],
      [3]
    ]);
    expect(
      parseLineSeparatedJSON(
        '{"state": "Washington", "border": [[-122.402015, 48.225216], [-117.032049, 48.999931], [-116.919132, 45.995175], [-124.079107, 46.267259], [-124.717175, 48.377557], [-122.92315, 47.047963], [-122.402015, 48.225216]]}' +
          '\n' +
          '{"state": "Montana", "border": [[-111.475425, 44.702162], [-114.560924, 45.54874], [-116.063531, 48.99995], [-104.062991, 49.000026], [-104.043072, 44.997805], [-111.475425, 44.702162]]}' +
          '\n\n'
      )
    ).toMatchObject([
      {
        state: 'Washington',
        border: [
          [-122.402015, 48.225216],
          [-117.032049, 48.999931],
          [-116.919132, 45.995175],
          [-124.079107, 46.267259],
          [-124.717175, 48.377557],
          [-122.92315, 47.047963],
          [-122.402015, 48.225216]
        ]
      },
      {
        state: 'Montana',
        border: [
          [-111.475425, 44.702162],
          [-114.560924, 45.54874],
          [-116.063531, 48.99995],
          [-104.062991, 49.000026],
          [-104.043072, 44.997805],
          [-111.475425, 44.702162]
        ]
      }
    ]);
    expect(
      parseLineSeparatedJSON(
        '{ "foo": [ "bar" ] }\n{ "fib": [ "fab" ] }\n{ "fo": [ "fah" ] }  '
      )
    ).toMatchObject([{ foo: ['bar'] }, { fib: ['fab'] }, { fo: ['fah'] }]);
  });
});
