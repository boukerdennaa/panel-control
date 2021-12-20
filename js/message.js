class AlertMessage extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.message = '';
        this.type = '';

        document.addEventListener("message",( event =>{
            this.setAttribute('message', event.detail.message);
            this.setAttribute('type', event.detail.type);
        }));

    }

    static get observedAttributes() { return ['message', 'type']; }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue){

        if(name == 'message'){
            let message = this.shadow.querySelector('#modal');
            message.classList.add('active');

            this.shadow.querySelector('p').textContent = newValue;

            if('type' == "success"){
                setTimeout(function(){ 
                    message.classList.remove('active');
                }, 5000);
            }

            let button = this.shadow.querySelector('#close');
            button.addEventListener("click", () => {
                message.style.display = "none";    
            })
        }

        if(name == 'type'){
            let message = this.shadow.querySelector('#modal');
            message.classList.add(newValue);
        }
    }

    render() {
        this.shadow.innerHTML = 
        `
        <style>
            #modal{
                background-color: #333;
                display:none;
                padding: .5em 0;
                position: fixed;
                top:50%;
                left:50%;
                transform: translate(-50%, -50%);
                transition: opacity 0.3s;
                width: 20%;
                border-radius: 2em;
            }
            #modal.success{
                border-top: 1em solid #04AA6D;
            }

            #modal.active{
                display:block;
            }

            p{
                font-family: 'Ubuntu';
                font-size: 1.2em;
                color: #fff;
                text-align: center;
            }

            button{
                background-color:  hsl(0, 0%, 100%);
                padding: .4em;
                display : block;
                margin: 0 auto;
                border: none;
                cursor: pointer;
                margin-bottom: .5em;
                border-radius: 5em;
            }

            #close{
                background-color: rgb(201, 53, 110);
            }
        </style>
        <div id="modal">
            <p></p>
            <button id="close">Cancelar</button>
            <button id="continue">Continuar</button>
            <div id="alert-color">
            </div>
        </div>`;	
    }
}
customElements.define('modal-component', AlertMessage);
