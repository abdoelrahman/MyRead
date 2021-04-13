import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class SearchBook extends Component {
  state= {
    query: '',
    bookDetails: [{
      bookId: '',
      bookName: '',
      bookAuthor: [],
      bookUrl: '',
      shelf: ''
    }]
  }

  searchBook = (e) => {
    if (e.keyCode === 8) {
      this.setState({bookDetails: []})
    }

    if (e.keyCode === 13 ) {
      let searchDetails = []
      let shelfDetails = [{id:'',shelf:''}]
      BooksAPI.getAll().then(details => {
        details.map(detail => {
          shelfDetails.push({id: detail.id,shelf: detail.shelf})
        })
      }).then(
        BooksAPI.search(e.target.value).then(books => {
          books.map(book => {
             let shelf = 'none'
             let id, name, author, url

              shelfDetails.map(detail => {
                if (book.id === detail.id) {
                  shelf= detail.shelf
                }
              })
              
              book.id !== ''? id= book.id: id= ''
              book.title !== ''? name= book.title: name= ''
              book.hasOwnProperty('authors')? author= book.authors: author= ''
              book.hasOwnProperty('imageLinks')? url= book.imageLinks.smallThumbnail: url= ''

              searchDetails.push({
                bookId: id,
                bookName : name,
                bookAuthor: author,
                bookUrl: url,
                shelf: shelf
              })
              this.setState({
                bookDetails: searchDetails
              })
          })
        }).catch(error=> {
          this.setState({bookDetails:error})
        })
      ).catch(error=> {
        this.setState({bookDetails:error})
      })
    }
  }

  updateQuery = (query) => {
    this.setState({query: query})
  }

  showSearch = () => {
    const shelfDetails = [
      {'move':'Move to ...'},
      {'currentlyReading':'Currently Reading'},
      {'wantToRead':'Want to Read'},
      {'read':'Read'},
      {'none':'None'}
    ]

    if (this.state.bookDetails.message) {
      return (<span>Searched string <strong>{this.state.query}</strong> not valid or book not available</span>)
    } else {
      return (
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.state.bookDetails.map(book => {
                if (book.bookId !== '') {
                  return (<BookShelf key= {book.bookId} bookDetails= {book} shelfDetails= {shelfDetails} shelf= {book.shelf}/>)
                }
              })
            }
        </ol>
      </div>
      )
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to= '/' className="close-search"/>
          <div className="search-books-input-wrapper">
            {}
            <input type="text" placeholder="Search by title or author" value= {this.state.query}
            onChange= {(event) => this.updateQuery(event.target.value)}
            onKeyDown= {(event) => this.searchBook(event)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.showSearch()}
          </ol>
        </div>
      </div>
    )
  }
}
export default SearchBook
