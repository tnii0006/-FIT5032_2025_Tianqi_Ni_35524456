<template>
  <div class="container">
    <h1>All Books - JSON API</h1>
    <div v-if="loading" class="loading">Loading books...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="allBooks" class="json-display">
      <pre>{{ JSON.stringify(allBooks, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const allBooks = ref(null)
const loading = ref(false)
const error = ref(null)

const getAllBooks = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await fetch('src/assets/json/authors.json')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const authors = await response.json()
    
    // Flatten all books from all authors into a single array
    const books = []
    authors.forEach(author => {
      author.famousWorks.forEach(book => {
        books.push({
          title: book.title,
          year: book.year,
          author: author.name,
          genres: author.genres,
          birthYear: author.birthYear
        })
      })
    })
    
    allBooks.value = {
      success: true,
      totalBooks: books.length,
      books: books,
      timestamp: new Date().toISOString()
    }
    
  } catch (err) {
    error.value = `Error loading books: ${err.message}`
    console.error('Error loading books:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getAllBooks()
})

// Allow manual refresh
const refreshData = () => {
  getAllBooks()
}

defineExpose({
  refreshData
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Courier New', monospace;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.json-display {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 20px;
  overflow-x: auto;
}

.json-display pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.5;
}

.loading {
  text-align: center;
  color: #6c757d;
  font-size: 18px;
  margin: 20px 0;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 8px;
  margin: 20px 0;
  text-align: center;
}
</style>