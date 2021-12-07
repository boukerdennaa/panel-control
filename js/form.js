var formElement = document.getElementById("crud__user-form");
var btnForm = document.querySelector(".crud__store-button");


btnForm.addEventListener('click', () => {
        var formData = new FormData(formElement);

        for (const [key, value] of formData) {
            console.log('Nombre:', key, 'Valor:', value);
        }
}); 