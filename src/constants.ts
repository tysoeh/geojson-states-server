import { join, resolve } from 'path';

export const PORT = 8080;
export const PATH_TO_STATES = resolve(
  join(__dirname, '..', 'data', 'states.json')
);
export const MESSAGES = {
  BAD_REQUEST: 'Whoops. Bad request. Please POST a url-encoded lat and long!',
  NO_RESULTS: "We don't know of any states that contain that point...",
  LISTENING: `Listening on port ${PORT}`,
  ERROR:
    '  Whoops! Something went wrong!\n' +
    "  Maybe there's something useful to see here:\n"
};
