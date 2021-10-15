export declare function tmpFile(nameSuffix?: string): string;
export declare function deleteFile(filepath: string): Promise<void>;
export declare function fileExists(filepath: string): Promise<boolean>;
export declare function isCompressed(filepath: string): 'gzip' | 'zip' | undefined;
export declare function ungzip(file: string): Promise<string>;
export declare function gzip(file: string): Promise<string>;
