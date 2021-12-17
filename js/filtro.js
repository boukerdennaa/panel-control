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
                font-family: 'Ubuntu';
                font-size: 1.2em;
                padding: 0.5em;
                text-align: left;
            }

            label{
                font-family: Ubuntu;
                font-size:1.1em;
                padding: .5em;
                color: #fff;
            }
        </style>
        <form>
            <label for="filtro">Filtrar datos tabla</label>
            <input type="text" id="search" name="filtro">
        </form>`;  
        
        this.shadow.querySelector('#search').addEventListener('keyup', (event) => {
            
            document.dispatchEvent(new CustomEvent('filterSearch', {
                detail: {
                    search: event.target.value,
                }
            }));
        });
    }      
}

customElements.define('filtro-component', TableFilter);