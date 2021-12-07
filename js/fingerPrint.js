export const fingerPrint = () =>{

var client = new ClientJS();
    var fingerprint = client.getFingerprint(); 
    var browser = client.getBrowserData();
    var language = client.getLanguage();
    console.log(fingerprint);
    console.log(browser);
    console.log(language);

}  
