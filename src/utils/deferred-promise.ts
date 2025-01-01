export class DeferredPromise<T> {
	private _resolve: ((value: T) => void) | undefined;

	private _reject: ((error: unknown) => void) | undefined;

	private _value: T | undefined;

	promise: Promise<T>;

	constructor() {
		this.promise = new Promise((resolve, reject) => {
			this._resolve = resolve;
			this._reject = reject;
		});
	}

	resolve(value: T) {
		this._value = value;
		if (this._resolve) {
			this._resolve(value);
		}
	}

	reject(error: unknown) {
		if (this._reject) {
			this._reject(error);
		}
	}

	get value(): T | undefined {
		return this._value;
	}
}
