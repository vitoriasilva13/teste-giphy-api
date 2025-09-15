let posts;
let GiphyAPIKey = "";

document.addEventListener("DOMContentLoaded", function() {
    
    if (!localStorage.hasOwnProperty("GiphyAPIKey")) {
        GiphyAPIKey = prompt("Insira sua chave de API Giphy.");
        localStorage.setItem("GiphyAPIKey", GiphyAPIKey);
        location.reload();
        return;
    } else {
        GiphyAPIKey = localStorage.getItem("GiphyAPIKey");
    }

    posts = JSON.parse(localStorage.getItem("postsExemplo"));
    posts.forEach(post => addIntoTimeline(post));
});

let createPost = () => {
    let conteudo = document.getElementById("conteudo").value;
    let imagemUrl = document.getElementById("mediaUrl").value;
    let data = getDateTimeNow();

    let post = {
        user: "Teste",
        username: "@teste",
        data,
        conteudo,
        imagemUrl
    }
    
    posts.push(post);
    addIntoTimeline(post);
    localStorage.setItem("postsExemplo", JSON.stringify(posts));

    conteudo.value = "";
    imagemUrl.value = "";
}

let addIntoTimeline = (post) => {
    let postBody = `<div class="bg-body-tertiary p-3 rounded">
                            <div class="d-flex gap-2">
                                <img class="col-1 img-thumbnail" src="https://placehold.co/50"/>
                                <div>
                                    <h5 class="mb-0">${post.user}</h5>
                                    <span class="small opacity-50">${post.username} em ${post.data}</span>
                                </div>
                            </div>
                            <p class="mt-2">${post.conteudo}</p>
                            <img class="img-fluid rounded object-fit-cover w-100" src="${post.imagemUrl}" alt="" style="max-height: 100vw">
                        </div>`
    document.getElementById("posts").insertAdjacentHTML("afterbegin", postBody);
}

let getDateTimeNow = () => {
    const agora = new Date();

    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();

    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
}