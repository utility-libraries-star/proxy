interface IParserValue {
    url: string;
    options: string;
    target: string;
}
export declare class TransformService {
    parserValue({ url, options, target }: IParserValue): Promise<any>;
}
export {};
