export const form = () => {

let formElement = document.getElementById("crud__user-form");
let btnForm = document.querySelector(".crud__store-button");

btnForm.addEventListener('click', () => {
        let formData = new FormData(formElement);

        for (const [key, value] of formData) {
            console.log('Nombre:', key, 'Valor:', value);
        }
});
} 