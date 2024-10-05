import { createAuthClient } from 'better-auth/svelte';
import { authBaseURL } from '$lib/constants.js';

export const authClient = createAuthClient({
	baseURL: authBaseURL
});

export const { signIn, signUp, signOut, useSession } = authClient;
