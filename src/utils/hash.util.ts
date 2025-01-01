async function generateHashBrowser(input: string) {
	// Encode the message as a Uint8Array
	const encoder = new TextEncoder();
	const data = encoder.encode(input);

	// Generate the hash (SHA-256)
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);

	// Convert the hash to a hex string
	return Array.from(new Uint8Array(hashBuffer))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

export async function hash(input: string) {
	if (Bun) {
		return Bun.password.hash(input);
	}
	return generateHashBrowser(input);
}

/**
 *
 * @param input
 * @param hash
 */
export async function verify(input: string, hash: string) {
	if (Bun) {
		return Bun.password.verify(input, hash);
	}
	const generatedHash = await generateHashBrowser(input);
	return generatedHash === hash;
}
