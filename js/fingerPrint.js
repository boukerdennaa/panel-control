export const fingerPrint = () => {

var client = new ClientJS();
	var fingerprint = client.getFingerprint(); 
    console.log( fingerprint);
}