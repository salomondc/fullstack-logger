# Logger

Logger is a MPV for a log entry/sorting web application, which is part of a challenge to opt on a full-time position as Senior Fullstack Web Developer at AllActivity®.

The app has been developed in ReactJS using the create-react-app utility and NodeJS with ExpressJS framework. It has two main components to create and visualize logs, connected to an SQL database (PostgreSQL).

This project is live at [Heroku/Logger-SalomonC](https://logger-salomonc.herokuapp.com/)

## How to build

To build this project in local you can simply clone this repository, make sure you're running your postgres database locally and run with npm:

```bash
npm run try
```

## Usage

To go through the 2 different views of this App, you have a button called 'View/Create' which sets a 'view' state inside the App.js Component. It serves to switch between returning the LogDisplay.js/LogForm.js Components inside of App.js.

Each time you go from one screen to another, a useEffect function inside App.js gets called and makes an async fetch to the database to get all the logs and  make sure you'll always see updated data.

To use the Log Form, you have to fill in the required data: description, start datetime and end datetime.

## Error / Bug Handling

For user input the only constraints are not to leave an empty description/datetimes and that the start datetime has to be lower than the end datetime. When one of these happen you'll get printed with an error message.

If the database fails to add your log to the logs table or anything goes wrong server-side, then a catch function will send back the error code, which will be displayed in the UI as 'There was a problem uploading your data | code: 0000'.

## Dev
If you want to switch to a development environment, with --dev features, you can run with npm:


```bash
npm  install
```

Followed by:


```bash
npm run install-client
```

☝ If you haven't installed or 'npm run try'ed before, then:

```bash
npm run dev
```

This will execute both client:3000 and server:4000 concurrently, without building the client-side app.

## License
MIT
