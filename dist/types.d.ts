declare type TypeFunction = (target: any) => boolean;
interface TypesUtil {
    [propName: string]: TypeFunction;
}
declare const Types: TypesUtil;
export declare const supportedTypes: string[];
export default Types;
