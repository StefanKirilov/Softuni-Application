
export function notify(message){
    const error = document.getElementById('errorBox');
    error.style.display = 'block';
    const span = error.querySelector('span');
    span.textContent = message;

    setTimeout(() => {
        error.style.display = 'none';
    }, 3000);
}