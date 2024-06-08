import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';

const SetBirthYear = ({ authors }) => {
  const [options, setOptions] = useState(authors);
  const [selectedName, setSelectedName] = useState('');
  const [name, setName] = useState('');
  const [setBornTo, setSetBornTo] = useState(''); 

  const [editNumber, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n');
      console.log('EDIT_AUTHOR_messagesEror', messages);
          },
  });
  const submit = async (event) => {
    event.preventDefault();

    // Use the selected author name for the mutation
    editNumber({ variables: { name: selectedName, setBornTo } });

    setName('');
    setSetBornTo(''); // Reset the year after submission
  };

  return (
    <div>
      <h4>Set Birth Year</h4>
      <label>
        Select an author:
        <select
          value={selectedName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          <option value="">Select an author</option>
          {options.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
      <hr />
      <form onSubmit={submit}>
        <div>
        born <input
            type="number"
            value={setBornTo}
            onChange={({ target }) => setSetBornTo(Number(target.value))}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default SetBirthYear;
