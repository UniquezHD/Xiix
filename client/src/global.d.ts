declare global {
  interface Window {
    volumeAPI: {
      get: () => Promise<number>;
      set: (value: number) => Promise<void>;
    };

    directory: {
      get: () => Promise<any>;
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