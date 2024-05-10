// // alert('hello world');

// let color = document.getElementById('color');
// let createBtn = document.getElementById('createBtn');
// let list = document.getElementById('list');
// let noteForm = document.getElementById('noteForm');
// // Initialize notes array
// let notes = [];

// // Function to save notes to local storage
// function saveNotes() {
// 	localStorage.setItem('notes', JSON.stringify(notes));
// }

// // Retrieve notes from local storage if available
// const savedNotes = JSON.parse(localStorage.getItem('notes'));
// if (savedNotes) {
// 	notes = savedNotes;
// }
// createBtn.addEventListener('click', (event) => {
// 	let colorValue = color.value; // Retrieve color value inside the event listener

// 	console.log(colorValue); // Add this line to check
// 	let note = document.createElement('div');
// 	note.classList.add('note');
// 	note.style.borderTop = `30px solid ${colorValue}`;
// 	note.innerHTML = `
//         <span class="close">
//                 <i class="fas fa-times"></i>
//         </span>
//         <textarea placeholder="Write Content..." rows="10" cols="30" style="wrap: soft;"></textarea>
//     `;

// 	list.appendChild(note);
// 	color.value = '#e6b905';
// 	let close = note.querySelector('.close');

// 	close.addEventListener('click', () => {
// 		list.removeChild(note); // Remove the entire note, not just the close button
// 		// Remove the corresponding note from the notes array
// 		notes.splice(
// 			notes.findIndex((item) => item.color === colorValue),
// 			1
// 		);
// 		saveNotes();
// 	});

// 	notes.unshift({ content: '', color: colorValue });
// 	saveNotes();

// 	let textarea = note.querySelector('textarea');
// 	textarea.addEventListener('input', function () {
// 		const index = notes.findIndex((item) => item.color === colorValue); // Use colorValue instead of color
// 		notes[index].content = textarea.value;
// 		saveNotes();
// 	});
// });

// notes.forEach(function (noteData) {
// 	let note = document.createElement('div');
// 	note.classList.add('note');
// 	note.style.borderTop = `30px solid ${noteData.color}`;
// 	note.innerHTML = `
// 			<span class="close">
// 					<i class="fas fa-times"></i>
// 			</span>
// 			<textarea placeholder="Write Content..." rows="10" cols="30" style="wrap: soft;">${noteData.content}</textarea>
// 	`;

// 	// Append note to list
// 	list.appendChild(note);

// 	const textarea = note.querySelector('textarea');
// 	const closeBtn = note.querySelector('.close');

// 	closeBtn.addEventListener('click', () => {
// 		list.removeChild(note); // Remove the entire note, not just the close button
// 		// Remove the corresponding note from the notes array
// 		notes.splice(
// 			notes.findIndex((item) => item.color === noteData.color),
// 			1
// 		);
// 		saveNotes();
// 	});

// 	textarea.addEventListener('input', function () {
// 		const index = notes.findIndex((item) => item.color === noteData.color);
// 		notes[index].content = textarea.value;
// 		saveNotes();
// 	});
// });

// let cursor = {
// 	x: null,
// 	y: null,
// };

// let note = {
// 	dom: null,
// 	x: null,
// 	y: null,
// };

// document.addEventListener('mousedown', (event) => {
// 	if (event.target.classList.contains('note')) {
// 		cursor = {
// 			x: event.clientX,
// 			y: event.clientY,
// 		};
// 		note = {
// 			dom: event.target,
// 			x: event.target.getBoundingClientRect().left,
// 			y: event.target.getBoundingClientRect().top,
// 		};
// 		console.log(note);
// 	}
// });

// document.addEventListener('mousemove', (event) => {
// 	if (note.dom == null) return;
// 	let currentCursor = {
// 		x: event.clientX,
// 		y: event.clientY,
// 	};

// 	let distance = {
// 		x: currentCursor.x - cursor.x,
// 		y: currentCursor.y - cursor.y,
// 	};

// 	// Check if the new position of the note is within the viewport boundaries
// 	let newX = note.x + distance.x;
// 	let newY = note.y + distance.y;

// 	if (
// 		newX >= 0 &&
// 		newY >= 0 &&
// 		newX + note.dom.offsetWidth <= window.innerWidth &&
// 		newY + note.dom.offsetHeight <= window.innerHeight
// 	) {
// 		note.dom.style.left = newX + 'px';
// 		note.dom.style.top = newY + 'px';
// 	}

// 	note.dom.style.cursor = 'grab';
// });

// document.addEventListener('mouseup', () => {
// 	if (note.dom == null) return;
// 	note.dom.style.cursor = 'auto';
// 	note.dom = null;
// });let color = document.getElementById('color');
let createBtn = document.getElementById('createBtn');
let list = document.getElementById('list');
let notes = [];

function saveNotes() {
	localStorage.setItem('notes', JSON.stringify(notes));
}

function saveNotePosition(noteElement) {
	const index = Array.from(list.children).indexOf(noteElement);
	localStorage.setItem(`note${index}_left`, noteElement.style.left);
	localStorage.setItem(`note${index}_top`, noteElement.style.top);
}

function loadNotePositions() {
	Array.from(list.children).forEach((noteElement, index) => {
		const left = localStorage.getItem(`note${index}_left`);
		const top = localStorage.getItem(`note${index}_top`);
		if (left && top) {
			noteElement.style.left = left;
			noteElement.style.top = top;
		}
	});
}

const savedNotes = JSON.parse(localStorage.getItem('notes'));
if (savedNotes) {
	notes = savedNotes;
}

createBtn.addEventListener('click', (event) => {
	let colorValue = color.value;

	let note = document.createElement('div');
	note.classList.add('note');
	note.style.borderTop = `30px solid ${colorValue}`;
	note.innerHTML = `
        <span class="close">
            <i class="fas fa-times"></i>
        </span>
        <textarea placeholder="Write Content..." rows="10" cols="30" style="wrap: soft;"></textarea>
    `;

	list.appendChild(note);
	color.value = '#e6b905';

	let close = note.querySelector('.close');
	close.addEventListener('click', () => {
		list.removeChild(note);
		notes.splice(
			notes.findIndex((item) => item.color === colorValue),
			1
		);
		saveNotes();
	});

	notes.unshift({ content: '', color: colorValue });
	saveNotes();

	let textarea = note.querySelector('textarea');
	textarea.addEventListener('input', function () {
		const index = notes.findIndex((item) => item.color === colorValue);
		notes[index].content = textarea.value;
		saveNotes();
	});

	note.addEventListener('mousedown', (event) => {
		onNoteMouseDown(event, note);
	});

	note.addEventListener('mousemove', (event) => {
		onNoteMouseMove(event, note);
	});
});

notes.forEach(function (noteData) {
	let note = document.createElement('div');
	note.classList.add('note');
	note.style.borderTop = `30px solid ${noteData.color}`;
	note.innerHTML = `
        <span class="close">
            <i class="fas fa-times"></i>
        </span>
        <textarea placeholder="Write Content..." rows="10" cols="30" style="wrap: soft;">${noteData.content}</textarea>
    `;

	list.appendChild(note);

	const textarea = note.querySelector('textarea');
	const closeBtn = note.querySelector('.close');

	closeBtn.addEventListener('click', () => {
		list.removeChild(note);
		notes.splice(
			notes.findIndex((item) => item.color === noteData.color),
			1
		);
		saveNotes();
	});

	textarea.addEventListener('input', function () {
		const index = notes.findIndex((item) => item.color === noteData.color);
		notes[index].content = textarea.value;
		saveNotes();
	});

	note.addEventListener('mousedown', (event) => {
		onNoteMouseDown(event, note);
	});

	note.addEventListener('mousemove', (event) => {
		onNoteMouseMove(event, note);
	});
});

let isDragging = false;
let offsetX, offsetY;

function onNoteMouseDown(event, noteElement) {
	isDragging = true;
	offsetX = event.clientX - noteElement.offsetLeft;
	offsetY = event.clientY - noteElement.offsetTop;
}

function onNoteMouseMove(event, noteElement) {
	if (isDragging) {
		noteElement.style.left = event.clientX - offsetX + 'px';
		noteElement.style.top = event.clientY - offsetY + 'px';
		saveNotePosition(noteElement);
	}
}

document.addEventListener('mouseup', () => {
	isDragging = false;
});

window.addEventListener('load', () => {
	loadNotePositions();
});
