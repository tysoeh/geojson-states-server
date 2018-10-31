import express = require('express');
import bodyParser = require('body-parser');
import { point } from '@turf/helpers';
import { PORT, MESSAGES } from './constants';
import { findContainingStates } from './geo';
import { StatesData } from './data';

const urlParserMiddleware = bodyParser.urlencoded({ extended: true });
const server = express().use(urlParserMiddleware);

const handleRequest: express.RequestHandler = (request, response) => {
  const { latitude, longitude } = request.body;
  if (!latitude || !longitude) {
    response.send(MESSAGES.BAD_REQUEST);
    return;
  }

  // Transform the requested coordinate into geoJSON.
  const pointGeoJSON = point([longitude, latitude]);

  // Retrieve the states data.
  const statesGeoJSON = StatesData.getData();

  // Find the state containing the requested point.
  const containingStates = findContainingStates(pointGeoJSON, statesGeoJSON);

  if (!containingStates.length) {
    response.send(MESSAGES.NO_RESULTS);
    return;
  }
  const stateNames = containingStates.map(feature => feature.properties.state);
  response.send(stateNames);
};

export const startServer = () => {
  server.all('*', handleRequest);
  server.listen(PORT, () => console.log(MESSAGES.LISTENING));
};
