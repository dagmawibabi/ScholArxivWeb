/* eslint-disable @typescript-eslint/no-explicit-any */

import { paper_list_store } from '../store/paper_list_store';
import { selected_papers_store } from '../store/selected_papers_store';
import extractID from './extract_paper_id';

// import { writable } from "svelte/store";

let papers: any[] = [];

// Select Papers
let selectedPapers: any[] = [];
let selectedPapersObj: any[] = [];
// let selectedPapersForAI = writable('');
function selectPaper(eachPaper: any) {
	const extractedId = extractID(eachPaper);
	if (selectedPapers.includes(extractedId)) {
		// Unselect
		selectedPapers = selectedPapers.filter((id) => id !== extractedId); // Remove the ID
		selectedPapersObj = selectedPapersObj.filter((paper) => paper.id !== paper.extractedId);
		// selectedPapersForAI.update((papers) => papers.filter((paper:any) => paper.id !== eachPaper.id));
		// selectedPapersForAI.set(); // Remove the paper object
	} else {
		// Select
		selectedPapers = [...selectedPapers, extractedId]; // Add the ID
		selectedPapersObj = [...selectedPapersObj, eachPaper];
		// selectedPapersForAI.update((papers) => [...papers, eachPaper]); // Add the paper object
	}
	selected_papers_store.set(selectedPapers);

	// let context = '';
	// for (const paperx of selectedPapersObj) {
	// 	context += JSON.stringify(paperx, null, 2);
	// }
	// selectedPapersForAI.set(context);
}

// Select First Few Papers
function selectFirstPaper() {
	selectPaper(papers[0]);
}

// Select All Papers
function selectAllPapers() {
	selectedPapers = [];
	selectedPapersObj = [];
	for (const eachPaper of papers) {
		selectPaper(eachPaper);
	}
}

paper_list_store.subscribe((value) => {
	papers = value;
});

export default { selectPaper, selectFirstPaper, selectAllPapers };
