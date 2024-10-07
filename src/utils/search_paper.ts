import axios from 'axios';
import { search_term_store, search_filter_store } from '../store/search_store';
import { paper_list_store } from '../store/paper_list_store';
import { result_title_store } from '../store/result_title_store';
import { baseArxivURL, defaultStartIndex, defaultMaxResults } from '$lib/constants.js';

let searchTerm = '';
let search_filter = '';

// Search for Papers
async function searchPaper() {
	if (searchTerm.trim().length > 0) {
		// loading = true;
		result_title_store.set('Searching ...');

		try {
			const response = await axios.get(
				baseArxivURL +
					`/search?searchTerm=${searchTerm.trim()}&startIndex=${defaultStartIndex}&maxResults=${defaultMaxResults}`
			);
			result_title_store.set('Results ...');
			paper_list_store.set([]);
			paper_list_store.set(response.data);
		} catch (error) {
			console.error('Error fetching searched papers:', error);
		}
	}
	// loading = false;

	// Select First Paper
	// selectFirstPaper();
}

search_term_store.subscribe((value) => {
	searchTerm = value;
});

search_filter_store.subscribe((value) => {
	search_filter = value;
	console.log(search_filter);
});

export default searchPaper;
