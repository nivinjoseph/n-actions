import "@nivinjoseph/n-ext";
export declare abstract class ConfigurationManager {
    private constructor();
    static initializeProviders(providers: ReadonlyArray<ConfigurationProvider>): Promise<void>;
    static getConfig<T>(key: string): T;
    static requireConfig(key: string): unknown;
    static requireStringConfig(key: string): string;
    static requireNumberConfig(key: string): number;
    static requireBooleanConfig(key: string): boolean;
}
export interface ConfigurationProvider {
    provide(): Promise<Object>;
}
