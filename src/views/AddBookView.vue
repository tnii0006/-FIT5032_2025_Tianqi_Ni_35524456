<template>
<div>
  <h1>Add Book</h1>
  <form @submit.prevent="addBook">
    <div>
      <label for="isbn">ISBN:</label>
      <input type="text" v-model="isbn" id="isbn" required />
    </div>
    <div>
      <label for="name">Name:</label>
      <input type="text" v-model="name" id="name" required />
    </div>
    <button type="submit">Add Book</button>
  </form>
  <h1>Books with ISBN > 1000</h1>
  <ul>
    <li v-for="book in books" :key="book.id">
      {{ book.name }} - ISBN: {{ book.isbn }}
      <button @click="updateBook(book.id, book.name + ' (Updated)')">Update</button>
      <button @click="deleteBook(book.id)">Delete</button>
    </li>
  </ul>
</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, addDoc, query, where, getDocs, doc, updateDoc, deleteDoc, orderBy, limit } from 'firebase/firestore';

export default {
  setup() {
    const isbn = ref('');
    const name = ref('');
    const books = ref([]);

    const fetchBooks = async () => {
      try {
        const q = query(
          collection(db, 'books'),
          where('isbn', '>', 1000),
          orderBy('isbn', 'asc'),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value);
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number');
          return;
        }

        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value
        });
        isbn.value = '';
        name.value = '';
        alert('Book added successfully!');
        fetchBooks(); // 添加后刷新列表
      } catch (error) {
        console.error('Error adding book: ', error);
      }
    };

    const updateBook = async (id, updatedName) => {
      try {
        const bookRef = doc(db, 'books', id);
        await updateDoc(bookRef, { name: updatedName });
        alert('Book updated successfully!');
        fetchBooks(); // 更新后刷新列表
      } catch (error) {
        console.error('Error updating book: ', error);
      }
    };

    const deleteBook = async (id) => {
      try {
        const bookRef = doc(db, 'books', id);
        await deleteDoc(bookRef);
        alert('Book deleted successfully!');
        fetchBooks(); // 删除后刷新列表
      } catch (error) {
        console.error('Error deleting book: ', error);
      }
    };

    onMounted(() => {
      fetchBooks();
    });

    return {
      isbn,
      name,
      addBook,
      updateBook,
      deleteBook,
      books
    };
  }
};
</script>