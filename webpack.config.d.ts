declare let multipleEntryPoints: {
    [k: string]: string;
};
export declare const mode: string;
export declare const devtool: string;
export declare namespace devServer {
    export namespace _static {
        const directory: string;
    }
    export { _static as static };
    export const compress: boolean;
    export const port: number;
}
export declare const target: string;
export { multipleEntryPoints as entry };
export declare namespace output {
    const path: string;
    const filename: string;
}
export declare namespace resolve {
    const extensions: string[];
}
export declare namespace module {
    const rules: {
        test: RegExp;
        loader: string;
        exclude: RegExp;
    }[];
}
export declare const plugins: any[];
