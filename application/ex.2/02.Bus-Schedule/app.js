function solve() {

    let info = document.querySelector('.info');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');

    let nextStopId = 'depot';
    let stopName = '';

    async function depart() {
            const response = await fetch (`http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`);

            let data = await response.json();
    
            stopName = data.name;
            nextStopId = data.next;
    
            info.textContent = `Next stop ${stopName}`;
            departBtn.disabled = true;
            arriveBtn.disabled = false;


        
    }

    async function arrive() {

        info.textContent = `Arriving at ${stopName}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;   
    }

    return {
        depart,
        arrive
    };
}

let result = solve();