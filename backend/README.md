# MSc project backend

This is the backend for the application we developed as part of our master's
thesis in the spring of 2022.

## Prerequisites

The application runs on [Node.js][] and uses [Firestore][] to persist data.

[Node.js]: https://nodejs.org/
[Firestore]: https://cloud.google.com/firestore

### Development mode

In order to run the application in development mode you must first install the
[Firebase Emulator Suite][]. Start by installing the [Firebase CLI][]:

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

You should also remember to set secret keys for both access and refresh tokens.
These secrets can be set in the `.env` file as well:

```env
ACCESS_TOKEN_SECRET=SuPeRsEcReT
REFRESH_TOKEN_SECRET=EvEnMoReSeCrEt
```


Now you should be able run `yarn dev` to fire up the application.

[Firebase Emulator Suite]: https://firebase.google.com/docs/emulator-suite/install_and_configure
[Firebase CLI]: https://firebase.google.com/docs/cli
