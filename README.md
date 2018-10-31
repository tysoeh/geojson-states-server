# State Server!

## To run:

1. Make sure you have [Node v8.x (or later)](https://nodejs.org/en/) installed (`$ node -v`). 
2. `$ npm install` to install dependencies.
3. `$ ./state-server` (or `$ npm run start`) to start server.


## To use:

Open another shell and run e.g. `curl -d "longitude=-77.036133&latitude=40.513799" http://localhost:8080/`

## Exercise Instructions:

Our fictional company serves up a mound of geospatial data both internally and to third parties. What we need is a server to tell us which state, if any, a point is in. Some simplified geometries are included in states.json (so greatly simplified, that some of the smaller ones disappear).

It need not be fast, but the code should be readable, and the results should be correct.

Expected Behavior
```
$ ./state-server & [1] 21507 $ curl -d "longitude=-77.036133&latitude=40.513799" http://localhost:8080/
["Pennsylvania"]
$
```

