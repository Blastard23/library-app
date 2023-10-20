<template>
  <div>
    <h2 class="book-list-title">List of Books</h2>
    <button @click="showAddBookModal">Add Book</button>

    <!-- Add Book Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeAddBookModal">&times;</span>
        <h2 style="color: black;">Add New Book</h2>

        <!-- Add Book Form -->
        <form @submit.prevent="addBook">
          <label for="bookTitle">Book Title:</label>
          <input type="text" id="bookTitle" v-model="form.newBookTitle" required>

          <label for="bookAuthor">Book Author:</label>
          <input type="text" id="bookAuthor" v-model="form.newBookAuthor" required>

          <label for="bookImage">Book Image:</label>
          <input type="file" @change="handleImageChange" accept="image/*">

          <label for="bookPublisher">Book Publisher:</label>
          <input type="text" id="bookPublisher" v-model="form.newBookPublisher" required>

          <label for="bookGenre">Book Genre:</label>
          <input type="text" id="bookGenre" v-model="form.newBookGenre">

          <label for="createdBy">Created By:</label>
          <input type="text" id="createdBy" v-model="form.newCreatedBy">

          <label for="quantity">Quantity:</label>
          <input type="text" id="quantity" v-model="form.newQuantity" required>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>

    <!-- Edit Book Modal -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeEditBookModal">&times;</span>
        <h2 style="color: black;">Edit Book</h2>

        <!-- Edit book Form -->
        <form @submit.prevent="updateBook">
          <!-- <input type="hidden" name="_method" value="PUT"> -->
          <label for="editBookTitle">Book Title:</label>
          <input type="text" id="editBookTitle" name="book_title" v-model="forms.editBookTitle">

          <label for="editBookAuthor">Book Author:</label>
          <input type="text" id="editBookAuthor" name="book_author" v-model="forms.editBookAuthor">

          <label for="bookImage">Book Image:</label>
          <input type="file" id="editImage" name="image" @change="handleEditImageChange" accept="image/*">

          <label for="bookPublisher">Book Publisher:</label>
          <input type="text" id="editbookPublisher" name="book_publisher" v-model="forms.editBookPublisher">

          <label for="bookGenre">Book Genre:</label>
          <input type="text" id="editbookGenre" name="book_genre" v-model="forms.editBookGenre">

          <label for="createdBy">Updated By:</label>
          <input type="text" id="editcreatedBy" name="updated_by" v-model="forms.editUpdatedBy">

          <label for="quantity">Quantity:</label>
          <input type="text" id="editquantity" name="quantity" v-model="forms.editQuantity">


          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>

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
        <button @click="editBookInfo(book)" class="edit-button">Edit</button>
        <button @click="deleteBook(book.id)" class="delete-button">Delete</button>
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
            showModal: false,
            form: {
              newBookTitle: '',
              newBookAuthor: '',
              newBookPublisher: '',
              newBookGenre: '',
              newCreatedBy: '',
              newQuantity: '',
            },
            selectedImage: null,
            showEditModal: false,

            forms: {
              editBookTitle: '',
              editBookAuthor: '',
              editBookPublisher: '',
              editBookGenre: '',
              editUpdatedBy: '',
              editQuantity: '',
              editSelectedImage: null,
            }
        };
    },
    methods: {
      getBookImageUrl(imageName) {
        return `http://localhost:8000/api/bookImage/${imageName}`;
      },
      showAddBookModal() {
        this.showModal = true;
      },
      closeAddBookModal() {
        this.showModal = false;
      },

      closeEditBookModal() {
        this.showEditModal = false;
      },

      handleImageChange(event) {
        this.selectedImage = event.target.files[0];
      },

      handleEditImageChange(event) {
        this.forms.editSelectedImage = event.target.files[0];
      },

      addBook() {
        const newBookData = new FormData();
        newBookData.append('book_title', this.form.newBookTitle);
        newBookData.append('book_author', this.form.newBookAuthor);
        newBookData.append('book_publisher', this.form.newBookPublisher);
        newBookData.append('book_genre', this.form.newBookGenre);
        newBookData.append('created_by', this.form.newCreatedBy);
        newBookData.append('quantity', this.form.newQuantity);
        if (this.selectedImage) {
          newBookData.append('image', this.selectedImage);
        }

        for (const [key, value] of newBookData.entries()) {
          console.log(key, value);
        }

        axios.post('http://localhost:8000/api/book', newBookData, {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then((response) => {
            console.log('Book added successfully:', response.data);
            this.showModal = false; 
            location.reload();
          })
          .catch((error) => {
            console.error('Error adding book:', error);
          });
      },

      deleteBook(bookId) {
          axios.delete(`http://localhost:8000/api/book/${bookId}`)
            .then((response) => {
              console.log('Book deleted successfully:', response.data);
              location.reload();
            })
            .catch((error) => {
              console.error('Error deleting book:', error);
            });
      },

        editBookInfo(book) {
          this.forms.editBookTitle = book.book_title;
          this.forms.editBookAuthor = book.book_author;
          this.forms.editBookPublisher = book.book_publisher;
          this.forms.editBookGenre = book.book_genre;
          this.forms.editUpdatedBy = book.updated_by;
          this.forms.editQuantity = book.quantity;
          this.forms.editSelectedImage = book.image;
          this.selectedBookId = book.id;
          this.showEditModal = true;
      },

      updateBook() {
        const updatedBookData = new FormData();
        updatedBookData.append('book_title', this.forms.editBookTitle);
        updatedBookData.append('book_author', this.forms.editBookAuthor);
        if (this.forms.editSelectedImage) {
          updatedBookData.append('image', this.forms.editSelectedImage);
        }
        updatedBookData.append('book_publisher', this.forms.editBookPublisher);
        updatedBookData.append('book_genre', this.forms.editBookGenre);
        updatedBookData.append('updated_by', this.forms.editUpdatedBy);
        updatedBookData.append('quantity', this.forms.editQuantity);

        axios.put(`http://localhost:8000/api/book/${this.selectedBookId}`, updatedBookData)
        .then((response) => {
          console.log('Book updated successfully:', response.data);
          // this.showEditModal = false;
          console.log('Request Payload:', updatedBookData);
        })
        .catch((error) => {
          console.error('Error updating book:', error);
          // Log the request payload for debugging purposes
          console.log('Request Payload:', updatedBookData);
        });
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
    color: black; 
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
    color: black; 
  }
  
  .book-author {
    font-size: 16px;
    margin: 0;
    color: black; 
  }
  
  .book-publisher {
    font-size: 16px;
    margin: 0;
    color: black; 
  }
  
  .book-id {
    font-size: 14px;
    margin: 0;
    color: #777;
  }

    .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    position: relative;
    background-color: #fefefe;
    max-width: 500px;
    padding: 20px;
    border: 1px solid #888;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }

  .close {
    position: absolute;
    top: 0;
    right: 0;
    margin: 5px;
    font-size: 20px;
    cursor: pointer;
    color: #888;
  }

  .close:hover {
    color: red;
  }

  label{
    color: black;
  }

  .delete-button {
  background-color: #ff5733; 
  color: white; 
  padding: 5px 10px; 
  border: none; 
  cursor: pointer; 
  width: 10%;
  }

  </style>