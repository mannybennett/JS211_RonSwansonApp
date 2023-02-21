window.onload = function() {
  getQuotes()
}

const dragStart = (e) => {
  e.dataTransfer.setData('text/plain', e.target.textContent);
  console.log(e.target.textContent)
  setTimeout(() => {
    e.target.classList.add('hide');
  }, 0);
}

const getQuotes = () => {
  fetch ('https://ron-swanson-quotes.herokuapp.com/v2/quotes/10')
  .then(res => res.json())
  .then(quotes => {
    displayQuotes(quotes)
  })
  .then(() => {
    const quoteText = document.querySelector('.quoteText')
    quoteText.addEventListener('dragstart', dragStart)
  })
}

const displayQuotes = (arr) => {
  console.log(arr)
  const quoteList = document.getElementById('quotes')
  arr.map(quote => {
    const div = document.createElement('div')
    div.setAttribute('draggable', 'true')
    div.className = 'quoteText'
    div.id = quote.split(' ').join('')
    console.log(div)
    const quoteText = document.createTextNode(`${quote}`)
    div.appendChild(quoteText)
    quoteList.appendChild(div)
  })
}

//DRAG-DROP FUNCTIONALITY

const boxes = document.querySelectorAll('.box');

const dragEnter = (e) => {
  e.preventDefault()
  console.log(e.target)
  e.target.classList.add('drag-over')
}

const dragOver = (e) => {
  e.preventDefault()
  e.target.classList.add('drag-over')
}

const dragLeave = (e) => {
  e.target.classList.remove('drag-over')
}

const drop = (e) => {
  e.target.classList.remove('drag-over')
  const data = e.dataTransfer.getData('text/plain')
  const el = document.getElementById(data.split(' ').join(''))
  console.log(el)
  const draggable = document.getElementById(el.id)
  console.log(draggable)
  e.target.appendChild(draggable)
  draggable.classList.remove('hide')
}

boxes.forEach(box => {
  box.addEventListener('dragenter', dragEnter)
  box.addEventListener('dragover', dragOver);
  box.addEventListener('dragleave', dragLeave);
  box.addEventListener('drop', drop);
});