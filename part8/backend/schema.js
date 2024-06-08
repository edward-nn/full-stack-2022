const typeDefs = `
type User {
  username: String!
  password: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

  type Query {
    authorsCount: Int!
    booksCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Book {
    title: String! 
      author: Author!
      published: Int 
      genres: [String!]!
      id: ID!
  }

  type Author {
    name: String!
    born: String
    id: ID!
    bookCount: Int!
  }

  type Mutation {
    createAuthor(name: String!, born: Int): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!,
       setBornTo: Int!
       ): Author
  }
  type Subscription {
    authorAdded: Author!
    bookAdded: Book!
  }
`
module.exports = typeDefs