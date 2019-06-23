import { describe, it } from 'flow-typed-test';

import BackgroundGeolocation, {
  type Location,
} from 'react-native-background-geolocation-android';

describe('#getState', () => {
  it('should retrieve the state', () => {
    BackgroundGeolocation.getState(state => console.log({ state }));
  });
});

describe('#setConfig', () => {
  it('should retrieve the state', () => {
    BackgroundGeolocation.setConfig({
      params: {},
      headers: {},
    });
  });

  it('should throwretrieve the state', () => {
    // $ExpectError: Wrong config values
    BackgroundGeolocation.setConfig({
      foo: {},
      bar: {},
    });
  });
});

describe('#getLocations', () => {
  it('should retrieve the state', () => {
    BackgroundGeolocation.getLocations(locations => console.log({ locations }));
  });
});
