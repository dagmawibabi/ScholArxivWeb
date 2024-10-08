import { baseBookmarkURL } from '$lib/constants';
import axios from 'axios';
import { bookmark_list_store } from '../store/bookmark_list_store';
import selectPaperFunctions from '../utils/select_paper';
import { bookmark_loading_store } from '../store/loading_store';

async function getBookmarks() {
	const response = await axios.get(baseBookmarkURL + '/myBookmarks', {
		withCredentials: true
	});
	bookmark_list_store.set(response.data);
	bookmark_loading_store.set(false);
	selectPaperFunctions.selectFirstPaper();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function bookmarkPaper(paperID: any) {
	const response = await axios.post(
		baseBookmarkURL + '/paper',
		{
			paperID: paperID
		},
		{
			withCredentials: true
		}
	);
	bookmark_list_store.set(response.data);
	selectPaperFunctions.selectFirstPaper();
}

export default { getBookmarks, bookmarkPaper };
