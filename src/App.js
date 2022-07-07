import React from 'react';
import './Styles/App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import JsonData from './data.json';


function App() {
  // job listing array
  const [listings, setListings] = useState([]);
  // search array
  const [searchArray, setSearchArray] = useState([]);
  const [checkArr, setCheckArr] = useState([]);


  function handleClear() {
    setCheckArr(old => []);
    setSearchArray(old => []);
    document.getElementById('search-bar').style.display = 'none';
  }

  function removeSearchBtn(index) {
    setCheckArr(old => {
      old.splice(index, 1);
      return [...old]
    })
    setSearchArray(old => {
      old.splice(index, 1);
      if (old.length === 0) {
        document.getElementById('search-bar').style.display = 'none';
      }
      return [...old]
    })
  }

  function searchBar(tab) {
    //do all your functionality in setter functions
    //so you have access to the updated variables
    setCheckArr(old => {
      if (old.includes(tab) === false) {
        //didn't know you can nest setter functions, neat!
        setSearchArray(old => [...old, <button key={old.length}
          onClick={() => removeSearchBtn(old.length)}>{tab}<p>X</p></button>]);
        document.getElementById('search-bar').style.display = 'flex';
        return [...old, tab]
      } else { return [...old] }
    });
  }

  function FillListings() {
    let mapped = JsonData.slice().map(data => {
      // job filter tablets
      let arr = [];
      arr.push(<button onClick={() => searchBar(data.role)}>{data.role}</button>);
      arr.push(<button onClick={() => searchBar(data.level)}>{data.level}</button>);
      arr.push(data.languages.slice().map(language => <button onClick={() =>
        searchBar(language)}>{language}</button>));

      if (data.tools !== []) {
        arr.push(data.tools.slice().map(tool => <button onClick={() =>
          searchBar(tool)}>{tool}</button>));
      };

      // job post styling
      let styling = 'job-post';
      if (data.featured)
        styling = 'job-post featured-job';
      if (data.new)
        styling = 'job-post new-job';
      if (data.featured && data.new)
        styling = 'job-post featured-job new-job';

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
    return (mapped)
  }

  // Restructuring Listings whenenver filtertabs are added to searchbar
  useEffect(() => {
    let mapped = JsonData.slice().map(data => {
      // job filter tablets
      let arr = [];
      arr.push(<button onClick={() => searchBar(data.role)}>{data.role}</button>);
      arr.push(<button onClick={() => searchBar(data.level)}>{data.level}</button>);
      arr.push(data.languages.slice().map(language => <button onClick={() =>
        searchBar(language)}>{language}</button>));

      if (data.tools !== []) {
        arr.push(data.tools.slice().map(tool => <button onClick={() =>
          searchBar(tool)}>{tool}</button>));
      };

      // job post styling
      let styling = 'job-post';
      if (data.featured)
        styling = 'job-post featured-job';
      if (data.new)
        styling = 'job-post new-job';
      if (data.featured && data.new)
        styling = 'job-post featured-job new-job';

      // job-post to searchbar filter-tabs comparison
      let jobFilterTabs = [data.role, data.level, ...data.languages.slice(), ...data.tools.slice()];
      const checking = (item) => jobFilterTabs.includes(item);
      if (!checkArr.every(checking)) {
        styling = 'job-post-off'
      }

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
    setListings(old => [...mapped])
  }, [searchArray, checkArr])



  // Setter Functions called in their own components have to be conditional. OR-
  // Stop infinite re-renders by only excuting setter functions with useEffect in a component.
  window.onload = () => {
    setListings(old => <FillListings />);
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
            onClick={() => handleClear()}>Clear</button>
        </div>
        {listings}
      </main>
    </div>
  );
}

export default App;