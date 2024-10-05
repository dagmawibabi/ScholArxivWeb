import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient({
	baseURL: 'http://localhost:6400'
});

export const { signIn, signUp, signOut, useSession } = authClient;
