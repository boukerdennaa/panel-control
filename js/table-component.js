// Pillar las cualidades de un objeto y ampliarlas
// Table amplia las cualidades de HTMElement
// herencia, los objetos heredan
// Table es "hijo" de HTMLElement
class Table extends HTMLElement {
// constructor, es lo primero que arranca
    constructor() {
        // super() ejecuta todo lo que hay en HTMLElement
        super();
        // Activa el Shadow DOM
        // Propiedades del objeto HTMLElement
        this.shadow = this.attachShadow({ mode: 'open' });
        this.api = 'http://141.94.27.118:8080/api';

        // "newData" "newURL" evento creado personalizados
        // la tabla escucha si hay este evento, form envia info al servidor, la tabla recoge los datos y vuelve a pintar la tabla
        document.addEventListener("newData",( event =>{
            this.loadData();
        }));

        document.addEventListener("newUrl",( event =>{
            this.setAttribute('url', this.api + event.detail.url);
        }));
    }

    // que atributos deseas vigilar, cada vez que url cambie
    static get observedAttributes() { return ['url']; }

// se ejecuta cuando conectas el componente en tu HTML
// Ciclo de vida del componente
    connectedCallback() {
        this.loadData();
    }

    attributeChangedCallback(){
        this.loadData();
    }
// llamas a los datos
    loadData() {

        let url = this.getAttribute('url');

        if(url){

            fetch(url, { 
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            }) 
            .then(response => {
                if (!response.ok) throw response;

                return response.json();
            })
            .then(json => {
                this.data = json.data;
                this.render();
            })
            .catch(error => console.log(error));
        }
    }

    render() {
// creacion del Shadow DOM - CSS y HTML
        this.shadow.innerHTML = 
        `
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }
            td, th {
                border: 1px solid hsl(0, 0%, 87%);
                color: hsl(0, 0%, 100%);
                font-family: 'Ubuntu';
                padding: 8px;
                text-align: left;
            }
        </style>
        <table>
            <thead>
                ${this.getHeader()}
            </thead>
            <tbody>
                ${this.getTableData()}
            </tbody>
        </table>`;      
    }

    getHeader() {

        let header = '';
        Object.keys(this.data[0]).forEach( (key) => {
            header += `<th>${key}</th>`;
        });
        // header += `<th></th>`;
        return `<tr>${header}</tr>`;
    }

    getTableData() {

        let data = '';
        this.data.forEach(element => {
            data += `<tr>`;
            Object.values(element).forEach( (value) => {
                data += `<td>${value}</td>`;
            });

            // data += 
            // `<td class="edit-button" data-id="${element.id}">
            //     <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            //         <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
            //     </svg>
            // </td>`;
            
            data += `</tr>`;
        });

        return data;
    }           

filter(search) {

    let table = this.shadow.querySelector('table');
    let rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {

        let text = row.innerText.toLowerCase();
        
        if(text.indexOf(search.toLowerCase()) > -1) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}
}

// Para que funcione el componente Table
customElements.define('table-component', Table);