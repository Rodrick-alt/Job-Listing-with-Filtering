# Frontend Mentor - Job listings with filtering solution

This is a solution to the [Job listings with filtering challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Filter job listings based on the categories

### Screenshot

![](/public/Screenshot.png)


### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library

### What I learned

This project allowed me to learn about HTML Entities, reserved html character, and React state setter functions being nestable.

```html
  <p>{data.postedAt}</p>
  &#8226;
  <p>{data.contract}</p>
  &#8226;
  <p>{data.location}</p>
```
```js
setCheckArr(old => {
      if (old.includes(tab) === false) {
        //didn't know you can nest setter functions, neat!
        setSearchArray(old => [...old, <button key={old.length}
          onClick={() => removeSearchBtn(old.length)}>{tab}<p>X</p></button>]);
        document.getElementById('search-bar').style.display = 'flex';
        return [...old, tab]
      } else { return [...old] }
    });
```

### Useful resources

- [HTML Entities](https://www.w3schools.com/html/html_entities.asp) - This helped me understand HTML Entities.

