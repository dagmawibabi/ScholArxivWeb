import axios from 'axios';
import { search_term_store, search_filter_store } from '../store/search_store';
import { paper_list_store } from '../store/paper_list_store';
import { result_title_store } from '../store/result_title_store';
import { baseArxivURL, defaultStartIndex, defaultMaxResults } from '$lib/constants.js';
import { discovery_loading_store } from '../store/loading_store';

let searchTerm = '';
let search_filter = '';

// Search for Papers
async function searchPaper() {
	if (searchTerm.trim().length > 0) {
		result_title_store.set('Searching ...');
		discovery_loading_store.set(true);

		try {
			const response = await axios.get(
				baseArxivURL +
					`/search?searchTerm=${searchTerm.trim()}&startIndex=${defaultStartIndex}&maxResults=${defaultMaxResults}`,
				{
					withCredentials: true
				}
			);
			result_title_store.set('Results ...');
			discovery_loading_store.set(false);
			paper_list_store.set([]);
			paper_list_store.set(response.data);
		} catch (error) {
			console.error('Error fetching searched papers:', error);
			discovery_loading_store.set(false);
		}
	}
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
