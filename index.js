document.addEventListener("DOMContentLoaded", function(){
  getMonsters()
  getForm().addEventListener('submit', addMonster)
  nextPage().addEventListener('click', scrollForward)
  prevPage().addEventListener('click', scrollBack)
})

function getMonsters(){
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=1`)
    .then(response => response.json())
    .then(data => {
      data.forEach(monster => makeMonster(monster))
    })
}

let page = 1
function scrollForward(){
  page++
  getMonsterDiv().innerHTML = ""
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(response => response.json())
  .then(data => {
    data.forEach(monster => makeMonster(monster))
  })
}

function scrollBack(){
  page--
  getMonsterDiv().innerHTML = ""
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
  .then(response => response.json())
  .then(data => {
    data.forEach(monster => makeMonster(monster))
  })
}

function postMonsters(name, age, description){
  let info = {
    name: name,
    age: age,
    description: description
  }
  fetch('http://localhost:3000/monsters/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(info)
  })
    .then(response => response.json())
    .then(data => {
      makeMonster(data)
    })
}

function addMonster(event){
  event.preventDefault()
  let name = document.querySelector('#monster-name').value
  let age = document.querySelector('#monster-age').value
  let description = document.querySelector('#monster-desc').value
  postMonsters(name, age, description)
}

function makeMonster(monster){
    let monsterElement = document.createElement('div')
    let monstTitle = document.createElement('h4')
    monstTitle.innerText = monster.name

    let monstAge = document.createElement('p')
    monstAge.innerText = monster.age

    let monstDesc = document.createElement('p')
    monstDesc.innerText = monster.description

    getMonsterDiv().appendChild(monsterElement)
    monsterElement.appendChild(monstTitle)
    monsterElement.appendChild(monstAge)
    monsterElement.appendChild(monstDesc)
}

function getMonsterDiv(){
  return document.querySelector('#monster-container')
}

function getForm(){
  return document.querySelector('#create-monster')
}

function nextPage(){
  return document.querySelector('#forward')
}

function prevPage(){
  return document.querySelector('#back')
}
