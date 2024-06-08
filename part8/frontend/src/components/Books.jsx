import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from "../queries"
import BookDetails from './BookDetails'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState("")
  const result = useQuery(ALL_BOOKS)
  
  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }
  
  const books = result.data.allBooks.map(({ __typename, ...rest }) => rest);
const booksToShow = selectedGenre ? books.filter((b) =>  b.genres.filter((g) =>  g.includes(selectedGenre)  ).length > 0) : books;
    
  return (
    <div>
      <h2>books</h2>   
      <span>in genre </span>
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        <option value="refactoring">refactoring</option>
        <option value="patterns">patterns</option>
        <option value="design">design</option>
        <option value="classic">classic</option>
        <option value="crime">crime</option>
        <option value="revolution">revolution</option>
      </select>
      <br />
  
      {booksToShow.map((bookData) => (
            <BookDetails key={bookData.title} book={bookData} />            
          ))}        
    </div>
  )
}

export default Books
