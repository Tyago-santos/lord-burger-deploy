const btnForm = document.querySelector('.btn');
const nome = document.querySelector('.name');
const email = document.querySelector('.email');
const password = document.querySelector('.password');


btnForm.addEventListener('click',e=>{
        e.preventDefault();

        
            if(nome.value && email.value && password.value){
                window.localStorage.setItem('user', JSON.stringify({

                    name: nome.value,
                    email: email.value,
                    password: password.value
                }));
                window.location.href = '/';
            }else{
                alert('Preenccha todas as imformacoes corretas');
            }

});