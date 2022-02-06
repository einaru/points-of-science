# Android development without Android Studio

Create a folder where you put all Android SDK related files. This will be
refereed to as `ANDROID_HOME` for the remainder of this document. You will also
like to export this variable in your shell configuration file, e.g.:

```bash
export ANDROID_HOME="$HOME/android/sdk"
```

Next, download the [Android command line tools][], extract the zip file into
`ANDROID_HOME`, and add the `cmdline-tools/bin` folder to your `PATH` variable:

```bash
export PATH="$ANDROID_HOME/cmdline-tools/bin:$PATH"
```

Now you can use `sdkmanager` to install Android SDK packages:

```bash
sdkmanager \
    "platform-tools" \
    "platforms;android-29" \
    "build-tools;29.0.2" \
    "add-ons;addon-google_apis-google-24" \

```

**Note!** Verify that you install the correct Android SDK version by visiting
https://reactnative.dev/docs/environment-setup.


## Setup an emulator

First install the emulator tool:

```bash
sdkmanager "emulator"
```

Then create and emulator using `avdmanager`, e.g.:

```bash
avdmanager create avd \
    --name pixel \
    --device pixel \
    --abi google_apis/x86_64 \
    --package "system-images;android-29;google_apis;x86_64"
```

[Android command line tools]: https://developer.android.com/studio#command-tools

## Example shell configuration:

```bash
export ANDROID_HOME="$HOME/android/sdk"

export PATH="$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"
export PATH="$ANDROID_HOME/emulator:$PATH"
export PATH="$ANDROID_HOME/tools:$PATH"
export PATH="$ANDROID_HOME/tools/bin:$PATH"
export PATH="$ANDROID_HOME/platform-tools:$PATH"

export ANDROID_EMULATOR_USE_SYSTEM_LIBS=1
# The emulator command complains about missing qt libs.
# Running inside the $ANDROID_HOME/tools directory seems to solve this.
emulator() {
    (
        cd $ANDROID_HOME/tools &&
           $ANDROID_HOME/emulator/emulator $@
    )
}
```
