import React, { useEffect, useState } from 'react'
import { data } from './data'
import './App.css';
import { pathGet } from './utils' 



const Search = ({query, setQuery}) => {
  return (
    <div className='search-bar'>
      <input className='search' placeholder='Search' value={query} onChange={(e) => {
        e.persist()
        setQuery(e.target.value)
      }}/>
    </div>
   
  )
}
const App = () => {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState('')

  useEffect(() => {
    if(!search) {
      setResult('')
      return
    }
    setResult(pathGet(data, search))
  }, [search])
  return (
    <div className="app">
      <Search query={search} setQuery={setSearch}/>
      <div className='result-box'>{result}</div>
      <div className='data-box'>{
        data.map(obj => {
          return (<span className='data-entry'>
            {JSON.stringify(obj)}
          </span>)
        })
      }</div>
      
    </div>
  );
}

export default App;
