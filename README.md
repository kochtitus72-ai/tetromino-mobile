# Tetromino

![gameplay](media/tetromino-sample.gif)

A tetris-style game created with [React](https://reactjs.org/), [Redux](https://react-redux.js.org/) and [TailwindCSS](https://tailwindcss.com/).

## What is it?

For those of you not familiar with Tetris, it's a game where you drop tetromino shapes to create solid rows to score points. Blocks
fall faster as you increase the level. If there is no more room to drop blocks, then the game is over.

## Why build it?

Wanted to challenge myself to build a Tetris game using just DOM elements.
There are no SVGs or `<canvas>` graphics anywhere in the game.

All graphics are rendered as React functional components, and the game logic is handled by a Redux reducer.

## Where is it?

Online demo: [https://reactgular.github.io/tetromino/](https://reactgular.github.io/tetromino/)

## How to get it?

Clone and run it locally.

```bash
git clone https://github.com/reactgular/tetromino
cd tetromino
yarn install
yarn start
```

Gemini said
Using GitHub Actions is a pro move. It’s completely free for public repositories, and it uses GitHub’s servers to do the "heavy lifting." You can literally build your Android app while your own computer is turned off.

To make this work, you need to add a "Workflow" file to your repository. This file tells GitHub: "Hey, install Node, build my React project, then use Capacitor to turn it into an Android app."

1. Create the Workflow File
In your project, create a folder named .github (note the dot), and inside that, a folder named workflows. Then create a file named android-build.yml.

``` bash
Path: tetris/.github/workflows/android-build.yml
```

2. Paste this Configuration
Copy and paste this code into that file. I have simplified it to be as fast as possible:
``` bash
YAML
name: Build Android APK
on:
  push:
    branches: [ main, master ] # Runs every time you push to these branches

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Source
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies
        run: npm install

      - name: Build Web Project
        run: npm run build # This creates the 'build' folder

      - name: Capacitor Sync
        run: |
          npx cap add android
          npx cap copy android
          npx cap sync android

      - name: Setup Java
        uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '17'

      - name: Build Android APK
        run: |
          cd android
          chmod +x gradlew
          ./gradlew assembleDebug

      - name: Upload APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: app-debug.apk
          path: android/app/build/outputs/apk/debug/app-debug.apk
```          
          
3. How to Trigger the Build
Commit and Push: Save the file and push it to your GitHub repository:
``` Bash
git add .
git commit -m "Add GitHub Action for Android build"
git push origin main
```
Go to GitHub: Open your repository in your browser.

Actions Tab: Click the "Actions" tab at the top. You will see "Build Android APK" running.

Wait & Download: It usually takes about 5–8 minutes. Once it finishes (green checkmark), click on the build run, scroll to the bottom under "Artifacts," and click app-debug.apk to download it!

4. Important Capacitor Tweaks
Before you push, make sure your capacitor.config.json (or .ts) knows where the React build goes. Since you are using a standard React app, it should look like this:

``` bash
JSON
{
  "appId": "com.yourname.tetromino",
  "appName": "Tetromino",
  "webDir": "build", 
  "bundledWebRuntime": false
}
```
Why this is perfect for you:
Zero Local Errors: No more ANDROID_HOME or adb errors on your machine.

Physical Testing: Just send that .apk to your phone via Google Drive, Discord, or Email, install it, and you're playing.

Computer Health: Your laptop fans won't even spin up.

Would you like me to show you how to set up a "Secret" in GitHub if you want to create a signed Release APK for the Play Store later?
