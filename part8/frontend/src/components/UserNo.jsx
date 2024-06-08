import { useQuery } from '@apollo/client';
import { QUERY_ME, ALL_BOOKS } from '../queries';

const User = (props) => {

  const renderBooks = (selectedGenre) => {
     
    const result = useQuery(ALL_BOOKS)

    if (result.loading)  {
      return <div>loading...</div>
    }

    const books = result.data.allBooks.map(({ __typename, ...rest }) => rest);
    console.log('booksInUser', books)
const booksToShow = selectedGenre ? books.filter((b) =>  b.genres.filter((g) =>  g.includes(selectedGenre)  ).length > 0) : books;
console.log('booksToShowInUser', booksToShow)
  

    return (
      <table>
        <thead>
          <tr>
            <th> <h2>Recommendation based on you</h2></th>
            <th>Author</th>
            <th>Published</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {booksToShow.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
              <td>{b.genres.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };  

  const result = useQuery(QUERY_ME)
	console.log('resultUser', result)
	if (!props.show) {
	  return null
	}
  
	if (result.loading)  {
	  return <div>loading...</div>
	}
	return(
		<div>
			<br />
			<h2>Recommendations</h2>
			<h4>Username: {result.data.me.username}</h4>
			<h4>Books on Favorite Genre: {result.data.me.favoriteGenre ? renderBooks(result.data.me.favoriteGenre) : <span>No set </span>}</h4>
			
							
</div> )

  
};

export default User;
