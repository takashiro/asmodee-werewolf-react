export default function idle(msecs: number): Promise<void> {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, msecs);
	});
}
