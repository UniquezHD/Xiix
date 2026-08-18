declare global {
  interface Window {
    volumeAPI: {
      get: () => Promise<number>;
      set: (value: number) => Promise<void>;
    };

     windowState: {
      set: (value: number) => Promise<void>;
    };

    electron: {
      send: (channel: string, data: object) => Promise<void>;
      on: (channel: string, callback: (data: unknown) => void) => void;
    }
  }
}

export {};