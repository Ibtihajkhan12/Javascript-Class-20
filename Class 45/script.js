// Function to initialize the app by loading notes from local storage
function loadNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = ''; // Clear current list

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach((note, index) => {
        const noteCard = createNoteCard(note, index);
        notesList.appendChild(noteCard);
    });
}

// Function to create a note card element
function createNoteCard(note, index) {
    const card = document.createElement('div');
    card.classList.add('note-card');

    const title = document.createElement('div');
    title.classList.add('note-title');
    title.textContent = note.title;

    const description = document.createElement('div');
    description.classList.add('note-description');
    description.textContent = note.description;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteNote(index);

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(deleteBtn);

    return card;
}

// Function to handle adding a new note
function addNote() {
    const titleInput = document.getElementById('note-title');
    const descriptionInput = document.getElementById('note-description');

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title === '' || description === '') {
        alert('Please enter both title and description.');
        return;
    }

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({ title, description });
    localStorage.setItem('notes', JSON.stringify(notes));

    titleInput.value = '';
    descriptionInput.value = '';

    loadNotes();
}





// Function to handle deleting a note
function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));

    loadNotes();
}

// Event listener for adding a new note
document.getElementById('add-note').addEventListener('click', addNote);

// Initialize app by loading notes when page loads
window.onload = loadNotes;
