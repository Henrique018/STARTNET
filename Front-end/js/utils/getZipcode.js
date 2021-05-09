export async function getZipcode(zipcode) {
    const options = {
        method: 'POST',
        body: JSON.stringify({"cep": zipcode}),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch('http://localhost:3000/cep', options)
    .then(res => res.json());
    return response;
}