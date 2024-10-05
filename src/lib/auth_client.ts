import { createAuthClient } from 'better-auth/svelte';
import { baseURL } from '$lib/constants.js';

export const authClient = createAuthClient({
	baseURL: baseURL
});

export const { signIn, signUp, signOut, useSession } = authClient;
