const processContact = contact => ({
    capital: `${contact.capital} `,
    area: contact.area,
    languages: contact.languages,
    flags: contact.flags.png,   

  })
  
  export const fetchUsers = async (search) => {
    console.log('searchFetch', search)
    const response = await fetch(`https://restcountries.com/v3.1/name/${search}`)
    const results = await response.json()
    return results.map(processContact)
  }