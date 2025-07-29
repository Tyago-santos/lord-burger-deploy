import {burger }from '../script/burgers';
import modalShow from './modal';

const wrapper = document.querySelector('.burger_wrapper');
const slider = document.querySelector('.container_slider');

const calcGeralContainer = document.querySelector('.container_geral').getBoundingClientRect().width  - 1;
const loginNavigator  = document.querySelector('.login');




function navigate (){
  if(window.localStorage.getItem('user')){
    window.location.href = '/';
  }else{

    window.location.href = '/cadastro.html';
  }
  
}

loginNavigator.addEventListener('click', navigate);
if(window.localStorage.getItem('user')){
  let user = window.localStorage.getItem('user')
  user = JSON.parse(user);



  loginNavigator.textContent = `Ola, ${user.name.split(' ')[0]}`;
}

  burger.forEach((item, index)=>{
    wrapper.innerHTML += `
            <div  data-index="${index}" class="burgers_list">
              <div class="burger_list_container_img">
                <img src="${item.img}" alt="">
              </div>
                  <span class="burger_list_legend">tradicional</span>
              <strong class="burger_list_name">
                ${item.name}
              </strong>
              <strong class="burger_list_price">
                 R$ ${item.price.toString().replace('.', ', ')}
              </strong>
            </div>`;



         slider.innerHTML += `
              <div   class="card_burger">
                  <div class="card_burger_infor">
                    <h1  class="card_burger_infor_title">${item.name}</h1>
                    <span  class="card_burger_infor_description"> 2 ${item.name}s</span>
                    <span class="card_burger_infor_price">R$ ${item.price.toString().replace('.', ',')}</span>
                  </div>

                  <div class="container_card_burger_img">
                    <img draggable="false" src="${item.img}" alt="">
                  </div>
              </div>
         `;
});

document.querySelectorAll('.burgers_list').forEach(item=>{
  item.addEventListener('click', ()=>{
    const index = item.getAttribute('data-index');
    modalShow(index);
  })
})





let pressionado = false;
let inicioX = 0;


let scrollInicial = 0;
let x = 0

slider.addEventListener('mousedown', function(e) {
    pressionado = true;
    inicioX = e.clientX;
    scrollInicial = this.scrollLeft;
    this.style.cursor = 'grabbing'; // Muda o cursor para indicar que está arrastando


  });

slider.addEventListener('mouseleave', function() {
    pressionado = false;
    this.style.cursor = 'default'; // Volta o cursor ao normal
});

window.addEventListener('mouseup', function() {
    pressionado = false;
    slider.style.cursor = 'default'; // Garante que o cursor volte mesmo fora do elemento

  });

slider.addEventListener('mousemove', function(e) {
    if (!pressionado) return; // Se o botão do mouse não estiver pressionado, não faz nada
    e.preventDefault(); // Evita seleção de texto durante o arraste
    const xAtual = e.clientX;
    const deslocamento = inicioX - xAtual; // Quanto o mouse se moveu
    this.scrollLeft = scrollInicial + deslocamento; // Atualiza o scroll com base no movimento
    getScrollVAlue(this.scrollLeft);
  });



// const widthWindow = (   document.documentElement.clientWidth   / 2);
// const widthSlider = document.querySelector('.card_burger').getBoundingClientRect().width;
// slider.style.gap =  `${widthWindow}px`; 



function getScrollVAlue (value){
const burgerList =[ ...document.querySelectorAll('.card_burger')].slice(1, 6);
  const calcValueScroll = value + (widthSlider/2);




}
//  function activeSlider (active){
//   let smoothScroll = 0;
//   let time  = null
//   if(!active){
    
//       time = setInterval(()=>{
//     smoothScroll += calcGeralContainer + 32

//     slider.scrollTo({
//       left: smoothScroll,
//       behavior:'smooth'
//     })
// }, 7000)
//   }else{
   
//     if (time !== null){
//         clearInterval(time)
//     }  
//   }
    

// }


// activeSlider(false)







console.log(window.scrollX);


// function smoothScrollTo(endX, endY, duration) {
//   const startX = window.scrollX || window.pageXOffset;
//   const startY = window.scrollY || window.pageYOffset;
//   const distanceX = endX - startX;
//   const distanceY = endY - startY;
//   const startTime = new Date().getTime();

//   duration = typeof duration !== 'undefined' ? duration : 400;

//   // Easing function
//   const easeInOutQuart = (time, from, distance, duration) => {
//     if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
//     return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
//   };

//   const timer = setInterval(() => {
//     const time = new Date().getTime() - startTime;
//     const newX = easeInOutQuart(time, startX, distanceX, duration);
//     const newY = easeInOutQuart(time, startY, distanceY, duration);
//     if (time >= duration) {
//       clearInterval(timer);
//     }
//     slider.scroll(newX, newY);
//   }, 1000 / 60); // 60 fps
// };

