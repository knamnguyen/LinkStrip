import React, { useState, useEffect, useCallback } from 'react';

export default function useSyncedState(key, defaultValue) {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    const loadStateFromStorage = async () => {
      let result = await new Promise((resolve) => {
        chrome.storage.local.get([key], (result) => {
          resolve(result);
        });
      });

      if (result[key]) {
        setState(result[key]);
      }
      setLoading(false);
    };

    loadStateFromStorage();

    const onChanged = (changes, area) => {
      if (area === 'local' && changes[key]) {
        setState(changes[key].newValue);
      }
    };

    chrome.storage.onChanged.addListener(onChanged);

    return () => {
      chrome.storage.onChanged.removeListener(onChanged);
    };
  }, [key]);

  const saveStateToStorage = useCallback(
    async (newValue) => {
      await new Promise((resolve) => {
        chrome.storage.local.set({ [key]: newValue }, resolve);
      });
      setState(newValue);
      console.log(key, ' saved to storage: ', newValue);
    },
    [key]
  );

  return [state, saveStateToStorage, loading];
}
