export let form = () =>{

    let forms = document.querySelectorAll("#crud__user-form");
    let loginButton = document.getElementById("send__button")
    
    if(loginButton){

        loginButton.addEventListener("click", (event) => {

            event.preventDefault();
    
            forms.forEach(form => { 

                let url = form.action;
                let data = new FormData(form);
                // data.append("fingerprint", getFingerprint());
    
                let sendPostRequest = async () => {
            
                    let request = await fetch(url, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token'),
                        },
                        method: 'POST', 
                        body: data
                    })
                    .then(response => {
                        if (!response.ok) throw response;
                        return response.json();
                    })
                    .then(json => {
                        document.dispatchEvent(new CustomEvent('newData'));

                        if(json.message){
                            document.dispatchEvent(new CustomEvent('message', {
                                detail: {
                                    message: json.message,
                                    type: 'success'
                                }
                            }));
                        }
                    })
                    .catch(error => {
                        
                        if(error.status == '400'){

                            error.json()
                            .then(jsonError => {

                                let errors = jsonError.data;

                                Object.keys(errors).forEach((key) => {
                                    document.querySelector(`[name=${key}]`).classList.add("error-input")
                                    document.querySelector(`[name=${key}]`).placeholder = errors[key][0];
                                })
                            })   
                        }

                        if(error.status == '500'){
                            console.log(error);
                        }
                    });
                };
        
                sendPostRequest();
            });
        });
    }

    document.addEventListener("showElement",( event =>{

        fetch(event.detail.url, { 
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

            Object.entries(data).forEach( ([key,value]) => {
                document.querySelector(`[name=${key}]`).value = value;
            });
        })
        .catch(error => console.log(error));
    }));
// 
}