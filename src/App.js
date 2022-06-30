import React from 'react';
import './Styles/App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import JsonData from './data.json';



function App() {
  const [array, setArray] = useState([]);

  function SearchBar(tab) {
    if (tab !== '' && array.includes('HTML') === false) {
      console.log(array.includes('HTML'));
      let filterTab = <button key={Math.random(0, 201)}>{tab}<p>X</p></button>;
      setArray(old => [old, filterTab]);
    }
    // Stops infinite re-renders by only excuting useEffect when The value(Mapped) changes.
    // Setter Functions called in their own components have to be conditional. 
    // useEffect(() => {
    //   setArray(old=>[old,filterTab])
    // }, filterTab);
  }

  function HandleClear() {
    setArray(old => []);
    document.getElementById('search-bar').style.display = 'none';
  }

  function HandleFillBar(tab) {
    SearchBar(tab)
    document.getElementById('search-bar').style.display = 'flex';
  }

  function FillListings() {
    const [listings, setListings] = useState([]);
    let mapped = JsonData.slice().map(data =>
      <div className='job-post featured-job new-job'>

        <div className='group1'>
          <img className='company-img' src={require('./images/photosnap.svg').default} alt='logo' />

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
          <button onClick={() => HandleFillBar('HTML')}>JavaScript</button>
          <button onClick={() => HandleFillBar('HTML')}>JavaScript</button>
          <button onClick={() => HandleFillBar('HTML')}>JavaScript</button>
          <button onClick={() => HandleFillBar('HTML')}>JavaScript</button>
          <button onClick={() => HandleFillBar('HTML')}>JavaScript</button>
        </div>
      </div>
    )

    useEffect(() => {
      setListings(old => [...mapped])
    }, []);

    return (listings)
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

      // <div className='job-post featured-job new-job'>

      //   <div className='group1'>
      //     <img className='company-img' src={require('./images/photosnap.svg').default} alt='logo' />

      //     <div className='job-details'>
      //       <div className='company-name'>
      //         Company Name
      //         <div className='new-tag'>NEW!</div>
      //         <div className='featured-tag'>FEATURED</div>
      //       </div>

      //       <p className='job-position'>Position</p>
      //       <div className='job-type'>
      //         <p>Date</p>
      //         &#8226;
      //         <p>Job Type</p>
      //         &#8226;
      //         <p>Location</p>
      //       </div>
      //     </div>

      //   </div>

      //   <div className='filter-tablets'>
      //     <button onClick={() => HandleFillBar('HTML')}>JavaScript</button>
      //     <button onClick={() => HandleFillBar('HTML')}>JavaScript</button>
      //     <button onClick={() => HandleFillBar('HTML')}>JavaScript</button>
      //     <button onClick={() => HandleFillBar('HTML')}>JavaScript</button>
      //     <button onClick={() => HandleFillBar('HTML')}>JavaScript</button>
      //   </div>
      // </div>;