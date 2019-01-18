import { Unit, unit } from "./unit";

type Ok<T, E> = { val: T, _tag: "Ok" };
type Err<T, E> = { val: E, _tag: "Err" };
export type Result<T, E> =
    | Ok<T, E>
    | Err<T, E>;

export function ok<T, E>(value: T): Result<T, E>;
export function ok<E>(): Result<Unit, E>;
export function ok<T, E>(value?: T): Result<T, E> | Result<Unit, E> {
	return value === undefined ? { _tag: "Ok", val: unit } : { _tag: "Ok", val: value };
}

export function err<T, E>(value: E): Result<T, E>;
export function err<T>(): Result<T, Unit>;
export function err<T, E>(value?: E): Result<T, E> | Result<T, Unit> {
	return value === undefined ? { _tag: "Err", val: unit } : { _tag: "Err", val: value };
}