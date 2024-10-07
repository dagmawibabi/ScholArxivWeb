/* eslint-disable @typescript-eslint/no-explicit-any */

import { writable } from 'svelte/store';

export const selected_papers_store = writable<any[]>([]);
