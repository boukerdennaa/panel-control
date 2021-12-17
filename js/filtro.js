class TableFilter extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {

        this.shadow.innerHTML = 
        `
        <style>
            form {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-bottom: 1em;
            }
            input {
                border: none;
                font-size: 1.2em;
                padding: 0.4em 0.6em;
                text-align: left;
            }
            h4{
                font-family: Ubuntu;
                color:#fff;
            }
        </style>
        <form>
            <h4>Filtrar tabla</h4>
            <input type="text" id="search">
        </form>`;  

        let buscador = this.shadow.querySelector('#search');
        
        buscador.addEventListener('keyup', (event) => {
            
            document.dispatchEvent(new CustomEvent('filtro', {
            }));
        });
    }      
}

customElements.define('filtro-component', TableFilter);