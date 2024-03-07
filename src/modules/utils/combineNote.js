export default function combineNote(note, author, username) {
  if (!author) {
    author = '';
  }
  if (!username) {
    username = '';
  }
  return note.replace('{author}', author).replace('{username}', username);
}
