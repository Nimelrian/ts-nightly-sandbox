import { Result, ok } from "./result";
import { Unit } from "./unit";

export type FieldType = "text" | "number" | "password";

export type Validator<ValueType, Error extends string | number> = (value: ValueType) => Result<Unit, Error>;

export type ViewProps<Error extends string | number> = TextProps<Error> | NumberProps<Error> | PasswordProps<Error>;

export type TextProps<Error extends string | number> = BaseProps<string, Error> & { type: "text" };
export type NumberProps<Error extends string | number> = BaseProps<number, Error> & { type: "number" };
export type PasswordProps<Error extends string | number> = BaseProps<string, Error> & { type: "password" };

export type BaseProps<Value, Error extends string | number> = UnvalidatedProps<Value> | ValidatedProps<Value, Error>;

export type UnvalidatedProps<Value> = SharedProps<Value> & {
	validation?: never;
	onValidationError?: never;
};

export type ValidatedProps<Value, Error extends string | number> = SharedProps<Value> & {
	validation?: Array<Validator<Value, Error>>;
	onValidationError(error: Error): void;
};

export interface SharedProps<Value> {
	value: Value;
	onChange(value: Value): void;
}

declare function fn<Error extends string | number>(p: ViewProps<Error>): any;
declare function fn2<Value, Error extends string | number>(p: BaseProps<Value, Error>): any;

fn({
	type: "text",
	value: "Hello",
	onChange: v => null,
	validation: [v => ok()],
	onValidationError: (v: number) => null
});

fn2({
	value: "Hello",
	onChange: v => null,
	validation: [v => ok()],
	onValidationError: (v: number) => null
});

