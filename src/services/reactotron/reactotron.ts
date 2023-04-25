import { Reactotron } from './reactotronClient';
import {
  DEFAULT_REACTOTRON_CONFIG,
  ReactotronConfig,
} from './reactotronConfig';
import { fakeReactotron } from './reactotronFake';

declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

if (__DEV__) {
  console.tron = Reactotron;
} else {
  console.tron = fakeReactotron;
}

const config = DEFAULT_REACTOTRON_CONFIG;

let _reactotronIsSetUp = false;

export function setupReactotron(customConfig: ReactotronConfig = {}) {
  // only run this in dev... metro bundler will ignore this block: 🎉
  if (__DEV__) {
    // only setup once.
    if (_reactotronIsSetUp) return;

    // merge the passed in config with our default config
    Object.assign(config, customConfig);

    // configure reactotron
    Reactotron.configure({
      name: config.name || require('../../../package.json').name,
      host: config.host,
    });

    // ignore some chatty `mobx-state-tree` actions
    const RX = /postProcessSnapshot|@APPLY_SNAPSHOT/;

    // connect to the app
    Reactotron.connect();

    // clear if we should
    if (config.clearOnLoad) {
      Reactotron.clear();
    }

    _reactotronIsSetUp = true;
  }
}
