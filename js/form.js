export const form = () =>{

let formElement = document.getElementById("crud__user-form");
let btnForm = document.querySelector(".crud__store-button");

btnForm.addEventListener('click', () => {
        let formData = new FormData(formElement);

        formData.forEach((value, key ) => {        
            console.log('Nombre:', key, 'Valor:', value);
        }); 
    }); 
}