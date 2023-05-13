# SWB-Simple-Timetable

![screenshot](/screenshot.png)

This is a simple timetable react app that displays arrival times for the supplied station id.
This app simply uses the api of the swb-mobil app by Stadtwerke-Bonn but is not affiliated with it.
Requests are send every minute so not to generate too much traffic.

## Getting Started

The app needs a .env file in it's root directory with the following variables:

```env
REACT_APP_STATION_NAME=<display-name>
REACT_APP_STATION_ID=<station-id>
REACT_APP_TIMETABLE_LIMIT=<number of arrivals to display>
```

To get the station id, open the [swb-mobil app](https://www.swb-mobil.de/), open the network tab in the developer console and select a station.
Locate the request to the following url: `https://www.swb-mobil.de/api/v1/stationboards/ass/<station-id>`

## Deploy using docker

A docker-compose is supplied in this project with a simple nginx container.
To use docker you have to first [build](#npm-run-build) the project.

The docker container can be started by the following command:

```bash
docker-compose up -d
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
