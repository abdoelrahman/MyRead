import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'

class MyBooks extends Component {
  state= {
    bookDetails: [{
      bookId: '',
      bookName: '',
      bookAuthor: [],
      bookUrl: '',
      shelf: ''
    }]
  }
  renderShelf = () => {
    const shelfDetails = []
    BooksAPI.getAll().then(data => {
      data.map(book => {
        shelfDetails.push({
          bookId: book.id,
          bookName: book.title,
          bookAuthor: book.authors,
          bookUrl: book.imageLinks.smallThumbnail,
          shelf: book.shelf
        })
        this.setState({
          bookDetails: shelfDetails
        })
      })
    }).catch(error=> {
      console.log(error)
    })
  }
  
  componentDidMount() {
    const shelfDetails = this.state.bookDetails
    BooksAPI.getAll().then(data => {
      data.map(book => {
        shelfDetails.push({
          bookId: book.id,
          bookName: book.title,
          bookAuthor: book.authors,
          bookUrl: book.imageLinks.smallThumbnail,
          shelf: book.shelf
        })
        this.setState({
          bookDetails: shelfDetails
        })
      })
    })
  }

  render() {
    const shelfDetails = [
      {'move':'Move to ...'},
      {'currentlyReading':'Currently Reading'},
      {'wantToRead':'Want to Read'},
      {'read':'Read'},
      {'none':'None'}
    ]
    return (
      <div className="bookshelf">
        {['currentlyReading','wantToRead','read'].map(shelfName => {
          return (
            <div key= {shelfName}>
              <h2 className="bookshelf-title">{shelfName}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.bookDetails.map(detail => {
                    if (shelfName === detail.shelf) {
                      return(<BookShelf key= {detail.bookId} renderShelf = {this.renderShelf} bookDetails= {detail} shelfDetails= {shelfDetails} shelf= {detail.shelf}/>)
                    }
                  })}
              </ol>
            </div>
            </div>
          )
        })}
      </div>
    )
  }
}
export default MyBooks
