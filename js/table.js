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
                this.data = json.data;
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
                padding: .5em; 
                width: 20%;
            }
            th,td{
                text-align: center;
            }
            svg{
                cursor:pointer;
            }
            button{
                background-color: #242e42;
            }
        </style>
        <table>
            <thead>
                ${this.TableHeader()}
            </thead>
            <tbody>
                ${this.TableData()}
            </tbody>
        </table>`;  
        
        let editButton = this.shadow.querySelectorAll(".edit");
        editButton.forEach(edit => {

            edit.addEventListener("click", () => {

                document.dispatchEvent(new CustomEvent('show', {
                    detail: {
                        url: this.getAttribute('url') + '/' + edit.dataset.id,
                    }
                }));
            });
        });  

        let deleteButton = this.shadow.querySelectorAll(".delete");

        deleteButton.forEach(del => {

            del.addEventListener("click", () => {

                document.dispatchEvent(new CustomEvent('message', {
                    detail: {
                        message: "¿Estas seguro?",
                        type: 'sure'
                    }
                }))

                document.addEventListener("show",( event =>{
                    fetch(event.detail.url, { 
                        method: 'DELETE', 
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        }
                    }) 
                
                    .then(response => {
                        if (!response.ok) throw response;
                        return response.json();
                    })
                    
                    .then(json => {
                        let data = json.data;
                
                        Object.entries(data).forEach( ([key]) => {
                            let valor = document.querySelector(`[name=${key}`).value = data[key]; 
                            console.log(valor);
                        });
                    })

                    .catch(error => console.log(error));

                })); 
            });
        });
    }

    TableHeader() {

        let header = '';

        Object.keys(this.data[0]).forEach( (key) => {
            header += `<th>${key}</th>`;
        });

        return `<tr>${header}</tr>`;
    }

    TableData() {

        let data = '';
        this.data.forEach(element => {
            data += `<tr>`;
            Object.values(element).forEach( (value) => {
                data += `<td>${value}</td>`;
            });

            data += `<td class="edit" data-id="${element.id}">
                <svg fill="#fff" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 18.400391 2 C 18.100391 2 17.899219 2.1007812 17.699219 2.3007812 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.699219 6.3007812 C 22.099219 5.9007812 22.099219 5.3003906 21.699219 4.9003906 L 19.099609 2.3007812 C 18.899609 2.1007812 18.700391 2 18.400391 2 z M 18.400391 4.4003906 L 19.599609 5.5996094 L 18.306641 6.8925781 L 17.107422 5.6933594 L 18.400391 4.4003906 z M 15.693359 7.1074219 L 16.892578 8.3066406 L 6.1992188 19 L 5 19 L 5 17.800781 L 15.693359 7.1074219 z"/></svg>
                </td>`;
            
            data += `<td class="delete" data-id="${element.id}">
                <svg fill="#fff" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"/></svg>
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