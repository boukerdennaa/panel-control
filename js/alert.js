class Alert extends HTMLElement {

    constructor() {

        super();
  
        this.shadow = this.attachShadow({ mode: 'open' });

        document.addEventListener("alert",( event =>{
            // this.loadAlert();
            this.message();
        }));
}
    connectedCallback() {
        this.loadAlert();
    }

    attributeChangedCallback(){
        this.loadAlert();
    }

    loadAlert(){

        var modal = document.getElementById("myModal");
        var closeBtn = document.getElementsByClassName("close")[0];

        modal.style.display = "block";
        setTimeout(() => {
            modal.classList.remove("active");
        },5000 );
        
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        }),

        window.addEventListener("click", (e) => {
            if (e.target == modal) {
                modal.style.display = "none";
            }
        })        
    }
    
    message() {   
        this.shadow.innerHTML = 
            `
            <style>
                #modal {
                    display: block; 
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
                      display: block;
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
                  
                .close {
                    color: #aaa;
                    float: right;
                    font-size: 1em;
                    font-weight: bold;
                  }
                  
                .close:hover,
                .close:focus {
                    color: black;
                    text-decoration: none;
                    cursor: pointer;
                  }
                </style>
                <div id="myModal">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <p>Datos guardados correctamente</p>
                    </div>
                </div>
                `;          
            }
}
// Para que funcione el componente Alert
customElements.define('modal-component', Alert);


