/**
 * Generate a random number.
 * @param length Length of the random number
 * @return Heximal number as string
 */
export default function createRandomKey(length: number): string {
	const arr = new Uint8Array(length);
	crypto.getRandomValues(arr);
	return Array.from(arr)
		.map((value) => value.toString(16))
		.map((bit) => (bit.length >= 2 ? bit : `0${bit}`))
		.join('');
}
