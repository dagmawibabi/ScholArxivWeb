import axios from 'axios';
import { baseArxivURL } from '$lib/constants';
import { paper_list_store } from '../store/paper_list_store';
import selectPaperFunctions from '../utils/select_paper';
import { discovery_loading_store } from '../store/loading_store';

async function discoverPapers() {
	const response = await axios.get(baseArxivURL + '/discover', {
		withCredentials: true
	});
	paper_list_store.set(response.data);
	discovery_loading_store.set(false);
	selectPaperFunctions.selectFirstPaper();
}

export default discoverPapers;
