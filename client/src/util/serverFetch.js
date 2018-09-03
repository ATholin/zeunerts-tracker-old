function sendData(url, data){
    return fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    });
}

function getData(url){
    return fetch(url, {
        method: 'GET',
        credentials: 'include'
    });
}

export { sendUserData, getData };