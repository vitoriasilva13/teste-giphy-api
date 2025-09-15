let posts = [];
let GiphyAPIKey = "";

document.addEventListener("DOMContentLoaded", function() {
    const myModal = new bootstrap.Modal("#staticBackdrop");
    myModal.show();

    posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.forEach(post => addIntoTimeline(post));
});

let createPost = () => {
    let conteudo = document.getElementById("conteudo").value;
    let imagemUrl = document.getElementById("mediaUrl").value;
    let spotify = document.getElementById("spotifyUrl").value;
    let titulo = document.getElementById("titulo").value;
    let data = getDateTimeNow();

    if (conteudo.length == 0) return;

    if (spotify.length > 0)
        spotify = spotify.split("/")[4] + "/" + spotify.split("/")[5].split("?")[0];

    let post = {
        id: data.id,
        username: "@teste",
        data: data.data,
        titulo,
        conteudo,
        imagemUrl,
        spotify
    }
    
    posts.push(post);
    localStorage.setItem("posts", JSON.stringify(posts));
    addIntoTimeline(post);

    document.getElementById("conteudo").value = "";
    document.getElementById("mediaUrl").value = "";
    document.getElementById("spotifyUrl").value = "";
    document.getElementById("titulo").value = "";
}

let addIntoTimeline = (post) => {
    let spotifyEmbed = post.spotify
                            ? `<iframe class="mt-2" data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/${post.spotify}?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`
                            : '';
    let mediaEmbed = post.imagemUrl
                            ? `<img class="img-fluid rounded object-fit-cover w-100" src="${post.imagemUrl}" alt="" style="max-height: 100vw">`
                            : '';
    let titulo = post.titulo
                        ? `<h5 class="mb-0">${post.titulo}</h5>`
                        : '';
    let postBody = `<div class="bg-body-tertiary p-3 rounded" data-id="${post.id}">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex gap-2">
                                    <img class="col-auto img-thumbnail d-none" src="https://placehold.co/50"/>
                                    <div>
                                        ${titulo}
                                        <span class="small opacity-50">${post.username} em ${post.data}</span>
                                    </div>
                                </div>
                                <button class="btn btn-outline-secondary btn-sm my-auto" onclick="remove(${post.id})">
                                    <i class="bi bi-trash3"></i>
                                </button>
                            </div>
                            <p class="mt-2">${post.conteudo}</p>
                            ${mediaEmbed}
                            ${spotifyEmbed}
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
    const segundos = String(agora.getSeconds()).padStart(2, '0');

    return {
        id: `${dia}${mes}${ano}${horas}${minutos}${segundos}`,
        data:`${dia}/${mes}/${ano} às ${horas}:${minutos}`
    };
}

let remove = (id) => {
    posts = posts.filter(post => post.id != id);
    localStorage.setItem("posts", JSON.stringify(posts));

    let postElements = document.querySelectorAll(`[data-id='${id}']`);
    postElements.forEach(el => el.remove());
}