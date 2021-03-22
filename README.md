The project is focused towards generating schedules (with recurring or one time events) based on user's choice. The UI allows user to:
- generate one time events by simply selecting the date/time of choice
- generate recurring events by selecting frequency and other relevant parameters

# Installation and Setup

## Cloning

The project is hosted on github as a public repository. It is expected that `node` and `npm` packages are installed on the local machine before setting up the project. Following are the further steps to get it running locally:

- clone it by `git clone https://github.com/developersri/vcomply-challenge.git`

## Installation and Running the app

The project has front end + back end server codebase in the same repository and they both have to be started in order to run the app.

### Front End Application (Client)

Run `npm install` and `npm run client-start` from the project's root directory. By default, the project is hosted on `http://localhost:3000`

### Back End Application (Server)

Run `npm run server-start` from the project's root directory. By default, the server is set to be listened at `http://localhost:3001`

# Project Workflow

The project offers three main functionalities and they are:
- Configure and create schedules
- View / Modify Weekly offs and Holidays
- View previously created schedule records and their events

## Configure and create schedules

By clicking the `SCHEDULE` option in the leftmost navigtion bar, the user can arrive at the UI to configure and create the schedules. First input to proceed is the `frequency` which has to be chosen by clicking on one of the option from the second to left most sidebar. The UI is data-driven to the extent that it shows only the required inputs based on the frequency which was chosen. The required inputs based on the chosen frequency are:

- **Definition of recurring events**: These options include the desired day / date / month / time of the recurring events
- **Lifecycle of the schedule**: The lifecycle of a schedule comprises of a start date (which is the current date + time by default) and an end criteria. End criteria of a schedule can be a date when it is desired to end or the number of occurances after which it has to be concluded or the schedule can be perpetual.

_Note:_ In case of perpetual schedules, the system puts a hard limit of 100 events at the time of generation.