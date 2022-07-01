import React from 'react';
import './Styles/App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import JsonData from './data.json';


function App() {
  const [listings, setListings] = useState([]);
  const [array, setArray] = useState([]);

  // Setter Functions called in their own components have to be conditional. OR-
  // Stops infinite re-renders by only excuting setter functions in useEffect.
  window.onload = () => {
    setListings(old => FillListings);
  }

  function FillListings() {
    let mapped = JsonData.slice().map(data => {
      let arr = [];
      arr.push(<button onClick={() => HandleFillBar(data.role)}>{data.role}</button>);
      arr.push(<button onClick={() => HandleFillBar(data.level)}>{data.level}</button>);
      arr.push(data.languages.slice().map(language => {
        return (
          <button onClick={() => HandleFillBar(language)}>{language}</button>
        )
      })
      );
      if (data.tools !== []) {
        arr.push(data.tools.slice().map(tool => {
          return (
            <button onClick={() => HandleFillBar(tool)}>{tool}</button>
          )
        })
        )
      };

      return (
        <div className='job-post featured-job new-job'>
          <div className='group1'>
            <img className='company-img' src={data.logo} alt='logo' />

            <div className='job-details'>
              <div className='company-name'>
                {data.company}
                <div className='new-tag'>NEW!</div>
                <div className='featured-tag'>FEATURED</div>
              </div>

              <p className='job-position'>{data.position}</p>
              <div className='job-type'>
                <p>{data.postedAt}</p>
                &#8226;
                <p>{data.contract}</p>
                &#8226;
                <p>{data.location}</p>
              </div>
            </div>

          </div>

          <div className='filter-tablets'>
            {arr}
          </div>
        </div>
      )
    }
    )
    return ([...mapped])
  }


  function SearchBar(tab) {
    if (tab !== '' && array.includes('HTML') === false) {
      console.log(array.includes('HTML'));
      setArray(old => [old, <button key={Math.random(0, 201)}>{tab}<p>X</p></button>])
    }
  }

  function HandleClear() {
    setArray(old => []);
    document.getElementById('search-bar').style.display = 'none';
  }
  function HandleFillBar(tab) {
    SearchBar(tab);
    let bar = document.getElementById('search-bar');
    if (bar.style.display === 'none') {
      bar.style.display = 'flex';
    }
  }


  return (
    <div id='page-wrapper'>
      <header>
      </header>

      <main>
        <div id='search-bar'>
          <div className='search-tablets'>
            {array}
          </div>
          <button id='clear-btn'
            onClick={() => HandleClear()}>Clear</button>
        </div>
        <FillListings />
      </main>
    </div>
  );
}

export default App;