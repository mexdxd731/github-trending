<p align="center">
  <img src="logo.png" alt="Sorry Google" width="200"/>
</p>

# Sorry Google

Minimal stub APKs that block Google from automatically installing or updating
unwanted system apps. Each stub declares the same package name as the target
app but is signed with a different key, causing a signature mismatch that
prevents the original from being pushed.

## Targeted Packages

| Package                          | App Name                    | Google Play                                                                                |
| -------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------ |
| `com.google.android.safetycore`  | Android System SafetyCore   | [Play Store](https://play.google.com/store/apps/details?id=com.google.android.safetycore)  |
| `com.google.android.contactkeys` | Android System Key Verifier | [Play Store](https://play.google.com/store/apps/details?id=com.google.android.contactkeys) |
| `com.google.android.verifier`    | Android Developer Verifier  | [Play Store](https://play.google.com/store/apps/details?id=com.google.android.verifier)    |

## Uninstalling

These packages may be pre-installed as system or privileged system apps. The
commands available to you depend on whether your device has root access.

### Without Root

You can remove the packages from the current Android user using ADB:

```bash
adb shell pm uninstall --user 0 com.google.android.safetycore
adb shell pm uninstall --user 0 com.google.android.contactkeys
adb shell pm uninstall --user 0 com.google.android.verifier
```

This does **not** remove the original APK from the system partition. The
packages remain available as pre-installed system apps and can potentially be
restored by the system.

If `pm uninstall --user 0` reports:

```text
Failure [not installed for 0]
```

the package is already uninstalled for that user.

For packages that cannot be uninstalled for the user, disable them instead:

```bash
adb shell pm disable-user --user 0 com.google.android.safetycore
adb shell pm disable-user --user 0 com.google.android.contactkeys
adb shell pm disable-user --user 0 com.google.android.verifier
```

### With Root

With root access, you can uninstall the packages using `su`:

```bash
adb shell su -c "pm uninstall com.google.android.safetycore"
adb shell su -c "pm uninstall com.google.android.contactkeys"
adb shell su -c "pm uninstall com.google.android.verifier"
```

For system apps, removing the package with `pm uninstall` still does not
necessarily delete the APK from the read-only system partition. The APK may
return after a factory reset or system update.

## Multiple Users

The commands above target **user 0**. To see all users on the device:

```bash
adb shell pm list users
```

To uninstall a package for another user:

```bash
adb shell pm uninstall --user <USER_ID> <PACKAGE>
```

For example:

```bash
adb shell pm uninstall --user 10 com.google.android.verifier
```

Replace `<USER_ID>` with the actual Android user ID.

## How It Works

1. Each module is a valid Android APK with the exact package name of the target.
2. The stubs are signed with your own key, not Google's key.
3. When Google tries to install or update the real app, the signature mismatch
   prevents the existing stub from being replaced by the original package.
4. The stubs contain no application code — only the required manifest and icon.

## Downloading

Download the latest APKs from
[GitHub Releases](https://github.com/rushiranpise/sorry-google/releases).

Download the APK for the package you want and install it normally on Android.

## Building from Source

```bash
./gradlew assembleDebug
# or for release (requires signing config in local.properties):
./gradlew assembleRelease
```

## GitHub Actions

Push a tag to trigger a build and publish signed APKs as a GitHub Release:

```bash
git tag v1.0
git push origin v1.0
```
