import React, { Component, Fragment } from "react";
import { graphql } from "react-apollo"; // bind the query to component so that we can access the data that comes from query
import { getBooksQuery } from "../queries/queries";

// components
import BookDetails from "./BookDetails";

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  displayBooks() {
    let data = this.props.data;
    if (data.loading) {
      return <div>Loading books...</div>;
    }
    return data.books.map(book => (
      <li
        key={book.id}
        onClick={e => {
          this.setState({ selected: book.id });
        }}
      >
        {book.name}{" "}
      </li>
    ));
  }
  render() {
    return (
      <Fragment>
        <ul id='bookList'>{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </Fragment>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
