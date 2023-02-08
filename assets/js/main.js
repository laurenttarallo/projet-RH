//open popup
document.querySelector('.cd-popup-trigger').addEventListener('click', function(event){
    event.preventDefault();
    document.querySelector('.cd-popup').classList.add('is-visible');
    document.querySelector('#btnDelete').href = "/delete/" + event.target.getAttribute("data-workerId")
});

//close popup
document.querySelector('.cd-popup').addEventListener('click', function(event){
    console.log(event.target.parentNode.parentNode.parentNode.parentNode);
    if( event.target.classList.contains('cd-popup-close') || event.target.parentNode.parentNode.parentNode.parentNode.classList.contains('cd-popup') ) {
        document.querySelector('.cd-popup').classList.remove('is-visible');
    }
    
});

function allowdrop(ev) {
    ev.preventDefault()
};

function drag(ev){
    console.log(ev);
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("text");
    window.location.href = "/delete/" + data

}