function swap(list, a, b) {
	let temp = list[b];
	list[b] = list[a];
	list[a] = temp;
}

function shuffle(array) {
	length = array.length;
	for (i=0; i<length; i++) {
		swap(array, i, Math.floor( Math.random()*length ));
	}
}