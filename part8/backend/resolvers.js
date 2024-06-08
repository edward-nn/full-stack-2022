const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

//const Person = require('./models/person')
const User = require('./models/user')
const Book = require('./models/Book')
const Author = require('./models/Author')


const resolvers = {
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author);
      return author;
    },
  },
  User: {
    username: (root) => "mluukkai",
    password: (root) => "secret"
  },
  Query: {
    authorsCount: async () => Author.collection.countDocuments(),
    booksCount: async () => Book.collection.countDocuments(),
    
    allBooks: async (root,  args ) => {    
      if (args.author) {
        const foundAuthor = await Author.findOne({ name: args.author });
                return  await Book.find({ author: foundAuthor.id }).populate('author');
      }
      if (args.genre) {
        return await Book.find({ genres: [args.genre] });
      }
      const result = await Book.find({}).populate('author'); 
      //console.log('result', result)  
      return result
    },
    allAuthors: async (root,  args) => {
      const authors = await Author.find({}).populate('books');
      //console.log('authors'. authors)
      return authors.map(author => ({
        ...author.toObject(),
        bookCount: author.books.length, 
      }));
    },
  me: (root, args, context) => {
        return context.currentUser
  },
  },
  Mutation: {
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre, })
  
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    createAuthor: async (_, { name, born }) => {
      try {
        // Create a new author instance
        const newAuthor = new Author({ name, born });

        // Save the author to the database
        await newAuthor.save();
        pubsub.publish('AUTHOR_ADDED', { authorAdded: newAuthor }) 
        return newAuthor; // Return the newly created author
      } catch (error) {
        throw new GraphQLError('Create author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: name,
            error
          }})}
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        }) 
      }
      // Find the author by name
      const author = await Author.findOne({ name: args.name });
      
      if (!author) {
        // Author not found, return null
        return null;
      }

      // Update the author's birth year
      author.born = args.setBornTo;
      try {
        await author.save()
        return author
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
            error
          }})}         
    },
    addBook: async  (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        }) 
      }
      const author = await Author.findOne({ name: args.author });
      if (!author) {
    const author = new Author({ name: args.author })
  try {
    await author.save()
    return author
  } catch (error) {
    throw new GraphQLError('Saving user failed', {
      extensions: {
        code: 'BAD_USER_INPUT',
        invalidArgs: args.author,
        error
      }
    })
  }  
      }      
      const book = new Book( { ...args, author: author })
      try {
        await book.save()
        pubsub.publish('BOOK_ADDED', { bookAdded: book }) 
        return book
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }            
    }    
  },
  Subscription: {
    authorAdded: { 
    subscribe: () => pubsub.asyncIterator('AUTHOR_ADDED')  
    }, 
    bookAdded: { 
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')  
      },
    },
}

module.exports = resolvers