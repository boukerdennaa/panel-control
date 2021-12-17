class Table extends HTMLElement {

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.api = 'http://141.94.27.118:8080/api';
        this.data = [];

        document.addEventListener("newData",( event =>{
            this.loadData();
        }));

        document.addEventListener("newUrl",( event =>{
            this.setAttribute('url', this.api + event.detail.url);
        }));

        document.addEventListener("filterSearch",( event =>{
            this.filter(event.detail.search);
        }));
    }

    static get observedAttributes() { return ['url']; }

    connectedCallback() {
        this.loadData();
    }

    attributeChangedCallback(){
        this.loadData();
    }

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
                this.data = json.data.data;

                document.dispatchEvent(new CustomEvent('loadTable', {
                    detail: {
                        totalPage: json.data.total,
                        currentPage: json.data.current_page,
                        lastPage: json.data.last_page,
                        firstPageUrl: json.data.first_page_url,
                        previousPageUrl: json.data.prev_page_url,
                        nextPageUrl: json.data.next_page_url,
                        lastPageUrl: json.data.last_page_url,
                    }
                }));

                this.render();
            })
            .catch(error => console.log(error));
        }
    }

    render() {

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
                padding: 0.2em 0.5em; 
            }
            td{
                text-align: left;
            }
            th{
                text-align: center;
            }
            svg {
                cursor: pointer;
                height: 1.5em;
                width: 1.5em;
            }
            svg path {
                fill: hsl(0, 0%, 100%);
            }
            svg:hover path {
                fill: hsl(19, 100%, 50%);
            }
        </style>
        <table>
            <thead>
                ${this.getTableHeader()}
            </thead>
            <tbody>
                ${this.getTableData()}
            </tbody>
        </table>`;      
        
        let editButtons = this.shadow.querySelectorAll(".edit-button");

        editButtons.forEach(editButton => {

            editButton.addEventListener("click", (event) => {

                document.dispatchEvent(new CustomEvent('showElement', {
                    detail: {
                        url: this.getAttribute('url') + '/' + editButton.dataset.id,
                    }
                }));
            });

        });
    }

    getTableHeader() {

        let header = '';

        Object.keys(this.data[0]).forEach( (key) => {
            header += `<th>${key}</th>`;
        });

        header += `<th></th>`;

        return `<tr>${header}</tr>`;
    }

    getTableData() {
        let data = '';

        this.data.forEach(element => {

            data += `<tr>`;

            Object.values(element).forEach( (value) => {
                data += `<td>${value}</td>`;
            });

            data += 
            `<td class="edit-button" data-id="${element.id}">
                <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>
            </td>`;
            
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

customElements.define('table-component', Table);


