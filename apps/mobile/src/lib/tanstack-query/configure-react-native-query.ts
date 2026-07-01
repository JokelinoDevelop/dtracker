// oxlint-disable promise/prefer-await-to-then
import { onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";

let isConfigured = false;

export function configureReactNativeQuery() {
  if (isConfigured) {
    return;
  }

  isConfigured = true;

  onlineManager.setEventListener((setOnline) => {
    let initialised = false;

    const eventSubscription = Network.addNetworkStateListener((state) => {
      initialised = true;
      setOnline(!!state.isConnected);
    });

    Network.getNetworkStateAsync()
      .then((state) => {
        if (!initialised) {
          setOnline(!!state.isConnected);
        }
      })
      .catch(() => {
        // getNetworkStateAsync can reject on some platforms/SDK versions
      });

    return eventSubscription.remove;
  });
}
