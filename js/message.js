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

            setTimeout(function(){ 
                message.classList.remove('active');
            }, 5000);
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
                height: 10vh;
                display:none;
                padding: 0 0.5em;
                position: fixed;
                top:50%;
                left:50%;
                transform: translate(-50%, -50%);
                transition: opacity 0.3s;
                width: 30%;
            }
            #modal.success{
                border-top: 1em solid #04AA6D;;
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
        </style>
        <div id="modal">
            <p></p>
            <div id="alert-color">
            </div>
        </div>`;	
    }
}
customElements.define('modal-component', AlertMessage);
