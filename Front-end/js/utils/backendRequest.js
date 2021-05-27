async function backendRequest(route, method='GET', data) {
    const options = {
        method: method,
        body: method === 'GET' ? undefined : JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch(`https://startnet-live.herokuapp.com${route}`, options)
    .then(res => res.json());
    return response;
}

export default backendRequest;