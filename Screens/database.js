// database.js
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'feedback.db', location: 'default' });

const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, phone TEXT, message TEXT)',
      []
    );
  });
};

const saveFeedback = (email, phone, message) => {
  db.transaction((tx) => {
    tx.executeSql('INSERT INTO feedback (email, phone, message) VALUES (?, ?, ?)', [
      email,
      phone,
      message,
    ]);
  });
};

export { initDatabase, saveFeedback };
