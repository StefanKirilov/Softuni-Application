async function getInfo() {

    const stopId = document.getElementById('stopId').value;
    try{
        const response = await fetch(` http://localhost:3030/jsonstore/bus/businfo/${stopId}`);

        const data = await response.json();
    
        document.getElementById('stopName').textContent = data.name;
    
        let ul = document.getElementById('buses');
        ul.innerHTML = "";
       
    
        Object.entries(data.buses).forEach(([busId, time]) => {
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${busId} arrives in ${time} minutes`;
            ul.appendChild(liElement);
        })
    }
    catch(err){
        document.getElementById('stopName').textContent = 'Error';
        let ul = document.getElementById('buses');
        ul.innerHTML = "";
    }

}