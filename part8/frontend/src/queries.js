import { gql } from '@apollo/client'

const PERSON_DETAILS = gql`
  fragment PersonDetails on Person {
    id
    name
    phone 
    address {
      street 
      city
    }
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
      author {
        name
        born
      }
      published
      genres
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      ...BookDetails
    }    
  }
  ${BOOK_DETAILS}
`
export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
  }  
}
`
export const ADD_NEW_BOOK = gql`
mutation addNewBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ){
    ...BookDetails 
  }
}
${BOOK_DETAILS}
`
export const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(
      name: $name,
      street: $street,
      city: $city,
      phone: $phone
    ) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`
export const QUERY_ME = gql`
{
	me {
		username 
		favoriteGenre
	}
}
`

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      ...PersonDetails
    }
  }
  ${PERSON_DETAILS}
`

export const EDIT_AUTHOR = gql`
  mutation editNumber($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo)  {
      name
          }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  
${BOOK_DETAILS}
`