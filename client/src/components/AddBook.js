import React, { Component } from "react";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";

import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  displayAuthors() {
    let data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading authors...</option>;
    }
    return data.authors.map(author => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  }

  submitForm(e) {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
  }

  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.name.value });
  // }

  render() {
    return (
      <form id='add-book' onSubmit={this.submitForm.bind(this)}>
        <div className='field'>
          <label htmlFor='name'>Book name: </label>
          <input
            type='text'
            name='name'
            onChange={e => this.setState({ name: e.target.value })}
          />
        </div>

        <div className='field'>
          <label htmlFor='genre'>Genre: </label>
          <input
            type='text'
            name='genre'
            onChange={e => this.setState({ genre: e.target.value })}
          />
        </div>

        <div className='field'>
          <label htmlFor='author'>Author: </label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option value=''>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
