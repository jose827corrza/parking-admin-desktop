export interface SecureStoreApi {
    setItem: (key: string, value: string) => Promise<void>;
    getItem: (key: string) => Promise<string | null>;
    removeItem: (key: string) => Promise<void>;
    clear: () => Promise<void>;
}

declare global {
    interface Window {
        secureStore: SecureStoreAPI;
    }
}