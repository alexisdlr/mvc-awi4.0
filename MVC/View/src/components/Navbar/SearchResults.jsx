import React from 'react'

function SearchResults({results}) {
  return (
    <div className='searchResults'>
      {results ? results.map(u => (
        <div key={u.id}>
          <span>{u.name}</span>
        </div>
      )): 'nothing to show'
    }
    </div>
  )
}

export default SearchResults