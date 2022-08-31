import "@nivinjoseph/n-ext";
export declare abstract class ConfigurationManager {
    private constructor();
    static initializeProviders(providers: ReadonlyArray<ConfigurationProvider>): Promise<void>;
    static getConfig<T>(key: string): T;
}
export interface ConfigurationProvider {
    provide(): Promise<Object>;
}
