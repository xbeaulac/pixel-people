# Pixel People

> **Note**: The commit history for this repository has been omitted for security reasons.

# Firebase Setup

## Initial setup

In the root folder

> yarn global install firebase-tools

In the pixel-people folder

> npm add firebase

## Setup multiple Firebase projects for different envs

https://www.360learntocode.com/2020/12/how-to-deploy-vuejs-application-to-firebase-for-different-environment.html

# Firebase Emulator Running Locally

https://firebase.google.com/docs/emulator-suite

## Start Firebase Emulator Suite

Chose the Firebase alias from .firebaserc like

### Login to Firebase

```
firebase login
```

### build the web app

```
cd pixel-people
nvm use node
npm run develop
```

### Build the functions

```
cd ../functions
npm run build
```

### Go back to the root directory and use default Firebase profile

```
cd ..
firebase use default
```

### Init the emulators (one time deal, already did this, just documenting here)

```
firebase init emulators
```

### Now start the emulators.

```
firebase emulators:start
```

Output from the above command tells you where the emulator console and the pixel-people hosting endpoint is.

# Firebase Emulator with Vue serve for Hot reloading
Firebase functions should be automatically hot reloading. Now you're running the web app using serve in `development` mode so it's hot reloading also and connecting to the emulators because of what's in the `pixel-people/src/firebase/config.js` file checking for localhost.
## Preconditions
You've built the functions as described above.
## Start the Firebase Emulators except hosting
Run this in the root directory of the git repo
```
firebase emulators:start --import=./emulator-data
firebase emulators:start --only functions,auth,firestore,pubsub,storage,hub,logging --import=./emulator-data
```

If the emulators suddenly crash, run this:
```
npx kill-port 5000 5001 8090 8085 4000 9229
```
## Start the local develop server in Vue
```
cd pixel-people
npm run serve
```

# Building and Deploying envs

## Develop

```
cd pixel-people
npm run develop
cd ..
firebase deploy
```
