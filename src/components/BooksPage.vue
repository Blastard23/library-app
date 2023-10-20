<template>
  <div>
    <h2 class="book-list-title">List of Books</h2>
    <ul class="book-list">
      <li v-for="book in books" :key="book.id" class="book-item">
        <img :src="getBookImageUrl(book.image)" alt="Book Image" class="book-image" />
        <div class="book-info">
          <p class="book-title">
            <strong>{{ book.book_title }}</strong>
          </p>
          <p class="book-author">
            by {{ book.book_author }}
          </p>
          <p class="book-publisher">
            Publisher: {{ book.book_publisher }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      books: [],
    };
  },
  methods: {
    getBookImageUrl(imageName) {
      return `http://localhost:8000/api/bookImage/${imageName}`;
    },
  },
  mounted() {
    axios.get('http://localhost:8000/api/book')
      .then(response => {
        this.books = response.data.results; 
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  },
};
</script>

<style scoped>
.book-list-title {
  font-size: 24px;
  margin: 20px;
  text-align: center;
  color: black; /* Add this line to change the font color to black */
}

.book-list {
  list-style: none;
  padding: 0;
}

.book-item {
  display: flex;
  margin: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.book-image {
  width: 100px;
  height: 150px;
  margin-right: 10px;
}

.book-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.book-title {
  font-size: 18px;
  margin: 0;
  color: black; /* Add this line to change the font color to black */
}

.book-author {
  font-size: 16px;
  margin: 0;
  color: black; /* Add this line to change the font color to black */
}

.book-publisher {
  font-size: 16px;
  margin: 0;
  color: black; /* Add this line to change the font color to black */
}

.book-id {
  font-size: 14px;
  margin: 0;
  color: #777;
}
</style>