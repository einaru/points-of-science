# MSc project backend

This is the backend for the application we developed as part of our master's
thesis in the spring of 2022.

## Prerequisites

The application runs on [Node.js][] and uses [Firestore][] to persist data. It uses [Redis][] as publish subscribe provider

[Node.js]: https://nodejs.org/
[Firestore]: https://cloud.google.com/firestore
[Redis]: https://redis.io

### Development mode

In order to run the application in development mode you must first install the
[Firebase Emulator Suite][]. Start by installing the [Firebase CLI][]:

[Firebase Emulator Suite]: https://firebase.google.com/docs/emulator-suite/install_and_configure
[Firebase CLI]: https://firebase.google.com/docs/cli

    yarn global add firebase-tools

Then you must log in by running

    firebase login

The Firebase init files are already present, so you should now be able to start
the emulators by running

    firebase emulators:start

In order to connect the the backend application to the Firebase Emulator, you
must remember to set the `FIRESTORE_EMULATOR_HOST` variable. You can set this
variable in a `.env` file or export in on the command line:

```bash
export FIRESTORE_EMULATOR_HOST=localhost:8080
```

When the emulator starts you can run a script which will populate the emulator for you the
first time. The script is located in the script folder. To run the script, enter the following 
into a terminal:

```
node .\script\emulatorInitialization.js
```

If this is not the first time you start the emulator, it can be populated from the previously exported data
which assumes you ran the firebase export command the first time you shut down, 
the following command will import the latest exported data and export on exit:

```
yarn firestore
```

You also need to install redis-server before you can hoste the application on your local machine.
If you have a PC with Windows as OS, you will need to install Windows Subsystem for Linux for the backend to work.
[WSL]: https://docs.microsoft.com/en-us/windows/wsl/install 

Once WSL is installed run the following command to initialize WSL in a terminal:
```
wsl
```

Once WSL is running in the terminal you can type the following commands for Ubuntu into the terminal:
```
sudo add-apt-repository ppa:redislabs/redis
sudo apt-get update
sudo apt-get install redis
```

When Redis is finished installing, you could type the following command in to the terminal:
```
sudo service redis-server start
```

To stop the Redis server when you are finished with development, type the following command into the terminal:
```
sudo service redis-server stop
```

You should also remember to set secret keys for both access and refresh tokens.
These secrets can be set in the `.env` file as well:

```env
ACCESS_TOKEN_SECRET=SuPeRsEcReT
REFRESH_TOKEN_SECRET=EvEnMoReSeCrEt
SUBSCRIBE_TOKEN_SECRET=<secret_token>
```

Now you should be able run `yarn dev` to fire up the application.

Remember to create a new folder in ./assets/Static which should be named "seed". 
This folder must exist before proceeding with exporting of data from Firestore emulator. 

Before shutting down the Firestore emulator for the first time you will have to export the stored data
in the emulator. To do so, run the following command in a terminal:

```
firebase emulators:export ./assets/Static/seed
```

### Production mode

In order to run the application in production mode you need to
[initialize the Firebase Admin SDK][] with a Google Service Account.
Follow these steps to generate a private key for your service account:

1. In the Firebase console, open **Settings** > [Service Accounts][].
2. Click **Generate New Private Key**, then confirm by clicking **Generate Key**.
3. Securely store the JSON file containing the key.

Now you need to set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable,
either put in the `.env` file or export it on the command line:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-file.json"
```

You should now be able to run `yarn start` to fire up the application.

[initialize the Firebase Admin SDK]: https://firebase.google.com/docs/admin/setup#initialize-sdk
[Service Accounts]: https://console.firebase.google.com/project/_/settings/serviceaccounts/adminsdk

### Testing

To run unit tests, make sure you have followed the instruction under the section Development Mode of this README file 
before you proceed.

To start with testing the initial data must have been exported once manually by first populating the Firestore emulator and ran 
the following command:

```
firebase emulators:export ./assets/Static/test
```

If the initial data is exported correctly, then from now on you can run the following command in a terminal before you
start running the test to import the initial test data:

```
yarn firestore:test
```

To run a all tests you can run the following command in a terminal:

```
yarn test:firestore
```

To run tests in a single file you can run the following command:

```
yarn test:firestore <name_of_file>
```

To run test with coverage report, run the following command:

```
yarn test:firestore:coverage
```
