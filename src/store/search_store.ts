import { writable } from 'svelte/store';

export const search_term_store = writable('');
export const search_filter_store = writable('All');
