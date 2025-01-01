import type { Context } from "hono";
import { decode, sign, verify } from "hono/jwt";
import type { SignatureKey } from "hono/utils/jwt/jws";
import type { TokenHeader } from "hono/utils/jwt/jwt";
import type { JWTPayload } from "hono/utils/jwt/types";

export function generateToken(
	payload: object,
	privateKey: SignatureKey,
	options?: JWTPayload,
) {
	const _payload: JWTPayload = {
		...payload,
		...options,
	};
	return sign(_payload, privateKey, "RS256");
}

export function verifyToken(token: string, publicKey: SignatureKey) {
	return verify(token, publicKey, "RS256");
}

export function decodeToken<T>(token: string): {
	header: TokenHeader;
	payload: T & JWTPayload;
} {
	return decode(token) as { header: TokenHeader; payload: T & JWTPayload };
}

export function getToken(c: Context) {
	const authorization = c.req.header("authorization");
	if (authorization) {
		return authorization?.replace("Bearer_", "");
	}
	return null;
}
