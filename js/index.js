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
const _2023 =  document.getElementById("games_2023");
const _2022 =  document.getElementById("games_2022");
const _2021 =  document.getElementById("games_2021");
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
    for (item in list){
        list[item].classList.add("hidden");
    }
}

const showElement = function(el){
        el.classList.remove("hidden");    
}

const removeActive = function(list){
    for(item in list){
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
    if (position !== -4560){
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
    if(position !== -4560){
        teamActive++
        removeActive(teamDots);
        addActive(document.querySelector(`[data-calousel="${teamActive}"]`));
        teamContainer2.style.transform = `translateX(${newPosition}px)`;
    }
})

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
})

teamsDotsContainer.addEventListener("click", function(e){
    e.preventDefault();
    if (e.target.tagName == "BUTTON"){
        teamActive = parseInt(e.target.dataset.calousel);
        let newPosition  = -1140 * teamActive;
        removeActive(teamDots);
        addActive(document.querySelector(`[data-calousel="${teamActive}"]`));
        teamContainer2.style.transform = `translateX(${newPosition}px)`;
    }
})