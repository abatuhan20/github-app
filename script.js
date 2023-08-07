const APIURL= 'https://api.github.com/users/'
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');


async function getUser(user) {
    const resp = await fetch(APIURL + user);
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(user);
    
}

function createUserCard(user) {
    // clear main
    main.innerHTML="";
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
    <div class="img-container">
        <img class= "avatar" src="${user.avatar_url}" alt="${user.name}" />
    </div>
    <div class="user-info">
        <h2> ${user.name} </h2>
        <p> ${user.bio} </p>

        <ul class="info">
            <li><strong>Followers:</strong>&nbsp; ${user.followers} </li>
            <li><strong>Following:</strong>&nbsp; ${user.following} </li>
            <li><strong>Repos:</strong>&nbsp; ${user.public_repos} </li>
        </ul>
        <div class="repos" id="repos">

        </div>
    </div>
    `;
    main.appendChild(card);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = search.value;

    if(user) {
        getUser(user);

        search.value = "";
    }

});

async function getRepos(user) {
    const resp = await fetch (APIURL + user + "/repos");
    const respData = await resp.json();

    addReposToCard(respData);
}

function addReposToCard (repos) {
    const reposEl = document.getElementById("repos");

    repos.slice(0,9).forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add("repo");
        
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    });
}

