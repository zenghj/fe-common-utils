export declare class Validator {
    static isEmpty(str?: string): boolean;
}
export declare class ValidateResult {
    msg: string;
    valid: Boolean;
    constructor({ msg, valid }: {
        msg: any;
        valid: any;
    });
    isValid(): Boolean;
    getMsg(): string;
}
export declare class ValidateError extends ValidateResult {
    constructor(msg?: string);
}
export declare class ValidateSuccess extends ValidateResult {
    constructor();
}
