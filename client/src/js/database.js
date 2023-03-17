import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const DBname = 'text editor';
  console.log('Put to the ase');
  const TextDB = await openDB(DBname, 1);
  console.log(TextDB)
  const tx = TextDB.transaction(DBname, 'readwrite');
  console.log(tx)
  const store = tx.objectStore(DBname);
  console.log(store)
  const request = store.add({ Text: content });
  console.log(request)
  const result = await request;
  console.log(result)
  console.log('🚀 - data saved to the database', result);
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const DBname = 'text editor';
console.log('GET all from the database');
const TextDB = await openDB(DBname, 1);
console.log(TextDB)
const tx = TextDB.transaction(DBname, 'readonly');
console.log(tx)
const store = tx.objectStore(DBname);
console.log(store)
const request = store.getAll();
console.log(request)
const result = await request;
console.log(request)
console.log('result.value', result);
return result;
}

initdb();
