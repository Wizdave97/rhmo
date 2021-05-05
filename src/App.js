import React, { useEffect, useState } from 'react'
import { data } from './data'
import './App.css';
import { pathGet } from './utils' 
import ErrorBoundary from './ErrorBoundary';



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
    <ErrorBoundary>
    <div className="app">
      <Search query={search} setQuery={setSearch}/>
      <div className='result-box'>{result instanceof Array ? result.filter((res) => Boolean(res.trim())).map((res, i) => <span key={i}>{res}</span>) : <span>{result}</span>}</div>
      <div className='data-box'>{
        data.map((obj, i) => {
          return (<span className='data-entry' key={i}>
            {JSON.stringify(obj)}
          </span>)
        })
      }</div>
      
    </div>
    </ErrorBoundary>
  );
}

export default App;
