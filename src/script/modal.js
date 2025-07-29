import { burger } from "./burgers";
import cartGetProps from "./cart";

import { clearItemCart } from "./cart";
import  { countItemcart} from './cart'

const modalContainer = document.querySelector('.container_modal');
const burgerIten = document.querySelector('.burger_itens');

const totalCartPrice = document.querySelector('.cart_legend_value');











export let cart =[];
let permissionAddItem = false


function somatotalCart (){
  let totalSoma = 0;
    cart.forEach((item)=>{
    totalSoma += item.price
  })

  return  totalSoma;

}





modalContainer.addEventListener('click', e=>{

  if(e.target.className === 'container_modal' ||  e.target.className ==='modal_close'){

    modalContainer.style.display = 'none';

  }	

})



 function AddModalEvent(btn, item ){
    btn.addEventListener('click',()=>{
    modalContainer.style.display ='none';
    const itemCartTransformer = calcQuant(item);

    clearItemCart();
    countItemcart();

    totalCartPrice.innerHTML ='R$ '+somatotalCart().toString().replace('.', ',')
    
      
    cartGetProps(itemCartTransformer);

    permissionAddItem= true

    })
      
    }


function calcQuantPrice(burgers){
  return burgers.price * burgers.quant
}

  export const calcQuant = (hanburger)=>{

    let itemBurger = burger.find(item=>item.name === hanburger.name);
    let cartBurgerItem = cart.find(item=>item.name === hanburger.name);
      
      if(cart.length > 0){
        
        if ( itemBurger   && cartBurgerItem) {
            hanburger.price =  itemBurger.quant * cartBurgerItem.price;
          
          
          if(permissionAddItem ===  true){
            
            hanburger.quant =  ++itemBurger.quant;

            hanburger.price =itemBurger.price* itemBurger.quant
    


          }else{
            hanburger.quant =  itemBurger.quant;
            hanburger.price =itemBurger.price* itemBurger.quant

            // hanburger.price = itemBurger.quant * cartBurgerItem.price;


          }

          
               
        }
        else{
            // hanburger.price =  itemBurger.quant * cartBurgerItem.price;
                hanburger.price =itemBurger.price* itemBurger.quant
               cart.push(hanburger); 

        }
          
    }else{
        
    hanburger.price =itemBurger.price* itemBurger.quant
    cart.push(hanburger); 
    }
   
    return cart

 




}


const modalShow = (index )=>{
    modalContainer.style.display = 'flex'
    
    let  burgerModal = burger[+index] 
    // const getBurger  = cart.find(item=> item.name == burgerModal.name);
    // if (getBurger) {
      //   burgerModal.quant = getBurger.quant;
      // }
      
      
      createElementModal(burgerModal);
      
}


const handleClickDecrease = (el, burgers, price) => {
  --burgers.quant

  if (burgers.quant < 1 ) {
      burgers.quant = 1
  }
  
  el.innerHTML = burgers.quant;
  price.innerHTML = `R$ ${burgers.price.toString().replace('.', ',')}`;
  permissionAddItem = false

  



}

const handleClickInclease = (el, burgers, price) => {
    ++burgers.quant;
    // burgers.price += burger.price   
    el.innerHTML = burgers.quant;
    price.innerHTML = `R$ ${(burgers.price * burgers.quant).toFixed(2).toString().replace('.', ',')}`; 
    
    


    // const getBurger  = cart.find(item=> item.name == burger.name);
    // if (getBurger) {
    //    getBurger.quant = count;
    //    alert('achou');
    // }


  permissionAddItem = false

}



const createElementModal = (burgers)=>{

    modalContainer.innerHTML = `
        <div class="modal">
            <span class="modal_close">X</span>
            <div class="modal_container_img">
              <img src="${burgers.img}" alt="">
            </div>
            <div class="modal_burger_infor">
                <h1 class="modal_burger_title">${burgers.name}</h1>
                <span class="modal_burger_legend">tradicional</span>
                <p class="modal_burger_description">${burgers.description}</p>
              
                <span class="modal_count_title">Quantidade</span>
              <div class="modal_count">
                <span class="modal_burger_price">R$ ${burgers.price.toString().replace('.', ',')}</span>
                <div class="container_button">  
                  <button class="button_decrease">-</button>
                  <span class="quanti_burger">${burgers.quant  === 0 ? 1 : burgers.quant}</span>
                  <button class="button_increase">+</button>
                </div>
              </div>
              <button class="button_cart">Adicionar ao Carinho</button>
            </div>
      </div>
        
    `
    

  const btnAddCart = modalContainer.querySelector('.button_cart');
  const quantBurger = document.querySelector('.quanti_burger');
  const priceText =  document.querySelector('.modal_burger_price');

  
  document.querySelector('.button_decrease').addEventListener('click', ()=> handleClickDecrease(quantBurger, burgers, priceText));
  document.querySelector('.button_increase').addEventListener('click', ()=> handleClickInclease(quantBurger, burgers, priceText));
   
  AddModalEvent(btnAddCart, burgers)

}




export default modalShow;



