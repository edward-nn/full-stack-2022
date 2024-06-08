const BookDetails = ({ book }) => {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Author</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
export default BookDetails