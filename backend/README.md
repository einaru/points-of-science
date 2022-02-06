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

You should also remember to set secret keys for both access and refresh tokens.
These secrets can be set in the `.env` file as well:

```env
ACCESS_TOKEN_SECRET=SuPeRsEcReT
REFRESH_TOKEN_SECRET=EvEnMoReSeCrEt
```

Now you should be able run `yarn dev` to fire up the application.

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
