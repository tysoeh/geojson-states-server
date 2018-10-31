import { readFile } from 'fs';
import { StateFeatures } from './geo';

// Singleton for storing and retrieving states data.
export namespace StatesData {
  let data: StateFeatures;
  export function setData(states: StateFeatures) {
    data = states;
  }

  export function getData() {
    return data;
  }
}

// Native readFile wrapped in a Promise.
export const readFileToStringPromise = (path: string) =>
  new Promise<string>((resolve, reject) =>
    readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    })
  );

// Parses a string of newline-separated JSON objects
// into an array of POJOs (plain-old-javascript-objects).
export const parseLineSeparatedJSON = <Blob extends object>(document: string) =>
  document
    .trim()
    .split('\n')
    .map<Blob>(state => JSON.parse(state));
