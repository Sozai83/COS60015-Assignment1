import teams from "./team_data.js";

const firstNav = document.getElementById("top-nav");
const matches = document.getElementById('matches');
const home =  document.getElementById('home');
const contact = document.getElementById('contact');
const firstNavList = [matches, home, contact];

const ruleNav = document.getElementById("rule-nav");
const begginer =  document.getElementById("begineer-rules");
const advance =  document.getElementById("advance-rules");
const changes =  document.getElementById("recent-changes");
const ruleList = [begginer, advance, changes];
const ruleNavLists = [...document.querySelectorAll(".rule-list")];

const matchNav = document.getElementById("match-nav");
const _2023 =  document.getElementById("matches_2023");
const _2022 =  document.getElementById("matches_2022");
const _2021 =  document.getElementById("matches_2021");
const matchList = [_2023, _2022, _2021];
const matchNavLists = [...document.querySelectorAll(".match-list")];

const teamContainer = document.getElementById("team-members-wrapper");
const teamContainer2 = document.getElementById("team-members");
const prevDirection = document.querySelector(".prev");
const nextDirection = document.querySelector(".next");
const teamsDotsContainer = document.getElementsByClassName("teams-dots")[0];
const teamDots = [...document.querySelectorAll(".dot")];
const memberCardsContainers = [...document.querySelectorAll(".team-member")];

let teamActive = 0;

const hideElement = function(list){
    for (let item in list){
        list[item].classList.add("hidden");
    }
}

const showElement = function(el){
        el.classList.remove("hidden");    
}

const removeActive = function(list){
    for(let item in list){
        list[item].classList.remove("active");
    }
}

const addActive = function(el){
    el.classList.add("active");
}

const getAxisX = function(){
    let style = getComputedStyle(teamContainer2);
    let transform = style.transform.split(',');
    let axisX = parseInt(transform[4]);
    return axisX
}

const generateTeamHTML = function(member){
    let html = `
    <div id="member-popup" class="overlay">
    <section id="team-details">
        <section class="details">
            <a class="close" href="#">&times;</a>
            <section class="bio">
                <figure>
                    <img src="./img/members/${member.id}.jpg" alt="fw1">
                </figure>
                <table>
                    <tr>
                        <th>Age</th>
                        <th>Weight</th>
                        <th>Height</th>
                        <th>Games</th>
                    </tr>
                    <tr>
                        <td>${member.age}</td>
                        <td>${member.weight}</td>
                        <td>${member.height}</td>
                        <td>${member.games}</td>
                    </tr>
                    <tr>
                        <th>Points</th>
                        <th>Tries</th>
                        <th>Conv</th>
                        <th>Pen</th>
                    </tr>
                    <tr>
                        <td>${member.points}</td>
                        <td>${member.tries}</td>
                        <td>${member.conv}</td>
                        <td>${member.pen}</td>
                    </tr>
                </table>
            </section>
            <article>
                <h2>Name: ${member.name}</h2>
                <h3>Position: ${member.position}</h3>
                <h3>Biography</h3>
                <p>
                    ${member.bio}
                </p>
                <div class="sms">
                    <a href="twitter">Twitter</a>
                    <a href="insta">Instagram</a>
                </div>
            </article>
            </section>
            <h3 class="news">News</h3>
            <figure id="news">
                <figure>
                    <img src="./img/placeholder2.png" alt="${member.id}_news1">
                    <figcaption class="${member.id}_news"><a href="${member.news1}">${member.news1Title}</a></figcaption>
                </figure>
                <figure>
                    <img src="./img/placeholder2.png" alt="${member.id}_news2">
                    <figcaption class="${member.id}_news"><a href="${member.news2}">${member.news2Title}</a></figcaption>
                </figure>
                <figure>
                    <img src="./img/placeholder2.png" alt="${member.id}_news3">
                    <figcaption class="${member.id}_news"><a href="${member.news3}">${member.news3Title}</a></figcaption>
                </figure>
                <figure>
                    <img src="./img/placeholder2.png" alt="${member.id}_news4">
                    <figcaption class="${member.id}_news"><a href="${member.news4}">${member.news4Title}</a></figcaption>
                </figure>
            </figure>
        </section>
    </div>
    `
    return html;
}

firstNav.addEventListener('click', function(e){
    e.preventDefault();
    if (e.target.tagName == "A"){
        hideElement(firstNavList);
        let selected = e.target.dataset.nav;
        let selectedEl = document.getElementById(selected);
        showElement(selectedEl);
    }
});

ruleNav.addEventListener('click', function(e){
    e.preventDefault();
    if (e.target.tagName == "LI"){
        hideElement(ruleList);
        let selected = e.target.dataset.nav;
        let selectedEl = document.getElementById(selected);
        showElement(selectedEl);
        removeActive(ruleNavLists);
        addActive(e.target);
    }
});

matchNav.addEventListener('click', function(e){
    e.preventDefault();
    if (e.target.tagName == "LI"){
        hideElement(matchList);
        let selected = e.target.dataset.nav;
        let selectedEl = document.getElementById(selected);
        showElement(selectedEl);
        removeActive(matchNavLists);
        addActive(e.target);
    }
});

teamContainer.addEventListener('mouseover', function(){
    let position = getAxisX();
    if (position !== 0){
        showElement(prevDirection);
    }
    if (position !== -5700){
        showElement(nextDirection);
    }
});

teamContainer.addEventListener('mouseout', function(){
    hideElement([prevDirection,nextDirection]);
});

nextDirection.addEventListener('click', function(e){
    e.preventDefault();
    let position = getAxisX();
    let newPosition  = position - 1140;
    if(position !== -5700){
        teamActive++
        removeActive(teamDots);
        addActive(document.querySelector(`[data-calousel="${teamActive}"]`));
        teamContainer2.style.transform = `translateX(${newPosition}px)`;
    }
});

prevDirection.addEventListener('click', function(e){
    e.preventDefault();
    let position = getAxisX();
    let newPosition  = position + 1140;
    if (position !== 0){
        teamActive--
        removeActive(teamDots);
        addActive(document.querySelector(`[data-calousel="${teamActive}"]`));
        teamContainer2.style.transform = `translateX(${newPosition}px)`;
    }
});

teamsDotsContainer.addEventListener("click", function(e){
    e.preventDefault();
    if (e.target.tagName == "BUTTON"){
        teamActive = parseInt(e.target.dataset.calousel);
        let newPosition  = -1140 * teamActive;
        removeActive(teamDots);
        addActive(document.querySelector(`[data-calousel="${teamActive}"]`));
        teamContainer2.style.transform = `translateX(${newPosition}px)`;
    }
});

teamContainer2.addEventListener("click", function(e){
    e.preventDefault();
    if(e.target.tagName == "IMG"){
        let member = e.target.parentNode.dataset.member;
        member = teams[member];
        let html = generateTeamHTML(member);
        teamContainer.insertAdjacentHTML("afterend", html);
    }
});

document.addEventListener("click", function(e){
    const memberPopup = document.getElementById("member-popup");
    const memberPooupClose = document.querySelector(".close");
    if(e.target == memberPooupClose || e.target == memberPopup){
        e.preventDefault();
        memberPopup.remove();
    }
});