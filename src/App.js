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


  window.onload = () => {
    setListings(old => <FillListings />);
  }
  // Restructuring Listings whenenver filtertabs are added to searchbar
  useEffect(() => {
    setListings(old => <FillListings />);
  }, [searchArray, checkArr])


  function handleClear() {
    setCheckArr(old => []);
    setSearchArray(old => []);
    document.getElementById('search-bar').style.display = 'none';
  }


  function removeSearchBtn(tab) {
    setCheckArr(old => {
      let index = old.indexOf(tab);
      let newArr = old.slice()
      newArr.splice(index, 1);

      setSearchArray(old => {
        let newArr2 = old.slice();
        newArr2.splice(index, 1)
        if (newArr2.length === 0) {
          document.getElementById('search-bar').style.display = 'none';
        }
        return [...newArr2]
      })

      return [...newArr]
    })
  }


  function searchBar(tab) {
    setCheckArr(old => {
      if (old.includes(tab) === false) {
        //didn't know you can nest setter functions, neat!
        setSearchArray(old => [...old,
        <button key={old.length + 1}
          onClick={() => removeSearchBtn(tab)}>{tab}<p>X</p>
        </button>]);

        document.getElementById('search-bar').style.display = 'flex';
        return [...old, tab]
      } else { return [...old] }
    });
  }


  function FillListings() {
    let mapped = JsonData.slice().map(data => {
      // job filter tablets
      let arr = [];
      arr.push(<button
        key={Math.floor(Math.random() * 1000) + ' b1'}
        onClick={() => searchBar(data.role)}>
        {data.role}
      </button>
      );
      arr.push(<button
        key={Math.floor(Math.random() * 1000) + ' b2'}
        onClick={() => searchBar(data.level)}>
        {data.level}
      </button>
      );
      arr.push(data.languages.slice().map(language =>
        <button
          key={Math.floor(Math.random() * 1000) + ' lanB'}
          onClick={() =>
            searchBar(language)}>
          {language}
        </button>
      ));

      if (data.tools !== []) {
        arr.push(data.tools.slice().map(tool =>
          <button
            key={Math.floor(Math.random() * 1000) + ' lanB'}
            onClick={() =>
              searchBar(tool)}>
            {tool}
          </button>
        ));
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
      if (checkArr !== [] && !checkArr.every(checking)) {
        styling = 'job-post-off'
      }

      return (
        <div className={styling}
          key={Math.floor(Math.random() * 1000) + ' Group'}>
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
    });
    return (mapped)
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