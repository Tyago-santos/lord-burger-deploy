const wrappeContainerCart = document.querySelector('.burger_wrapper_itens');
import { burger } from "./burgers";
import { cart } from "./modal";

import { calcQuant} from './modal'

const btnCartShow = document.querySelector('.cart');
const cartContainer = document.querySelector('.cart_container');
const cartitle = document.querySelector('.burger_cart_title');

const shoppingcart = document.querySelector('.shopping_count');

const quantItens = document.querySelector('.cart_quant');
const cartClose = document.querySelector('#cart_close');
const totalCartPrice = document.querySelector('.cart_legend_value');

const wrapperCarCalc =  document.querySelector('.cart_wrapper_calc');





function somatotalCart (){
  let totalSoma = 0;
    cart.forEach((item)=>{
    totalSoma += item.price
  })

  return  totalSoma;

}

cartClose.addEventListener('click', ()=>{
  cartContainer.style.display = 'none'
});


const upadateCart = (itens)=>{

    
     wrappeContainerCart.innerHTML = itens?.map(item=>{
               return `
                   <div class="burger_itens">
             
                      <img src="${item.img}" alt="">
                      <div class="cart_burger_wapper_infor">
                          <span class="cart_burger_infor_legend">tradicional</span>
                          <strong class="cart_burger_infor_title">${item.name}</strong>
                          <strong class="cart_burger_infor_price">R$ ${item.price.toFixed(2).toString().replace('.', ',')}</strong>
                        </div>

                      <div class="burger_cart_item"></div>
                      <div class="container_button">
                        <button class="button_decrease">-</button>
                        <span class="quanti_burger">${item.quant}</span>
                        <button class="button_increase">+</button>
                      </div> 
                  </div>     

        `;
    });

}



function setInforCart (){
  
  const stylesCart = window.getComputedStyle(cartContainer)
  if(stylesCart.display === 'none'){
    cartContainer.style.display = 'block';
  }else{
    cartContainer.style.display = 'none';
  }


  clearItemCart()
  countItemcart()

}

export  function countItemcart(){
  shoppingcart.innerHTML = cart.length > 9 ?`${cart.length}+` : cart.length;

  shoppingcart.style.display =  cart.length ===0 ? 'none': 'flex';
}

export function clearItemCart(){


  if(cart.length === 0 ){
    cartitle.innerHTML =  'Não ha nenhum item'
    quantItens.style.display = 'none'
  }else{
    quantItens.style.display = 'none'
    quantItens.style.display = 'block'

    quantItens.innerHTML = cart.length > 1 ? `${cart.length } itens ` : `${cart.length} item`;

    
  }



}

btnCartShow.addEventListener('click', setInforCart );



const eventButtons = (item )=> {

  const quatQuant = cartContainer.querySelectorAll('.quanti_burger');
  const burgerItensCart = document.querySelectorAll('.burger_itens')


  wrappeContainerCart.querySelectorAll('.button_decrease').forEach((el, i)=> el.addEventListener('click', ()=> {
    const cartPrice = [...document.querySelectorAll('.cart_burger_infor_price')];

    --cart[i].quant

      

  if (cart[i].quant < 1 ) {

    burgerItensCart[i].style.display = 'none';
    let indice = cart.indexOf(cart[i].name) > 1;
    cart.splice(indice, 1);
    return

  }else{
    if (burger.find(item => item == cart[i].name)) {
      burger.find(item => item == cart[i].name).quant = cart[i].quant;
    }


  }

    
    
  quatQuant[i].innerHTML = cart[i].quant; 
  // cartPrice.innerHTML = `R$ ${ cart[i].price * cart[i].quant}`;
  totalCartPrice.innerHTML ='R$ '+somatotalCart().toString().replace('.', ',');
  cartPrice[i].innerHTML = `R$ ${cart[i].price * cart[i].quant}`;



  }));
  wrappeContainerCart.querySelectorAll('.button_increase').forEach((el, i)=> el.addEventListener('click', ()=>{
    const cartPrice = [...document.querySelectorAll('.cart_burger_infor_price')];
    
    ++cart[i].quant;

    
    quatQuant[i].innerHTML = cart[i].quant;
    totalCartPrice.innerHTML ='R$ '+somatotalCart().toString().replace('.', ',');
     cartPrice[i].innerHTML = `R$ ${(cart[i].price * cart[i].quant).toFixed(2)}`;


  }));

}






const cartGetProps = (itens)=>{
  upadateCart(itens);

  eventButtons(itens)

}


window.onload =  ()=>{

  if ( cart.length < 1){
  wrapperCarCalc.style.display = 'none';

}else{
  wrapperCarCalc.style.display = 'block';

}


}





export default cartGetProps;