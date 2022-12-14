export const EMPTY_ARRAY: any[] = Object.freeze([]) as any;

export const toArray = <T>(value: T | T[]): T[] => (Array.isArray(value) ? value : [value]);

export const removeUnordered = (array: any[], index: number): void => {
	array[index] = array[array.length - 1];
	array.pop();
};

/**
 * Returns a function that returns the next item in the `array`
 * in a linear sequence, looping back to index 0 when it reaches the end.
 * @param array
 * @returns A function that returns the next item in the `array`
 */
export const toNext = <T>(array: T[]): (() => T) => {
	let i = -1;
	return () => {
		i++;
		if (i >= array.length) i = 0;
		return array[i];
	};
};
