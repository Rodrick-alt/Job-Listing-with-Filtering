import React from 'react';
import './Styles/App.css';
import { useState } from 'react';
import JsonData from './data.json';

function App() {

  function FillListings() {
    const [listings, setListings] = useState([]);

    return (
      <div className='job-post'>

        <div className='group1'>
          <img className='company-img' src={require('./images/photosnap.svg').default} alt='logo' />

          <div className='job-details'>
            <div className='company-name'>
              Company Name
              <div className='new-tag'>NEW!</div>
              <div className='featured-tag'>FEATURED</div>
            </div>

            <p className='job-position'>Position</p>
            <div className='job-type'>
              <p>Date</p>
              &#8226;
              <p>Job Type</p>
              &#8226;
              <p>Location</p>
            </div>
          </div>

        </div>

        <div className='filter-tablets'>
          <button>HTML</button>
          <button>HTML</button>
        </div>
      </div>);
  }

  function SearchBar(tablets) {
    function FillTablest() {
      return (
        <div className='search-tablets'>
          <button>
            HTML
          </button>
        </div>
      )
    }

    return (
      <div id='search-bar'>
        <div id='filter-tablets'>
          <FillTablest />
        </div>
        <button id='clear-btn'>Clear</button>
      </div>
    )
  }

  return (
    <div id='page-wrapper'>
      <header>
      </header>
      <main>
        <SearchBar />
        <FillListings />
      </main>
    </div>
  );
}

export default App;
