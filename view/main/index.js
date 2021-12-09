// import
const { ipcRenderer } = require('electron')
const sqlite3 = require('../../sqlite3')

// DOM elements
let dbTable = document.querySelector('.dbTable')
let closeBtn = document.querySelector('.close')
let minBtn = document.querySelector('.min')
let menuCont = document.querySelector('.dbMenuCont')
let menuBtn = document.querySelector('.menu')
let dbCont = document.querySelector('.container')
let menuSvg = document.querySelector('#menuSvg')
let dbConfirmBtn = document.querySelector('.dbMenuBtnConfirm')
let dbPathInput = document.getElementById('pathInput')


// query 
let limit = 100
let q = `select host, name, id from moz_cookies order by id desc limit ${limit}`



//sqlite3.busca(conexao, q, dbTable)

//eventListener
closeBtn.addEventListener('click',()=>{
    ipcRenderer.send('closeApp')
})
minBtn.addEventListener('click',()=>{
    ipcRenderer.send('minApp')
})
//menu event listener
menuBtn.addEventListener('click',()=>{
    menuBtn.classList.toggle('activeMenu')
    menuResize()

})
let caminho

dbConfirmBtn.addEventListener('click',()=>{
    //console.log(dbPathInput.value)
    caminho = dbPathInput.value
    if(caminho == ''){
     cookieAnimationRender(dbTable)
     menuResize()
    }
    else{
        
        sqlite3.busca(caminho,q,dbTable)
    }
    
})

//render animation

function cookieAnimationRender(el){
    el.innerHTML = `<div class=\"cookieAnimation\"><img src=\"${__dirname + '/img/cookie.png'}\"class=\"cookie\"><img src=\"${__dirname + '/img/cookieFace.png'}\"class=\"cookieFace\"></div>`
}



// resizer functions 

function getCookiesAnimation(valor){
        document.querySelector('.cookieAnimation').style.marginTop=`${valor}px`
}

function menuResize(){
        if(menuBtn.classList.contains('activeMenu')){
            menuCont.style.marginTop='25px'
            dbCont.style.height='60vh'
            menuSvg.classList.add('menuAnimaterev')
            menuSvg.classList.remove('menuAnimate')
                getCookiesAnimation(-7)
        }
        else{
            menuCont.style.marginTop='-100px'
            dbCont.style.height='90vh'
            menuSvg.classList.add('menuAnimate')
            menuSvg.classList.remove('menuAnimaterev')
                getCookiesAnimation(110)
        }
}

// init run functions

cookieAnimationRender(dbTable)
