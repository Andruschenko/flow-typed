/**
 * Adapted from https://github.com/transistorsoft/react-native-background-geolocation-android/tree/master/src/declarations
 */
declare module 'react-native-background-geolocation-android' {
  //--------------------
  //------ Types -------
  //--------------------

  /**
   * Controls the volume of [[Config.logLevel]] log-entries recorded to database.
   *
   * | Label                      |
   * |----------------------------|
   * | [[LOG_LEVEL_OFF]]     |
   * | [[LOG_LEVEL_ERROR]]   |
   * | [[LOG_LEVEL_WARNING]] |
   * | [[LOG_LEVEL_INFO]]    |
   * | [[LOG_LEVEL_DEBUG]]   |
   * | [[LOG_LEVEL_VERBOSE]] |
   */
  declare type LogLevel = 0 | 1 | 2 | 3 | 4 | 5;

  /**
   * Used for [[Config.desiredAccuracy]].
   *
   * | Name                                 | Location Providers           | Description                             |
   * |--------------------------------------|------------------------------|-----------------------------------------|
   * | [[DESIRED_ACCURACY_NAVIGATION]]      | (**iOS only**) GPS + Wifi + Cellular | Highest power; highest accuracy.|
   * | [[DESIRED_ACCURACY_HIGH]]            | GPS + Wifi + Cellular | Highest power; highest accuracy.               |
   * | [[DESIRED_ACCURACY_MEDIUM]]          | Wifi + Cellular | Medium power; Medium accuracy;                       |
   * | [[DESIRED_ACCURACY_LOW]]             | Wifi (low power) + Cellular | Lower power; No GPS.                     |
   * | [[DESIRED_ACCURACY_VERY_LOW]]        | Cellular only | Lowest power; lowest accuracy.                         |
   * | [[DESIRED_ACCURACY_LOWEST]]          | (**iOS only**) | Lowest power; lowest accuracy.                        |
   */
  declare type LocationAccuracy = -2 | -1 | 0 | 10 | 100 | 1000 | 3000;

  /**
   * Used for [[Notification.priority]].
   *
   * | Value                             | Description                                                                                            |
   * |-----------------------------------|--------------------------------------------------------------------------------------------------------|
   * | [[NOTIFICATION_PRIORITY_DEFAULT]] | Notification weighted to top of list; notification-bar icon weighted left.                             |
   * | [[NOTIFICATION_PRIORITY_HIGH]]    | Notification **strongly** weighted to top of list; notification-bar icon **strongly** weighted to left.|
   * | [[NOTIFICATION_PRIORITY_LOW]]     | Notification weighted to bottom of list; notification-bar icon weighted right.                         |
   * | [[NOTIFICATION_PRIORITY_MAX]]     | Same as `NOTIFICATION_PRIORITY_HIGH`.                                                                  |
   * | [[NOTIFICATION_PRIORITY_MIN]]     | Notification **strongly** weighted to bottom of list; notification-bar icon **hidden**.                |
   */
  declare type NotificationPriority = 0 | 1 | -1 | 2 | -2;

  /**
   * Used for [[Config.activityType]].
   *
   * | Name                                     |
   * |------------------------------------------|
   * | [[ACTIVITY_TYPE_OTHER]]                  |
   * | [[ACTIVITY_TYPE_AUTOMOTIVE_NAVIGATION]]  |
   * | [[ACTIVITY_TYPE_FITNESS]]                |
   * | [[ACTIVITY_TYPE_OTHER_NAVIGATION]]       |
   *
   * ℹ️  For more information, see [Apple docs](https://developer.apple.com/reference/corelocation/cllocationmanager/1620567-activitytype?language=objc).
   */
  declare type ActivityType = 1 | 2 | 3 | 4;
  /**
   * | Name                                    | Platform      |
   * |-----------------------------------------|---------------|
   * | [[AUTHORIZATION_STATUS_NOT_DETERMINED]] | iOS only      |
   * | [[AUTHORIZATION_STATUS_RESTRICTED]]     | iOS only      |
   * | [[AUTHORIZATION_STATUS_DENIED]]         | iOS & Android |
   * | [[AUTHORIZATION_STATUS_ALWAYS]]         | iOS & Android |
   * | [[AUTHORIZATION_STATUS_WHEN_IN_USE]]    | iOS only      |
   */
  declare type AuthorizationStatus = 0 | 1 | 2 | 3 | 4;

  /**
   * | Value    | Description                                                           |
   * |----------|-----------------------------------------------------------------------|
   * | `0`      | Geofences-only monitoring ([[BackgroundGeolocation.startGeofences]]). |
   * | `1`      | Both location & Geofence monitoring.                                  |
   */
  declare type TrackingMode = 0 | 1;

  /**
   * When native location API fails to fetch a location, one of the following error-codes will be returned.
   *
   * | Code  | Error                       |
   * |-------|-----------------------------|
   * | 0     | Location unknown            |
   * | 1     | Location permission denied  |
   * | 2     | Network error               |
   * | 408   | Location timeout            |
   */
  declare type LocationError = 0 | 1 | 2 | 408;

  /**
   * iOS Location authorization request.
   * This is used to express the location authorization you *expect* the user have enabled.
   */
  declare type LocationAuthorizationRequest = 'Always' | 'WhenInUse' | 'Any';

  /**
   * Desired HTTP method to use when uploading data to your configured [[url]].
   */
  declare type HttpMethod = 'POST' | 'PUT' | 'OPTIONS';

  declare type PersistMode = -1 | 0 | 1 | 2;

  //--------------------------
  //----- Default export -----
  //--------------------------

  /**
   * Primary API of the SDK.
   * @breakftypescrit
   *
   * ## 📚 Help
   * - 📘 [Philosophy of Operation](github:wiki/Philosophy-of-Operation)
   * - 📘 HTTP Guide: [[HttpEvent]].
   * - 📘 Geofencing Guide:  [[Geofence]].
   * - 📘 [Android Headless Mode](github:wiki/Android-Headless-Mode).
   * - 📘 [Debugging Guide](github:wiki/Debugging).
   *
   * ## ⚡️ Events
   *
   * [[BackgroundGeolocation]] is event-based.  Interacting with the SDK is largely through implementing listeners on the following events:
   *
   * | Method                 | Description                             |
   * |------------------------|-----------------------------------------|
   * | [[onLocation]]           | Fired with each recorded [[Location]]     |
   * | [[onMotionChange]]       | Fired when the plugin changes state between *moving* / *stationary* |
   * | [[onHttp]]               | Fired with each HTTP response from your server.  (see [[url]]). |
   * | [[onActivityChange]]     | Fired with each change in device motion-activity.                    |
   * | [[onProviderChange]]     | Fired after changes to device location-services configuration.       |
   * | [[onHeartbeat]]          | Periodic timed events.  See [[heartbeatInterval]].  iOS requires [[preventSuspend]]. |
   * | [[onGeofence]]           | Fired with each [[Geofence]] transition event (`ENTER, EXIT, DWELL`).  |
   * | [[onGeofencesChange]]    | Fired when the list of actively-monitored geofences changed.  See [[geofenceProximityRadius]]. |
   * | [[onSchedule]]           | Fired for [[schedule]] events.                                  |
   * | [[onConnectivityChange]] | Fired when network-connectivity changes (connected / disconnected).  |
   * | [[onPowerSaveChange]]    | Fired when state of operating-system's "power-saving" feature is enabled / disabled. |
   * | [[onEnabledChange]]      | Fired when the plugin is enabled / disabled via its [[start]] / [[stop]] methods.        |
   * | [[onNotificationAction]] | __Android only__: Fired when a button is clicked on a custom [[Notification.layout]] of a foreground-service notification. |
   *
   * ## 🔧 [[Config]] API
   *
   * [[BackgroundGeolocation]] is highly configurable.  See the [[Config]] API for more information.
   *
   * There are three main steps to using `BackgroundGeolocation`
   * 1. Wire up event-listeners.
   * 2. [[ready]] the SDK.
   * 3. [[start]] tracking.
   *
   * @example
   * ```javascript
   *
   * ////
   * // 1.  Wire up event-listeners
   * //
   *
   * // This handler fires whenever bgGeo receives a location update.
   * BackgroundGeolocation.onLocation(location => {
   *   console.log('[location] ', location);
   * }, error => {
   *   console.log('[location] ERROR: ', error);
   * });
   *
   * // This handler fires when movement states changes (stationary->moving; moving->stationary)
   * BackgroundGeolocation.onMotionChange(location => {
   *   console.log('[motionchange] ', location);
   * });
   *
   * // This handler fires on HTTP responses
   * BackgroundGeolocation.onHttp(response => {
   *   console.log('[http] ', response);
   * });
   *
   * // This event fires when a change in motion activity is detected
   * BackgroundGeolocation.onActivityChange(activityEvent => {
   *   console.log('[activitychange] ', activityEvent);
   * });
   *
   * // This event fires when the user toggles location-services authorization
   * BackgroundGeolocation.onProviderChange(providerEvent => {
   *   console.log('[providerchange] ', providerEvent);
   * });
   *
   * ////
   * // 2.  Execute #ready method (required)
   * //
   * BackgroundGeolocation.ready({
   *   // Geolocation Config
   *   desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
   *   distanceFilter: 10,
   *   // Activity Recognition
   *   stopTimeout: 1,
   *   // Application config
   *   debug: true,              // <-- enable this hear debug sounds.
   *   logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
   *   stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when app terminated.
   *   startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
   *   // HTTP / SQLite config
   *   url: 'http://yourserver.com/locations',
   *   batchSync: false,       // <-- Set true to sync locations to server in a single HTTP request.
   *   autoSync: true,         // <-- Set true to sync each location to server as it arrives.
   *   headers: {              // <-- Optional HTTP headers
   *     "X-FOO": "bar"
   *   },
   *   params: {               // <-- Optional HTTP params
   *     "auth_token": "maybe_your_server_authenticates_via_token_YES?"
   *   }
   * }, (state) => {
   *   console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
   *
   *   if (!state.enabled) {
   *     ////
   *     // 3. Start tracking!
   *     //
   *     BackgroundGeolocation.start(function() {
   *       console.log("- Start success");
   *     });
   *   }
   * });
   *
   * ```
   *
   * @example
   * ```javascript
   * BackgroundGeolocation.ready({
   *   distanceFilter: 10,
   *   stopOnTerminate: false,
   *   logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
   *   debug: true
   * }, (state) => {
   *   console.log('- BackgroundGeolocation is ready: ', state);
   * });
   * ```
   *
   * ### ⚠️ Warning:
   * Do not execute *any* API method which will require accessing location-services until the callback to [[ready]] executes (eg: [[getCurrentPosition]], [[watchPosition]], [[start]]).
   *
   * ### Promise API
   *
   * The `BackgroundGeolocation` Javascript API supports [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for *nearly* every method (the exceptions are [[watchPosition]] and adding event-listeners via **`#onEventName`** methods.)
   * @example
   * ```javascript
   * // Traditional API still works:
   * BackgroundGeolocation.ready({desiredAccuracy: 0, distanceFilter: 50}).then(state => {
   *   console.log('- BackgroundGeolocation is ready: ', state);
   * }).catch(error => {
   *   console.log('- BackgroundGeolocation error: ', error);
   * });
   * ```
   */
  declare export default class BackgroundGeolocation {
    static LOG_LEVEL_OFF: LogLevel;
    static LOG_LEVEL_ERROR: LogLevel;
    static LOG_LEVEL_WARNING: LogLevel;
    static LOG_LEVEL_INFO: LogLevel;
    static LOG_LEVEL_DEBUG: LogLevel;
    static LOG_LEVEL_VERBOSE: LogLevel;

    static DESIRED_ACCURACY_NAVIGATION: LocationAccuracy;
    static DESIRED_ACCURACY_HIGH: LocationAccuracy;
    static DESIRED_ACCURACY_MEDIUM: LocationAccuracy;
    static DESIRED_ACCURACY_LOW: LocationAccuracy;
    static DESIRED_ACCURACY_VERY_LOW: LocationAccuracy;
    static DESIRED_ACCURACY_LOWEST: LocationAccuracy;

    static AUTHORIZATION_STATUS_NOT_DETERMINED: AuthorizationStatus;
    static AUTHORIZATION_STATUS_RESTRICTED: AuthorizationStatus;
    static AUTHORIZATION_STATUS_DENIED: AuthorizationStatus;
    static AUTHORIZATION_STATUS_ALWAYS: AuthorizationStatus;
    static AUTHORIZATION_STATUS_WHEN_IN_USE: AuthorizationStatus;

    static NOTIFICATION_PRIORITY_DEFAULT: NotificationPriority;
    static NOTIFICATION_PRIORITY_HIGH: NotificationPriority;
    static NOTIFICATION_PRIORITY_LOW: NotificationPriority;
    static NOTIFICATION_PRIORITY_MAX: NotificationPriority;
    static NOTIFICATION_PRIORITY_MIN: NotificationPriority;

    static ACTIVITY_TYPE_OTHER: ActivityType;
    static ACTIVITY_TYPE_AUTOMOTIVE_NAVIGATION: ActivityType;
    static ACTIVITY_TYPE_FITNESS: ActivityType;
    static ACTIVITY_TYPE_OTHER_NAVIGATION: ActivityType;

    static PERSIST_MODE_ALL: PersistMode;
    static PERSIST_MODE_LOCATION: PersistMode;
    static PERSIST_MODE_GEOFENCE: PersistMode;
    static PERSIST_MODE_NONE: PersistMode;

    /**
     * [[DeviceSettings]] API
     *
     * Provides an API to show Android & vendor-specific Battery / Power Management settings screens that can affect performance of the Background Geolocation SDK on various devices.
     *
     * The site [Don't Kill My App](https://dontkillmyapp.com/) provides a comprehensive list of poor Android vendors which throttle background-services that this plugin relies upon.
     *
     * This [[DeviceSettings]] API is an attempt to provide resources to direct the user to the appropriate vendor-specific settings screen to resolve issues with background operation.
     *
     * ![](https://dl.dropboxusercontent.com/s/u7ljngfecxvibyh/huawei-settings-battery-launch.jpg?dl=1)
     * ![](https://dl.dropboxusercontent.com/s/hd6yxw58hgc7ef4/android-settings-battery-optimization.jpg?dl=1)
     *
     */
    static deviceSettings: DeviceSettings;

    /**
     * @hidden
     */
    static addListener(
      event: string,
      success: Function,
      failure?: Function
    ): void;
    /**
     * @hidden
     */
    static on(event: string, success: Function, failure?: Function): void;
    /**
     * Removes an event listener.  You must supply the *type* of event to remove in addition to a reference to the *exact* function you
     * used to subscribe to the event.
     *
     *
     * | Event                |
     * |----------------------|
     * | `location`           |
     * | `motionchange`       |
     * | `activitychange`     |
     * | `providerchange`     |
     * | `geofence`           |
     * | `geofenceschange`    |
     * | `heartbeat`          |
     * | `http`               |
     * | `powersavechange`    |
     * | `schedule`           |
     * | `connectivitychange` |
     * | `enabledchange`      |
     *
     * @example
     * ```javascript
     * let locationHandler = (location) => {
     *   console.log('[location] - ', location)
     * }
     * BackgroundGeolocation.onLocation(locationHandler)
     * .
     * .
     * // Remove the listener providing a reference to the original callback.
     * BackgroundGeolocation.removeListener('location', locationHandler)
     * ```
     */
    static removeListener(
      event: string,
      handler: Function,
      success?: Function,
      failure?: Function
    ): void;

    /**
     * Alias for [[removeListener]].
     * @ignore
     */
    static un(
      event: string,
      handler: Function,
      success?: Function,
      failure?: Function
    ): void;

    /**
     * Removes all event-listeners
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.removeListeners();
     * ```
     */
    static removeListeners(success?: Function, failure?: Function): void;

    /**
     * Alias for [[removeListeners]]
     */
    static removeAllListeners(success?: Function, failure?: Function): void;

    /**
     * Subscribe to location events.
     *
     * Every location recorded by the SDK is provided to your `callback`, including those from [[onMotionChange]], [[getCurrentPosition]] and [[watchPosition]].
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.onLocation((location) => {
     *   console.log('[onLocation] success: ', location);
     * }, (error) => {
     *   console.log('[onLocation] ERROR: ', error);
     * });
     * ```
     *
     * ### Error Codes
     *
     * If the native location API fails to return a location, the `failure` callback will be provided a [[LocationError]].
     *
     * ### ⚠️ Note [[Location.sample]]:
     *
     * When performing a [[onMotionChange]] or [[getCurrentPosition]], the plugin requests **multiple** location *samples* in order to record the most accurate location possible.  These *samples* are **not** persisted to the database but they will be provided to your `callback`, for your convenience, since it can take some seconds for the best possible location to arrive.
     *
     * For example, you might use these samples to progressively update the user's position on a map.  You can detect these *samples* in your `callback` via `location.sample == true`.  If you're manually `POST`ing location to your server, you should ignore these locations.
     *
     * @event location
     */
    static onLocation(
      success: (location: Location) => void,
      failure?: (errorCode: LocationError) => void
    ): void;

    /**
     * Subscribe to Geofence transition events.
     *
     * Your supplied `callback` will be called when any monitored geofence crossing occurs.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.onGeofence((event) => {
     *   console.log('[onGeofence] ', event);
     * });
     * ```
     *
     * ### ℹ️ See also:
     * - 📘 [[Geofence]] Guide.
     *
     * @event geofence
     */
    static onGeofence(callback: (event: GeofenceEvent) => void): void;

    /**
     * Subscribe to __`motionchange`__ events.
     *
     * Your `callback` will be executed each time the device has changed-state between **MOVING** or **STATIONARY**.
     *
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.onMotionChange((event) => {
     *   if (event.isMoving) {
     *      console.log('[onMotionChange] Device has just started MOVING ', event.location);
     *   } else {
     *      console.log('[onMotionChange] Device has just STOPPED:  ', event.location);
     *   }
     * });
     * ```
     *
     * ----------------------------------------------------------------------
     * ### ⚠️ Warning:  `autoSyncThreshold`
     *
     * If you've configured [[Config.autoSyncThreshold]], it **will be ignored** during a `onMotionChange` event &mdash; all queued locations will be uploaded, since:
     * - If an `onMotionChange` event fires **into the *moving* state**, the device may have been sitting dormant for a long period of time.  The plugin is *eager* to upload this state-change to the server as soon as possible.
     * - If an `onMotionChange` event fires **into the *stationary* state**, the device may be about to lie dormant for a long period of time.  The plugin is *eager* to upload all queued locations to the server before going dormant.
     * ----------------------------------------------------------------------
     *
     * ### ℹ️ See also:
     * - [[stopTimeout]]
     * - 📘 [Philosophy of Operation](github:wiki/Philosophy-of-Operation)
     *
     * @event motionchange
     */
    static onMotionChange(callback: (event: MotionChangeEvent) => void): void;

    /**
     * Subscribe to HTTP responses from your server [[url]].
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.onHttp((response) => {
     *   let status = response.status;
     *   let success = response.success;
     *   let responseText = response.responseText;
     *   console.log('[onHttp] ', response);
     * });
     * ```
     * ### ℹ️ See also:
     *  - HTTP Guide at [[HttpEvent]].
     *
     * @event http
     */
    static onHttp(callback: (response: HttpEvent) => void): void;

    /**
     * Subscribe to changes in motion activity.
     *
     * Your `callback` will be executed each time the activity-recognition system receives an event (`still, on_foot, in_vehicle, on_bicycle, running`).
     *
     * ### Android
     * Android [[MotionActivityEvent.confidence]] always reports `100`%.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.onActivityChange((event) => {
     *   console.log('[onActivityChange] ', event);
     * });
     * ```
     * @event activitychange
     */
    static onActivityChange(
      callback: (event: MotionActivityEvent) => void
    ): void;

    /**
     * Subscribe to changes in device's location-services configuration / authorization.
     *
     * Your `callback` fill be executed whenever a change in the state of the device's **Location Services** has been detected.  eg: "GPS ON", "WiFi only".
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.onProviderChange((event) => {
     *   console.log('[onProviderChange: ', event);
     *
     *   switch(event.status) {
     *     case BackgroundGeolocation.AUTHORIZATION_STATUS_DENIED:
     *       // Android & iOS
     *       console.log('- Location authorization denied');
     *       break;
     *     case BackgroundGeolocation.AUTHORIZATION_STATUS_ALWAYS:
     *       // Android & iOS
     *       console.log('- Location always granted');
     *       break;
     *     case BackgroundGeolocation.AUTHORIZATION_STATUS_WHEN_IN_USE:
     *       // iOS only
     *       console.log('- Location WhenInUse granted');
     *       break;
     *   }
     * });
     * ```
     *
     * ### ℹ️ See also:
     * - You can explicitly request the current state of location-services using [[getProviderState]].
     *
     * ### ⚠️ Note:
     * - The plugin always force-fires an [[onProviderChange]] event whenever the app is launched (right after the [[ready]] method is executed), regardless of current state, so you can learn the the current state of location-services with each boot of your application.
     *
     * @event providerchange
     */
    static onProviderChange(
      callback: (event: ProviderChangeEvent) => void
    ): void;

    /**
     * Subscribe to periodic heartbeat events.
     *
     * Your `callback` will be executed for each [[heartbeatInterval]] while the device is in **stationary** state (**iOS** requires [[preventSuspend]]: true as well).
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   heartbeatInterval: 60
     * });
     *
     * BackgroundGeolocation.onHeartbeat((event) => {
     *   console.log('[onHeartbeat] ', event);
     *
     *   // You could request a new location if you wish.
     *   BackgroundGeolocation.getCurrentPosition({
     *     samples: 1,
     *     persist: true
     *   }).then((location) => {
     *     console.log('[getCurrentPosition] ', location);
     *   });
     * })
     * ```
     *
     * ### ⚠️ Note:
     * -  The [[Location]] provided by the [[HeartbeatEvent]] is only the last-known location.  The *heartbeat* event does not actively engage location-services.  If you wish to get the current location in your `callback`, use [[getCurrentPosition]].
     * @event heartbeat
     */
    static onHeartbeat(callback: (event: HeartbeatEvent) => void): void;

    /**
     * Subscribe to changes in actively monitored geofences.
     *
     * Fired when the list of monitored-geofences changed.  The BackgroundGeolocation SDK contains powerful geofencing features that allow you to monitor
     * any number of circular geofences you wish (thousands even), in spite of limits imposed by the native platform APIs (**20 for iOS; 100 for Android**).
     *
     * The plugin achieves this by storing your geofences in its database, using a [geospatial query](https://en.wikipedia.org/wiki/Spatial_query) to determine
     * those geofences in proximity (@see [[geofenceProximityRadius]]), activating only those geofences closest to the device's current location
     * (according to limit imposed by the corresponding platform).
     *
     * When the device is determined to be moving, the plugin periodically queries for geofences in proximity (eg. every minute) using the latest recorded
     * location.  This geospatial query is **very fast**, even with tens-of-thousands geofences in the database.
     *
     * It's when this list of monitored geofences *changes*, that the plugin will fire the `onGeofencesChange` event.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.onGeofencesChange((event) => {
     *   let on = event.on;     //<-- new geofences activated.
     *   let off = event.off; //<-- geofences that were just de-activated.
     *
     *   // Create map circles
     *   on.forEach((geofence) => {
     *     createGeofenceMarker(geofence)
     *   });
     *
     *   // Remove map circles
     *   off.forEach((identifier) => {
     *     removeGeofenceMarker(identifier);
     *   }
     * });
     * ```
     *
     * ### ℹ️ See also:
     * - 📘 [[Geofence]] Guide.
     * @event geofenceschange
     */
    static onGeofencesChange(
      callback: (event: GeofencesChangeEvent) => void
    ): void;

    /**
     * Subscribe to [[schedule]] events.
     *
     * Your `callback` will be executed each time a [[schedule]] event fires.  Your `callback` will be provided with the current [[State]]:  **`state.enabled`**
     * will reflect the state according to your [[schedule]].
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.onSchedule((state) => {
     *   if (state.enabled) {
     *     console.log('[onSchedule] scheduled start tracking');
     *   } else {
     *     console.log('[onSchedule] scheduled stop tracking');
     *   }
     * });
     * ```
     * @event schedule
     */
    static onSchedule(callback: (state: State) => void): void;

    /**
     * Subscribe to changes in network connectivity.
     *
     * Fired when the state of the device's network-connectivity changes (enabled -> disabled and vice-versa).  By default, the plugin will automatically fire
     * a `connectivitychange` event with the current state network-connectivity whenever the [[start]] method is executed.
     *
     * ℹ️ The SDK subscribes internally to `connectivitychange` events &mdash; if you've configured the SDK's HTTP Service (See [[HttpEvent]]) and your app has queued locations,
     * the SDK will automatically initiate uploading to your configured [[Config.url]] when network connectivity is detected.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.onConnectivityChange((event) => {
     *   console.log('[onConnectivityChange] ', event);
     * });
     * ```
     * @event connectivitychange
     */
    static onConnectivityChange(
      callback: (event: ConnectivityChangeEvent) => void
    ): void;

    /**
     * Subscribe to state changes in OS power-saving system.
     *
     * Fired when the state of the operating-system's "Power Saving" mode changes.  Your `callback` will be provided with a `bool` showing whether
     * "Power Saving" is **enabled** or **disabled**.  Power Saving mode can throttle certain services in the background, such as HTTP requests or GPS.
     * @break
     *
     * ℹ️ You can manually request the current-state of "Power Saving" mode with the method [[isPowerSaveMode]].
     *
     * ### iOS
     *
     * iOS Power Saving mode can be engaged manually by the user in **Settings -> Battery** or from an automatic OS dialog.
     *
     * ![](https://dl.dropboxusercontent.com/s/lz3zl2jg4nzstg3/Screenshot%202017-09-19%2010.34.21.png?dl=1)
     *
     * ### Android
     *
     * Android Power Saving mode can be engaged manually by the user in **Settings -> Battery -> Battery Saver** or automatically with a user-specified "threshold" (eg: 15%).
     *
     * ![](https://dl.dropboxusercontent.com/s/raz8lagrqayowia/Screenshot%202017-09-19%2010.33.49.png?dl=1)
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.onPowerSaveChange((isPowerSaveMode) => {
     *   console.log('[onPowerSaveChange: ', isPowerSaveMode);
     * });
     * ```
     * @event powersavechange
     */
    static onPowerSaveChange(callback: (enabled: boolean) => void): void;

    /**
     * Subscribe to changes in plugin [[State.enabled]].
     *
     * Fired when the plugin's [[State.enabled]] changes.  For example, executing [[start]] and [[stop]] will cause the `onEnabledChnage` event to fire.
     * This event is primarily designed for use with the configuration option [[stopAfterElapsedMinutes]], which automatically executes the plugin's
     * [[stop]] method.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.onEnabledChange(isEnabled => {
     *   console.log('[onEnabledChanged] isEnabled? ', isEnabled);
     * });
     * ```
     * @event enabledchange
     */
    static onEnabledChange(callback: (enabled: boolean) => void): void;

    /**
     * [__Android-only__] Subscribe to button-clicks of a custom [[Notification.layout]] on the Android foreground-service notification.
     */
    static onNotificationAction(callback: (buttonId: string) => void): void;

    /**
     * Registers a Javascript callback to execute in the Android "Headless" state, where the app has been terminated configured with
     * [[stopOnTerminate]]`:false`.  * The received `event` object contains a `name` (the event name) and `params` (the event data-object).
     *
     * ### ⚠️ Note Cordova
     * - Javascript headless callbacks are not supported by Cordova.
     *
     * ### ⚠️ Warning:
     * - You __must__ `registerHeadlessTask` in your application root file (eg: `index.js`).
     *
     * @example
     * ```javascript
     * let BackgroundGeolocationHeadlessTask = async (event) => {
     *   let params = event.params;
     *    console.log('[BackgroundGeolocation HeadlessTask] -', event.name, params);
     *
     *    switch (event.name) {
     *      case 'heartbeat':
     *        // Use await for async tasks
     *        let location = await BackgroundGeolocation.getCurrentPosition({
     *          samples: 1,
     *          persist: false
     *        });
     *        console.log('[BackgroundGeolocation HeadlessTask] - getCurrentPosition:', location);
     *        break;
     *    }
     * }
     *
     * BackgroundGeolocation.registerHeadlessTask(BackgroundGeolocationHeadlessTask);
     * ```
     *
     * ### ℹ️ See also:
     * - 📘 [Android Headless Mode](github:wiki/Android-Headless-Mode).
     *
     */
    static registerHeadlessTask(callback: (event: Object) => any): void;

    /**
     *
     * Signal to the plugin that your app is launched and ready, proving the default [[Config]].
     *
     * The supplied [[Config]] will be applied **only at first install** of your app — for every launch thereafter,
     * the plugin will automatically load its last-known configuration from persistent storage.
     * The plugin always remembers the configuration you apply to it.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
     *   distanceFilter: 10,
     *   stopOnTerminate: false,
     *   startOnBoot: true,
     *   url: 'http://your.server.com',
     *   headers: {
     *    'my-auth-token': 'secret-token'
     *   }
     * }).then((state) => {
     *  console.log('[ready] success', state);
     * });
     * ```
     *
     * ### ⚠️ Warning: You must call `#ready` **once** and **only** once, each time your app is launched.
     * - Do not hide the call to `#ready` within a view which is loaded only by clicking a UI action.  This is particularly important
     * for iOS in the case where the OS relaunches your app in the background when the device is detected to be moving.  If you don't ensure that `#ready` is called in this case, tracking will not resume.
     *
     * ### The [[reset]] method.
     *
     * If you wish, you can use the [[reset]] method to reset all [[Config]] options to documented default-values (with optional overrides):
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.reset();
     * // Reset to documented default-values with overrides
     * bgGeo.reset({
     *   distanceFilter:  10
     * });
     * ```
     */
    static ready(
      config: Config,
      success?: (state: State) => void,
      failure?: (error: string) => void
    ): Promise<State>;

    /**
     * @ignore
     * __DEPRECATED__.  Use [[ready]] instead.
     */
    static configure(
      config: Config,
      success?: (state: State) => void,
      failure?: Function
    ): Promise<State>;

    /**
     *
     * Re-configure the plugin's [[Config]] parameters.  This is the method to use when you wish to *change*
     * the plugin [[Config]] *after* [[ready]] has been executed.
     *
     * The supplied [[Config]] will be appended to the current configuration and applied in realtime.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.setConfig({
     *   desiredAccuracy: Config.DESIRED_ACCURACY_HIGH,
     *   distanceFilter: 100.0,
     *   stopOnTerminate: false,
     *   startOnBoot: true
     * }).then((state) => {
     *   console.log('[setConfig] success: ', state);
     * })
     * ```
     */
    static setConfig(
      config: Config,
      success?: (state: State) => void,
      failure?: Function
    ): Promise<State>;

    /**
     * Resets the plugin configuration to documented default-values.
     *
     * If an optional [[Config]] is provided, it will be applied *after* the configuration reset.
     *
     */
    static reset(
      config?: Config,
      success?: (state: State) => void,
      failure?: Function
    ): Promise<State>;

    /**
     * Enable location + geofence tracking.
     *
     * This is the plugin's power **ON** button.  The plugin will initially start into its **stationary** state, fetching an initial location before
     * turning off location services.  Android will be monitoring its **Activity Recognition System** while iOS will create a stationary geofence around
     * the current location.
     *
     * ### ⚠️ Note:
     * If you've configured a [[schedule]], this method will override that schedule and engage tracking immediately.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.start().then((state) => {
     *   console.log('[start] success - ', state);
     * });
     * ```
     *
     * ### ℹ️ See also:
     * - [[stop]]
     * - [[startGeofences]]
     * - 📘 [Philosophy of Operation](github:wiki/Philosophy-of-Operation)
     */
    static start(
      success?: (state: State) => void,
      error?: (error: string) => void
    ): Promise<State>;

    /**
     * Disable location and geofence monitoring.  This is the SDK's power **OFF** button.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.stop();
     * ```
     *
     * ### ⚠️ Note:
     * If you've configured a [[schedule]], **`#stop`** will **not** halt the Scheduler.  You must explicitly [[stopSchedule]] as well:
     *
     * @example
     * ```javascript
     * // Later when you want to stop the Scheduler (eg: user logout)
     * BackgroundGeolocation.stopSchedule();
     * ```
     */
    static stop(
      success?: (state: State) => void,
      error?: (error: string) => void
    ): Promise<State>;

    /**
     * Manually toggles the plugin's **motion state** between **stationary** and **moving**.
     *
     * When provided a value of  **`true`**, the plugin will engage location-services and begin aggressively tracking the device's location *immediately*,
     * bypassing stationary monitoring.
     *
     * If you were making a "Jogging" application, this would be your **`[Start Workout]`** button to immediately begin location-tracking.  Send **`false`**
     * to turn **off** location-services and return the plugin to the **stationary** state.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.changePace(true);  // <-- Location-services ON ("moving" state)
     * BackgroundGeolocation.changePace(false); // <-- Location-services OFF ("stationary" state)
     * ```
     */
    static changePace(
      isMoving: boolean,
      success?: Function,
      failure?: (error: string) => void
    ): Promise<void>;

    /**
     * Engages the geofences-only [[State.trackingMode]].
     *
     * In this mode, no active location-tracking will occur &mdash; only geofences will be monitored.  To stop monitoring "geofences" [[TrackingMode]],
     * simply use the usual [[stop]] method.
     *
     * @example
     * ```javascript
     * // Add a geofence.
     * BackgroundGeolocation.addGeofence({
     *   notifyOnExit: true,
     *   radius: 200,
     *   identifier: 'ZONE_OF_INTEREST',
     *   latitude: 37.234232,
     *   longitude: 42.234234
     * });
     *
     * // Listen to geofence events.
     * BackgroundGeolocation.onGeofence((event) => {
     *   console.log('[onGeofence] -  ', event);
     * });
     *
     * // Configure the plugin
     * BackgroundGeolocation.ready({
     *   url: 'http://my.server.com',
     *   autoSync: true
     * }).then(((state) => {
     *   // Start monitoring geofences.
     *   BackgroundGeolocation.startGeofences();
     * });
     * ```
     *
     * ### ℹ️ See also:
     * - [[stop]]
     * - 📘 [[Geofence]] Guide.
     */
    static startGeofences(
      success?: (state: State) => void,
      failure?: (error: string) => void
    ): Promise<State>;

    /**
     * Return the current [[State]] of the plugin, including all [[Config]] parameters.
     *
     * @example
     * ```javascript
     * let state = await BackgroundGeolocation.state();
     * console.log('[state] ', state.enabled, state.trackingMode);
     * ```
     */
    static getState(
      success?: (state: State) => void,
      failure?: (error: string) => void
    ): Promise<State>;

    /**
     * Initiate the configured [[schedule]].
     *
     * If a [[schedule]] was configured, this method will initiate that schedule.  The plugin will automatically be started or stopped according to
     * the configured [[schedule]].
     *
     * To halt scheduled tracking, use [[stopSchedule]].
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.startSchedule.then((state) => {
     *   console.log('[startSchedule] success: ', state);
     * })
     * ```
     * ### ℹ️ See also:
     * - [[schedule]]
     * - [[startSchedule]]
     */
    static startSchedule(
      success?: (state: State) => void,
      failure?: (error: string) => void
    ): Promise<State>;

    /**
     * Halt scheduled tracking.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.stopSchedule.then((state) => {
     *   console.log('[stopSchedule] success: ', state);
     * })
     * ```
     *
     * ⚠️ [[stopSchedule]] will **not** execute [[stop]] if the plugin is currently tracking.  You must explicitly execute [[stop]].
     *
     * @example
     * ```javascript
     * // Later when you want to stop the Scheduler (eg: user logout)
     * await BackgroundGeolocation.stopSchedule().then((state) => {
     *   if (state.enabled) {
     *     BackgroundGeolocation.stop();
     *   }
     * })
     * ```
     * ### ℹ️ See also:
     * - [[startSchedule]]
     *
     */
    static stopSchedule(
      success?: (state: State) => void,
      failure?: (error: string) => void
    ): Promise<State>;

    /**
     * Sends a signal to OS that you wish to perform a long-running task.
     *
     * The will will keep your running in the background and not suspend it until you signal completion with the [[stopBackgroundTask]] method.  Your callback will be provided with a single parameter `taskId`
     * which you will send to the [[stopBackgroundTask]] method.
     *
     * @example
     * ```javascript
     * onLocation(location) {
     *   console.log('[location] ', location);
     *
     *   // Perform some long-running task (eg: HTTP request)
     *   BackgroundGeolocation.startBackgroundTask().then((taskId) => {
     *     performLongRunningTask.then(() => {
     *       // When your long-running task is complete, signal completion of taskId.
     *       BackgroundGeolocation.stopBackgroundTask(taskId);
     *     }).catch(error) => {
     *       // Be sure to catch errors:  never leave you background-task hanging.
     *       console.error(error);
     *       BackgroundGeolocation.stopBackgroundTask();
     *     });
     *   });
     * }
     * ```
     *
     * ### iOS
     * The iOS implementation uses [beginBackgroundTaskWithExpirationHandler](https://developer.apple.com/documentation/uikit/uiapplication/1623031-beginbackgroundtaskwithexpiratio)
     *
     * ⚠️ iOS provides **exactly** 180s of background-running time.  If your long-running task exceeds this time, the plugin has a fail-safe which will
     * automatically [[stopBackgroundTask]] your **`taskId`** to prevent the OS from force-killing your application.
     *
     * Logging of iOS background tasks looks like this:
     * ```
     * ✅-[BackgroundTaskManager createBackgroundTask] 1
     * .
     * .
     * .
     *
     * ✅-[BackgroundTaskManager stopBackgroundTask:]_block_invoke 1 OF (
     *     1
     * )
     * ```
     * ### Android
     *
     * The Android implementation launches a foreground-service, along with the accompanying persistent foreground [[Notification]].
     *
     * ⚠️ The Android plugin hardcodes a limit of **30s** for your background-task before it automatically `FORCE KILL`s it.
     *
     *
     * Logging for Android background-tasks looks like this (when you see an hourglass ⏳ icon, a foreground-service is active)
     * ```
     *  I TSLocationManager: [c.t.l.u.BackgroundTaskManager onStartJob] ⏳ startBackgroundTask: 6
     *  .
     *  .
     *  .
     *  I TSLocationManager: [c.t.l.u.BackgroundTaskManager$Task stop] ⏳ stopBackgroundTask: 6
     * ```
     *
     */
    static startBackgroundTask(
      success?: (taskId: number) => void,
      failure?: Function
    ): Promise<number>;

    /**
     * Signal completion of [[startBackgroundTask]]
     *
     * Sends a signal to the native OS that your long-running task, addressed by `taskId` provided by [[startBackgroundTask]] is complete and the OS may proceed
     * to suspend your application if applicable.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.startBackgroundTask().then((taskId) => {
     *   // Perform some long-running task (eg: HTTP request)
     *   performLongRunningTask.then(() => {
     *     // When your long-running task is complete, signal completion of taskId.
     *     BackgroundGeolocation.stopBackgroundTask(taskId);
     *   });
     * });
     * ```
     */
    static stopBackgroundTask(
      taskId: number,
      success?: Function,
      failure?: Function
    ): Promise<number>;

    /**
     * @alias [[stopBackgroundTask]]
     * @deprecated
     */
    static finish(
      taskId: number,
      success?: Function,
      failure?: Function
    ): Promise<number>;

    /**
     * Retrieves the current [[Location]].
     *
     * This method instructs the native code to fetch exactly one location using maximum power & accuracy.  The native code will persist the fetched location to
     * its SQLite database just as any other location in addition to POSTing to your configured [[url]].
     * If an error occurs while fetching the location, `catch` will be provided with an [[LocationError]].
     * @break
     *
     * ### Options
     *
     * See [[CurrentPositionRequest]].
     *
     * ### Error Codes
     *
     * See [[LocationError]].
     *
     * @example
     * ```javascript
     * let location = await BackgroundGeolocation.getCurrentPosition({
     *   timeout: 30,          // 30 second timeout to fetch location
     *   maximumAge: 5000,     // Accept the last-known-location if not older than 5000 ms.
     *   desiredAccuracy: 10,  // Try to fetch a location with an accuracy of `10` meters.
     *   samples: 3,           // How many location samples to attempt.
     *   extras: {             // Custom meta-data.
     *     "route_id": 123
     *   }
     * });
     * ```
     * ### ⚠️ Note:
     * - While [[getCurrentPosition]] will receive only **one** [[Location]], the plugin *does* request **multiple** location samples which will all be provided
     * to the [[onLocation]] event-listener.  You can detect these samples via [[Location.sample]] `== true`.
     */
    static getCurrentPosition(
      options: CurrentPositionRequest,
      success?: (location: Location) => void,
      failure?: (errorCode: LocationError) => void
    ): Promise<Location>;

    /**
     * Start a stream of continuous location-updates.  The native code will persist the fetched location to its SQLite database
     * just as any other location (If the SDK is currently [[enabled]]) in addition to POSTing to your configured [[url]] (if you've enabled the HTTP features).
     *
     * ### ⚠️ Warning:
     * `watchPosition` is **not** recommended for **long term** monitoring in the background &mdash; It's primarily designed for use in the foreground **only**.  You might use it for fast-updates of the user's current position on the map, for example.
     * The SDK's primary [Philosophy of Operation](github:wiki/Philosophy-of-Operation) **does not require** `watchPosition`.
     *
     * #### iOS
     * `watchPosition` will continue to run in the background, preventing iOS from suspending your application.  Take care to listen to `suspend` event and call [[stopWatchPosition]] if you don't want your app to keep running in the background, consuming battery.
     *
     * @example
     * ```javascript
     * onResume() {
     *   // Start watching position while app in foreground.
     *   BackgroundGeolocation.watchPosition((location) => {
     *     console.log('[watchPosition] -', location);
     *   }, (errorCode) => {
     *     console.log('[watchPosition] ERROR -', errorCode);
     *   }, {
     *     interval: 1000
     *   })
     * }
     *
     * onSuspend() {
     *   // Halt watching position when app goes to background.
     *   BackgroundGeolocation.stopWatchPosition();
     * }
     * ```
     */
    static watchPosition(
      success: (location: Location) => void,
      failure?: (errorCode: LocationError) => void,
      options?: WatchPositionRequest
    ): void;

    /**
     * Stop watch-position updates initiated from [[watchPosition]].
     * @example
     * ```javascript
     * onResume() {
     *   // Start watching position while app in foreground.
     *   BackgroundGeolocation.watchPosition((location) => {
     *     console.log('[watchPosition] -', location);
     *   }, (errorCode) => {
     *     console.log('[watchPosition] ERROR -', errorCode);
     *   }, {
     *    interval: 1000
     *   })
     * }
     *
     * onSuspend() {
     *   // Halt watching position when app goes to background.
     *   BackgroundGeolocation.stopWatchPosition();
     * }
     * ```
     * ### ℹ️ See also:
     * - [[stopWatchPosition]]
     *
     */
    static stopWatchPosition(
      success?: Function,
      failure?: Function
    ): Promise<void>;

    /**
     * Retrieve a List of [[Location]] currently stored in the plugin's SQLite database.
     *
     * @example
     * ```javascript
     * let locations = await BackgroundGeolocation.getLocations();
     * ```
     */
    static getLocations(
      success?: (locations: Array<Object>) => void,
      failure?: Function
    ): Promise<Array<Object>>;

    /**
     * Retrieve the count of all locations current stored in the plugin's SQLite database.
     *
     * @example
     * ```javascript
     * let count = await BackgroundGeolocation.getCount();
     * ```
     */
    static getCount(
      success?: (count: number) => void,
      failure?: Function
    ): Promise<number>;

    /**
     * Remove all records in plugin's SQLite database.
     *
     * @example
     * ```javascript
     * let success = await BackgroundGeolocation.destroyLocations();
     * ```
     */
    static destroyLocations(
      success?: Function,
      failure?: Function
    ): Promise<void>;

    static insertLocation(
      params: Location,
      success?: (location: Location) => void,
      failure?: Function
    ): Promise<Location>;

    /**
     * Manually execute upload to configured [[url]]
     *
     * If the plugin is configured for HTTP with an [[url]] and [[autoSync]] `false`, the [[sync]] method will initiate POSTing the locations
     * currently stored in the native SQLite database to your configured [[url]].  When your HTTP server returns a response of `200 OK`, that record(s)
     * in the database will be DELETED.
     *
     * If you configured [[batchSync]] `true`, all the locations will be sent to your server in a single HTTP POST request, otherwise the plugin will
     * execute an HTTP post for **each** [[Location]] in the database (REST-style).  Your callback will be executed and provided with a `List` of all the
     * locations from the SQLite database.  If you configured the plugin for HTTP (by configuring a [[url]], your callback will be executed after all
     * the HTTP request(s) have completed.  If the plugin failed to sync to your server (possibly because of no network connection), the failure callback will
     * be called with an error message.  If you are **not** using the HTTP features, [[sync]] will delete all records from its SQLite database.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.sync((records) => {
     *   console.log('[sync] success: ', records);
     * }).catch((error) => {
     *   console.log('[sync] FAILURE: ', error);
     * });
     *
     * ```
     *  ℹ️ For more information, see the __HTTP Guide__ at [[HttpEvent]].
     */
    static sync(
      success?: (locations: Array<Object>) => void,
      failure?: Function
    ): Promise<Array<Object>>;

    /**
     * Retrieve the current distance-traveled ("odometer").
     *
     * The plugin constantly tracks distance traveled, computing the distance between the current location and last and maintaining the sum.  To fetch the
     * current **odometer** reading:
     *
     * @example
     * ```javascript
     * let odometer = await BackgroundGeolocation.getOdometer();
     * ```
     *
     * ### ℹ️ See also:
     *  - [[desiredOdometerAccuracy]].
     *  - [[resetOdometer]] / [[setOdometer]].
     *
     * ### ⚠️ Warning:
     * - Odometer calculations are dependent upon the accuracy of received locations.  If location accuracy is poor, this will necessarily introduce error into odometer calculations.
     */
    static getOdometer(
      success?: (odometer: number) => void,
      failure?: Function
    ): Promise<number>;

    /**
     * Initialize the `odometer` to *any* arbitrary value.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.setOdometer(1234.56).then((location) => {
     *   // This is the location where odometer was set at.
     *   console.log('[setOdometer] success: ', location);
     * });
     * ```
     *
     * ### ⚠️ Note:
     * - [[setOdometer]] will internally perform a [[getCurrentPosition]] in order to record the exact location *where* odometer was set.
     */
    static setOdometer(
      value: number,
      success?: (location: Location) => void,
      failure?: Function
    ): Promise<Location>;

    /**
     * Initialize the `odometer` to `0`.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.resetOdometer().then((location) => {
     *   // This is the location where odometer was set at.
     *   console.log('[setOdometer] success: ', location);
     * });
     * ```
     *
     * ### ⚠️ Note:
     * - [[resetOdometer]] will internally perform a [[getCurrentPosition]] in order the record to exact location *where* odometer was set.
     * - [[resetOdometer]] is the same as [[setOdometer]]`:0`.
     */
    static resetOdometer(
      success?: Function,
      failure?: Function
    ): Promise<Location>;

    /**
     * Adds a [[Geofence]] to be monitored by the native Geofencing API.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.addGeofence({
     *   identifier: "Home",
     *   radius: 150,
     *   latitude: 45.51921926,
     *   longitude: -73.61678581,
     *   notifyOnEntry: true,
     *   notifyOnExit: false,
     *   notifyOnDwell: true,
     *   loiteringDelay: 30000,  // 30 seconds
     *   extras: {               // Optional arbitrary meta-data
     *     zone_id: 1234
     *   }
     * }).then((success) => {
     *   console.log('[addGeofence] success');
     * }).catch((error) => {
     *   console.log('[addGeofence] FAILURE: ', error);
     * });
     * ```
     *
     * ### ℹ️ Note:
     * - If a geofence(s) *already* exists with the configured [[Geofence.identifier]], the previous one(s) will be **deleted** before the new one is inserted.
     * - When adding *multiple*, it's about **10 times faster** to use [[addGeofences]] instead.
     * - 📘[[Geofence]] Guide.
     */

    static addGeofence(
      config: Geofence,
      success?: Function,
      failure?: (error: string) => void
    ): Promise<void>;
    /**
     * Adds a list of [[Geofence]] to be monitored by the native Geofencing API.
     *
     * @example
     * ```javascript
     * let geofences = [{
     *   identifier: 'foo',
     *   radius: 200,
     *   latitude: 45.51921926,
     *   longitude: -73.61678581,
     *   notifyOnEntry: true
     * },
     *   identifier: 'bar',
     *   radius: 200,
     *   latitude: 45.51921926,
     *   longitude: -73.61678581,
     *   notifyOnEntry: true
     * }];
     *
     * BackgroundGeolocation.addGeofences(geofences);
     * ```
     *
     * ### ℹ️ Note:
     * - If a geofence(s) *already* exists with the configured [[Geofence.identifier]], the previous one(s) will be **deleted** before the new one is inserted.
     * - 📘[[Geofence]] Guide.
     * - [[addGeofence]]
     *
     */
    static addGeofences(
      geofences: Array<Geofence>,
      success?: Function,
      failure?: Function
    ): Promise<void>;

    /**
     * Removes a [[Geofence]] having the given [[Geofence.identifier]].
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.removeGeofence("Home").then((success) => {
     *   console.log('[removeGeofence] success');
     * }).catch((error) => {
     *   console.log('[removeGeofence] FAILURE: ', error);
     * });
     * ```
     *
     * ### ℹ️ See also:
     * - 📘 [[Geofence]] Guide.
     */
    static removeGeofence(
      identifier: string,
      success?: Function,
      failure?: Function
    ): Promise<void>;

    /**
     * Destroy all [[Geofence]].
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.removeGeofences();
     * ```
     *
     * ### ℹ️ See also:
     * - 📘 [[Geofence]] Guide.
     */
    static removeGeofences(
      success?: Function,
      failure?: Function
    ): Promise<void>;

    /**
     * Fetch a list of all [[Geofence]] in the SDK's database.  If there are no geofences being monitored, you'll receive an empty `Array`.
     *
     * @example
     * ```javascript
     * let geofences = await BackgroundGeolocation.getGeofences();
     * console.log('[getGeofences: ', geofences);
     * ```
     * ### ℹ️ See also:
     * - 📘 [[Geofence]] Guide.
     */
    static getGeofences(
      success?: (geofences: Array<Geofence>) => void,
      failure?: (error: string) => void
    ): Promise<Array<Geofence>>;

    /**
     * Sets the [[logLevel]].
     */
    static setLogLevel(
      value: LogLevel,
      success?: (state: State) => void,
      failure?: Function
    ): Promise<State>;

    /**
     * Returns the entire contents of the log database.
     * @break
     *
     * Depending on the configured [[logLevel]], the plugin can store an *immense* amount of helpful logging information for debugging location-tracking
     * problems.
     *
     * ### ℹ️ See also:
     * - [[logMaxDays]] (default `3` days)
     * - [[logLevel]]   (default [[LOG_LEVEL_OFF]])
     * - [[emailLog]]
     * - 📘[Debugging Guide](github:wiki/Debugging)
     * log data:
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.getLog.then((log) => {
     *   // Warning:  this string could be several megabytes.
     *   console.log('[log] success: ', log);
     * });
     * ```
     * ```
     * 09-19 11:12:18.716 ╔═════════════════════════════════════════════
     * 09-19 11:12:18.716 ║ BackgroundGeolocation Service started
     * 09-19 11:12:18.716 ╠═════════════════════════════════════════════
     * 09-19 11:12:18.723 [c.t.l.BackgroundGeolocationService d]
     * 09-19 11:12:18.723   ✅  Started in foreground
     * 09-19 11:12:18.737 [c.t.l.ActivityRecognitionService a]
     * 09-19 11:12:18.737   🎾  Start activity updates: 10000
     * 09-19 11:12:18.761 [c.t.l.BackgroundGeolocationService k]
     * 09-19 11:12:18.761   🔴  Stop heartbeat
     * 09-19 11:12:18.768 [c.t.l.BackgroundGeolocationService a]
     * 09-19 11:12:18.768   🎾  Start heartbeat (60)
     * 09-19 11:12:18.778 [c.t.l.BackgroundGeolocationService a]
     * 09-19 11:12:18.778   🔵  setPace: null → false
     * 09-19 11:12:18.781 [c.t.l.adapter.TSConfig c] ℹ️   Persist config
     * 09-19 11:12:18.794 [c.t.locationmanager.util.b a]
     * 09-19 11:12:18.794   ℹ️  LocationAuthorization: Permission granted
     * 09-19 11:12:18.842 [c.t.l.http.HttpService flush]
     * 09-19 11:12:18.842 ╔═════════════════════════════════════════════
     * 09-19 11:12:18.842 ║ HTTP Service
     * 09-19 11:12:18.842 ╠═════════════════════════════════════════════
     * 09-19 11:12:19.000 [c.t.l.BackgroundGeolocationService onActivityRecognitionResult] still (100%)
     * 09-19 11:12:21.314 [c.t.l.l.SingleLocationRequest$2 onLocationResult]
     * 09-19 11:12:21.314 ╔═════════════════════════════════════════════
     * 09-19 11:12:21.314 ║ SingleLocationRequest: 1
     * 09-19 11:12:21.314 ╠═════════════════════════════════════════════
     * 09-19 11:12:21.314 ╟─ 📍  Location[fused 45.519239,-73.617058 hAcc=15]999923706055 vAcc=2 sAcc=??? bAcc=???
     * 09-19 11:12:21.327 [c.t.l.l.TSLocationManager onSingleLocationResult]
     * 09-19 11:12:21.327   🔵  Acquired motionchange position, isMoving: false
     * 09-19 11:12:21.342 [c.t.l.l.TSLocationManager a] 15.243
     * 09-19 11:12:21.405 [c.t.locationmanager.data.a.c persist]
     * 09-19 11:12:21.405   ✅  INSERT: bca5acc8-e358-4d8f-827f-b8c0d556b7bb
     * 09-19 11:12:21.423 [c.t.l.http.HttpService flush]
     * 09-19 11:12:21.423 ╔═════════════════════════════════════════════
     * 09-19 11:12:21.423 ║ HTTP Service
     * 09-19 11:12:21.423 ╠═════════════════════════════════════════════
     * 09-19 11:12:21.446 [c.t.locationmanager.data.a.c first]
     * 09-19 11:12:21.446   ✅  Locked 1 records
     * 09-19 11:12:21.454 [c.t.l.http.HttpService a]
     * 09-19 11:12:21.454   🔵  HTTP POST: bca5acc8-e358-4d8f-827f-b8c0d556b7bb
     * 09-19 11:12:22.083 [c.t.l.http.HttpService$a onResponse]
     * 09-19 11:12:22.083   🔵  Response: 200
     * 09-19 11:12:22.100 [c.t.locationmanager.data.a.c destroy]
     * 09-19 11:12:22.100   ✅  DESTROY: bca5acc8-e358-4d8f-827f-b8c0d556b7bb
     * 09-19 11:12:55.226 [c.t.l.BackgroundGeolocationService onActivityRecognitionResult] still (100%)
     *```
     */
    static getLog(
      success?: (log: string) => void,
      failure?: (error: string) => void
    ): Promise<string>;

    /**
     * Email the result of [[getLog]] using device's mail client.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.emailLog('foo@bar.com').then((success) => {
     *   console.log('[emailLog] success');
     * }).catch((error) => {
     *   console.log('[emailLog] FAILURE: ', error);
     * });
     * ```
     * ### ℹ️ See also:
     * - [[logLevel]]
     * - [[getLog]]
     * - 📘[Debugging Guide](github:wiki/Debugging).
     */
    static emailLog(
      email: string,
      success?: Function,
      failure?: (error: string) => void
    ): Promise<void>;

    /**
     * Destroy the entire contents of plugin's log database.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.destroyLog();
     * ```
     * ### ℹ️ See also:
     * - [[logLevel]]
     * - [[getLog]]
     * - [[emailLog]]
     * - 📘[Debugging Guide](github:wiki/Debugging)
     */
    static destroyLog(success?: Function, failure?: Function): Promise<void>;

    /**
     * Fetches the state of the operating-system's "Power Saving" mode.
     * @break
     *
     * Power Saving mode can throttle certain services in the background, such as HTTP requests or GPS.
     *
     *  ℹ️ You can listen to changes in the state of "Power Saving" mode from the event [[onPowerSaveChange]].
     *
     * ### iOS
     *
     * iOS Power Saving mode can be engaged manually by the user in **Settings -> Battery** or from an automatic OS dialog.
     *
     * ![](https://dl.dropboxusercontent.com/s/lz3zl2jg4nzstg3/Screenshot%202017-09-19%2010.34.21.png?dl=1)
     *
     * ### Android
     *
     * Android Power Saving mode can be engaged manually by the user in **Settings -> Battery -> Battery Saver** or automatically with a user-specified
     * "threshold" (eg: 15%).
     *
     * ![](https://dl.dropboxusercontent.com/s/raz8lagrqayowia/Screenshot%202017-09-19%2010.33.49.png?dl=1)
     *
     * @example
     * ```javascript
     * let isPowerSaveMode = await BackgroundGeolocation.isPowerSaveMode;
     * ```
     */
    static isPowerSaveMode(
      success?: (enabled: boolean) => void,
      failure?: Function
    ): Promise<boolean>;

    /**
     * Returns the presence of device sensors *accelerometer*, *gyroscope*, *magnetometer*
     * @break
     *
     * These core [[Sensors]] are used by the motion activity-recognition system -- when any of these sensors are missing from a device (particularly on cheap
     * Android devices), the performance of the motion activity-recognition system will be **severely** degraded and highly inaccurate.
     *
     * For devices which *are* missing any of these sensors, you can increase the motion-detection sensitivity by decreasing
     * [[minimumActivityRecognitionConfidence]].
     *
     * @example
     * ```javascript
     * let sensors = await BackgroundGeolocation.sensors;
     * console.log(sensors);
     * ```
     */
    static getSensors(
      success?: (sensors: Sensors) => void,
      failure?: Function
    ): Promise<Sensors>;

    /**
     * Retrieves the current state of location-provider authorization.
     *
     * ### ℹ️ See also:
     * - You can also *listen* for changes in location-authorization using the event [[onProviderChange]].
     *
     * @example
     * ```javascript
     * let providerState = await BackgroundGeolocation.getProviderState();
     * console.log('- Provider state: ', providerState);
     * ```
     */
    static getProviderState(
      success?: (state: ProviderChangeEvent) => void,
      failure?: Function
    ): Promise<ProviderChangeEvent>;

    /**
     * Initiates a location permission dialog with the user.
     *
     * If the user has already provided authorization for location-services, your `success` callback will be executed immediately.
     *
     * ### ⚠️ Note:
     * - The SDK will **already request permission** from the user when you execute [[start]], [[startGeofences]], [[getCurrentPosition]], etc.  You **do not need to explicitly execute this method** with typical use-cases.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.requestPermission().then((status) => {
     *   console.log('[requestPermission] SUCCESS');
     * }).catch((status) => {
     *   console.log('[requestPermission] REJECTED', status);
     * });
     * ```
     */
    static requestPermission(
      success?: (status: AuthorizationStatus) => void,
      failure?: (status: AuthorizationStatus) => void
    ): Promise<AuthorizationStatus>;
    /**
     *
     */
    static playSound(
      soundId: any,
      success?: Function,
      failure?: Function
    ): Promise<void>;

    /**
     *
     */
    static logger: Logger;

    /**
     * Convenience method to compose a [[params]] Object suitable for posting to the **Transistor Software Test Server** at http://tracker.transistorsoft.com.  You must provide a reference to **`Device`** instance.
     *
     * #### Cordova
     * - Provide an instance of `cordova-plugin-device` (Ionic: `@ionic-native/device`).
     *
     * #### React Native
     * - Provide an instance of `react-native-device-info`
     *
     * The test server is a great way to debug location problems, since the results can easily be shared with *Transistor Software* when requesting support.
     *
     * ![](https://dl.dropboxusercontent.com/s/3abuyyhioyypk8c/screenshot-tracker-transistorsoft.png?dl=1)
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   url: 'http://tracker.transistorsoft.com/locations/my-username',
     *   params: BackgroundGeolocation.transistorTrackerParams(device)
     * })
     * ```
     * ### ⚠️ Note:
     * - To *view* your tracking results in the browser, the url is just __`/YOUR-USERNAME`__ &mdash; not `/locations/YOUR-USERNAME`
     */
    static transistorTrackerParams(device: Object): Object;
  }

  //----------------------------------------------------------------------------
  //-------------------------------- Interfaces --------------------------------
  //----------------------------------------------------------------------------

  //---------------------
  //------ Config -------
  //---------------------

  /**
  * ## 🔧 Configuration API.
  *
  * The following configuration options are used to configure the SDK via the methods [[BackgroundGeolocation.ready]] and [[BackgroundGeolocation.setConfig]].
  *
  * @example
  * ```javascript
  * BackgroundGeolocation.ready({
  *   desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
  *   distanceFilter: 10,
  *   stopOnTerminate: false,
  *   startOnBoot: true,
  *   url: 'http://my.server.com',
  *   params: {
  *     "user_id": 123
  *   },
  *   headers: {
  *     "my-auth-token":"secret-key"
  *   }
  * }).then((state) => {
  *   console.log('[ready] BackgroundGeolocation is configured and ready to use');
  *
  *   BackgroundGeolocation.start();
  * })
  *
  * // Or with #setConfig
  * BackgroundGeolocation.setConfig({
  *   extras: {route_id: 1234},
  *   url: 'https://my.new.server.com'
  * })
  * ```
  *
  ## Geolocation Options
  ### [Geolocation] Common Options
  | Option      | Type      | Note                              |
  |-------------|-----------|-----------------------------------|
  | [[desiredAccuracy]] | [[LocationAccuracy]] | __Default: [[BackgroundGeolocation.DESIRED_ACCURACY_HIGH]]__. Specify the desired-accuracy of the geolocation system.  |
  | [[distanceFilter]] | `Integer` | __Default: `10`__.  The minimum distance (measured in meters) a device must move horizontally before an update event is generated. |
  | [[disableElasticity]] | `Boolean` | __Default: `false`__.  Set true to disable automatic speed-based [[distanceFilter]] elasticity. eg: When device is moving at highway speeds, locations are returned at ~ 1 / km. |
  | [[elasticityMultiplier]] | `Float` | __Default: `1`__.  Controls the scale of automatic speed-based `distanceFilter` elasticity.  Increasing `elasticityMultiplier` will result in few location samples as speed increases. |
  | [[stopAfterElapsedMinutes]] | `Integer`  | __Default: `0`__.  The plugin can optionally automatically stop tracking after some number of minutes elapses after the [[BackgroundGeolocation.start]] method was called. |
  | [[stopOnStationary]] | `Boolean`  | __Default: `false`__.  The plugin can optionally automatically stop tracking when the `stopTimeout` timer elapses. |
  | [[desiredOdometerAccuracy]] | `Integer`  | __Default: `100`__.  Location accuracy threshold in **meters** for odometer calculations. |
  | [[useSignificantChangesOnly]] | `Boolean` | __Default: `false`__.  Defaults to `false`.  Set `true` in order to disable constant background-tracking.  A location will be recorded only several times / hour. |
  | [[disableLocationAuthorizationAlert]] | `Boolean` | __Default: `false`__.  Disables automatic authorization alert when plugin detects the user has disabled location authorization.  You will be responsible for handling disabled location authorization by listening to the `providerchange` event.|
  ### [Geolocation] iOS Options
  | Option      | Type      | Note                              |
  |-------------|-----------|-----------------------------------|
  | [[stationaryRadius]] | `Integer`  | __Default: `25`__.  When stopped, the minimum distance the device must move beyond the stationary location for aggressive background-tracking to engage. |
  | [[locationAuthorizationRequest]] | [[LocationAuthorizationRequest]] | __Default: `Always`__.  The desired iOS location-authorization request, either `Always`, `WhenInUse` or `Any`. |
  | [[locationAuthorizationAlert]] | `Object` | When you configure the plugin [[locationAuthorizationRequest]] `Always` or `WhenInUse` and the user *changes* that value in the app's location-services settings or *disables* location-services, the plugin will display an Alert directing the user to the **Settings** screen. |
  ### [Geolocation] Android Options
  | Option      | Type      | Note                              |
  |-------------|-----------|-----------------------------------|
  | [[locationUpdateInterval]] | `Integer` | __Default: `1000`__.  With [[distanceFilter]]: 0, Sets the desired interval for location updates, in milliseconds.  ⚠️ This setting will be ignored when **`distanceFilter > 0`** |
  | [[fastestLocationUpdateInterval]] | `Integer` | __Default: `10000`__.  Explicitly set the fastest interval for location updates, in milliseconds. |
  | [[deferTime]] | `Integer` | __Default: `0`__.  Sets the maximum wait time in milliseconds for location updates to be delivered to your callback, when they will all be delivered in a batch.|
  | [[allowIdenticalLocations]] | `Boolean` | __Default: `false`__.  The Android plugin will ignore a received location when it is identical to the last location.  Set `true` to override this behaviour and record every location, regardless if it is identical to the last location.|
  ## Activity Recognition Options
  ### [Activity Recognition] Common Options
  | Option      | Type      | Note                              |
  |-------------|-----------|-----------------------------------|
  | [[stopTimeout]] | `Integer` | __Default: `5`__.  The number of **minutes** to wait before turning off location-services after the ActivityRecognition System (ARS) detects the device is `STILL` |
  | [[stopDetectionDelay]] | `Integer` | __Default: `0`__.  Number of **minutes** to delay the stop-detection system from being activated.|
  | [[disableStopDetection]] | `Boolean` | __Default: `false`__.  Disable accelerometer-based **Stop-detection System**. ⚠️ Not recommended|
  ### [Activity Recognition] iOS Options
  | Option      | Type      | Note                              |
  |-------------|-----------|-----------------------------------|
  | [[activityType]] | [[ActivityType]] |  __Default: [[BackgroundGeolocation.ACTIVITY_TYPE_OTHER]]__.  Presumably, this affects ios GPS algorithm.  See [Apple docs](https://developer.apple.com/library/ios/documentation/CoreLocation/Reference/CLLocationManager_Class/CLLocationManager/CLLocationManager.html#//apple_ref/occ/instp/CLLocationManager/activityType) for more information |
  | [[disableMotionActivityUpdates]] | `Boolean` | __Default: `false`__.  Disable iOS motion-activity updates (eg: "walking", "in_vehicle").  This feature requires a device having the **M7** co-processor (ie: iPhone 5s and up). ⚠️ The plugin is **HIGHLY** optimized to use this for improved battery performance.  You are **STRONLY** recommended to **NOT** disable this. |
  ## HTTP & Persistence Options
  - 📘 HTTP Guide: [[HttpEvent]].
  | Option      | Type      | Note                              |
  |-------------|-----------|-----------------------------------|
  | [[url]] | `String` | __Default: `undefined`__.  Your server url where you wish to HTTP POST locations to |
  | [[httpTimeout]] | `Integer` | __Default: `60000`__.  HTTP request timeout in milliseconds. |
  | [[params]] | `Object` | __Default: `undefined`__.  Optional HTTP params sent along in HTTP request to above [[url]] |
  | [[extras]] | `Object` | __Default: `undefined`__.  Optional meta-data to attach to *each* recorded location |
  | [[headers]] | `Object` | __Default: `undefined`__.  Optional HTTP headers sent along in HTTP request to above [[url]] |
  | [[method]] | `String` | __Default: `POST`__.  The HTTP method.  Defaults to `POST`.  Some servers require `PUT`.|
  | [[httpRootProperty]] | `String` | __Default: `location`__.  The root property of the JSON data where location-data will be appended. |
  | [[locationTemplate]] | `String` | __Default: `undefined`__.  Optional custom location data schema (eg: `{ "lat:<%= latitude %>, "lng":<%= longitude %> }`|
  | [[geofenceTemplate]] | `String` | __Default: `undefined`__.  Optional custom geofence data schema (eg: `{ "lat:<%= latitude %>, "lng":<%= longitude %>, "geofence":"<%= geofence.identifier %>:<%= geofence.action %>" }`|
  | [[autoSync]] | `Boolean` | __Default: `true`__.  If you've enabled HTTP feature by configuring an [[url]], the plugin will attempt to upload each location to your server **as it is recorded**.|
  | [[autoSyncThreshold]] | `Integer` | __Default: `0`__.  The minimum number of persisted records to trigger an [[autoSync]] action. |
  | [[batchSync]] | `Boolean` | __Default: `false`__.  If you've enabled HTTP feature by configuring an [[url]], [[batchSync]]: true will POST all the locations currently stored in native SQLite datbase to your server in a single HTTP POST request.|
  | [[maxBatchSize]] | `Integer` | __Default: `-1`__.  If you've enabled HTTP feature by configuring an [[url]] and [[batchSync]]: true, this parameter will limit the number of records attached to each batch.|
  | [[maxDaysToPersist]] | `Integer` |  __Default: `1`__.  Maximum number of days to store a geolocation in plugin's SQLite database.|
  | [[maxRecordsToPersist]] | `Integer` |  __Default: `-1`__.  Maximum number of records to persist in plugin's SQLite database.  Defaults to `-1` (no limit).  To disable persisting locations, set this to `0`|
  | [[locationsOrderDirection]] | `String` |  __Default: `ASC`__.  Controls the order that locations are selected from the database (and synced to your server).  Defaults to ascending (`ASC`), where oldest locations are synced first.  Descending (`DESC`) syncs latest locations first.|
  ## Application Options
  ### [Application] Common Options
  | Option      | Type      | Note                              |
  |-------------|-----------|-----------------------------------|
  | [[stopOnTerminate]] | `Boolean` |  __Default: `true`__.  Set `false` to continue tracking after user terminates the app. |
  | [[startOnBoot]] | `Boolean` | __Default: `false`__.  Set to `true` to enable background-tracking after the device reboots. |
  | [[heartbeatInterval]] | `Integer` | __Default: `60`__.  Rate in **seconds** to fire [[BackgroundGeolocation.onHeartbeat]] events. |
  | [[schedule]] | `Array` | __Default: `undefined`__.  Defines a schedule to automatically start/stop tracking at configured times |
  ### [Application] iOS Options
  | Option      | Type      | Note                              |
  |-------------|-----------|-----------------------------------|
  | [[preventSuspend]] | `Boolean` | __Default: `false`__.  Enable this to prevent **iOS** from suspending your app in the background while in the **stationary state**.  Must be used in conjunction with a [[heartbeatInterval]].|
  ### [Application] Android Options
  | Option      | Type      | Note                               |
  |-------------|-----------|------------------------------------|
  | [[foregroundService]] | `Boolean` | __Default: `false`__.  Set `true` to make the plugin *mostly* immune to OS termination due to memory pressure from other apps. |
  | [[enableHeadless]] | `Boolean` | __Default: `false`__.  Set to `true` to enable "Headless" mode when the user terminates the application.  In this mode, you can respond to all the plugin's events in the native Android environment.  For more information, see the wiki for [Android Headless Mode](github:wiki/Android-Headless-Mode) |
  | [[notification]]  | [[Notification]] | Configures the required persistent [[Notification]] of the foreground service. |
  | [[forceReloadOnMotionChange]] | `Boolean` | __Default: `false`__.  Launch your app whenever the [[BackgroundGeolocation.onMotionChange]] event fires. |
  | [[forceReloadOnLocationChange]] | `Boolean` | __Default: `false`__.  Launch your app whenever the [[BackgroundGeolocation.onLocation]] event fires. |
  | [[forceReloadOnGeofence]] | `Boolean` | __Default: `false`__.  Launch your app whenever the [[BackgroundGeolocation.onGeofence]] event fires. |
  | [[forceReloadOnHeartbeat]] | `Boolean` | __Default: `false`__.  Launch your app whenever the [[BackgroundGeolocation.onHeartbeat]] event fires. |
  | [[forceReloadOnSchedule]] | `Boolean` | __Default: `false`__.  Launch your app whenever a [[BackgroundGeolocation.onSchedule]] event fires. |
  | [[forceReloadOnBoot]] | `Boolean` | __Default: `false`__.  If the user reboots the device with the plugin configured for [[startOnBoot]]: true, your app will launch when the device is rebooted. |
  ## Geofencing Options
  - 📘 [[Geofence]] Guide.
  | Option      | Type      | Note                              |
  |-------------|-----------|-----------------------------------|
  | [[geofenceProximityRadius]] | `Integer`  | __Default: `1000`__.  Radius in **meters** to query for geofences within proximity. |
  | [[geofenceInitialTriggerEntry]] | `Boolean` | __Default: `true`__.  Set `false` to disable triggering a geofence immediately if device is already inside it.|
  ### [Geofencing] Android Options
  | Option      | Type      | Note                              |
  |-------------|-----------|-----------------------------------|
  | [[geofenceModeHighAccuracy]] | `Boolean`  | __Default: `false`__.  Runs [[startGeofences]] with a *foreground service* (along with its corresponding persitent [[Notification]]).  This will make geofence triggering **far more consistent** at the expense of higher power usage. |
  ## Logging & Debug Options
  - [Logging & Debugging Guide](github:wiki/Debugging)
  | Option      | Type      | Note                              |
  |-------------|-----------|-----------------------------------|
  | [[debug]] | `Boolean` | __Default: `false`__.  When enabled, the plugin will emit sounds & notifications for life-cycle events of background-geolocation |
  | [[logLevel]] | `Integer` | __Default: `LOG_LEVEL_VERBOSE`__.  Sets the verbosity of the plugin's logs from `LOG_LEVEL_OFF` to `LOG_LEVEL_VERBOSE` |
  | [[logMaxDays]] | `Integer` | __Default: `3`__.  Maximum days to persist a log-entry in database. |
  *
  */
  declare export interface Config {
    /**
     * Specify the desired-accuracy of the geolocation system.
     *
     * The following constants are defined upon the [[BackgroundGeolocation]] class:
     *
     * | Name                                                  | Location Providers                   | Description                     |
     * |-------------------------------------------------------|--------------------------------------|---------------------------------|
     * | [[BackgroundGeolocation.DESIRED_ACCURACY_NAVIGATION]] | (**iOS only**) GPS + Wifi + Cellular | Highest power; highest accuracy |
     * | [[BackgroundGeolocation.DESIRED_ACCURACY_HIGH]]       | GPS + Wifi + Cellular                | Highest power; highest accuracy |
     * | [[BackgroundGeolocation.DESIRED_ACCURACY_MEDIUM]]     | Wifi + Cellular                      | Medium power; Medium accuracy;  |
     * | [[BackgroundGeolocation.DESIRED_ACCURACY_LOW]]        | Wifi (low power) + Cellular          | Lower power; No GPS             |
     * | [[BackgroundGeolocation.DESIRED_ACCURACY_VERY_LOW]]   | Cellular only                        | Lowest power; lowest accuracy   |
     * | [[BackgroundGeolocation.DESIRED_ACCURACY_LOWEST]]     | (**iOS only**)                       | Lowest power; lowest accuracy   |
     *
     * ### ⚠️ Note:
     * -  Only **`DESIRED_ACCURACY_HIGH`** uses GPS.  `speed`, `heading` and `altitude` are available only from GPS.
     *
     * @example
     * ```typescript
     * BackgroundGeoloction.ready({
     *   desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH
     * });
     *```
     * For platform-specific information about location accuracy, see the corresponding API docs:
     * - [Android](https://developer.android.com/reference/com/google/android/gms/location/LocationRequest.html#PRIORITY_BALANCED_POWER_ACCURACY)
     * - [iOS](https://developer.apple.com/reference/corelocation/cllocationmanager/1423836-desiredaccuracy?language=objc)
     */
    desiredAccuracy?: LocationAccuracy;

    /**
     * The minimum distance (measured in meters) a device must move horizontally before an update event is generated.
     *
     * However, by default, **`distanceFilter`** is elastically auto-calculated by the plugin:  When speed increases, **`distanceFilter`** increases;  when speed decreases, so too does **`distanceFilter`**.
     * @break
     *
     * ### ℹ️ Note:
     * - To disable this behavior, configure [[disableElasticity]] __`true`__.
     * - To control the scale of the automatic `distanceFilter` calculation, see [[elasticityMultiplier]]
     *
     * `distanceFilter` is auto-scaled by rounding speed to the nearest `5 m/s` and adding `distanceFilter` meters for each `5 m/s` increment.
     *
     * For example, at biking speed of 7.7 m/s with a configured `distanceFilter: 30`:
     * @example
     * ```
     *   rounded_speed = round(7.7, 5)
     *   => 10
     *   multiplier = rounded_speed / 5
     *   => 10 / 5 = 2
     *   adjusted_distance_filter = multiplier * distanceFilter
     *   => 2 * 30 = 60 meters
     * ```
     *
     * At highway speed of `27 m/s` with a configured `distanceFilter: 50`:
     * @example
     * ```
     *   rounded_speed = round(27, 5)
     *   => 30
     *   multiplier = rounded_speed / 5
     *   => 30 / 5 = 6
     *   adjusted_distance_filter = multiplier * distanceFilter * elasticityMultipiler
     *   => 6 * 50 = 300 meters
     * ```
     *
     * Note the following real example of "elasticity" on highway 101 towards San Francisco as the driver slows down while running into
     * slower traffic &mdash; locations become compressed as [[distanceFilter]] decreases.
     *
     * ![distanceFilter at highway speed](https://dl.dropboxusercontent.com/s/uu0hs0sediw26ar/distance-filter-highway.png?dl=1)
     *
     * Compare now background-geolocation in the scope of a city.  In this image, the left-hand track is from a cab-ride, while the right-hand
     * track is walking speed.
     *
     * ![distanceFilter at city scale](https://dl.dropboxusercontent.com/s/yx8uv2zsimlogsp/distance-filter-city.png?dl=1)
     */
    distanceFilter?: number;

    /**
     * __`[iOS only]`__ The minimum distance the device must move beyond the stationary location for aggressive background-tracking to engage.
     *
     * ### ⚠️ Note: iOS will not detect the exact moment the device moves out of the stationary-radius.  In normal conditions, it will typically
     * take **~200 meters** of movement before the plugin begins tracking.
     * @break
     *
     * Configuring **`stationaryRadius: 0`** has **NO EFFECT**.  In fact the plugin enforces a minimum **`stationaryRadius`** of `25` and
     * in-practice, the native API won't respond for at least 200 meters.
     *
     * The following image shows the typical distance iOS requires to detect exit of the **`stationaryRadius`**:
     * - *Green polylines*: represent a transition from **stationary** state to **moving** (__~200 meters__).
     * - *Red circles*: locations where the plugin entered the **stationary** state.
     *
     * ![](https://dl.dropboxusercontent.com/s/vnio90swhs6xmqm/screenshot-ios-stationary-exit.png?dl=1)
     *
     * ### ℹ️ See also:
     * - 📘 [Philosophy of Operation](github:wiki/Philosophy-of-Operation)
     *
     */
    stationaryRadius?: number;

    /**
     * Disable automatic, speed-based [[distanceFilter]] scaling.
     *
     * Defaults to **`false`**.  Set **`true`** to disable automatic, speed-based [[distanceFilter]] elasticity.
     */
    locationTimeout?: number;

    /**
     * Defaults to **`false`**.  Set **`true`** to disable automatic, speed-based [[distanceFilter]] auto-scaling.  By default, the SDK automatically
     * increases [[distanceFilter]] as speed increases (and decreases it as speed *decreases*) in order to record fewer locations and conserve energy.
     * @break
     *
     * Note the following real example of "elasticity" on highway 101 towards San Francisco as the driver slows down while running into slower
     * traffic &mdash; locations become compressed as [[distanceFilter]] decreases.
     *
     * ![distanceFilter at highway speed](https://dl.dropboxusercontent.com/s/uu0hs0sediw26ar/distance-filter-highway.png?dl=1)
     *
     * ### ℹ️ See also:
     * - [[elasticityMultiplier]]
     * - [[distanceFilter]]
     */
    disableElasticity?: boolean;

    /**
     * Controls the scale of automatic speed-based [[distanceFilter]] elasticity.
     *
     * Increasing `elasticityMultiplier` will result in fewer location samples as speed increases.  A value of `0` has the same effect as
     * [[disableElasticity]] __`true`__.
     */
    elasticityMultiplier?: number;

    /**
     * Automatically [[stop]] tracking after *x* minutes.
     *
     * The plugin can optionally automatically [[stop]] after some number of minutes elapses after the [[start]] method was called.
     *
     * @example
     * ```typescript
     * BackgroundGeolocation.ready({
     *   stopAfterElapsedMinutes: 30
     * }).then((state) => {
     *   BackgroundGeolocation.start();  // <-- plugin will automatically #stop in 30 minutes
     * });
     * ```
     */
    stopAfterElapsedMinutes?: number;

    /**
     * The radius around current location to query for geofences to activate monitoring upon.
     *
     * The default and *minimum* is `1000` meters.  See related event [[BackgroundGeolocation.onGeofencesChange]].  When using Geofences, the
     * plugin activates only those in proximity (the maximum geofences allowed to be simultaneously monitored is limited by the platform,
     * where **iOS** allows only 20 and **Android**.  However, the plugin allows you to create as many geofences as you wish (thousands even).
     * It stores these in its database and uses spatial queries to determine which **20** or **100** geofences to activate.
     *
     * @break
     *
     * ### ℹ️ See also:
     * - 📘 [[Geofence]] Guide.
     * - [View animation of this behavior](https://www.transistorsoft.com/shop/products/assets/images/background-geolocation-infinite-geofencing.gif)
     *
     * ![](https://dl.dropboxusercontent.com/s/7sggka4vcbrokwt/geofenceProximityRadius_iphone6_spacegrey_portrait.png?dl=1)
     */
    geofenceProximityRadius?: number;

    /**
     * When a device is already within a just-created geofence, fire the **enter** transition immediately.
     *
     * Defaults to `true`.  Set `false` to disable triggering a geofence immediately if device is already inside it.
     * @break
     *
     * ### ℹ️ See also:
     * - 📘 [[Geofence]] Guide.
     */
    geofenceInitialTriggerEntry?: boolean;

    /**
     * __`[Android only]`__ Enable high-accuracy for **geofence-only** mode (See [[BackgroundGeolocation.startGeofences]]).
     *
     * ### ⚠️ Warning: Will consume more power.
     * Defaults to `false`.  Runs Android's [[BackgroundGeolocation.startGeofences]] with a *foreground service* (along with its corresponding persistent [[Notification]].
     *
     * Configuring `geofenceModeHighAccuracy: true` will make Android geofence triggering **far more responsive**.  In this mode, the usual config options to control location-services will be applied:
     *
     * - [[desiredAccuracy]] ([[BackgroundGeolocation.DESIRED_ACCURACY_MEDIUM]] works well).
     * - [[locationUpdateInterval]]
     * - [[distanceFilter]]
     * - [[deferTime]]
     *
     * With the default `geofenceModeHighAccuracy: false`, a device will have to move farther *into* a geofence before the *ENTER* event fires and farther *out of* a geofence before
     * the *EXIT* event fires.
     *
     * The more aggressive you configure the location-update params above (at the cost of power consumption), the more responsive will be your geofence-triggering.
     *
     * @example
     * ```typescript
     * BackgroundGeolocation.ready({
     *   geofenceModeHighAccuracy: true,
     *   desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_MEDIUM,
     *   locationUpdateInterval: 5000,
     *   distanceFilter: 50
     * }).then((state) => {
     *   BackgroundGeolocation.startGeofences();
     * });
     * ```
     *
     * @example **`geofenceModeHighAccuracy: false`** (Default) &mdash; Transition events **are delayed**.
     * ![](https://dl.dropboxusercontent.com/s/6nxbuersjcdqa8b/geofenceModeHighAccuracy-false.png?dl=1)
     *
     * @example **`geofenceModeHighAccuracy: true`** &mdash; Transition events are **nearly instantaneous**.
     * ![](https://dl.dropbox.com/s/w53hqn7f7n1ug1o/geofenceModeHighAccuracy-true.png?dl=1)
     *
     *
     */
    geofenceModeHighAccuracy?: boolean;

    /**
     * The maximum location accuracy allowed for a location to be used for [[Location.odometer]] calculations.
     *
     * Defaults to `100`.  If a location arrives having **`accuracy > desiredOdometerAccuracy`**, that location will not be used to update the
     * odometer.  If you only want to calculate odometer from GPS locations, you could set **`desiredOdometerAccuracy: 10`**.
     * This will prevent odometer updates when a device is moving around indoors, in a shopping mall, for example.
     */
    desiredOdometerAccuracy?: number;

    /**
     * Configure the initial tracking-state after [[BackgroundGeolocation.start]] is called.
     *
     * The plugin will immediately enter the tracking-state, by-passing the *stationary* state.  If the device is not currently moving, the stop-detection
     * system *will* still engage.  After [[stopTimeout]] minutes without movement, the plugin will enter the *stationary* state, as usual.
     *
     * @example
     * ```typescript
     * let state = await BackgroundGeolocation.ready({
     *   isMoving: true
     * });
     *
     * if (!state.enabled) {
     *   BackgroundGeolocation.start();
     * }
     * // Location-services are now on and the plugin is recording a location
     * // each [[distanceFilter]] meters.
     * ```
     */
    isMoving?: boolean;

    /**
     * Minutes to wait in *moving* state with no movement before considering the device *stationary*.
     *
     * @break
     *
     * Defaults to `5` minutes.  When in the *moving* state, specifies the number of minutes to wait before turning off location-services and
     * transitioning to *stationary* state after the ActivityRecognition System detects the device is `STILL`.  An example use-case for this
     * configuration is to delay GPS OFF while in a car waiting at a traffic light.
     *
     * ### ⚠️ Setting a value > 15 min is **not** recommended, particularly for Android.
     *
     * ### ℹ️ See also:
     * - [[onMotionChange]]
     * - 📘 [Philosophy of Operation](github:wiki/Philosophy-of-Operation)
     */
    stopTimeout?: number;

    /**
     * @deprecated No longer used.
     */
    activityRecognitionInterval?: number;

    /**
     * @deprecated No longer used.
     */
    minimumActivityRecognitionConfidence?: number;

    /**
     * Disable motion-activity related stop-detection.
     * @break
     *
     * ### iOS
     *
     * Disables the accelerometer-based **Stop-detection System**.  When disabled, the plugin will use the default iOS behavior of automatically
     * turning off location-services when the device has stopped for **exactly 15 minutes**.  When disabled, you will no longer have control over [[stopTimeout]].
     *
     * To *completely* disable automatically turning off iOS location-services, you must also provide [[pausesLocationUpdatesAutomatically]] __`false`__.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   disableStopDetection: true,
     *   pausesLocationUpdatesAutomatically: false
     * });
     * ```
     *
     * ### ⚠️ iOS location-services will **never** turn off!
     *
     * With the above configuration, iOS location-services will never turn off and you could **quickly discharge the battery**.  Do **not** do
     * this unless you know *exactly* what you're doing (eg: A jogging app with `[Start workout]` / `[Stop Workout]` buttons
     * executing [[BackgroundGeolocation.changePace]]).
     *
     * ### iOS Stop-detection timing
     *
     * ![](https://dl.dropboxusercontent.com/s/ojjdfkmua15pskh/ios-stop-detection-timing.png?dl=1)
     *
     * ### Android
     *
     * Location-services **will never turn OFF** if you set this to **`true`**!  It will be purely up to you or the user to execute
     * [[BackgroundGeolocation.changePace]] __`false`__ or [[BackgroundGeolocation.stop]] to turn off location-services.
     */
    disableStopDetection?: boolean;

    /**
     * Automatically [[BackgroundGeolocation.stop]] when the [[stopTimeout]] elapses.
     * @break
     *
     * The plugin can optionally automatically stop tracking when the [[stopTimeout]] timer elapses.  For example, when the plugin
     * first fires [[BackgroundGeolocation.onMotionChange]] into the *moving* state, the next time an *onMotionChange* event occurs
     * into the *stationary* state, the plugin will have automatically called [[BackgroundGeolocation.stop]] upon itself.
     *
     * ⚠️ `stopOnStationary` will **only** occur due to [[stopTimeout]] timer elapse.  It will **not** occur by manually executing
     * [[BackgroundGeolocation.changePace]] __`false`__.
     *
     * @example
     * ```typescript
     * BackgroundGeolocation.ready({
     *   stopOnStationary: true,
     *   isMoving: true
     * }, (state) => {
     *   BackgroundGeolocation.start();
     * });
     * ```
     */
    stopOnStationary?: boolean;

    /**
     * Your server `url` where you wish the SDK to automatically upload location data.
     *
     * @example
     * ```typescript
     * BackgroundGeolocation.ready({
     *   url: 'https://my-server.com/locations'
     * });
     * ```
     *
     * You can observe the plugin performing HTTP requests in the logs for both iOS and Android (_See Wiki [Debugging](github:wiki/Debugging)_):
     *
     * @example
     * ```
     * ╔═════════════════════════════════════════════
     * ║ LocationService: location
     * ╠═════════════════════════════════════════════
     * ╟─ 📍 Location[45.519199,-73.617054]
     * ✅ INSERT: 70727f8b-df7d-48d0-acbd-15f10cacdf33
     * ╔═════════════════════════════════════════════
     * ║ HTTP Service
     * ╠═════════════════════════════════════════════
     * ✅ Locked 1 records
     * 🔵 HTTP POST: 70727f8b-df7d-48d0-acbd-15f10cacdf33
     * 🔵 Response: 200
     * ✅ DESTROY: 70727f8b-df7d-48d0-acbd-15f10cacdf33
     * ```
     *
     * |#| Log entry               | Description                                                           |
     * |-|-------------------------|-----------------------------------------------------------------------|
     * |1| `📍Location`            | Location received from native Location API.                           |
     * |2| `✅INSERT`              | Location record inserted into SDK's SQLite database.                  |
     * |3| `✅Locked`              | SDK's HTTP service locks a record (to prevent duplicate HTTP uploads).|
     * |4| `🔵HTTP POST`           | SDK's HTTP service attempts an HTTP request to your configured `url`. |
     * |5| `🔵Response`            | Response from your server.                                            |
     * |6| `✅DESTROY\|UNLOCK`     | After your server returns a __`20x`__ response, the SDK deletes that record from it SQLite database.  Otherwise, the SDK will __`UNLOCK`__ that record and try again in the future. |
     *
     * ### HTTP Failures
     *
     * If your server does *not* return a `20x` response (eg: `200`, `201`, `204`), the SDK will __`UNLOCK`__ that record.  Another attempt to
     * upload once again in the future until [[maxDaysToPersist]]:
     * - When another location is recorded.
     * - Application `pause` / `resume` events.
     * - Application boot.
     * - [[onHeartbeat]] events.
     * - [[onConnectivityChange]] events.
     * - __[iOS]__ Background `fetch` events.
     *
     * ### ⚠️ Note:
     * It is highly recommended to let the plugin manage uploading locations to your server, **particularly for Android** when configured
     * with **`stopOnTerminate: false`**, since `MainActivity` (where your application code lives) *will* terminate &mdash; only the plugin's
     * native Android background service will continue to operate, recording locations and uploading to your server.  The SDK's native HTTP
     * service *is* better at this task, since the SDK will automatically __retry on server failure__.
     *
     * ### ℹ️ See also:
     *
     * - 📘 HTTP Guide: [[HttpEvent]].
     * - 📘 [Philosophy of Operation](github:wiki/Philosophy-of-Operation)
     *
     */
    url?: string;

    /**
     * The HTTP method to use when creating an HTTP request to your configured [[url]].
     *
     * Defaults to `POST`.  Valid values are `POST`, `PUT` and `OPTIONS`.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   url: 'http://my-server.com/locations',
     *   method: 'PUT'
     * });
     * ```
     *
     * ### ℹ️ See also:
     * - 📘 See HTTP Guide: [[HttpEvent]]
     *
     */
    method?: HttpMethod;

    /**
     * The root property of the JSON schema where location-data will be attached.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   httpRootProperty: "myData",
     *   url: "https://my.server.com"
     * });
     *
     * ```
     *
     * ```json
     * {
     *     "myData":{
     *         "coords": {
     *             "latitude":23.232323,
     *             "longitude":37.373737
     *         }
     *     }
     * }
     * ```
     *
     * You may also specify the character **`httpRootProperty:"."`** to place your data in the *root* of the JSON:
     *
     * @example
     * ```json
     * {
     *     "coords": {
     *         "latitude":23.232323,
     *         "longitude":37.373737
     *     }
     * }
     * ```
     *
     * ### ℹ️ See also:
     * - [[locationTemplate]]
     * - [[geofenceTemplate]]
     * - 📘 HTTP Guide: [[HttpEvent]].
     *
     */
    httpRootProperty?: string;

    /**
     * Optional HTTP **`params`** appended to the JSON body of each HTTP request.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   url: 'https://my-server.com/locations',
     *   params: {
     *     'user_id': 1234,
     *     'device_id': 'abc123'
     *   }
     * );
     * ```
     *
     * Observing the HTTP request arriving at your server:
     * @example
     * ```javascript
     * POST /locations
     *  {
     *   "location": {
     *     "coords": {
     *       "latitude": 45.51927004945047,
     *       "longitude": -73.61650072045029
     *       .
     *       .
     *       .
     *     }
     *   },
     *   "user_id": 1234,  // <-- params appended to the data.
     *   "device_id": 'abc123'
     * }
     * ```
     *
     * ### ℹ️ See also:
     * - [[headers]]
     * - [[extras]]
     * - 📘 See HTTP Guide: [[HttpEvent]]
     */
    params?: Object;

    /**
     * Optional HTTP headers applied to each HTTP request.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   url: 'https://my.server.com',
     *   headers: {
     *     'authorization': "Bearer <a secret key>",
     *     'X-FOO": "BAR'
     *   }
     * });
     * ```
     *
     * Observing incoming requests at your server:
     *
     * ```
     * POST /locations
     * {
     *   "host": "tracker.transistorsoft.com",
     *   "content-type": "application/json",
     *   "content-length": "456"
     *   .
     *   .
     *   .
     *   "authorization": "Bearer <a secret key>",
     *   "X-FOO": "BAR"
     * }
     * ```
     *
     * ### ℹ️ Note:
     * - The plugin automatically applies a number of required headers, including `"content-type": "application/json"`
     */
    headers?: Object;

    /**
     * Optional arbitrary key/values `{}` applied to each recorded location.
     *
     * 📘 See HTTP Guide: [[HttpEvent]]
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   url: 'https://my-server.com/locations',
     *   extras: {
     *     'route_id': 1234
     *   },
     *   params: {
     *     'device_id': 'abc123'
     *   }
     * });
     * ```
     *
     * Observing incoming requests at your server:
     *
     * @example
     * ```javascript
     * - POST /locations
     * {
     *   "device_id": "abc123" // <-- params appended to root of JSON
     *   "location": {
     *     "coords": {
     *       "latitude": 45.51927004945047,
     *       "longitude": -73.61650072045029,
     *       .
     *       .
     *       .
     *     },
     *     "extras": {  // <-- extras appended to *each* location
     *       "route_id": 1234
     *     }
     *   }
     * }
     * ```
     */
    extras?: Object;

    /**
     * Immediately upload each recorded location to your configured [[url]].
     * @break
     *
     * Default is `true`.  If you've enabled HTTP feature by configuring an [[url]], the plugin will attempt to HTTP POST each location to your
     * server **as soon as it is recorded**.  If you set [[autoSync]] __`false`__, it's up to you to **manually** execute the
     * [[BackgroundGeolocation.sync]] method to initiate the HTTP POST &mdash; the SDK will continue to persist **every** recorded location in the
     * SQLite database until you execute [[BackgroundGeolocation.sync]].
     *
     * @example
     * ```typescript
     * BackgroundGeolocation.ready({
     *   url: 'http://my.server.com/locations',
     *   autoSync: true,
     *   params: {
     *     user_id: 1234
     *   }
     * })
     * ```
     * ----------------------------------------------------------------------
     * ### ⚠️ Warning:  [[autoSyncThreshold]]
     *
     * If you've configured [[autoSyncThreshold]], it **will be ignored** during a `onMotionChange` event &mdash; all queued locations will be uploaded, since:
     * - If an `onMotionChange` event fires **into the *moving* state**, the device may have been sitting dormant for a long period of time.  The plugin is *eager* to upload this state-change to the server as soon as possible.
     * - If an `onMotionChange` event fires **into the *stationary* state**, the device may be *about to* lie dormant for a long period of time.  The plugin is *eager* to upload all queued locations to the server before going dormant.
     * ----------------------------------------------------------------------
     *
     * ### ℹ️ See also:
     * - [[autoSyncThreshold]]
     * - [[batchSync]]
     * - [[maxBatchSize]]
     */
    autoSync?: boolean;

    /**
     * The minimum number of persisted records the plugin must accumulate before triggering an [[autoSync]] action.
     * @break
     *
     * Defaults to `0` (no threshold).  If you configure a value greater-than **`0`**, the plugin will wait until that many locations are
     * recorded before executing HTTP requests to your server through your configured [[url]].
     *
     * ℹ️ Configuring [[autoSyncThreshold]] in conjunction with [[batchSync]] __`true`__ **can conserve battery** by reducing the number of HTTP
     * requests, since HTTP requests consume *far* more energy / second than GPS.
     *
     * @example
     * ```typescript
     * BackgroundGeolocation.ready({
     *   url: 'http://my.server.com/locations',
     *   autoSync: true,
     *   autoSyncThreshold: 5,
     *   batchSync: true
     * })
     * ```
     *
     * ```
     *              1  2  3  4  5    1  2  3  4  5
     * Locations: __|__|__|__|__|____|__|__|__|__|___...
     *
     *                         POST             POST
     *   Network: ______________|________________|___...
     * ```
     * ----------------------------------------------------------------------
     * ### ⚠️ Warning
     *
     * `autoSyncThreshold` **will be ignored** during a [[BackgroundGeolocation.onMotionChange]] event &mdash; all queued locations will be uploaded, since:
     * - If an `onMotionChange` event fires **into the *moving* state**, the device may have been sitting dormant for a long period of time.  The plugin is *eager* to upload this state-change to the server as soon as possible.
     * - If an `onMotionChange` event fires **into the *stationary* state**, the device may be *about to* lie dormant for a long period of time.  The plugin is *eager* to upload all queued locations to the server before going dormant.
     * ----------------------------------------------------------------------
     *
     */
    autoSyncThreshold?: number;

    /**
     * POST multiple locations to your [[url]] in a single HTTP request.
     *
     * Default is **`false`**.  If you've enabled HTTP feature by configuring an [[url]], [[batchSync]] __`true`__ will POST *all* the locations
     * currently stored in native SQLite database to your server in a single HTTP POST request.  With [[batchSync]] __`false`__, an HTTP POST
     * request will be initiated for **each** location in database.
     *
     * #### __`batchSync: true`__ &mdash; All accumulated locations POSTed in 1 HTTP request.
     * @example
     * ```typescript
     * // Using batchSync: true
     * BackgroundGeolocation.ready({
     *   url: 'http://my.server.com/locations',
     *   autoSync: true,
     *   autoSyncThreshold: 5,
     *   batchSync: true
     * })
     * ```
     *
     * ```
     *              1  2  3  4  5    1  2  3  4  5
     * Locations: __|__|__|__|__|____|__|__|__|__|___...
     *
     *                         POST            POST
     *   Network: ______________|________________|___...
     * ```
     *
     * #### __`batchSync: false`__ &mdash; 1 POST per location
     * @example
     * ```typescript
     * // With batchSync: false
     * BackgroundGeolocation.ready({
     *   url: 'http://my.server.com/locations',
     *   autoSync: true,
     *   autoSyncThreshold: 5,
     *   batchSync: false
     * })
     * ```
     *
     * ```
     *              1  2  3  4  5    1  2  3  4  5
     * Locations: __|__|__|__|__|____|__|__|__|__|___...
     *
     *                          POST             POST
     *   Network: ______________|||||____________|||||___...
     * ```
     * ### ℹ️ See also:
     * - [[maxBatchSize]]
     * - [[autoSync]]
     * - [[autoSyncThreshold]]
     * 📘 See HTTP Guide: [[HttpEvent]]
     */
    batchSync?: boolean;

    /**
     * Controls the number of records attached to **each** batch HTTP request.
     * @break
     *
     * Defaults to `-1` (no maximum).  If you've enabled HTTP feature by configuring an [[url]] with [[batchSync]] __`true`__, this parameter
     * will limit the number of records attached to **each** batch request.  If the current number of records exceeds the **[[maxBatchSize]]**,
     * multiple HTTP requests will be generated until the location queue is empty.
     *
     * The plugin can potentially accumulate mega-bytes worth of location-data if operating in a disconnected environment for long periods.
     * You will not want to [[batchSync]] __`true`__ a large amount of data in a single HTTP request.
     *
     * ### ℹ️ See also:
     * - [[batchSync]]
     * 📘 See HTTP Guide: [[HttpEvent]]
     */
    maxBatchSize?: number;

    /**
     * Optional custom template for rendering [[Location]] JSON request data in HTTP requests.
     * @break
     *
     * The [[locationTemplate]] will be evaluated for variables using Ruby `erb`-style tags:
     *
     * ```bash
     * <%= variable_name %>
     * ```
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   locationTemplate: '{"lat":<%= latitude %>,"lng":<%= longitude %>,"event":"<%= event %>",isMoving:<%= isMoving %>}'
     * });
     *
     * // Or use a compact [Array] template!
     * BackgroundGeolocation.ready({
     *   locationTemplate: '[<%=latitude%>, <%=longitude%>, "<%=event%>", <%=is_moving%>]'
     * ))
     * ```
     *
     * ### ⚠️  quoting `String` data.
     *
     * The plugin does not automatically apply double-quotes around `String` data.  The plugin will attempt to JSON encode your template exactly
     * as you're configured.
     *
     * The following will generate an error:
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   locationTemplate: '{"timestamp": <%= timestamp %>}'
     * });
     * ```
     *
     * Since the template-tag `timestamp` renders a string, the rendered String will look like this, generating a JSON error:
     *
     * @example
     * ```json
     * {"timestamp": 2018-01-01T12:01:01.123Z}
     * ```
     *
     * The correct `locationTemplate` is:
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   locationTemplate: '{"timestamp": "<%= timestamp %>"}'
     * });
     * ```
     *
     * @example
     * ```json
     * {"timestamp": "2018-01-01T12:01:01.123Z"}
     * ```
     *
     * ### Configured [[extras]]:
     *
     * If you've configured [[extras]], these key-value pairs will be merged *directly* onto your location data.  For example:
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   httpRootProperty: 'data',
     *   locationTemplate: '{"lat":<%= latitude %>,"lng":<%= longitude %>}',
     *   extras: {
     *     "foo": "bar"
     *   }
     * )
     * ```
     *
     * Will result in JSON:
     * @example
     * ```json
     * {
     *     "data": {
     *         "lat":23.23232323,
     *         "lng":37.37373737,
     *         "foo":"bar"
     *     }
     * }
     * ```
     *
     * ### Template Tags
     *
     * | Tag                   | Type     | Description |
     * |-----------------------|----------|-------------|
     * | `latitude`            | `Float`  |             |
     * | `longitude`           | `Float`  |             |
     * | `speed`               | `Float`  | Meters      |
     * | `heading`             | `Float`  | Degrees     |
     * | `accuracy`            | `Float`  | Meters      |
     * | `altitude`            | `Float`  | Meters      |
     * | `altitude_accuracy`   | `Float`  | Meters      |
     * | `timestamp`           | `String` |ISO-8601     |
     * | `uuid`                | `String` |Unique ID    |
     * | `event`               | `String` |`motionchange,geofence,heartbeat,providerchange` |
     * | `odometer`            | `Float`  | Meters      |
     * | `activity.type`       | `String` | `still,on_foot,running,on_bicycle,in_vehicle,unknown`|
     * | `activity.confidence` | `Integer`| 0-100%      |
     * | `battery.level`       | `Float`  | 0-100%      |
     * | `battery.is_charging` | `Boolean`| Is device plugged in?|
     *
     * ### ℹ️ See also:
     * - 📘 HTTP Guide: [[HttpEvent]].
     * - [[geofenceTemplate]]
     * - [[httpRootProperty]]
     */
    locationTemplate?: string;

    /**
     * Optional custom template for rendering [[GeofenceEvent]] JSON request data in HTTP requests.
     * @break
     *
     * The `geofenceTemplate` is similar to [[locationTemplate]] with the addition of two extra `geofence.*` tags.
     *
     * The `geofenceTemplate` will be evaluated for variables using Ruby `erb`-style tags:
     *
     * ```bash
     * <%= variable_name %>
     * ```
     * ### ℹ️ See also:
     * - [[locationTemplate]]
     * - [[httpRootProperty]]
     * - 📘 HTTP Guide: [[HttpEvent]].
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   geofenceTemplate: '{ "lat":<%= latitude %>, "lng":<%= longitude %>, "geofence":"<%= geofence.identifier %>:<%= geofence.action %>" }'
     * });
     *
     * // Or use a compact [Array] template!
     * BackgroundGeolocation.{(
     *   geofenceTemplate: '[<%= latitude %>, <%= longitude %>, "<%= geofence.identifier %>", "<%= geofence.action %>"]'
     * )
     * ```
     *
     * ### ⚠️  quoting `String` data.
     *
     * The plugin does not automatically apply double-quotes around `String` data.  The plugin will attempt to JSON encode your template exactly
     * as you're configured.
     *
     * The following will generate an error:
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   locationTemplate: '{"timestamp": <%= timestamp %>}'
     * });
     * ```
     *
     * Since the template-tag `timestamp` renders a string, the rendered String will look like this, generating a JSON error:
     * @example
     * ```json
     * {"timestamp": 2018-01-01T12:01:01.123Z}
     * ```
     *
     * The correct `geofenceTemplate` is:
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   geofenceTemplate: '{"timestamp": "<%= timestamp %>"}'
     * });
     * ```
     *
     * @example
     *
     * ```json
     * {"timestamp": "2018-01-01T12:01:01.123Z"}
     * ```
     *
     * ### Template Tags
     *
     * The tag-list is identical to [[locationTemplate]] with the addition of `geofence.identifier` and `geofence.action`.
     *
     * | Tag                   | Type     | Description |
     * |-----------------------|----------|-------------|
     * | **`geofence.identifier`** | `String` | Which geofence?|
     * | **`geofence.action`** | `String` | `ENTER/EXIT`|
     * | `latitude`            | `Float`  |             |
     * | `longitude`           | `Float`  |             |
     * | `speed`               | `Float`  | Meters      |
     * | `heading`             | `Float`  | Degrees     |
     * | `accuracy`            | `Float`  | Meters      |
     * | `altitude`            | `Float`  | Meters      |
     * | `altitude_accuracy`   | `Float`  | Meters      |
     * | `timestamp`           | `String` |ISO-8601     |
     * | `uuid`                | `String` |Unique ID    |
     * | `event`               | `String` |`motionchange,geofence,heartbeat,providerchange` |
     * | `odometer`            | `Float`  | Meters      |
     * | `activity.type`       | `String` | `still,on_foot,running,on_bicycle,in_vehicle,unknown`|
     * | `activity.confidence` | `Integer`| 0-100%      |
     * | `battery.level`       | `Float`  | 0-100%      |
     * | `battery.is_charging` | `Boolean`| Is device plugged in?|
     */
    geofenceTemplate?: string;

    /**
     * Maximum number of days to store a geolocation in plugin's SQLite database.
     * @break
     *
     * When your server fails to respond with **`HTTP 200 OK`**, the plugin will continue periodically attempting to upload to your server server
     * until **[[maxDaysToPersist]]** when it will give up and remove the location from the database.
     */
    maxDaysToPersist?: number;

    /**
     * Maximum number of records to persist in plugin's SQLite database.
     *
     * Default `-1` means **no limit**.
     *
     * ### ℹ️ See also:
     * - 📘 See HTTP Guide: [[HttpEvent]]
     */
    maxRecordsToPersist?: number;

    /**
     * Allows you to specify which events to persist to the SDK's internal database:  locations | geofences | all (default).
     *
     * Note that all recorded location and geofence events will *always* be provided to your [BackgroundGeolocation.onLocation] and [BackgroundGeolocation.onGeofence] events, just that the
     * persistence of those events in the SDK's internal SQLite database can be limited.  Any event which has not been persisted to the SDK's internal database
     * will also **not** therefore be uploaded to your [url] (if configured).
     *
     * | Name                                 | Description                                             |
     * |--------------------------------------|---------------------------------------------------------|
     * | [[BackgroundGeolocation.PERSIST_MODE_ALL]]                   | (__DEFAULT__) Persist both geofence and location events |
     * | [[BackgroundGeolocation.PERSIST_MODE_LOCATION]]              | Persist only location events (ignore geofence events)   |
     * | [[BackgroundGeolocation.PERSIST_MODE_GEOFENCE]]              | Persist only geofence events (ignore location events)   |
     * | [[BackgroundGeolocation.PERSIST_MODE_NONE]]                  | Persist nothing (neither geofence nor location events)  |
     *
     * ### ⚠️ Warning
     * This option is designed for specializd use-cases and should generally not be used.  For example, some might wish to
     * run the plugin in regular tracking mode with [[BackgroundGeolocation.start]] but only record geofence events.  In this case,
     * one would configure `persistMode: BackgroundGeolocation.PERSIST_MODE_GEOFENCE`.
     */
    persistMode?: PersistMode;
    /**
     * Controls the order that locations are selected from the database (and uploaded to your server).
     *
     * Defaults to ascending (`ASC`), where oldest locations are synced first.  Descending (`DESC`) uploads latest locations first.
     *
     * ### ℹ️ See also:
     * - 📘 See HTTP Guide: [[HttpEvent]]
     */
    locationsOrderDirection?: string;

    /**
     * HTTP request timeout in **milliseconds**.
     *
     * HTTP request timeouts will fire the [[BackgroundGeolocation.onHttp]].  Defaults to `60000 ms`.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.onHttp((response) => {
     *   let success = response.success;
     *   if (!success) {
     *     console.log('[onHttp] FAILURE: ', response);
     *   }
     * });
     *
     * BackgroundGeolocation.ready({
     *   url: 'https://my-server.com/locations',
     *   httpTimeout: 3000
     * );
     * ```
     *
     * ### ℹ️ See also:
     * - 📘 See HTTP Guide: [[HttpEvent]]
     */
    httpTimeout?: number;

    /**
     * Controls whether to continue location-tracking after application is **terminated**.
     * @break
     *
     * Defaults to **`true`**.  When the user terminates the app, the plugin will [[BackgroundGeolocation.stop]] tracking.  Set this to **`false`**
     * to continue tracking after application terminate.
     *
     * If you *do* configure **`stopOnTerminate: false`**, your application **will** terminate at that time.  However, both Android and iOS differ
     * in their behavior *after* this point:
     *
     * ### iOS
     *
     * Before an iOS app terminates, the plugin will ensure that a **stationary geofence** of [[stationaryRadius]] meters is created around the last
     * known position.  When the user moves beyond the stationary geofence (typically ~200 meters), iOS will __completely reboot your application in the background__, and the plugin will resume tracking.  iOS maintains geofence monitoring at the OS level, in spite of application terminate / device reboot.
     *
     * In the following image, imagine the user terminated the application at the **"red circle"** on the right, then continued moving:  Once the
     * device moves __by about 200 meters__, exiting the "stationary geofence", iOS reboots the app and tracking resumes.
     *
     * ℹ️ [Demo Video of `stopOnTerminate: false`](https://www.youtube.com/watch?v=aR6r8qV1TI8&t=214s)
     *
     * ![](https://dl.dropboxusercontent.com/s/1uip231l3gds68z/screenshot-stopOnTerminate-ios.png?dl=0)
     *
     * ### Android
     *
     * Unlike iOS, the Android plugin's tracking will **not** pause at all when user terminates the app.  However, only the plugin's native background
     * service continues to operate, **"headless"** (in this case, you should configure an [[url]] in order for the background-service to continue
     * uploading locations to your server).
     *
     * ### ℹ️ See also:
     * - [Android Headless Mode](github:wiki/Android-Headless-Mode)
     * - [[enableHeadless]]
     */
    stopOnTerminate?: boolean;

    /**
     * Controls whether to resume location-tracking after device is **rebooted**.
     *
     * Defaults to **`false`**.  Set **`true`** to engage background-tracking after the device reboots.
     * @break
     *
     * ### iOS
     *
     * iOS cannot **immediately** engage tracking after a device reboot.  Just like [[stopOnTerminate]] __`false`__, iOS will not re-boot your
     * app until the device moves beyond the **stationary geofence** around the last known location.  In addition, iOS subscribes to
     * "background-fetch" events, which typically fire about every 15 minutes &mdash; these too are capable of rebooting your app after a device
     * reboot.
     *
     * ### Android
     *
     * Android will reboot the plugin's background-service *immediately* after device reboot.  However, just like [[stopOnTerminate]] __`false`__,
     * the plugin will be running "headless" without your Application code.  If you wish for your Application to boot as well, you may
     * configure any of the following **`forceReloadOnXXX`** options:
     *
     * - [[forceReloadOnLocationChange]]
     * - [[forceReloadOnMotionChange]]
     * - [[forceReloadOnGeofence]]
     * - [[forceReloadOnBoot]]
     * - [[forceReloadOnHeartbeat]]
     *
     * ### ℹ️ See also:
     * - [[enableHeadless]]
     */
    startOnBoot?: boolean;

    /**
     * Controls the rate (in seconds) the [[BackgroundGeolocation.onHeartbeat]] event will fire.
     * @break
     *
     * ### ⚠️ Warning:
     * - On **iOS** the **[[BackgroundGeolocation.onHeartbeat]]** event will fire only when configured with [[preventSuspend]] __`true`__.
     * - Android *minimum* interval is `60` seconds.  It is **impossible** to have a [[heartbeatInterval]] faster than this on Android.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   heartbeatInterval: 60
     * });
     *
     * BackgroundGeolocation.onHeartbeat((event) => {
     *   console.log('[onHeartbeat] ', event);
     *
     *   // You could request a new location if you wish.
     *   BackgroundGeolocation.getCurrentPosition({
     *     samples: 1,
     *     persist: true
     *   }).then((location) => {
     *     console.log('[getCurrentPosition] ', location);
     *   });
     * });
     * ```
     *
     * ### ℹ️ See also:
     * - [[BackgroundGeolocation.onHeartbeat]]
     *
     */
    heartbeatInterval?: number;

    /**
     * Configures an automated, cron-like schedule for the plugin to [[start]] / [[stop]] tracking at pre-defined times.
     *
     * @example
     * ```javascript
     *   "{DAY(s)} {START_TIME}-{END_TIME}"
     * ```
     *
     * - The `START_TIME`, `END_TIME` are in **24h format**.
     * - The `DAY` param corresponds to the `Locale.US`, such that **Sunday=1**; **Saturday=7**).
     * - You may configure a single day (eg: `1`), a comma-separated list-of-days (eg: `2,4,6`) or a range (eg: `2-6`)
     *
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   .
     *   .
     *   .
     *   schedule: [
     *     '1 17:30-21:00',    // Sunday: 5:30pm-9:00pm
     *     '2-6 9:00-17:00',   // Mon-Fri: 9:00am to 5:00pm
     *     '2,4,6 20:00-00:00',// Mon, Web, Fri: 8pm to midnight (next day)
     *     '7 10:00-19:00'     // Sat: 10am-7pm
     *   ]
     * }).then((state) => {
     *   // Start the Scheduler
     *   BackgroundGeolocation.startSchedule();
     * });
     *
     * // Listen to #onSchedule events:
     * BackgroundGeolocation.onSchedule((state) => {
     *   let enabled = state.enabled;
     *   console.log('[onSchedule] - enabled? ', enabled);
     * });
     * .
     * .
     * .
     * // Later when you want to stop the Scheduler (eg: user logout)
     * BackgroundGeolocation.stopSchedule();
     * // You must explicitly stop tracking if currently enabled
     * BackgroundGeolocation.stop();
     *
     * // Or modify the schedule with usual #setConfig method
     * BackgroundGeolocation.setConfig({
     *   schedule: [
     *     '1-7 9:00-10:00',
     *     '1-7 11:00-12:00',
     *     '1-7 13:00-14:00',
     *     '1-7 15:00-16:00',
     *     '1-7 17:00-18:00',
     *     '2,4,6 19:00-22:00'
     *   ]
     * });
     * ```
     *
     * ### Literal Dates
     *
     * The schedule can also be configured with a literal start date of the form:
     * @example
     *
     * ```
     *   "yyyy-mm-dd HH:mm-HH:mm"
     * ```
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   schedule: [
     *     "2018-01-01 09:00-17:00"
     *   ]
     * });
     * ```
     *
     * Or **two** literal dates to specify both a start **and** stop date:
     * @example
     *
     * ```
     *   "yyyy-mm-dd-HH:mm yyyy-mm-dd-HH:mm"
     * ```
     *
     * @example
     * ```javascript
     *
     * schedule: [
     *     "2018-01-01-09:00 2019-01-01-17:00"  // <-- track for 1 year
     *   ]
     * ```
     *
     * ## Scheduling Geofences-only or Location + Geofences Tracking
     *
     * You can choose to schedule either geofences-only ([[BackgroundGeolocation.startGeofences]]) or location + geofences ([[BackgroundGeolocation.start]]) tracking with each configured schedule by appending the text `geofence` or `location` (default):
     *
     * In the following schedule, the SDK will engage *location + geofences* tracking between 9am to 5pm.  From 6pm to midnight, only *geofences* will be monitored.
     *
     * ```javascript
     * schedule: [
     *   "1-7 09:00-17:00 location",
     *   "1-7 18:00-12:00 geofence"
     * ]
     * ```
     *
     * Since `location` is the default tracking-mode, it can be omitted:
     *
     * ```javascript
     * schedule: [
     *   "1-7 09:00-10:00",  // <-- location is default
     *   "1-7 10:00-11:00 geofence"
     *   "1-7 12:00-13:00",
     *   "1-7 13:00-14:00 geofence"
     * ```
     *
     * ### iOS
     *
     * - iOS **cannot** evaluate the Schedule at the *exact* time you configure &mdash; it can only evaluate the **`schedule`** *periodically*, whenever your app comes alive.
     * - When the app is running in a scheduled **off** period, iOS will continue to monitor the low-power, [significant location changes API (SLC)](https://developer.apple.com/reference/corelocation/cllocationmanager/1423531-startmonitoringsignificantlocati?language=objc) in order to ensure periodic schedule evaluation.  **SLC** is required in order guarantee periodic schedule-evaluation when you're configured [[stopOnTerminate]] __`false`__, since the iOS Background Fetch API is halted if user *manually* terminates the app.  **SLC** will awaken your app whenever a "significant location change" occurs, typically every `1000` meters.  If the `schedule` is currently in an **off** period, this location will **not** be persisted nor will it be sent to the [[BackgroundGeolocation.onLocation]] event &mdash; only the **`schedule`** will be evaluated.
     * - When a **`schedule`** is provided on iOS, it will be evaluated in the following cases:
     *   - Application `pause` / `resume` events.
     *   - Whenever a location is recorded (including **SLC**)
     *   - Background fetch event
     *
     * ### Android
     *
     * The Android Scheduler uses [`AlarmManager`](https://developer.android.com/reference/android/app/AlarmManager#setExactAndAllowWhileIdle(int,%20long,%20android.app.PendingIntent)) and *typically* operates on-the-minute.
     *
     * ### ℹ️ See also:
     * - [[startSchedule]]
     * - [[stopSchedule]]
     */
    schedule?: Array<string>;

    /**
     * __Android only__ Force the Android scheduler to use `AlarmManager` (more precise) instead of `JobScheduler`.  Defaults to `false`.
     *
     * ```typescript
     * BackgroundGeolocation.ready(bg.Config(
     *   schedule: ['1-7 09:00-17:00'],
     *   scheduleUseAlarmManager: true
     * ));
     * ```
     */
    scheduleUseAlarmManager?: boolean;

    /**
     * Configure the plugin to emit sound effects and local-notifications during development.
     * @break
     *
     * Defaults to **`false`**.  When set to **`true`**, the plugin will emit debugging sounds and notifications for life-cycle events of [[BackgroundGeolocation]].
     *
     * ## iOS
     *
     * In you wish to hear debug sounds in the background, you must manually enable the background-mode:
     *
     * **`[x] Audio and Airplay`** background mode in *Background Capabilities* of XCode.
     *
     * ![](https://dl.dropboxusercontent.com/s/fl7exx3g8whot9f/enable-background-audio.png?dl=1)
     *
     * ## Event Debug Sound Effects
     *
     * | Event                      | iOS                     | Android                    |
     * |----------------------------|-------------------------|----------------------------|
     * | `LOCATION_RECORDED`        | <mediaplayer:https://dl.dropbox.com/s/yestzqdb6gzx7an/location-recorded.mp3?dl=0>        | <mediaplayer:https://dl.dropboxusercontent.com/s/d3e821scn5fppq6/tslocationmanager_ooooiii3_full_vol.wav?dl=0>      |
     * | `LOCATION_SAMPLE`          | <mediaplayer:https://dl.dropbox.com/s/7inowa0folzlal3/location-sample.mp3?dl=0>          | <mediaplayer:https://dl.dropbox.com/s/8bgiyifowyf9c7n/tslocationmanager_click_tap_done_checkbox5_full_vol.wav?dl=0> |
     * | `LOCATION_ERROR`           | <mediaplayer:https://dl.dropbox.com/s/lwmx6j2ddzke1c7/location-error.mp3?dl=0>           | <mediaplayer:https://dl.dropbox.com/s/wadrz2x6elhc65l/tslocationmanager_digi_warn.mp3?dl=0>                         |
     * | `LOCATION_SERVICES_ON`     | <mediaplayer:https://dl.dropbox.com/s/4cith8fg58bf5rh/location-services-on.mp3?dl=0>     | n/a                                                                                                                 |
     * | `LOCATION_SERVICES_OFF`    | <mediaplayer:https://dl.dropbox.com/s/vdntndpzl1ebeq2/location-services-off.mp3?dl=0>    | n/a                                                                                                                 |
     * | `STATIONARY_GEOFENCE_EXIT` | <mediaplayer:https://dl.dropbox.com/s/6voj31fmmoqhveb/motionchange-true.mp3?dl=0>        | <mediaplayer:https://dl.dropbox.com/s/gjgv51pot3h2n3t/tslocationmanager_zap_fast.mp3?dl=0>                          |
     * | `MOTIONCHANGE_FALSE`       | <mediaplayer:https://dl.dropbox.com/s/qjduicy3c9d4yfv/motionchange-false.mp3?dl=0>       | <mediaplayer:https://dl.dropbox.com/s/fm4j2t8nqzd5856/tslocationmanager_marimba_drop.mp3?dl=0>                      |
     * | `MOTIONCHANGE_TRUE`        | <mediaplayer:https://dl.dropbox.com/s/6voj31fmmoqhveb/motionchange-true.mp3?dl=0>        | <mediaplayer:https://dl.dropbox.com/s/n5mn6tr7x994ivg/tslocationmanager_chime_short_chord_up.mp3?dl=0>              |
     * | `STOP_DETECTION_DELAY_INITIATED` | <mediaplayer:https://dl.dropbox.com/s/34jf8sifr5nkyie/stopDetectionDelay.mp3?dl=0> | n/a                                                                                                                 |
     * | `STOP_TIMER_ON`            | <mediaplayer:https://dl.dropbox.com/s/s6dou5vv55glq5w/stop-timeout-start.mp3?dl=0>       | <mediaplayer:https://dl.dropbox.com/s/q4a9pf0vlztfafh/tslocationmanager_chime_bell_confirm.mp3?dl=0>                |
     * | `STOP_TIMER_OFF`           | <mediaplayer:https://dl.dropbox.com/s/c39phjw0vogg8lm/stop-timeout-cancel.mp3?dl=0>      | <mediaplayer:https://dl.dropbox.com/s/9o9v826was19lyi/tslocationmanager_bell_ding_pop.mp3?dl=0>                     |
     * | `HEARTBEAT`                | <mediaplayer:https://dl.dropbox.com/s/5rdc38isc8yf323/heartbeat.mp3?dl=0>                | <mediaplayer:https://dl.dropbox.com/s/bsdtw21hscqqy67/tslocationmanager_peep_note1.wav?dl=0>                        |
     * | `GEOFENCE_ENTER`           | <mediaplayer:https://dl.dropbox.com/s/i4hzh4rgmd1lo20/geofence-enter.mp3?dl=0>           | <mediaplayer:https://dl.dropbox.com/s/76up5ik215xwxh1/tslocationmanager_beep_trip_up_dry.mp3?dl=0>                  |
     * | `GEOFENCE_EXIT`            | <mediaplayer:https://dl.dropbox.com/s/nwonzl1ni15qv1k/geofence-exit.mp3?dl=0>            | <mediaplayer:https://dl.dropbox.com/s/xuyyagffheyk8r7/tslocationmanager_beep_trip_dry.mp3?dl=0>                     |
     * | `GEOFENCE_DWELL_START`     | <mediaplayer:https://dl.dropbox.com/s/djlpw2ejaioq0g2/geofence-dwell-start.mp3?dl=0>     | n/a                                                                                                                 |
     * | `GEOFENCE_DWELL_CANCEL`    | <mediaplayer:https://dl.dropbox.com/s/37xvre56gz3ro58/geofence-dwell-cancel.mp3?dl=0>    | n/a                                                                                                                 |
     * | `GEOFENCE_DWELL`           | `GEOFENCE_ENTER` after `GEOFENCE_DWELL_START`                                            | <mediaplayer:https://dl.dropbox.com/s/uw5vjuatm3wnuid/tslocationmanager_beep_trip_up_echo.mp3?dl=0>                 |
     * | `ERROR`                    | <mediaplayer:https://dl.dropbox.com/s/13c50fnepyiknnb/error.mp3?dl=0>                    | <mediaplayer:https://dl.dropbox.com/s/32e93c1t4kh69p1/tslocationmanager_music_timpani_error_01.mp3?dl=0>            |
     * | `WARNING`                  | n/a                                                                                      | <mediaplayer:https://dl.dropbox.com/s/wadrz2x6elhc65l/tslocationmanager_digi_warn.mp3?dl=0>                         |
     * | `BACKGROUND_FETCH`         | <mediaplayer:https://dl.dropbox.com/s/am91js76s0ehjo1/background-fetch.mp3?dl=0>         | n/a                                                                                                                 |
     *
     */
    debug?: boolean;

    /**
     * Controls the volume of recorded events in the plugin's logging database.
     *
     * [[BackgroundGeolocation]] contains powerful logging features.  By default, the plugin boots with a value of [[BackgroundGeolocation.LOG_LEVEL_OFF]],
     * storing [[logMaxDays]] (default `3`) days worth of logs in its SQLite database.
     *
     * The following log-levels are defined as **constants** on this [[BackgroundGeolocation]] class:
     *
     * | Label                                       |
     * |---------------------------------------------|
     * | [[BackgroundGeolocation.LOG_LEVEL_OFF]]     |
     * | [[BackgroundGeolocation.LOG_LEVEL_ERROR]]   |
     * | [[BackgroundGeolocation.LOG_LEVEL_WARNING]] |
     * | [[BackgroundGeolocation.LOG_LEVEL_INFO]]    |
     * | [[BackgroundGeolocation.LOG_LEVEL_DEBUG]]   |
     * | [[BackgroundGeolocation.LOG_LEVEL_VERBOSE]] |
     *
     * @break
     *
     * ### Example log data:
     *
     *```
     * 09-19 11:12:18.716 ╔═════════════════════════════════════════════
     * 09-19 11:12:18.716 ║ BackgroundGeolocation Service started
     * 09-19 11:12:18.716 ╠═════════════════════════════════════════════
     * 09-19 11:12:18.723 [c.t.l.BackgroundGeolocationService d]
     * 09-19 11:12:18.723   ✅  Started in foreground
     * 09-19 11:12:18.737 [c.t.l.ActivityRecognitionService a]
     * 09-19 11:12:18.737   🎾  Start activity updates: 10000
     * 09-19 11:12:18.761 [c.t.l.BackgroundGeolocationService k]
     * 09-19 11:12:18.761   🔴  Stop heartbeat
     * 09-19 11:12:18.768 [c.t.l.BackgroundGeolocationService a]
     * 09-19 11:12:18.768   🎾  Start heartbeat (60)
     * 09-19 11:12:18.778 [c.t.l.BackgroundGeolocationService a]
     * 09-19 11:12:18.778   🔵  setPace: null → false
     * 09-19 11:12:18.781 [c.t.l.adapter.TSConfig c] ℹ️   Persist config
     * 09-19 11:12:18.794 [c.t.locationmanager.util.b a]
     * 09-19 11:12:18.794   ℹ️  LocationAuthorization: Permission granted
     * 09-19 11:12:18.842 [c.t.l.http.HttpService flush]
     * 09-19 11:12:18.842 ╔═════════════════════════════════════════════
     * 09-19 11:12:18.842 ║ HTTP Service
     * 09-19 11:12:18.842 ╠═════════════════════════════════════════════
     * 09-19 11:12:19.000 [c.t.l.BackgroundGeolocationService onActivityRecognitionResult] still (100%)
     * 09-19 11:12:21.314 [c.t.l.l.SingleLocationRequest$2 onLocationResult]
     * 09-19 11:12:21.314 ╔═════════════════════════════════════════════
     * 09-19 11:12:21.314 ║ SingleLocationRequest: 1
     * 09-19 11:12:21.314 ╠═════════════════════════════════════════════
     * 09-19 11:12:21.314 ╟─ 📍  Location[fused 45.519239,-73.617058 hAcc=15]999923706055 vAcc=2 sAcc=??? bAcc=???
     * 09-19 11:12:21.327 [c.t.l.l.TSLocationManager onSingleLocationResult]
     * 09-19 11:12:21.327   🔵  Acquired motionchange position, isMoving: false
     * 09-19 11:12:21.342 [c.t.l.l.TSLocationManager a] 15.243
     * 09-19 11:12:21.405 [c.t.locationmanager.data.a.c persist]
     * 09-19 11:12:21.405   ✅  INSERT: bca5acc8-e358-4d8f-827f-b8c0d556b7bb
     * 09-19 11:12:21.423 [c.t.l.http.HttpService flush]
     * 09-19 11:12:21.423 ╔═════════════════════════════════════════════
     * 09-19 11:12:21.423 ║ HTTP Service
     * 09-19 11:12:21.423 ╠═════════════════════════════════════════════
     * 09-19 11:12:21.446 [c.t.locationmanager.data.a.c first]
     * 09-19 11:12:21.446   ✅  Locked 1 records
     * 09-19 11:12:21.454 [c.t.l.http.HttpService a]
     * 09-19 11:12:21.454   🔵  HTTP POST: bca5acc8-e358-4d8f-827f-b8c0d556b7bb
     * 09-19 11:12:22.083 [c.t.l.http.HttpService$a onResponse]
     * 09-19 11:12:22.083   🔵  Response: 200
     * 09-19 11:12:22.100 [c.t.locationmanager.data.a.c destroy]
     * 09-19 11:12:22.100   ✅  DESTROY: bca5acc8-e358-4d8f-827f-b8c0d556b7bb
     * 09-19 11:12:55.226 [c.t.l.BackgroundGeolocationService onActivityRecognitionResult] still (100%)
     *```
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE
     * });
     * ```
     *
     * ### ℹ️ See also:
     * - [[BackgroundGeolocation.getLog]]
     * - [[BackgroundGeolocation.emailLog]]
     * - [[logMaxDays]]
     * - [[destroyLog]]
     *
     * ### ⚠️ Warning:
     * - When submitting your app to production, take care to configure the **`logLevel`** appropriately (eg: **[[BackgroundGeolocation.LOG_LEVEL_ERROR]]**) since the logs can grow to several megabytes over a period of [[logMaxDays]].
     */
    logLevel?: LogLevel;

    /**
     * Maximum number of days to persist a log-entry in database.
     * @break
     *
     * Defaults to **`3`** days.
     *
     *  **See also:**
     * - [[logLevel]]
     */
    logMaxDays?: number;

    /**
     * Controls whether the plugin should first reset the configuration when `#ready` is executed before applying the supplied config `{}`.
     *
     * Defaults to `true`.  The SDK can optionally re-apply its persisted configuration with each boot of your application, ignoring the config `{}`
     * supplied to the `#ready` method.
     *
     * @break
     *
     * Optionally, you can specify **`reset: false`** to [[BackgroundGeolocation.ready]].
     *
     * @example
     * ```javascript
     * await BackgroundGeolocation.setConfig({
     *   distanceFilter: 100
     * });
     *
     * BackgroundGeolocation.ready({
     *   reset: false,  // <-- set false to ALWAYS re-apply persisted configuration, ignoring config provided to `#ready`
     *   distanceFilter: 50
     * }, (state) => {
     *   console.log('Ready with reset: false: ', state.distanceFilter);  // <-- 100, not 10
     * });
     * ```
     */
    reset?: boolean;

    /**
     * Set `true` in order to disable constant background-tracking.  Locations will be recorded only periodically.
     *
     * Defaults to `false`.  A location will be recorded only every `500` to `1000` meters (can be higher in non urban environments; depends upon the spacing of Cellular towers).  Many of the plugin's configuration parameters **will have no effect**, such as [[distanceFilter]], [[stationaryRadius]], [[activityType]], etc.
     *
     * Using `significantChangesOnly: true` will provide **significant** power-saving at the expense of fewer recorded locations.
     *
     * ### iOS
     *
     * Engages the iOS [Significant Location Changes API](https://developer.apple.com/reference/corelocation/cllocationmanager/1423531-startmonitoringsignificantlocati?language=objc) API for only periodic location updates every 500-1000 meters.
     * @break
     *
     * ⚠️ If Apple has rejected your application, refusing to grant your app the privilege of using the **`UIBackgroundMode: "location"`**, this can be a solution.
     *
     *
     * ### Android
     *
     * A location will be recorded several times per hour while the device is in the *moving* state.  No foreground-service will be run (nor its corresponding persistent [[Notification]]).
     *
     * @example **`useSignificantChanges: true`**
     * ![](https://dl.dropboxusercontent.com/s/wdl9e156myv5b34/useSignificantChangesOnly.png?dl=1)
     *
     * @example **`useSignificantChanges: false` (Default)**
     * ![](https://dl.dropboxusercontent.com/s/hcxby3sujqanv9q/useSignificantChangesOnly-false.png?dl=1)
     */
    useSignificantChangesOnly?: boolean;

    /**
     * __`[iOS only]`__ Configure iOS location API to *never* automatically turn off.
     * @break
     *
     * ### ⚠️ Warning:
     * - This option should generally be left `undefined`.  You should only specify this option if you know *exactly* what you're doing.
     *
     * The default behavior of the plugin is to turn **off** location-services *automatically* when the device is detected to be stationary for [[stopTimeout]] minutes.  When set to `false`, location-services will **never** be turned off (and [[disableStopDetection]] will automatically be set to `true`) &mdash; it's your responsibility to turn them off when you no longer need to track the device.  This feature should **not** generally be used.  [[preventSuspend]] will no longer work either.
     */
    pausesLocationUpdatesAutomatically?: boolean;

    /**
     * __`[iOS only]`__ Defines the *desired* iOS location-authorization request you *wish* for the user to authorize.
     * @break
     *
     * **`locationAuthorizationRequest`** tells the plugin the mode it *expects* to have been authorized with *by the user*.  If the user changes this mode in their settings, the plugin will detect this (See [[locationAuthorizationAlert]]).  Defaults to **`Always`**.  **`WhenInUse`** will display a **blue bar** at top-of-screen informing user that location-services are on.
     *
     * ![](https://dl.dropboxusercontent.com/s/88y3i4nkqq3o9ee/ios-location-authorization-dialog.png?dl=1)
     *
     * If you configure **`Any`**, the plugin allow the user to choose either `Always` or `WhenInUse`.   The plugin will **not** show the [[locationAuthorizationAlert]] dialog when the user changes the selection in `Privacy->Location Services`.
     *
     * ### ⚠️ Warning:
     * - Configuring **`WhenInUse`** will disable many of the plugin's features, since iOS forbids any API which operates in the background to operate (such as **geofences**, which the plugin relies upon to automatically engage background tracking).
     */
    locationAuthorizationRequest?: LocationAuthorizationRequest;

    /**
     * __`[iOS only]`__ Controls the text-elements of the plugin's location-authorization dialog.
     * @break
     *
     * When you configure the plugin [[locationAuthorizationRequest]] __`Always`__ or __`WhenInUse`__ and the user *changes* the mode in the app's location-services settings or disabled location-services, the plugin will display an Alert dialog directing the user to the **Settings** screen.  **`locationAuthorizationAlert`** allows you to configure all the Strings for that Alert popup and accepts an `{}` containing the following keys:
     *
     * ![](https://dl.dropboxusercontent.com/s/wyoaf16buwsw7ed/docs-locationAuthorizationAlert.jpg?dl=1)
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   locationAuthorizationAlert: {
     *     titleWhenNotEnabled: 'Yo, location-services not enabled',
     *     titleWhenOff: 'Yo, location-services OFF',
     *     instructions: 'You must enable "Always" in location-services, buddy',
     *     cancelButton: 'Cancel',
     *     settingsButton: 'Settings'
     *   }
     * })
     * ```
     *
     * ### ⚠️ Warning:
     * - If you choose to configure `locationAuthorizationAlert`, you must provide **ALL** the keys of [[LocationAuthorizationAlert]] keys &mdash; not just *some*.
     */
    locationAuthorizationAlert?: LocationAuthorizationAlert;

    /**
     * Disables automatic authorization alert when plugin detects the user has disabled location authorization.
     * @break
     *
     * You will be responsible for handling disabled location authorization by listening to the [[BackgroundGeolocation.onProviderChange]] event.
     *
     * By default, the plugin automatically shows a native alert to the user when location-services are disabled, directing them to the settings screen.  If you **do not** desire this automated behavior, set `disableLocationAuthorizationAlert: true`.
     *
     * ## iOS
     *
     * The iOS alert dialog text elements can be configured via [[locationAuthorizationAlert]] and [[locationAuthorizationRequest]].
     *
     * ## Android
     *
     * Android can detect when the user has configured the device's *Settings->Location* in a manner that does not match your location request (eg: [[desiredAccuracy]].  For example, if the user configures *Settings->Location->Mode* with *Battery Saving* (ie: Wifi only) but you've specifically requested [[DESIRED_ACCURACY_HIGH]] (ie: GPS), Android will show a dialog asking the user to confirm the desired changes.  If the user clicks `[OK]`, the OS will automcatically modify the Device settings.
     *
     * ![](https://www.dropbox.com/s/3kuw1gzzbnajhgf/android-location-resolution-dialog.png?dl=1)
     *
     * This automated Android dialog will be shown in the following cases:
     * - [[BackgroundGeolocation.onProviderChange]]
     * - [[BackgroundGeolocation.start]]
     * - [[BackgroundGeolocation.requestPermission]]
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.onProviderChange((event) => {
     *   console.log('[onProviderChange] ', event);
     *
     *   if (!provider.enabled) {
     *     alert('Please enable location services');
     *   }
     * });
     *
     * BackgroundGeolocation.ready({
     *   disableLocationAuthorizationAlert: true
     * });
     * ```
     */
    disableLocationAuthorizationAlert?: boolean;

    /**
     * __`[iOS only]`__ Presumably, this affects iOS stop-detect algorithm.  Apple is vague about what exactly this option does.
     *
     * Available values are defined as constants upon the [[BackgroundGeolocation]] class.
     *
     * | Name                                                           |
     * |----------------------------------------------------------------|
     * | [[BackgroundGeolocation.ACTIVITY_TYPE_OTHER]]                  |
     * | [[BackgroundGeolocation.ACTIVITY_TYPE_AUTOMOTIVE_NAVIGATION]]  |
     * | [[BackgroundGeolocation.ACTIVITY_TYPE_FITNESS]]                |
     * | [[BackgroundGeolocation.ACTIVITY_TYPE_OTHER_NAVIGATION]]       |
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   activityType: BackgroundGeolocation.ACTIVITY_TYPE_OTHER
     * );
     * ```
     *
     * ### ℹ️ See also:
     * - [Apple docs](https://developer.apple.com/reference/corelocation/cllocationmanager/1620567-activitytype?language=objc).
     *
     */
    activityType?: ActivityType;

    /**
     * __`[iOS only]`__ Allows the iOS stop-detection system to be delayed from activating.
     * @break
     *
     * Defaults to **`0`** (no delay).  Allows the stop-detection system to be delayed from activating.  When the stop-detection system *is* engaged, location-services will be temporarily turned **off** and only the accelerometer is monitored.  Stop-detection will only engage if this timer expires.  The timer is cancelled if any movement is detected before expiration.  If a value of **`0`** is specified, the stop-detection system will engage as soon as the device is detected to be stationary.
     *
     * You can experience the iOS stop-detection system at work by configuring [[debug]] __`true`__.  After the device stops moving (stopped at a traffic light, for example), the plugin will emit a *Lullabye* sound-effect and local-notifications about "Location-services: OFF / ON".
     *
     * #### iOS Stop-detection timing
     *
     * ![](https://dl.dropboxusercontent.com/s/ojjdfkmua15pskh/ios-stop-detection-timing.png?dl=1)
     */
    stopDetectionDelay?: number;

    /**
     * __`[iOS only]`__ Disable the plugin requesting "Motion & Fitness" authorization from the User.
     * @break
     *
     * Defaults to **`false`**.  Set **`true`** to disable iOS [`CMMotionActivityManager`](https://developer.apple.com/reference/coremotion/cmmotionactivitymanager)-based motion-activity updates (eg: `walking`, `in_vehicle`).  This feature requires a device having the **M7** co-processor (ie: iPhone 5s and up).
     *
     * ### ⚠️ Warning:
     * - The plugin is **HIGHLY** optimized for motion-activity-updates.  If you **do** disable this, the plugin *will* drain more battery power.  You are **STRONGLY** advised against disabling this.  You should explain to your users with an appropriate `NSMotionUsageDescription` in your `Info.plist` file, for example:
     * > "Motion activity detection increases battery efficiency by intelligently toggling location-tracking" off when your device is detected to be stationary.
     *
     * ### ℹ️ Note:
     * - This feature will ask the user for "Health updates" permission using the **`NSMotionUsageDescription`** in your `Info.plist`.  If you do not wish to ask the user for the "Health updates", set this option to `true`; However, you will no longer receive accurate activity data in the recorded locations.
     */
    disableMotionActivityUpdates?: boolean;

    /**
     * __`[iOS only]`__ Prevent iOS from suspending your application in the background after location-services have been switched off.
     * @break
     *
     * Defaults to **`false`**.  Set **`true`** to prevent **iOS** from suspending your application after location-services have been switched off while running in the background.  Must be used in conjunction with a [[heartbeatInterval]].
     * ### ⚠️ Warning:
     * - __`preventSuspend: true`__ should **only** be used in **very** specific use-cases and should typically **not** be used as it *will* have a **very noticeable impact on battery performance.**  You should carefully manage **`preventSuspend`**, engaging it for controlled periods-of-time.  You should **not** expect to run your app in this mode 24 hours / day, 7 days-a-week.
     * - When a device is unplugged form power with the screen off, iOS will *still* throttle [[BackgroundGeolocation.onHeartbeat]] events about 2 minutes after entering the background state.  However, if the screen is lit up or even the *slightest* device-motion is detected, [[BackgroundGeolocation.onHeartbeat]] events will immediately resume.
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.onHeartbeat((event) => {
     *   console.log('[onHeartbeat] ', event);
     * });
     *
     * BackgroundGeolocation.ready({
     *   preventSuspend: true,
     *   heartbeatInterval: 60
     * });
     * ```
     *
     * ### ℹ️ See also:
     * - [[heartbeatInterval]]
     * - [[BackgroundGeolocation.onHeartbeat]]
     */
    preventSuspend?: boolean;

    /**
     * __`[Android only]`__ Set the desired interval for active location updates, in milliseconds.
     * @break
     *
     * ### ⚠️ Note:
     * - To use **`locationUpdateInterval`** you **must** also configure [[distanceFilter]] __`0`__, since [[distanceFilter]] *overrides* **`locationUpdateInterval`**.
     *
     * Set the desired interval for active location updates, in milliseconds.
     *
     * The location client will actively try to obtain location updates for your application at this interval, so it has a direct influence on the amount of power used by your application. Choose your interval wisely.
     *
     * This interval is inexact. You may not receive updates at all (if no location sources are available), or you may receive them slower than requested. You may also receive them faster than requested (if other applications are requesting location at a faster interval).
     *
     * Applications with only the coarse location permission may have their interval silently throttled.\
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   distanceFilter: 0,            // Must be 0 or locationUpdateInterval is ignored!
     *   locationUpdateInterval: 5000  // Get a location every 5 seconds
     * });
     * ```
     * ### ℹ️ See also:
     * - For more information, see the [Android docs](https://developers.google.com/android/reference/com/google/android/gms/location/LocationRequest.html#setInterval(long))
     *
     */
    locationUpdateInterval?: number;

    /**
     * __`[Android only]`__ Explicitly set the fastest interval for location updates, in milliseconds.
     * @break
     *
     * This controls the fastest rate at which your application will receive location updates, which might be faster than [[locationUpdateInterval]] in some situations (for example, if other applications are triggering location updates).
     *
     * This allows your application to passively acquire locations at a rate faster than it actively acquires locations, saving power.
     *
     * Unlike [[locationUpdateInterval]], this parameter is exact. Your application will never receive updates faster than this value.
     *
     * If you don't call this method, a fastest interval will be set to **30000 (30s)**.
     *
     * An interval of `0` is allowed, but **not recommended**, since location updates may be extremely fast on future implementations.
     *
     * If **`fastestLocationUpdateInterval`** is set slower than [[locationUpdateInterval]], then your effective fastest interval is [[locationUpdateInterval]].
     *
     * ### ℹ️ See also:
     * - [Android docs](https://developers.google.com/android/reference/com/google/android/gms/location/LocationRequest.html#setFastestInterval(long))
     */
    fastestLocationUpdateInterval?: number;

    /**
     * __`[Android only]`__ Sets the maximum wait time in milliseconds for location updates.
     *
     * Defaults to `0` (no defer).  If you pass a value at least 2x larger than the interval specified with [[locationUpdateInterval]], then location delivery may be delayed and multiple locations can be delivered at once. Locations are determined at the [[locationUpdateInterval]] rate, but can be delivered in batch after the interval you set in this method. This **can consume less battery** and **give more accurate locations**, depending on the device's hardware capabilities. You should set this value to be as large as possible for your needs if you don't need immediate location delivery.
     */
    deferTime?: number;

    /**
     * __`[Android only]`__ Allow recording locations which are duplicates of the previous.
     * @break
     *
     * By default, the Android plugin will ignore a received location when it is *identical* to the previous location.  Set `true` to override this behavior and record *every* location, regardless if it is identical to the last location.
     *
     * In the logs, you will see a location being ignored:
     * ```
     * TSLocationManager:   ℹ️  IGNORED: same as last location
     * ```
     *
     * An identical location is often generated when changing state from *stationary* -> *moving*, where a single location is first requested (the [[BackgroundGeolocation.onMotionChange]] location) before turning on regular location updates.  Changing geolocation config params can also generate a duplicate location (eg: changing [[distanceFilter]]).
     */
    allowIdenticalLocations?: boolean;

    /**
     * __`[Android-only]`__ Enable extra timestamp meta data to be appended to each recorded location, including system-time.
     * @break
     *
     * Some developers have reported GPS [[Location.timestamp]] issues with some Android devices.  This option will append extra meta-data related to the device's system time.
     *
     * ### Java implementation
     *
     * ```Java
     * if (enableTimestampMeta) {
     *     JSONObject timestampMeta = new JSONObject();
     *     timestampMeta.put("time", mLocation.getTime());
     *     if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
     *         timestampMeta.put("systemClockElaspsedRealtime", SystemClock.elapsedRealtimeNanos()/1000000);
     *         timestampMeta.put("elapsedRealtime", mLocation.getElapsedRealtimeNanos()/1000000);
     *     } else {
     *         timestampMeta.put("systemTime", System.currentTimeMillis());
     *     }
     *     data.put("timestampMeta", timestampMeta);
     * }
     * ```
     */
    enableTimestampMeta?: boolean;

    /**
     * __`Android-only`__ Experimental filter to ignore anomalous locations that suddenly jump an unusual distance from last.
     * The SDK will calculate an apparent speed and distance relative to last known location.  If the location suddenly
     * teleports from last location, it will be ignored.
     *
     * The measurement is in meters/second.  The default is to throw away any location which apparently moved at 300 meters/second from last known location.
     */
    speedJumpFilter?: number;

    /**
     * __`[Android-only]`__ Configures a comma-separated list of motion-activities which are allow to trigger location-tracking.
     * @break
     *
     * These are the comma-delimited list of [activity-names](https://developers.google.com/android/reference/com/google/android/gms/location/DetectedActivity) returned by the `ActivityRecognition` API which will trigger a state-change from **stationary** to **moving**.  By default, the plugin will trigger on **any** of the **moving-states**:
     *
     * | Activity Name  |
     * |----------------|
     * | `in_vehicle`   |
     * | `on_bicycle`   |
     * | `on_foot`      |
     * | `running`      |
     * | `walking`      |
     *
     *
     * If you wish, you can configure the plugin to only engage the **moving** state for vehicles-only by providing just `"in_vehicle"`, for example.
     *
     *
     * @example
     * ```javascript
     * // Only trigger tracking for vehicles
     * BackgroundGeolocation.ready({
     *   triggerActivities: 'in_vehicle'
     * );
     *
     * // Only trigger tracking for on_foot, walking and running
     * BackgroundGeolocation.ready({
     *   triggerActivities: 'on_foot, walking, running'
     * );
     * ```
     */
    triggerActivities?: string;

    /**
     * __`[Android only]`__ Enables "Headless" operation allowing you to respond to events after you app has been terminated with [[stopOnTerminate]] __`false`__.
     * @break
     *
     * Defaults to __`false`__.  In this Android terminated state, where only the plugin's foreground-service remains running, you can respond to all the plugin's events with your own callback.
     *
     * ### ℹ️ Note:
     * - Requires [[stopOnTerminate]] __`false`__.
     * - If you've configured [[stopOnTerminate]] __`false`__, [[BackgroundGeolocation]] will continue to record locations (and post them to your configured [[url]]) *regardless of* __`enabledHeadless: true`__.  You should enable this option *only if* you wish to perform some custom work during the headless state (for example, posting a local notification).
     * - For more information, see the Wiki [Android Headless Mode](github:wiki/Android-Headless-Mode).
     *
     */
    enableHeadless?: boolean;

    /**
     * __`[Android only]`__ Configure the plugin service to run as a more robust "Foreground Service".
     * @break
     *
     * ### ⚠️ Android 8.0+
     *
     * Defaults to `true` and cannot be set to `false`.  Due to strict new [Background Execution Limits](https://www.youtube.com/watch?v=Pumf_4yjTMc) in Android 8, the plugin *enforces* **`foregroundService: true`**.
     *
     * A persistent [[Notification]] is required by the operating-system with a foreground-service.  It **cannot** be hidden.
     *
     * ### Android < 8.0
     *
     * Defaults to **`false`**.  When the Android OS is under memory pressure from other applications (eg: a phone call), the OS can and will free up memory by terminating other processes and scheduling them for re-launch when memory becomes available.  If you find your tracking being **terminated unexpectedly**, *this* is why.
     *
     * If you set this option to **`true`**, the plugin will run its Android service in the foreground, **supplying the ongoing [[Notification]]  to be shown to the user while in this state**.  Running as a foreground-service makes the tracking-service **much** more immune to OS killing it due to memory/battery pressure.  By default services are background, meaning that if the system needs to kill them to reclaim more memory (such as to display a large page in a web browser).
     *
     * ### ℹ️ See also:
     * - [[Notification]]
     * - 📘 For more information, see the [Android Service](https://developer.android.com/reference/android/app/Service.html#startForeground(int,%20android.app.Notification)) docs.
     */
    foregroundService?: boolean;

    /**
     * Force launch your terminated App after a [[BackgroundGeolocation.onLocation]] event.
     * @break
     *
     * When the user terminates your Android app with [[BackgroundGeolocation]] configured with [[stopOnTerminate]] __`false`__, the foreground `MainActivity` (where your Javascript app lives) *will* terminate &mdash; only the plugin's pure native background-service is running, **"headless"**, in this case.  The background service will continue tracking the location.  However, the background service *can* optionally **re-launch** your foreground application.
     *
     * ### ⚠️ Warning:
     * - When the background service re-launches your application, it will *briefly* appear in the foreground before *immediately* minimizing.  If the user has their phone on at the time, they will see a brief flash of your app appearing and minimizing.
     */
    forceReloadOnLocationChange?: boolean;

    /**
     * Force launch your terminated App after a [[BackgroundGeolocation.onMotionChange]] event.
     * @break
     *
     * When the user terminates your Android app with [[BackgroundGeolocation]] configured with [[stopOnTerminate]] __`false`__, the foreground `MainActivity` (where your Javascript app lives) *will* terminate &mdash; only the plugin's pure native background-service is running, **"headless"**, in this case.  The background service will continue tracking the location.  However, the background service *can* optionally **re-launch** your foreground application.
     *
     * ### ⚠️ Warning:
     * - When the background service re-launches your application, it will *briefly* appear in the foreground before *immediately* minimizing.  If the user has their phone on at the time, they will see a brief flash of your app appearing and minimizing.
     */
    forceReloadOnMotionChange?: boolean;

    /**
     * Force launch your terminated App after a [[BackgroundGeolocation.onGeofence]] event.
     * @break
     *
     * When the user terminates your Android app with [[BackgroundGeolocation]] configured with [[stopOnTerminate]] __`false`__, the foreground `MainActivity` (where your Javascript app lives) *will* terminate &mdash; only the plugin's pure native background-service is running, **"headless"**, in this case.  The background service will continue tracking the location.  However, the background service *can* optionally **re-launch** your foreground application.
     *
     * ### ⚠️ Warning:
     * - When the background service re-launches your application, it will *briefly* appear in the foreground before *immediately* minimizing.  If the user has their phone on at the time, they will see a brief flash of your app appearing and minimizing.
     */
    forceReloadOnGeofence?: boolean;

    /**
     * Force launch your terminated App after a device reboot or application update.
     * @break
     *
     * When the user reboots their device with [[BackgroundGeolocation]] configured with [[startOnBoot]] __`true`__, only the plugin's pure native background-service begins running, **"headless"**, in this case.  The background service will continue tracking the location.  However, the background service *can* optionally **re-launch** your foreground application.
     *
     * ### ⚠️ Warning:
     * - When the background service re-launches your application, it will *briefly* appear in the foreground before *immediately* minimizing.  If the user has their phone on at the time, they will see a brief flash of your app appearing and minimizing.
     */
    forceReloadOnBoot?: boolean;

    /**
     * Force launch your terminated App after a [[BackgroundGeolocation.onHeartbeat]] event.
     * @break
     *
     * When the user terminates your Android app with [[BackgroundGeolocation]] configured with [[stopOnTerminate]] __`false`__, the foreground `MainActivity` (where your application code lives) *will* terminate &mdash; only the plugin's pure native background-service is running, **"headless"**, in this case.  The background service will continue tracking the location.  However, the background service *can* optionally **re-launch** your foreground application.
     *
     * ### ⚠️ Warning:
     * - When the background service re-launches your application, it will *briefly* appear in the foreground before *immediately* minimizing.  If the user has their phone on at the time, they will see a brief flash of your app appearing and minimizing.
     */
    forceReloadOnHeartbeat?: boolean;

    /**
     * Force launch your terminated App after a [[BackgroundGeolocation.onSchedule]] event.
     * @break
     *
     * When the user terminates your Android app with [[BackgroundGeolocation]] configured with [[stopOnTerminate]] __`false`__, the foreground `MainActivity` (where your Javascript app lives) *will* terminate &mdash; only the plugin's pure native background-service is running, **"headless"**, in this case.  The background service will continue tracking the location.  However, the background service *can* optionally **re-launch** your foreground application.
     *
     * ### ⚠️ Warning:
     * - When the background service re-launches your application, it will *briefly* appear in the foreground before *immediately* minimizing.  If the user has their phone on at the time, they will see a brief flash of your app appearing and minimizing.
     */
    forceReloadOnSchedule?: boolean;

    /**
     * [__Android only]__ Configures the persistent foreground-service [[Notification]] required by Android.
     *
     * ![](https://dl.dropbox.com/s/acuhy5cu4p7uofr/android-foreground-service-default.png?dl=1)
     *
     * See [Notification] for detailed usage.
     *
     * @example
     * ```typescript
     * BackgroundGeolocation.ready({
     *   notification: {
     *     title: 'Background tracking engaged',
     *     text: 'My notification text'
     *   }
     * })
     * ```
     */
    notification?: Notification;

    /**
     * ⚠️ DEPRECATED [[Notification.priority]]
     * @deprecated
     */
    notificationPriority?: NotificationPriority;

    /**
     * ⚠️ DEPRECATED:  Use [[Notification.title]]
     * @deprecated
     */
    notificationTitle?: string;

    /**
     * ⚠️ DEPRECATED:  Use [[Notification.text]]
     * @deprecated
     */
    notificationText?: string;

    /**
     * ⚠️ DEPRECATED:  Use [[Notification.color]]
     * @deprecated
     */
    notificationColor?: string;

    /**
     * ⚠️ DEPRECATED:  Use [[Notification.smallIcon]]
     * @deprecated
     */
    notificationSmallIcon?: string;

    /**
     * ⚠️ DEPRECATED:  [[Notification.largeIcon]]
     * @deprecated
     */
    notificationLargeIcon?: string;

    /**
     * ⚠️ DEPRECATED:  [[Notification.channelName]]
     * @deprecated
     */
    notificationChannelName?: string;
  }

  //-------------------------------
  //--- ConnectivityChangeEvent ---
  //-------------------------------

  /**
   * The event-object provided to [[BackgroundGeolocation.onConnectivityChange]]
   *
   * @example
   * ```typescript
   * BackgroundGeolocation.onConnectivityChange(connectivityChangeEvent => {
   *   console.log('[connectivitychange] ', connectivityChangeEvent.connected);
   * });
   * ```
   */
  declare interface ConnectivityChangeEvent {
    /**
     * `true` when the device has access to a network connection.
     */
    connected: boolean;
  }

  //------------------------------
  //--- CurrentPositionRequest ---
  //------------------------------

  /**
   * Options provided to [[getCurrentPosition]].
   *
   * @example
   * ```javascript
   * let location = await BackgroundGeolocation.getCurrentPosition({
   *   timeout: 30,          // 30 second timeout to fetch location
   *   persist: true,        // Defaults to state.enabled
   *   maximumAge: 5000,     // Accept the last-known-location if not older than 5000 ms.
   *   desiredAccuracy: 10,  // Try to fetch a location with an accuracy of `10` meters.
   *   samples: 3,           // How many location samples to attempt.
   *   extras: {             // Custom meta-data.
   *     "route_id": 123
   *   }
   * });
   * ```
   */
  declare interface CurrentPositionRequest {
    /**
     * Sets the maximum number of location-samples to fetch before returning the best possible location to your `callback`.  Default is `3`.  Only the final Location will be persisted.
     */
    samples?: number;
    /**
     * Sets the desired accuracy of location you're attempting to fetch. When a location having `accuracy <= desiredAccuracy` is retrieved, the plugin will stop sampling and immediately return that location. Defaults to your configured [[Config.stationaryRadius]].
     */
    desiredAccuracy?: number;
    /**
     * Location-timeout in `seconds`.  Default: `30`.  If the timeout expires before a [[Location]] is retrieved, a [[LocationError]] will fire.
     */
    timeout?: number;
    /**
     * Defaults to `true` when plugin is `enabled`; `false`, otherwise.  Set `false` to disable persisting the retrieved Location in the plugin's SQLite database.
     */
    persist?: boolean;
    /**
     * Accept the last-recorded-location if no older than supplied value in `milliseconds`.  Default is `0`.
     */
    maximumAge?: number;
    /**
     * Optional meta-data to attach to the location. These `extras` will be merged to the configured [[Config.extras]] and persisted / POSTed to your server (if you've configured a [[Config.url]].
     */
    extras?: Object;
  }

  //----------------------------
  //------ DeviceSettings ------
  //----------------------------

  /**
   * An object for redirecting a User to an Android device's settings screen from a [DeviceSettings] request.
   *
   * This object contains meta-data about the device ([[manufacturer]\], [[model]], [[version]]) in addition to a flag [seen] to let you know if you've
   * already shown some particular screen to the user.  [[lastSeenAt]] lets you know the `DateTime` you last showed a particular screen to the user.
   *
   */
  declare interface DeviceSettingsRequest {
    /**
     * Device manufacturer.
     */
    manufacturer: string;
    /**
     * Device model
     */
    model: string;
    /**
     * OS version
     */
    version: string;
    /**
     * Flag showing whether you've already shown this screen to the user.
     */
    seen: boolean;
    /**
     * The [DateTime] you last showed this screen to the user.
     */
    lastSeenAt: Date;
    /**
     * The settings screen to be shown.
     *
     * ⚠️ This property is set automatically.
     */
    action: string;
  }

  /**
   * Device Settings API.
   *
   * Provides an API to show Android & vendor-specific Battery / Power Management settings screens that can affect performance of the Background Geolocation SDK on various devices.
   *
   * The site [Don't Kill My App](https://dontkillmyapp.com/) provides a comprehensive list of poor Android vendors which throttle background-services that this plugin relies upon.
   *
   * This `DeviceSettings` API is an attempt to provide resources to direct the user to the appropriate vendor-specific settings screen to resolve issues with background operation.
   *
   * ![](https://dl.dropboxusercontent.com/s/u7ljngfecxvibyh/huawei-settings-battery-launch.jpg?dl=1)
   * ![](https://dl.dropboxusercontent.com/s/hd6yxw58hgc7ef4/android-settings-battery-optimization.jpg?dl=1)
   *
   * @example
   * ```typescript
   * // Is Android device ignoring battery optimizations?
   * let isIgnoring = await BackgroundGeolocation.deviceSettings.isIgnoringBatteryOptimizations();
   * if (!isIgnoring) {
   *   BackgroundGeolocation.deviceSettings.showIgnoreBatteryOptimizations().then((request:DeviceSettingsRequest) => {
   *     console.log(`- Screen seen? ${request.seen} ${request.lastSeenAt}`);
   *     console.log(`- Device: ${request.manufacturer} ${request.model} ${request.version}`);
   *
   *     // If we've already shown this screen to the user, we don't want to annoy them.
   *     if (request.seen) {
   *       return;
   *     }
   *
   *     // It's your responsibility to instruct the user what exactly
   *     // to do here, perhaps with a Confirm Dialog:
   *     showMyConfirmDialog({
   *       title: "Settings request",
   *       text: "Please disable battery optimizations for your device"
   *     }).then((confirmed) => {
   *       if (confirmed) {
   *         // User clicked [Confirm] button.  Execute the redirect to settings screen:
   *         BackgroundGeolocation.deviceSettings.show(request);
   *       }
   *     });
   *   }).catch((error) => {
   *     // Depending on Manufacturer/Model/OS Version, a Device may not implement
   *     // a particular Settings screen.
   *     console.warn(error);
   *   });
   * }
   *
   * ```
   */
  declare interface DeviceSettings {
    /**
     * Returns `true` if device is ignoring battery optimizations for your app.
     *
     * In most cases, the Background Geolocation SDK **will perform normally** with battery optimizations.
     *
     * ![](https://dl.dropboxusercontent.com/s/hd6yxw58hgc7ef4/android-settings-battery-optimization.jpg?dl=1)
     *
     * @example
     * ```typescript
     * let isIgnoring = await BackgroundGeolocation.deviceSettings.isIgnoringBatteryOptimizations();
     * ```
     */
    isIgnoringBatteryOptimizations(): Promise<boolean>;
    /**
     * Shows the Android *Ignore Battery Optimizations* settings screen.
     *
     * **Note:**  In most cases, the plugin **will perform normally** with battery optimizations.  You should only instruct the user to *Ignore Battery Optimizations* for your app as a last resort to resolve issues with background operation.
     *
     * ![](https://dl.dropboxusercontent.com/s/hd6yxw58hgc7ef4/android-settings-battery-optimization.jpg?dl=1)
     *
     * **WARNING:**  Ignoring battery optimizations *will* cause your app to consume **much** more power.
     *
     * `showIgnoreBatteryOptimizations` does **not** immediately redirect to the desired Device settings screen.  Instead, it first returns a [[DeviceSettingsRequest]], containing
     * meta-data about the device (`manufacturer`, `model`, `version`), in addition to a flags `seen` and `lastSeenAt`, letting you know if and when you've already shown this screen to the user.
     *
     *
     * In your success-callback, it's completely **up to you** to instruct the user what exactly to do on that screen.
     *
     * Based upon the manufacturer/model/os, a Device may not have this particular Settings screen implemented.  In this case, `catch` will fire.
     *
     * @example
     * ```typescript
     * // Is Android device ignoring battery optimizations?
     * let isIgnoring = await BackgroundGeolocation.deviceSettings.isIgnoringBatteryOptimizations();
     * if (!isIgnoring) {
     *   BackgroundGeolocation.deviceSettings.showIgnoreBatteryOptimizations().then((request:DeviceSettingsRequest) => {
     *     console.log(`- Screen seen? ${request.seen} ${request.lastSeenAt}`);
     *     console.log(`- Device: ${request.manufacturer} ${request.model} ${request.version}`);
     *
     *     // If we've already shown this screen to the user, we don't want to annoy them.
     *     if (request.seen) {
     *       return;
     *     }
     *
     *     // It's your responsibility to instruct the user what exactly
     *     // to do here, perhaps with a Confirm Dialog:
     *     showMyConfirmDialog({
     *       title: "Settings request",
     *       text: "Please disable battery optimizations for your device"
     *     }).then((confirmed) => {
     *       if (confirmed) {
     *         // User clicked [Confirm] button.  Execute the redirect to settings screen:
     *         BackgroundGeolocation.deviceSettings.show(request);
     *       }
     *     });
     *   }).catch((error) => {
     *     // Depending on Manufacturer/Model/OS Version, a Device may not implement
     *     // a particular Settings screen.
     *     console.warn(error);
     *   });
     * }
     * ```
     *
     */
    showIgnoreBatteryOptimizations(): Promise<DeviceSettingsRequest>;
    /**
     * Shows a vendor-specific "Power Management" screen.
     *
     * For example, a *Huawei* device will show the *Battery->Launch* screen:
     *
     * ![](https://dl.dropboxusercontent.com/s/u7ljngfecxvibyh/huawei-settings-battery-launch.jpg?dl=1)
     * ![](https://dl.dropboxusercontent.com/s/cce6jxuvxmecv2z/huawei-settings-battery-launch-apply.jpg?dl=1)
     *
     * The site [Don't Kill My App](https://dontkillmyapp.com/) provides a comprehensive list of poor Android vendors which throttle background-services that this plugin relies upon.
     *
     * `showPowerManager` does **not** immediately redirect to the desired Device settings screen.  Instead, it first returns a [[DeviceSettingsRequest]], containing
     * meta-data about the device (`manufacturer`, `model`, `version`), in addition to a flags `seen` and `lastSeenAt`, letting you know if and when you've already shown this screen to the user.
     *
     * Unfortunately, there's no possible way to determine if the user *actually* performs the desired action to "white list" your app on the shown settings-screen.
     * For this reason, you'll have to evaluate the provided properties [[DeviceSettingsRequest.seen]] &amp; [[DeviceSettingsRequest.lastSeenAt]] and determine for yourself whether to [[DeviceSettings.show]] this screen.
     *
     * In your success-callback, it's completely **up to you** to instruct the user what exactly to do on that screen, based upon the provided [[DeviceSettingsRequest]] properties `manufacturer`, `model` and `version`.
     *
     * **Note:**  Based upon the `manufacturer` / `model` / OS `version`, a Device **may not have** a particular Settings screen implemented (eg: Google Pixel).  In this case, the `Promise` will fire an exception.
     *
     * ## Example
     *
     * ```typescript
     * BackgroundGeolocation.deviceSettings.showPowerManager().then((request:DeviceSettingsRequest) => {
     *   console.log(`- Screen seen? ${request.seen} ${request.lastSeenAt}`);
     *   console.log(`- Device: ${request.manufacturer} ${request.model} ${request.version}`);
     *
     *   // If we've already shown this screen to the user, we don't want to annoy them.
     *   if (request.seen) {
     *     return;
     *   }
     *   // It's your responsibility to instruct the user what exactly
     *   // to do here, perhaps with a Confirm Dialog:
     *   showMyConfirmDialog({
     *     title: "Device Power Management",
     *     text: "Please white-list the app in your Device's Power Management settings by clicking this then selecting that."
     *   }).then((confirmed) => {
     *     if (confirmed) {
     *       // User clicked [Confirm] button.  Execute the redirect to settings screen:
     *       BackgroundGeolocation.deviceSettings.show(request);
     *     }
     *   });
     * }).catch((error) => {
     *   // Depending on Manufacturer/Model/OS Version, a Device may not implement
     *   // a particular Settings screen.
     *   console.log(error);
     * });
     * ```
     *
     * ## Vendor Settings Screens
     *
     * The following Android Settings screen will be shown depending on Vendor / OS version:
     *
     * | Vendor                               | Settings Activity Name                                                 |
     * |--------------------------------------|------------------------------------------------------------------------|
     * | LeEco                                | `AutobootManageActivity`                                               |
     * | Huawei                               | `StartupAppControlActivity`,`StartupAppControlActivity` (depends on OS version) |
     * | Color OS                             | `StartupAppListActivity`                                               |
     * | OPPO                                 | `StartupAppListActivity`                                               |
     * | Vivo                                 | `BgStartUpManagerActivity`,`AddWhiteListActivity`,`BgStartUpManager` (depends on OS version)|
     * | Samsung                              | `BatteryActivity`                                                      |
     * | HTC                                  | `LandingPageActivity`                                                  |
     * | Asus                                 | `AutobootManageActivity`                                               |
     * | LeEco                                | `mobilemanager.MainActivity`                                           |
     *
     */
    showPowerManager(): Promise<DeviceSettingsRequest>;

    /**
     * This method is designed to be executed from a [[showPowerManager]] or [[showIgnoreBatteryOptimizations]] callback.
     */
    show(request: DeviceSettingsRequest): Promise<boolean>;
  }

  //-----------------------
  //------ Geofence -------
  //-----------------------

  /**
   * The Background Geolocation SDK implements the native iOS and Android Geofencing APIs.
   *
   * __ℹ️ Note:__
   * - Native iOS & Android API support only *circular* geofences.
   * - The minimum reliable [[radius]] is `200` meters.
   * - Geofence monitoring *requires* the user authorize [[locationAuthorizationRequest]] **`Always`** &mdash; **`When in Use`** will **not** work.
   *
   * ## Adding Geofences
   *
   * Adding a single geofence with [[addGeofence]].
   * @example
   * ```typescript
   * BackgroundGeolocation.addGeofence({
   *   identifier: "Home",
   *   radius: 200,
   *   latitude: 45.51921926,
   *   longitude: -73.61678581,
   *   notifyOnEntry: true,
   *   notifyOnExit: true,
   *   extras: {
   *     route_id: 1234
   *   }
   * }).then((success) => {
   *   console.log('[addGeofence] success');
   * }).catch((error) => {
   *   console.log('[addGeofence] FAILURE: ', error);
   * });
   * ```
   *
   * Adding multiple geofences with [[addGeofences]].
   * @example
   * ```typescript
   * BackgroundGeolocation.addGeofences([{
   *   identifier: "Home",
   *   radius: 200,
   *   latitude: 45.51921926,
   *   longitude: -73.61678581,
   *   notifyOnEntry: true,
   * }, {
   *   identifier: "Work",
   *   radius: 200,
   *   latitude: 45.61921927,
   *   longitude: -73.71678582,
   *   notifyOnEntry: true
   * }]).then((success) => {
   *   console.log('[addGeofences] success');
   * }).catch((error) => {
   *   console.log('[addGeofences] FAILURE: ', error);
   * });
   * ```
   *
   * __ℹ️ Note:__ Adding a geofence having an [[identifier]] which already exists within the SDK geofence database will cause the previous record to be destroyed and the new one inserted.
   *
   * ---------------------------------------------------------------------------------------------------
   *
   * ## Listening for Geofence Events
   *
   * Listen to geofence events with [[BackgroundGeolocation.onGeofence]].
   *
   * @example
   * ```typescript
   * // Listen for geofence events.
   * BackgroundGeolocation.onGeofence(geofence => {
   *   console.log('[geofence] ', geofence.identifier, geofence.action);
   * });
   * ```
   *
   * ---------------------------------------------------------------------------------------------------
   *
   * ## Infinite Geofencing
   *
   * The Background Geolocation SDK contains unique and powerful Geofencing features that allow you to monitor any number of circular geofences you wish (thousands even), in spite of limits imposed by the native platform APIs (**20 for iOS; 100 for Android**).
   *
   * The SDK achieves this by storing your geofences in its database, using a [geospatial query](https://en.wikipedia.org/wiki/Spatial_query) to determine those geofences in proximity ([[geofenceProximityRadius]]), activating only those geofences closest to the device's current location (according the limit imposed by the corresponding platform).
   *
   * - When the device is determined to be moving, the plugin periodically queries for geofences within the [[geofenceProximityRadius]] (eg. every minute) using the latest recorded location.  This geospatial query is **very fast**, even with tens-of-thousands geofences in the database.
   * - The SDK **enforces** a *minimum* [[geofenceProximityRadius]] of `1000` meters.
   * - In the following image, the *green* geofences within [[geofenceProximityRadius]] are *actively* monitored.  The *grey* geofences outside [[geofenceProximityRadius]] still exist within the SDK's database but are *not* actively being monitored.
   *
   * ![](https://dl.dropboxusercontent.com/s/7sggka4vcbrokwt/geofenceProximityRadius_iphone6_spacegrey_portrait.png?dl=1)
   *
   * ---------------------------------------------------------------------------------------------------
   *
   * ## Listening for changes in the actively-monitored set-of-geofences.
   *
   * As the SDK periodically queries for geofences within the [[geofenceProximityRadius]], you can listen for changes in the actively-monitored geofences using the event [[onGeofencesChange]].  This event will let you know those geofences which have *begun* to be *actively monitored* ([[GeofencesChangeEvent.on]]) in addition to those which just *ceased* to be actively monitored ([[GeofencesChangeEvent.off]]).
   *
   * @example
   * ```javascript
   * BackgroundGeolocation.onGeofencesChange((event) => {
   *   let on = event.on;     //<-- new geofences activated.
   *   let off = event.off; //<-- geofences that were just de-activated.
   *
   *   // Create map circles
   *   on.forEach((geofence) => {
   *     createGeofenceMarker(geofence)
   *   });
   *
   *   // Remove map circles
   *   off.forEach((identifier) => {
   *     removeGeofenceMarker(identifier);
   *   }
   * });
   * ```
   * ### ⚠️ Note:
   * - When **all** geofences have been removed, the [[GeofencesChangeEvent]] will provide empty lists for both [[GeofencesChangeEvent.on]] & [[GeofencesChangeEvent.off]].
   *
   * ---------------------------------------------------------------------------------------------------
   *
   * ## Removing Geofences
   *
   * Once a geofence has been inserted into the SDK's database using [[addGeofence]] or [[addGeofences]], they will be monitored *forever*.  If you've configured [[stopOnTerminate]] __`false`__ and [[startOnBoot]] __`true`__, geofences will continue to be monitored even if the application is terminated or device rebooted.
   * To cease monitoring a geofence or *geofences*, you must *remove* them from the SDK's database.
   *
   * - Removing a single geofence by [[identifier]] with [[removeGeofence]]:
   * @example
   * ```typescript
   * BackgroundGeolocation.removeGeofence('HOME').then(success => {
   *   console.log('[removeGeofence] success');
   * })
   * ```
   *
   * - Removing *all* geofences with [[removeGeofences]]:
   * @example
   * ```typescript
   * BackgroundGeolocation.removeGeofences().then(success => {
   *   console.log('[removeGeofences] all geofences have been destroyed');
   * })
   * ```
   * ---------------------------------------------------------------------------------------------------
   *
   * ## Querying Geofences
   *
   * Use the method [[getGeofences]] to retrieve the entire Array of [[Geofence]] stored in the SDK's database.
   *
   * @example
   * ```typescript
   * BackgroundGeolocation.getGeofences().then(geofences => {
   *   console.log('[getGeofences] ', geofences);
   * })
   * ```
   *
   * ---------------------------------------------------------------------------------------------------
   *
   * ## Monitoring *only* geofences
   *
   * The BackgroundGeolocation SDK allows you to optionally monitor *only* geofences without constant location-tracking.  To engage *geofences-only* mode, use the method [[startGeofences]] instead of [[start]].
   *
   * Use option [[Config.geofenceModeHighAccuracy]]:true to improve the responsiveness of geofence events.
   *
   * @example
   * ```typescript
   * BackgroundGeolocation.onGeofence(geofence => {
   *   console.log('[geofence] ', geofence);
   * })
   *
   * BackgroundGeolocation.ready({
   *   url: 'http://your.server.com/geofences',
   *   autoSync: true,
   *   geofenceModeHighAccuracy: true   // <-- consumes more power; default is false.
   * }, state => {
   *   // engage geofences-only mode:
   *   BackgroundGeolocation.startGeofences();
   * })
   * ```
   *
   * ## Toggling between tracking-modes [[start]] and [[startGeofences]]
   *
   * The SDK can easily be toggled between [[State.trackingMode]] simply by executing the corresponding [[start]] or [[startGeofences]] methods.
   *
   * @example
   * ```typescript
   * // Listen to geofence events
   * BackgroundGeolocation.onGeofence(geofence => {
   *   console.log('[geofence] ', geofence);
   *   if (geofence.identifier == 'DANGER_ZONE') {
   *     if (geofence.action == 'ENTER') {
   *       // Entering the danger-zone, we want to aggressively track location.
   *       BackgroundGeolocation.start();
   *     } else if (geofence.action == 'EXIT') {
   *       // Exiting the danger-zone, we resume geofences-only tracking.
   *       BackgroundGeolocation.startGeofences();
   *     }
   *   }
   * })
   *
   * // Add a geofence.
   * BackgroundGeolocation.addGeofence({
   *   identifier: "DANGER_ZONE",
   *   radius: 1000,
   *   latitude: 45.51921926,
   *   longitude: -73.61678581,
   *   notifyOnEntry: true,
   *   notifyOnExit: true,
   * })
   *
   * // Ready the plugin.
   * BackgroundGeolocation.ready({
   *   desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
   *   distanceFilter: 10,
   *   url: 'http://your.server.com/locations',
   *   autoSync: true
   * }, state => {
   *   BackgroundGeolocation.startGeofences();
   * })
   * ```
   *
   */
  declare interface Geofence {
    /**
     * Unique geofence identifier.
     */
    identifier: string;
    /**
     * Radius of the circular geofence.
     *
     * ⚠️ The minimum reliable `radius` is __`200`__ meters.  Anything less will likely not cause a geofence to trigger.  This is documented by Apple [here](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/LocationAwarenessPG/RegionMonitoring/RegionMonitoring.html):
     * > *"The specific threshold distances are determined by the hardware and the location technologies that are currently available. For example, if WiFi is disabled, region monitoring is significantly less accurate. However, for testing purposes, __you can assume that the minimum distance is approximately 200 meters__*".
     */
    radius: number;
    /**
     * Latitude of geofence center
     */
    latitude: number;
    /**
     * Longitude of geofence center.
     */
    longitude: number;
    /**
     * Set `true` to fire event when device *enters* this geofence.
     *
     * __ℹ️ See also:__
     * - [[Config.geofenceInitialTriggerEntry]]
     */
    notifyOnEntry?: boolean;
    /**
     * Set `true` to fire event when device *exits* this geofence.
     */
    notifyOnExit?: boolean;
    /**
     * Set `true` to fire event when device "loiters" within this geofence for [[loiteringDelay]] milliseconds.
     */
    notifyOnDwell?: boolean;
    /**
     * Minimum time in *milliseconds* the device must "loiter" within this geofence before [[notifyOnDwell]] event fires.
     */
    loiteringDelay?: number;
    /**
     * Arbitrary key-values appended to the geofence event and posted to your configured [[Config.url]].
     */
    extras?: Object;
  }

  //-----------------------
  //---- GeofenceEvent ----
  //-----------------------

  /**
   * The event-object provided to [[BackgroundGeolocation.onGeofence]] when a geofence transition event occurs.
   *
   * @example
   * ```typescript
   * BackgroundGeolocation.onGeofence(geofenceEvent => {
   *   console.log('[geofence] ', geofenceEvent.identifier, geofence.action, geofenceEvent.location);
   * });
   * ```
   */
  declare interface GeofenceEvent {
    /**
     * The identifier of the geofence which fired.
     */
    identifier: string;
    /**
     * The transition type: `ENTER`, `EXIT`, `DWELL`
     */
    action: string;
    /**
     * The [[Location]] where the geofence transition occurred.
     */
    location: Location;
    /**
     * Optional [[Geofence.extras]]
     */
    extras?: Object;
  }

  //----------------------------
  //--- GeofencesChangeEvent ---
  //----------------------------

  /**
   * The event-object provided to [[BackgroundGeolocation.onGeofencesChange]].
   *
   * The [[GeofencesChangeEvent]] provides only the *changed* geofences, those which just activated or de-activated.
   *
   * @example
   * ```typescript
   * BackgroundGeolocation.onGeofencesChange(geofencesChangeEvent => {
   *   console.log('[geofenceschange] ', geofencesChangeEvent.on, geofencesChangeEvent.off);
   * });
   * ```
   * ### ⚠️ Note:
   * - When **all** geofences have been removed, empty lists will be provided for both [[on]] & [[off]].
   */
  declare interface GeofencesChangeEvent {
    on: Array<Geofence>;
    off: Array<string>;
  }

  //----------------------------
  //--- HeartbeatEvent ---
  //----------------------------

  /**
   * The event-object provided to [[BackgroundGeolocation.onHeartbeat]]
   *
   * @example
   * ```typescript
   * BackgroundGeolocation.onHeartbeat(heartbeatEvent => {
   *   console.log('[heartbeat] ', heartbeatEvent);
   * });
   * ```
   */
  declare interface HeartbeatEvent {
    /**
     * The last-known location.
     * ### ⚠️ Note:
     * - The *heartbeat* event does not actively engage location-services.  If you wish to get the current location in your `callback`, use [[getCurrentPosition]].
     */
    location: Location;
  }

  //-----------------------
  //------ HttpEvent -------
  //-----------------------

  /**
   * The event-object provided to [[BackgroundGeolocation.onHttp]] when an HTTP response arrives from your configured [[Config.url]].
   *
   * @example
   * ```typescript
   * BackgroundGeolocation.onHttp(httpEvent => {
   *   console.log('[http] ', httpEvent.success, httpEvent.status);
   * });
   * ```
   *
   * ## HTTP Guide
   * ---------------------------------------------------------------------------------------
   *
   * The [[BackgroundGeolocation]] SDK hosts its own flexible and robust native HTTP & SQLite persistence services.  To enable the HTTP service, simply configure the SDK with an [[url]]:
   *
   * @example
   * ```typescript
   * // Listen for HTTP responses.
   * BackgroundGeolocation.onHttp(response => {
   *   console.log('[http] response: ', response.success, response.status, response.responseText);
   * });
   *
   * BackgroundGeolocation.ready({
   *   url: 'https://my-server.com/locations',
   *   autoSync: true,
   *   autoSyncThreshold: 5,
   *   batchSync: true,
   *   maxBatchSize: 50,
   *   headers: {
   *     AUTHENTICATION_TOKEN: "23kasdlfkjlksjflkasdZIds"
   *   },
   *   params: {
   *     user_id: 1234
   *   },
   *   extras: {
   *     route_id: 8675309
   *   },
   *   locationsOrderDirection: 'DESC',
   *   maxDaysToPersist: 14
   * }, state => {
   *   console.log('[ready] success: ', state);
   * });
   * ```
   *
   * ### The SQLite Database
   *
   * The SDK immediately inserts each recorded location into its SQLite database.  This database is designed to act as a temporary buffer for the HTTP service and the SDK __strongly__ desires an *empty* database.  The only way that locations are destroyed from the database are:
   * - Successful HTTP response from your server (`200`, `201`, `204`).
   * - Executing [[BackgroundGeolocation.destroyLocations]].
   * - [[maxDaysToPersist]] elapses and the location is destroyed.
   * - [[maxRecordsToPersist]] destroys oldest record in favor of latest.
   *
   * ### The HTTP Service
   *
   * The SDK's HTTP service operates by selecting records from the database, locking them to prevent duplicate requests then uploading to your server.
   * - By default, the HTTP Service will select a single record (oldest first; see [[locationsOrderDirection]]) and execute an HTTP request to your [[url]].
   * - Each HTTP request is *synchronous* &mdash; the HTTP service will await the response from your server before selecting and uploading another record.
   * - If your server returns an error or doesn't respond, the HTTP Service will immediately **halt**.
   * - Configuring [[batchSync]] __`true`__ instructs the HTTP Service to select *all* records in the database and upload them to your server in a single HTTP request.
   * - Use [[maxBatchSize]] to limit the number of records selected for each [[batchSync]] request.  The HTTP service will execute *synchronous* HTTP *batch* requests until the database is empty.
   *
   * ### HTTP Failures
   *
   * If your server does *not* return a `20x` response (eg: `200`, `201`, `204`), the SDK will __`UNLOCK`__ that record.  Another attempt to upload will be made in the future (until [[maxDaysToPersist]]) when:
   * - When another location is recorded.
   * - Application `pause` / `resume` events.
   * - Application boot.
   * - [[onHeartbeat]] events.
   * - [[onConnectivityChange]] events.
   * - __[iOS]__ Background `fetch` events.
   *
   * ### Receiving the HTTP Response.
   *
   * You can capture the HTTP response from your server by listening to the [[onHttp]] event.
   *
   * ### [[autoSync]]
   *
   * By default, the SDK will attempt to immediately upload each recorded location to your configured [[url]].
   * - Use [[autoSyncThreshold]] to throttle HTTP requests.  This will instruct the SDK to accumulate that number of records in the database before calling upon the HTTP Service.  This is a good way to **conserve battery**, since HTTP requests consume more energy/second than the GPS.
   *
   * ### Manual [[sync]]
   *
   * The SDK's HTTP Service can be summoned into action at __any time__ via the method [[BackgroundGeolocation.sync]].
   *
   * ### [[params]], [[headers]] and [[extras]]
   *
   * - The SDK's HTTP Service appends configured [[params]] to root of the `JSON` data of each HTTP request.
   * - [[headers]] are appended to each HTTP Request.
   * - [[extras]] are appended to each recorded location and persisted to the database record.
   *
   * ### Custom `JSON` Schema:  [[locationTemplate]] and [[geofenceTemplate]]
   *
   * The default HTTP `JSON` schema for both [[Location]] and [[Geofence]] can be overridden by the configuration options [[locationTemplate]] and [[geofenceTemplate]], allowing you to create any schema you wish.
   *
   * ### HTTP Logging
   *
   * You can observe the plugin performing HTTP requests in the logs for both iOS and Android (_See Wiki [Debugging](github:wiki/Debugging)_):
   *
   * @example
   * ```
   * ╔═════════════════════════════════════════════
   * ║ LocationService: location
   * ╠═════════════════════════════════════════════
   * ╟─ 📍 Location[45.519199,-73.617054]
   * ✅ INSERT: 70727f8b-df7d-48d0-acbd-15f10cacdf33
   * ╔═════════════════════════════════════════════
   * ║ HTTP Service
   * ╠═════════════════════════════════════════════
   * ✅ Locked 1 records
   * 🔵 HTTP POST: 70727f8b-df7d-48d0-acbd-15f10cacdf33
   * 🔵 Response: 200
   * ✅ DESTROY: 70727f8b-df7d-48d0-acbd-15f10cacdf33
   * ```
   *
   * |#| Log entry               | Description                                                           |
   * |-|-------------------------|-----------------------------------------------------------------------|
   * |1| `📍Location`            | Location received from native Location API.                           |
   * |2| `✅INSERT`              | Location record inserted into SDK's SQLite database.                  |
   * |3| `✅Locked`              | SDK's HTTP service locks a record (to prevent duplicate HTTP uploads).|
   * |4| `🔵HTTP POST`           | SDK's HTTP service attempts an HTTP request to your configured `url`. |
   * |5| `🔵Response`            | Response from your server.                                            |
   * |6| `✅DESTROY\|UNLOCK`     | After your server returns a __`20x`__ response, the SDK deletes that record from the database.  Otherwise, the SDK will __`UNLOCK`__ that record and try again in the future. |
   *
   */
  declare interface HttpEvent {
    /**
     * True if the HTTP request was successful (eg: `200`, `201`, `204`).
     */
    success: boolean;
    /**
     * HTTP status code (eg: `200`, `500`, `404`).
     */
    status: number;
    /**
     * HTTP response text provided by the server.
     */
    responseText: string;
  }

  //-----------------------
  //------ Location -------
  //-----------------------

  declare interface Coords {
    /**
     * __[iOS Only]__ When the environment contains indoor-tracking hardware (eg: bluetooth beacons) the current floor within a building.
     */
    floor?: number;
    /**
     * Latitude of the location.
     */
    latitude: number;
    /**
     * Longitude of the location.
     */
    longitude: number;
    /**
     * Accuracy in meters.
     */
    accuracy: number;
    /**
     * Altitude above sea-level in meters.
     */
    altitude?: number;
    /**
     * Altitude accuracy in meters.
     */
    altitude_accuracy?: number;
    /**
     * Heading in degrees.
     * ⚠️ Note:  Only present when location came from GPS.  `-1` otherwise.
     */
    heading?: number;
    /**
     * Speed in meters / second.
     * ⚠️ Note:  Only present when location came from GPS.  `-1` otherwise.
     */
    speed?: number;
  }

  /**
   * This object is attached to instances of [[Location.battery]].
   */
  declare interface Battery {
    /**
     * `true` when device is plugged in to power.
     */
    is_charging: boolean;
    /**
     * Battery level.  `0.0` = empty; `1.0` = full charge.
     */
    level: number;
  }

  /**
   * ## Javascript Callback Schema
   * @example
   * ```
   * {
   *    "timestamp":     [Date],     // <-- Javascript Date instance
   *    "event":         [String],    // <-- motionchange|geofence|heartbeat
   *    "is_moving":     [Boolean],  // <-- The motion-state when location was recorded.
   *    "uuid":          [String],   // <-- Universally unique identifier
   *    "coords": {
   *        "latitude":  [Double],
   *        "longitude": [Double],
   *        "accuracy":  [Double],
   *        "speed":     [Double],
   *        "heading":   [Double],
   *        "altitude":  [Double]
   *    },
   *    "activity": {
   *        "type": [still|on_foot|walking|running|in_vehicle|on_bicycle],
   *        "confidence": [0-100%]
   *    },
   *    "battery": {
   *        "level": [Double],
   *        "is_charging": [Boolean]
   *    },
   *    "odometer": [Double/meters]
   * }
   * ```
  ## HTTP POST Schema
  The location-data schema POSTed to your server takes the following form:
   * @example
   * ```
   * {
   *     "location": {
   *         "coords": {
   *             "latitude":   [Double],
   *             "longitude":  [Double],
   *             "accuracy":   [Double],
   *             "speed":      [Double],
   *             "heading":    [Double],
   *             "altitude":   [Double]
   *         },
   *         "extras": {   // <-- optional meta-data
   *             "foo": "bar"
   *         },
   *         "activity": {
   *             "type": [still|on_foot|walking|running|in_vehicle|on_bicycle|unknown],
   *             "confidence": [0-100%]
   *         },
   *         "geofence": {  // <-- Present only if a geofence was triggered at this location
   *             "identifier": [String],
   *             "action": [String ENTER|EXIT]
   *         },
   *         "battery": {
   *             "level": [Double],
   *             "is_charging": [Boolean]
   *         },
   *         "timestamp": [ISO-8601 UTC], // eg:  "2015-05-05T04:31:54.123Z"
   *         "uuid":      [String],       // <-- Universally unique identifier
   *         "event"      [String],       // <-- motionchange|geofence|heartbeat
   *         "is_moving": [Boolean],      // <-- The motion-state when recorded.
   *         "odometer": [Double/meters]
   *     }
   *  }
   * ```
   *
   */
  declare export interface Location {
    /**
     * `ISO-8601 UTC` timestamp provided by the native location API.
     */
    timestamp: string;
    /**
     * Distance-traveled in meters.
     * ℹ️
     * - [[BackgroundGeolocation.resetOdometer]]
     * - [[BackgroundGeolocation.getOdometer]]
     */
    odometer: number;
    /**
     * `true` if location was recorded while plugin is in the *moving* state.
     */
    isMoving: boolean;
    /**
     * Universally Unique Identifier.  You can use this to match locations recorded at your server with those in the logs.
     * It can also be used to ensure if the plugin has ever posted the same location *twice*.
     */
    uuid: string;
    /**
     * Event responsible for generating this location (`motionchange`, `providerchange`, `geofence`, `heartbeat`).
     */
    event?: string;
    /**
     * __[Android only]__.  Present (and `true`) if the location was generated by a "Fake Location" application.
     */
    mock?: boolean;
    /**
     * `true` if the plugin is currently waiting for the best possible location to arrive.  Samples are recorded when the plugin is transitioning between motion-states (*moving* vs *stationary*) or [[BackgroundGeolocation.getCurrentPosition]].
     * If you're manually posting location to your server, you should not persist these "samples".
     */
    sample?: boolean;
    /**
     * `latitude`, `longitude`, `speed`, `heading`, etc.
     */
    coords: Coords;
    /**
     * Device battery level when the location was recorded.
     */
    battery: Battery;
    /**
     * Optional arbitrary meta-data attached to this location.
     */
    extras?: Object;
    // /**
    // * If this location was recorded due to a geofence transition, the corresponding geofence-event.
    // */
    // geofence?: GeofenceEvent;
    // /**
    // * Device motion-activity when this location was recorded (eg: `still`, `on_foot`, `in_vehicle`).
    // */
    // activity: MotionActivityEvent;
    // /**
    // * If this location was recorded due to [[ProviderChangeEvent]], this is a reference to the location-provider state.
    // */
    // provider?: ProviderChangeEvent;
  }

  //-----------------------
  //------ LocationAuthorizationAlert -------
  //-----------------------

  /**
   * __`[iOS only]`__ Controls the text-elements of the plugin's location-authorization dialog.
   *
   * When you configure the plugin [[locationAuthorizationRequest]] __`Always`__ or __`WhenInUse`__ and the user *changes* the mode in the app's location-services settings or disabled location-services, the plugin will display an Alert dialog directing the user to the **Settings** screen.  **`locationAuthorizationAlert`** allows you to configure all the Strings for that Alert popup and accepts an `{}` containing the following keys:
   *
   * ![](https://dl.dropboxusercontent.com/s/wyoaf16buwsw7ed/docs-locationAuthorizationAlert.jpg?dl=1)
   */
  declare interface LocationAuthorizationAlert {
    /**
     * The title of the alert if user changes, for example, the location-request to `WhenInUse` when you requested `Always`.
     *
     * Defaults to `Location services are off`.
     */
    titleWhenOff: string;
    /**
     * The title of the alert when user disables location-services or changes the authorization request to `Never`.
     *
     * Defaults to `Background location is not enabled`.
     */
    titleWhenNotEnabled: string;
    /**
     * The body text of the alert.
     *
     * Defaults to: `To use background location, you must enable {locationAuthorizationRequest} in the Location Services settings`.
     */
    instructions: string;
    /**
     * Cancel button label.
     *
     * Defaults to `Cancel`.
     */
    cancelButton: string;
    /**
     * Settings button label.
     *
     * Defaults to `Settings`.
     */
    settingsButton: string;
  }

  //---------------------
  //------ Logger -------
  //---------------------

  /**
  * Append your own log-messages into the plugin's logging database.  The following methods are available at [[BackgroundGeolocation.logger]]:
  *
  ### Methods
  | method     | logLevel | icon            |
  |------------|----------|-----------------|
  |`error`     |`ERROR`   | ❗️              |
  |`warn`      |`WARNING` | ⚠️              |
  |`debug`     |`DEBUG`   | 🐞              |
  |`info`      |`INFO`    | ℹ️              |
  |`notice`    |`INFO`    | 🔵              |
  |`header`    |`INFO`    | *message wrapped in box*    |
  |`on`        |`INFO`    | 🎾              |
  |`off`       |`INFO`    | 🔴              |
  |`ok`        |`INFO`    | ✅              |
  * @example
  *
  * ```javascript
  * BackgroundGeolocation.logger.error("Something bad happened");
  * BackgroundGeolocation.logger.warn("Something weird happened");
  * BackgroundGeolocation.logger.debug("Debug message");
  * BackgroundGeolocation.logger.info("Something informative");
  * BackgroundGeolocation.logger.notice("Something interesting");
  * BackgroundGeolocation.logger.header("Something bold");
  * BackgroundGeolocation.logger.on("Something on or positive");
  * BackgroundGeolocation.logger.off("Something off or negative");
  * BackgroundGeolocation.logger.ok("Something affirmative happened");
  * ```
  ### Viewing Logs
  When developing for Android, it's a good idea to *tail* the Android device logs with [logcat](https://developer.android.com/studio/command-line/logcat):
  * @example
  * ```bash
  * $ adb logcat -s TSLocationManager
  * ```
  *
  ### ℹ️ See also:
  - [[logLevel]]
  - [[getLog]]
  - [[emailLog]]
  - [Debugging Guide](github:wiki/Debugging)
  */
  declare interface Logger {
    error: (message: string) => void;
    warn: (message: string) => void;
    debug: (message: string) => void;
    info: (message: string) => void;
    notice: (message: string) => void;
    header: (message: string) => void;
    on: (message: string) => void;
    off: (message: string) => void;
    ok: (message: string) => void;
  }

  //-----------------------
  //------ MotionActivityEvent -------
  //-----------------------

  /**
   * The event-object provided to [[BackgroundGeolocation.onActivityChange]].  Also attached to each recorded [[Location]].
   *
   * @example
   * ```typescript
   * BackgroundGeolocation.onActivityChange(activityChangeEvent => {
   *   console.log('[activitychange] ', activityChangeEvent.activity, activityChangeEvent.confidence);
   * });
   * ```
   */
  declare interface MotionActivityEvent {
    /**
     * The reported device motion activity.
     *
     * | Activity Name  |
     * |----------------|
     * | `in_vehicle`   |
     * | `on_bicycle`   |
     * | `on_foot`      |
     * | `running`      |
     * | `walking`      |
     */
    activity: string;
    /**
     * Confidence of the reported device motion activity in %.
     */
    confidence: number;
  }

  //-----------------------
  //------ MotionChangeEvent -------
  //-----------------------

  /**
   * The event-object provided to [[BackgroundGeolocation.onMotionChange]] when the SDK changes state between *moving* and *stationary*.
   */
  declare interface MotionChangeEvent {
    /**
     * `true` when the device has begun *moving* and the SDK engaged location-tracking.  `false` when *stationary*.
     */
    isMoving: boolean;
    /**
     * The corresponding [[Location]] where the event occurred.
     */
    location: Location;
  }

  //-----------------------
  //---- Notification -----
  //-----------------------

  /**
   * __[Android only]__ The Android operating system requires a persistent notification when running a foreground service.
   *
   * ![](https://dl.dropbox.com/s/acuhy5cu4p7uofr/android-foreground-service-default.png?dl=1)
   *
   * @example
   * ```typescript
   * BackgroundGeolocation.ready({
   *   notification: {
   *     title: "The Title",
   *     text: "The Text"
   *   }
   * })
   * .
   * .
   * .
   * // To update the notification in real-time, use #setConfig
   * // You need only provide *changed* parameters --  initially configured
   * // parameters will remain unchanged.
   * BackgroundGeolocation.setConfig({
   *   notification: {
   *     title: "The New Title"
   *   }
   * })
   * ```
   *
   * ## Custom Notification Layouts
   *
   * Use the [[layout]] option to provide the name of your own Android Layout XML File.  See [Android Custom Notification Layout](github:wiki/Android-Custom-Notification-Layout) for setup instructions.
   */
  declare interface Notification {
    /**
     * When running the service with [[foregroundService]]: true, Android requires a persistent notification in the Notification Bar.  This will control the **priority** of that notification as well as the position of the notificaiton-bar icon.
     *
     * The following `notificationPriority` values defined as static constants upon the [[BackgroundGeolocation]] object:
     *
     * | Value                                                   | Description                                                                                             |
     * |---------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
     * | [[BackgroundGeolocation.NOTIFICATION_PRIORITY_DEFAULT]] | Notification weighted to top of list; notification-bar icon weighted left                               |
     * | [[BackgroundGeolocation.NOTIFICATION_PRIORITY_HIGH]]    | Notification **strongly** weighted to top of list; notification-bar icon **strongly** weighted to left  |
     * | [[BackgroundGeolocation.NOTIFICATION_PRIORITY_LOW]]     | Notification weighted to bottom of list; notification-bar icon weighted right                           |
     * | [[BackgroundGeolocation.NOTIFICATION_PRIORITY_MAX]]     | Same as `NOTIFICATION_PRIORITY_HIGH`                                                                    |
     * | [[BackgroundGeolocation.NOTIFICATION_PRIORITY_MIN]]     | Notification **strongly** weighted to bottom of list; notification-bar icon **hidden**                  |
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   foregroundService: true,
     *   notification: {
     *     priority: BackgroundGeolocation.NOTIFICATION_PRIORITY_MIN
     * });
     * ```
     */
    priority?: NotificationPriority;

    /**
     * Configure the *title* of the persistent notification in the Notification Bar when running with [[Config.foregroundService]] __`true`__
     * @break
     *
     * Defaults to the application name from `AndroidManifest`.  When running the service with [[foregroundService]]: true, Android requires a persistent notification.  This will configure the **title** of that notification.
     */
    title?: string;

    /**
     * Configure the *text* of the persistent notification in the Notification Bar when running with [[Config.foregroundService]] __`true`__
     * @break
     *
     * Defaults to *"Location service activated"*.  When running the service with [[Config.foregroundService]]: true, Android requires a persistent notification.  This will configure the **text** of that notification.
     */
    text?: string;

    /**
     * Configure the *color* of the persistent notification icon in the Notification Bar when running with [[Config.foregroundService]] __`true`__
     * @break
     *
     * Defaults to `null`.  When running the service with [[Config.foregroundService]]: true, Android requires a persistent notification.  This will configure the **color** of the notification **icon** (API >= 21).
     *
     * Supported formats are:
     * - `#RRGGBB`
     * - `#AARRGGBB`
     */
    color?: string;

    /**
     * Configure the *small icon* of the persistent notification in the Notification Bar when running with [[Config.foregroundService]] __`true`__
     * @break
     *
     * When running the service with [[Config.foregroundService]]: true, Android requires a persistent notification in the Notification Bar.  This allows you customize that icon.  Defaults to your application icon.
     *
     * ### ⚠️ Warning:
     * - You must specify the **`type`** (`drawable|mipmap`) of resource you wish to use in the following format: `{type}/icon_name`
     * - Do not append the file-extension (eg: `.png`)
     *
     * @example
     * ```javascript
     * // 1. drawable
     * BackgroundGeolocation.ready({
     *   notification: {
     *     smallIcon: "drawable/my_custom_notification_small_icon"
     *   }
     * });
     *
     * // 2. mipmap
     * BackgroundGeolocation.ready({
     *   notification: {
     *     smallIcon: "mipmap/my_custom_notification_small_icon"
     *   }
     * });
     * ```
     *
     * ### ℹ️ See also:
     * - [[largeIcon]]
     */
    smallIcon?: string;

    /**
     * Configure the *large icon* of the persistent notification in the Notification Bar when running with [[Config.foregroundService]] __`true`__
     * @break
     *
     * When running the service with [[Config.foregroundService]]: true, Android requires a persistent notification in the Notification Bar.  This allows you customize that icon.  Defaults to your application icon.
     *
     * ### ⚠️ Warning:
     * - You must specify the **`type`** (`drawable|mipmap`) of resource you wish to use in the following format: `{type}/icon_name`
     * - Do not append the file-extension (eg: `.png`)
     *
     * @example
     * ```javascript
     * // 1. drawable
     * BackgroundGeolocation.ready({
     *   notification: {
     *     smallIcon: "drawable/my_custom_notification_small_icon"
     * });
     *
     * // 2. mipmap
     * BackgroundGeolocation.ready({
     *   notification: {
     *     smallIcon: "mipmap/my_custom_notification_small_icon"
     *   }
     * });
     * ```
     *
     * ### ℹ️ See also:
     * - [[smallIcon]]
     */
    largeIcon?: string;

    /**
    * Specifies the name of your custom Android Layout XML file.
    *
    ℹ️ See [Android Custom Notification Layout](github:wiki/Android-Custom-Notification-Layout) for setup instructions.
    ![](https://dl.dropbox.com/s/whcb6q1gxxdk9t1/android-foreground-notification-transistor.png?dl=1)
    Even if you have no experience with Android Layouts, it doesn't take much to figure out the basics.  You'll mostly be adding `<TextView />`, `<ImageView />` and `<Button />` elements.  The key thing to be aware of is the `android:id` of these elements and how these are referenced from `BackgroundGeolocation.notification` configuration:  your `android:id` **must** be prefixed with the word `notification` (eg: `notificationText`).  There is one exception: `applicationName`, which the plugin will automatically render your Android application name.
    ### Layout Special Elements
    When BackgroundGeolocation renders your custom notification layout, it will be querying for the following elements addressed by their `android:id`.  When found, their content will be updated from the corresponding "Data-source":
    | Layout element `android:id`   | Data-source                               |
    |-------------------------------|-------------------------------------------|
    | `applicationName`             | *Application name* from `AndroidManifest` |
    | `notificationTitle`           | [[title]]                                 |
    | `notificationText`            | [[text]]                                  |
    | `notificationSmallIcon`       | [[smallIcon]]                             |
    | `notificationLargeIcon`       | [[largeIcon]]                             |
    @example
    * ```typescript
    * BackgroundGeolocation.ready({
    *   notification: {
    *     layout: "my_notification_layout",  // <-- custom layout xml file
    *     title: "The Notification Title",
    *     text: "The Notification Text",
    *     smallIcon: "mipmap/my_small_icon", // <-- defaults to app icon
    *     largeIcon: "mipmap/my_large_icon"
    *   }
    * });
    * ```
    ### Custom `<TextView />` Elements
    You can declare your own custom `<TextView />` elements and render data into them using the [[strings]] parameter.
    @example
    * ```xml
    * <TextView
    *     android:id="@+id/myCustomElement"  // <-- myCustomElement
    *     android:layout_width="match_parent"
    *     android:layout_height="wrap_content"
    *     android:text="notificationTitle" />
    * ```
    You can provide data to your custom elements using the [[strings]] configuration parameter:
    @example
    * ```typescript
    * BackgroundGeolocation.ready({
    *   notification: {
    *     strings: {
    *       myCustomElement: "My Custom Element Text"
    *     }
    *   }
    * });
    * ```
    ### Custom `<Button />` Elements:
    You can declare your own custom `<Button />` elements and register click-listeners upon them using the [[actions]] parameter:
    @example
    * ```xml
    * <Button
    *     android:id="@+id/notificationButtonFoo" // <-- notificationButtonFoo
    *     style="@style/Widget.AppCompat.Button.Small"
    *     android:layout_width="60dp"
    *     android:layout_height="40dp"
    *     android:text="Foo" />
    * ```
    Register listeners for your button using the [[actions]] parameter:
    @example
    * ```typescript
    * BackgroundGeolocation.ready({
    *   notification: {
    *     actions: [  // <-- register button listeners
    *       'notificationButtonFoo',
    *       'notificationButtonBar'
    *     ]
    *   }
    * });
    *
    * // Listen to custom button clicks:
    * BackgroundGeolocation.onNotificationAction((buttonId) => {
    *   console.log('[onNotificationAction] - ', buttonId);
    *   switch(buttonId) {
    *     case 'notificationButtonFoo':
    *       break;
    *     case 'notificationButtonBar':
    *       break;
    *   }
    * });
    * ```
    ### Sample Layout
    As a starting-point for your custom layout, copy the following content into your new file:
    @example
    * ```xml
    * <?xml version="1.0" encoding="utf-8"?>
    * <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    *     xmlns:tools="http://schemas.android.com/tools"
    *     android:layout_width="match_parent"
    *     android:layout_height="135dp"
    *     android:gravity="start"
    *     android:adjustViewBounds="true"
    *     android:orientation="vertical"
    *     android:padding="15dp">
    *
    *     <LinearLayout
    *         android:layout_width="match_parent"
    *         android:layout_height="wrap_content"
    *         android:layout_marginBottom="15dp"
    *         android:gravity="center"
    *         android:orientation="horizontal">
    *
    *         <ImageView
    *             android:id="@+id/notificationSmallIcon"
    *             android:layout_width="16dp"
    *             android:layout_height="16dp"
    *             android:tint="@android:color/background_dark"
    *             tools:srcCompat="@tools:sample/avatars" />
    *
    *         <TextView
    *             android:id="@+id/applicationName"
    *             android:layout_width="match_parent"
    *             android:layout_height="match_parent"
    *             android:paddingLeft="10dp"
    *             android:text="applicationName"
    *             android:textAppearance="@style/TextAppearance.Compat.Notification.Title"
    *             android:textColor="#888888"
    *             android:textSize="12sp" />
    *     </LinearLayout>
    *
    *     <TextView
    *         android:id="@+id/notificationTitle"
    *         style="@style/TextAppearance.Compat.Notification.Title"
    *         android:layout_width="match_parent"
    *         android:layout_height="wrap_content"
    *         android:text="notificationTitle"
    *         android:textSize="14sp" />
    *
    *     <TextView
    *         android:id="@+id/notificationText"
    *         style="@style/TextAppearance.Compat.Notification.Line2"
    *         android:layout_width="match_parent"
    *         android:layout_height="wrap_content"
    *         android:text="notificationText"
    *         android:textSize="14sp" />
    *
    *     <LinearLayout
    *         android:layout_width="match_parent"
    *         android:layout_height="wrap_content"
    *         android:layout_weight="1"
    *         android:gravity="right"
    *         android:orientation="horizontal">
    *
    *         <Button
    *             android:id="@+id/notificationButtonFoo"
    *             style="@style/Widget.AppCompat.Button.Small"
    *             android:layout_width="60dp"
    *             android:layout_height="40dp"
    *             android:text="FooA" />
    *
    *         <Button
    *             android:id="@+id/notificationButtonBar"
    *             style="@style/Widget.AppCompat.Button.Small"
    *             android:layout_width="60dp"
    *             android:layout_height="40dp"
    *             android:text="Bar" />
    *     </LinearLayout>
    * </LinearLayout>
    * ```
    ![](https://dl.dropbox.com/s/k2l0oaqk86axfgu/android-custom-layout-elements.png?dl=1)
    ### Using your custom layout:
    @example
    * ```typescript
    * BackgroundGeolocation.ready({
    *   notification: {
    *     title: 'The title',
    *     text: 'The text',
    *     layout: 'notification_layout',
    *     actions: [
    *       'notificationButtonFoo',  // <-- register button click-listeners
    *       'notificationButtonBar'
    *     ],
    *     strings: {
    *       'myCustomTextBox1': 'custom TextBox element'
    *     }
    *   }
    * });
    *
    * // Listen to custom notification button clicks (notification.actions)
    * BackgroundGeolocation.onNotificationAction((buttonId) => {
    *   console.log('[onNotificationAction] - ', buttonId);
    *   switch(buttonId) {
    *     case 'notificationButtonFoo':
    *       // Handle button click on [Foo]
    *       break;
    *     case 'notificationButtonBar':
    *       // Handle button click on [Bar]
    *       break;
    *   }
    * });
    * ```
    */
    layout?: string;

    /**
    * Custom strings to render into `<TextView />` elements of a custom notification [[layout]].
    ℹ️ See [Android Custom Notification Layout](github:wiki/Android-Custom-Notification-Layout) for setup instructions.
    You can declare your own custom `<TextView />` elements and render data into them using the `notification.strings` parameter.
    @example
    * ```xml
    * <TextView
    *     android:id="@+id/myCustomElement"  // <-- myCustomElement
    *     android:layout_width="match_parent"
    *     android:layout_height="wrap_content"
    *     android:text="notificationTitle" />
    * ```
    You can provide data to your custom elements using the [[strings]] configuration parameter:
    @example
    * ```typescript
    * BackgroundGeolocation.ready({
    *   notification: {
    *     strings: {
    *       myCustomElement: "My Custom Element Text"
    *     }
    *   }
    * });
    * ```
    */
    strings?: Object;
    /**
    * Declare click listeners for `<Button />` elements of a custom notification [[layout]].
    ![](https://dl.dropbox.com/s/whcb6q1gxxdk9t1/android-foreground-notification-transistor.png?dl=1)
    ℹ️ See [Android Custom Notification Layout](github:wiki/Android-Custom-Notification-Layout) for setup instructions.
    You can declare your own custom `<Button />` elements and register click-listeners upon them using the [[actions]] parameter:
    @example
    * ```xml
    * <Button
    *     android:id="@+id/notificationButtonPause" // <-- notificationButtonPause
    *     style="@style/Widget.AppCompat.Button.Small"
    *     android:layout_width="60dp"
    *     android:layout_height="40dp"
    *     android:text="Foo" />
    * ```
    Register listeners for your button using `notification.actions`:
    @example
    * ```typescript
    * BackgroundGeolocation.ready({
    *   notification: {
    *     actions: [  // <-- register button listeners
    *       'notificationButtonPause'
    *     ]
    *   }
    * });
    *
    * // Listen to custom button clicks:
    * BackgroundGeolocation.onNotificationAction((buttonId) => {
    *   console.log('[onNotificationAction] - ', buttonId);
    *   switch(buttonId) {
    *     case 'notificationButtonPause':
    *       BackgroundGeolocation.changePace(false);
    *       break;
    *     .
    *     .
    *     .
    *   }
    * });
    * ```
    */
    actions?: Object;

    /**
     * Configure the name of the plugin's notification-channel used to display the [[Config.foregroundService]] notification.
     * @break
     *
     * On Android O+, the plugin's foreground-service needs to create a "Notification Channel".  The name of this channel can be seen in:
     * > `Settings->App & Notifications->Your App.`
     *
     * Defaults to your application's name from `AndroidManifest`.
     *
     * ![](https://dl.dropboxusercontent.com/s/zgcxau7lyjfuaw9/android-notificationChannelName.png?dl=1)\
     *
     *
     * @example
     * ```javascript
     * BackgroundGeolocation.ready({
     *   notification: {
     *     channelName: "Location Tracker"
     *   }
     * });
     *
     * // or with #setConfig
     * BackgroundGeolocation.setConfig({
     *   notification: {
     *     channelName: "My new channel name"
     *   }
     * });
     * ```
     */
    channelName?: string;
  }

  //---------------------------
  //--- ProviderChangeEvent ---
  //---------------------------

  /**
   * The event-object provided to [[BackgroundGeolocation.onProviderChange]]
   *
   * @example
   * ```typescript
   * BackgroundGeolocation.onProviderChange(providerChangeEvent => {
   *   console.log('[providerchange] ', provider.enabled, provider.status, provider.network, provider.gps);
   * });
   * ```
   */
  declare interface ProviderChangeEvent {
    /**
     * `true` When device location-services are enabled.
     */
    enabled: boolean;
    /**
     * Authorization status of location-services.  For iOS, this will tell you if the user has enabled "Always" or "When in Use" authorization.
     *
     * | Name                                    | Platform      |
     * |-----------------------------------------|---------------|
     * | [[AUTHORIZATION_STATUS_NOT_DETERMINED]] | iOS only      |
     * | [[AUTHORIZATION_STATUS_RESTRICTED]]     | iOS only      |
     * | [[AUTHORIZATION_STATUS_DENIED]]         | iOS & Android |
     * | [[AUTHORIZATION_STATUS_ALWAYS]]         | iOS & Android |
     * | [[AUTHORIZATION_STATUS_WHEN_IN_USE]]    | iOS only      |
     *
     * ### ℹ️ Note:
     * - When Android location permission is **granted**, `status` == [[AUTHORIZATION_STATUS_ALWAYS]], otherwise [[AUTHORIZATION_STATUS_DENIED]].
     */
    status: AuthorizationStatus;
    /**
     * `true` if network geolocation provider is available.
     */
    network: boolean;
    /**
     * `true` if GPS geolocation provider is available.
     */
    gps: boolean;
  }

  //----------------------
  //------ Sensors -------
  //----------------------

  /**
   * Detected device sensors related to motion-detection.
   */
  declare interface Sensors {
    /**
     * `ios` | `android`
     */
    platform: string;
    /**
     * `true` when the device has an accelerometer.
     */
    accelerometer: boolean;
    /**
     * `true` when the device has a magnetometer (compass).
     */
    magnetometer: boolean;
    /**
     * `true` when the device has a gyroscope.
     */
    gyroscope: boolean;
    /**
     * __[Android only]__ `true` when the Android device has significant motion hardware.
     */
    significant_motion?: boolean;
    /**
     * __[iOS only]__ `true` when the device has an __M7__ motion co-processor (iPhone 5S and up).
     */
    motion_hardware?: boolean;
  }

  //-------------------
  //------ State ------
  //-------------------

  /**
   * This `State` object contains all the provided [[Config]] options in addition to:
   * - [[enabled]].
   * - [[schedulerEnabled]].
   * - [[trackingMode]].
   * - [[odometer]].
   */
  declare interface Status {
    /**
     * `true` when the SDK has been enabled via methods [[start]] or [[startGeofences]].  When `false`, the
     * SDK is completely __OFF__.  No tracking of any kind will occur.  The SDK will consume no energy.
     */
    enabled: boolean;
    /**
     * `true` when the SDK is currently configured with a [[schedule]] and [[startSchedule]] has been executed.
     * [[stopSchedule]] will set this to `false`.
     */
    schedulerEnabled: boolean;
    /**
    | Value      | Description                       |
  	|------------|-----------------------------------|
  	| __`0`__    | Monitoring geofences only         |
  	| __`1`__    | Monitoring location + geofences   |
    */
    trackingMode: TrackingMode;
    /**
     * The current distance-traveled.
     * ### ℹ️ See also:
     * - [[resetOdometer]], [[setOdometer]]
     * - [[getOdometer]]
     */
    odometer: number;
  }

  declare type State = Status & Config;

  //-----------------------------
  //--- WatchPositionRequest ----
  //-----------------------------

  /**
   * Options provided to [[BackgroundGeolocation.watchPosition]].
   *
   * @example
   * ```javascript
   * BackgroundGeolocation.watchPosition((location) => {
   *   console.log('[watchPosition] -', location);
   * }, (errorCode) => {
   *   console.log('[watchPosition] ERROR -', errorCode);
   * }, {
   *   interval: 1000,
   *   desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
   *   persist: true,
   *   extras: {foo: 'bar'},
   *   timeout: 60000
   * });
   * ```
   */
  declare interface WatchPositionRequest {
    /**
     * Location update interval in `milliseconds`.  Defaults to `1000`.
     */
    interval?: number;
    /**
     * Specifies the accuracy required.  See [[Config.desiredAccuracy]].  Only [[BackgroundGeolocation.DESIRED_ACCURACY_HIGH]] uses GPS.
     * Defaults to [[DESIRED_ACCURACY_HIGH]].
     */
    desiredAccuracy?: LocationAccuracy;
    /**
     * Set `true` to persist each recorded location to the plugin's database.
     * Defaults to `true` when [[State.enabled]], `false` otherwise.
     */
    persist?: boolean;
    /**
     * Arbitrary key/values to append to each recorded location.
     */
    extras?: Object;
    /**
     * Time in `milliseconds` to wait before firing error callback when location fails to arrive.
     * Defaults to `60000`.
     */
    timeout?: number;
  }
}
