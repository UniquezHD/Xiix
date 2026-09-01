declare global {
  interface Window {
    electron: {
      send: (channel: string, data: object) => Promise<void>;
      on: (channel: string, callback: (data: unknown) => void) => void;

      volumeAPI: {
        get: () => Promise<number>;
        set: (value: number) => Promise<void>;
      };

      directory: {
        get: () => Promise<any>;
      };

      gameData: {
        get: () => Promise<any>;
      };

      versions: {
        get: () => Promise<any>;
      };

      windowState: {
        set: (value: number) => Promise<void>;
      };
    };
  }
}

export {};
