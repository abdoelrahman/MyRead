import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import  SearchBook  from './SearchBook'
import MyBooks from './MyBooks'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path= '/' render= {() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads  app </h1>
            </div>
            <div className="list-books-content">
              <MyBooks/>
            </div>
            <div className="open-search">
              <Link to= '/search'>Add a new book</Link>
            </div>
          </div>
        )}/>
        <Route path= '/search' component= {SearchBook}/>
      </div>
  )}
}

export default BooksApp
