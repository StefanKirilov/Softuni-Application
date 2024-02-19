async function accordion() {
    try{
    let main = document.querySelector("#main");
    let baseUrl = `http://localhost:3030/jsonstore/advanced/articles/list`;

    let response = await fetch(baseUrl);
    if (!response.ok) {
        throw new Error('Error');
    }
    let data = await response.json();

    for (const info of data) {
        let div1 = document.createElement('div');
        div1.classList.add('accordion');

        let div2 = document.createElement('div');
        div2.classList.add('head');

        let span = document.createElement('span');
        span.textContent = `${info.title}`;

        let btnMore = document.createElement('button');
        btnMore.textContent = `More`;
        btnMore.classList.add('button');
        btnMore.setAttribute('id', `${info._id}`);
        btnMore.addEventListener('click', (e) => show(e));

        let div3 = document.createElement('div');
        div3.classList.add('extra');

        let p = document.createElement('p');



        div3.appendChild(p);
        div2.appendChild(span);
        div2.appendChild(btnMore);
        div1.appendChild(div2);
        div1.appendChild(div3);
        main.appendChild(div1);

    }
}
catch(error){
    console.log(error.message);
}
    
}
async function show(e){
    try{
    let responseId = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${e.target.id}`);
    if (!responseId.ok) {
        throw new Error('Error');
    }
    let dataId = await responseId.json();

    let div = e.target.parentNode.parentNode.querySelector(".extra");
    let paragraph = div.querySelector('p');
    paragraph.textContent = `${dataId.content}`;

    if(e.target.textContent === `More`){
        e.target.textContent = `Less`
        div.style.display = 'block';
    }
    else{
        e.target.textContent = `More`
        div.style.display = 'none';
    }
}
catch(error){
    console.log(error.message);
}
}


accordion()