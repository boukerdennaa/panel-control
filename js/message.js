class AlertMessage extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });

        document.addEventListener("message",( event =>{
            var modal = this.shadow.querySelector(".modal");

            modal.classList.add("active");
            setTimeout(() => {
                modal.classList.remove("active");
            },5000 );
        }));
    };

    static get observedAttributes() { return []; }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(){
        this.render();
    }

    render() {
        this.shadow.innerHTML = 
        `
        <style>
        .modal {
            display: none; 
            position: fixed; 
            z-index: 1; 
            left: 0;
            top: 0;
            transform: (-50%, -50%);
            width: 100%; 
            height: 100%; 
            overflow: auto; 
            background-color: rgba(0,0,0,0.4); 
          }
        
        .active{
            display: block
          }
          
        .modal-content {
            background-color: #fefefe;
            margin: 15% auto; 
            padding: 20px;
            border: 1px solid #888;
            width: 30%;    
          }
        
        .modal-content p{
            color: black;
          }
        </style>
        <div class="modal">
            <div class= modal-content>
                <p>Datos enviados correctamente</p>
            </div>
        </div>`;	
    }
}
customElements.define('alert-component', AlertMessage);