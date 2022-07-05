import React from 'react';
import './Styles/App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import JsonData from './data.json';

//added new and featured job differiante

function App() {
  // job listing array
  const [listings, setListings] = useState([]);
  // search array
  const [searchArray, setSearchArray] = useState([]);
  let checkArr = [];

  // Setter Functions called in their own components have to be conditional. OR-
  // Stops infinite re-renders by only excuting setter functions in useEffect.
  window.onload = () => {
    setListings(old => <FillListings />);
  }

  function FillListings() {
    let mapped = JsonData.slice().map(data => {
      // job filter tablets
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

      // job post styling
      let styling = 'job-post'
      if (data.featured)
        styling = 'job-post featured-job'
      if (data.new)
        styling = 'job-post new-job'
      if (data.featured && data.new)
        styling = 'job-post featured-job new-job'

      return (
        <div className={styling}>
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
    // console.log(mapped[0])
    return (mapped)
  }


  function HandleClear() {
    checkArr = [];
    setSearchArray(old => []);
    document.getElementById('search-bar').style.display = 'none';
  }

  function SearchBar(tab) {
    if (checkArr.includes(tab) == false) {
      checkArr.push(tab);
      setSearchArray(old => [...old, <button key={old.length}
        onClick={() => RemoveSearchBtn(old.length)}>{tab}<p>X</p></button>]);
      document.getElementById('search-bar').style.display = 'flex';
    } else { console.log(checkArr) }
  }

  function HandleFillBar(tab) {
    SearchBar(tab);
  }


  function RemoveSearchBtn(index) {
    console.log(index)
    // index -= 1;
    // if (index < 0) index = 1;
    // checkArr.splice(index, 1);
    // setSearchArray(old => {
    //   old.splice(index, 1);
    //   return [...old]
    // })
  }



  return (
    <div id='page-wrapper'>
      <header>
      </header>

      <main>
        <div id='search-bar'>
          <div className='search-tablets'>
            {searchArray}
          </div>
          <button id='clear-btn'
            onClick={HandleClear}>Clear</button>
        </div>
        {listings}
      </main>
    </div>
  );
}

export default App;