import axios from 'axios';
import { baseLikeURL } from '$lib/constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function likePaper(paperID: any) {
	await axios.post(
		baseLikeURL + '/paper',
		{
			paperID: paperID
		},
		{
			withCredentials: true
		}
	);
	// bookmark_list_store.set(response.data);
	// selectPaperFunctions.selectFirstPaper();
}

export default likePaper;
