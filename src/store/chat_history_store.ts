import { writable } from 'svelte/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const chat_history_store = writable<any[]>([]);
