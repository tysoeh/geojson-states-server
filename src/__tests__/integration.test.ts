import fetch from 'node-fetch';
import { spawn, ChildProcess } from 'child_process';
import { stringify } from 'querystring';
import { PORT, MESSAGES } from '../constants';

const queryServerForState = async (coords: {
  longitude: number;
  latitude: number;
}) => {
  const body = stringify(coords);
  const res = await fetch(`http://localhost:${PORT}/`, {
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body
  });
  return res.text();
};

describe('state server', () => {
  let server: ChildProcess;
  const killServer = () => process.kill(-server.pid);
  beforeAll(done => {
    // Start server in detached child.
    server = spawn('npm', ['run', 'start'], { detached: true });

    // Handle errors.
    server.stderr.on('data', data => {
      console.log(data.toString());
      killServer();
    });

    // Wait until it's ready.
    server.stdout.on('data', data => {
      if (data.toString().startsWith(MESSAGES.LISTENING)) {
        done();
      }
    });
  });
  it('starts a server which listens for POST requests containing coordinates and responds with the name of the US State containing that coordinate', async done => {
    queryServerForState({
      longitude: -77.036133,
      latitude: 40.513799
    })
      .then(state => expect(state).toBe(JSON.stringify(['Pennsylvania'])))
      .then(() =>
        queryServerForState({
          longitude: -83.366182,
          latitude: 32.382151
        })
      )
      .then(state => expect(state).toBe(JSON.stringify(['Georgia'])))
      .then(() =>
        queryServerForState({
          longitude: -114.047273,
          latitude: 38.137652
        })
      )
      .then(state => expect(state).toBe(JSON.stringify(['Utah'])))
      .then(() =>
        queryServerForState({
          longitude: 1,
          latitude: 0
        })
      )
      .then(state => expect(state).toBe(MESSAGES.NO_RESULTS))
      .then(done)
      .catch(err => {
        killServer();
        fail(err);
      });
  });
  afterAll(killServer);
});
