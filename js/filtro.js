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
        </style>
        <form>
            <input type="text" id="search">
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