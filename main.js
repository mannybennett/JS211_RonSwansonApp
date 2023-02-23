window.onload = function() {
  getQuotes()
}

const dragStart = (e) => e.dataTransfer.setData('text/plain', e.target.textContent)

const getQuotes = () => {
  fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes/10')
    .then(res => res.json())
    .then(quotes => displayQuotes(quotes))
}

const displayQuotes = (arr) => {
  const quoteList = document.getElementById('quotes')
  arr.map(quote => {
    const div = document.createElement('div')
    div.setAttribute('draggable', 'true')
    div.className = 'quoteText'
    div.id = quote.split(' ').join('')
    const quoteText = document.createTextNode(`${quote}`)
    div.appendChild(quoteText)
    quoteList.appendChild(div)
    div.addEventListener('dragstart', dragStart)
  })
}

const boxes = document.querySelectorAll('.dropbox');

const dragEnter = (e) => {
  e.preventDefault()
  e.target.classList.add('drag-over')
}

const dragOver = (e) => {
  e.preventDefault()
  e.target.classList.add('drag-over')
}

const dragLeave = (e) => e.target.classList.remove('drag-over')

const drop = (e) => {
  if (!e.target.childNodes.length) {
    e.target.classList.remove('drag-over')
    const data = e.dataTransfer.getData('text/plain')
    const el = document.getElementById(data.split(' ').join(''))
    e.target.appendChild(el)
    pictureDisplay()
  }
}

boxes.forEach(box => {
  box.addEventListener('dragenter', dragEnter)
  box.addEventListener('dragover', dragOver);
  box.addEventListener('dragleave', dragLeave);
  box.addEventListener('drop', drop);
})

const pictureDisplay = () => {
  let quoteList = document.getElementById('quotes')
  if (quoteList.childNodes.length === 0) {
    const img = document.createElement('img')
    img.classList.add('image')
    img.src = "./ronSwanson.jpg"
    quoteList.appendChild(img)
  }
}