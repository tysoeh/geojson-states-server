import { readFileToStringPromise, parseLineSeparatedJSON } from './data';
import { makeStatePolygons } from './geo';
import { PATH_TO_STATES, MESSAGES } from './constants';
import { startServer } from './server';
import { StatesData } from './data';

const init = async () => {
  try {
    // Convert the raw states.json data into geoJSON.
    const statesGeoJSON = await readFileToStringPromise(PATH_TO_STATES)
      .then(parseLineSeparatedJSON)
      .then(makeStatePolygons);

    // Store the geoJSON for use by the server.
    StatesData.setData(statesGeoJSON);

    // Start listening for requests.
    startServer();
  } catch (err) {
    console.log(MESSAGES.ERROR + '    ' + err);
    process.exit(1);
  }
};

init();
