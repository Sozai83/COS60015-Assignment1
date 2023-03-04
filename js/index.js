import teams from "./team_data.js";

/* Variables - Web App Elements */
// Elements related to first navigation
const firstNav = document.getElementById("top-nav");
const matches = document.getElementById('matches');
const home =  document.getElementById('home');
const contact = document.getElementById('contact');
const NavList = [matches, home, contact];
const firstNavLists = [...document.querySelectorAll(".top-nav-list")];
const header = document.querySelector("header");

// Elements related to second navigation
const secondNav = document.getElementById("second-nav");
const secondNavLists = [...document.querySelectorAll(".second-nav-list")];

// Elements related to second ruies navigation
const ruleNav = document.getElementById("rule-nav");
const begginer =  document.getElementById("begineer-rules");
const advance =  document.getElementById("advance-rules");
const changes =  document.getElementById("recent-changes");
const ruleList = [begginer, advance, changes];
const ruleNavLists = [...document.querySelectorAll(".rule-list")];

// Elements related to second matches navigation
const matchNav = document.getElementById("match-nav");
const _2023 =  document.getElementById("matches_2023");
const _2022 =  document.getElementById("matches_2022");
const _2021 =  document.getElementById("matches_2021");
const matchList = [_2023, _2022, _2021];
const matchNavLists = [...document.querySelectorAll(".match-list")];

// Elements related to second footer navigation
const footerNav = document.getElementById("footer-nav");

// Elements related to teams section
const teamContainer = document.getElementById("team-members-wrapper");
const teamContainer2 = document.getElementById("team-members");
const prevDirection = document.querySelector(".prev");
const nextDirection = document.querySelector(".next");
const teamsDotsContainer = document.getElementsByClassName("teams-dots")[0];
const teamDots = [...document.querySelectorAll(".dot")];

// Elements related to contact section
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const requiredFields = ['fname', 'lname', 'email', 'query'];
const requiredFieldsVal = {
    'fname': 'First Name',
    'lname': 'Last Name',
    'email': 'Email',
    'query': 'Description'
}
const submitContact = document.getElementById('contact-submit');
const alertContainer = document.getElementById('alert');
const alertList = document.getElementById('alert-list');

// Count for team member calousel
let teamActive = 0;


/* Functions */
//Hides elements in the list
const hideElement = function(list){
    for (let item in list){
        list[item].classList.add("hidden");
    }
}

// Show an element passed
const showElement = function(el){
        el.classList.remove("hidden");    
}

// Remove "active" from the class list from the elements in the list
const removeActive = function(list){
    for(let item in list){
        list[item].classList.remove("active");
    }
}

// Add "active" into class list to the element passed
const addActive = function(el){
    el.classList.add("active");
}

// Validate email - returns True or False
const emailValidation = function(email){
    let validation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value);
    return validation
}

// Validate phone number - returns True or False
const phoneValidation = function(phone){
    let validation = /^\d{10}$/.test(phone.value);
    return validation
}

// Check if the required fields have values - returns True or False
const requiredValidation = function(list){
    let emptyRequiedFields = [];
    for (let item in list){
        let value = document.getElementById(list[item]).value;
        if (value.length <= 0){
            emptyRequiedFields.push(list[item]);
        }
    }
    return emptyRequiedFields;
}

// Generates HTML code to show the validation warning
const generateValidationHthml = function(){
    let html = '';
    let emailVal = emailValidation();
    let phoneVal = phoneValidation();
    let requiredVal = requiredValidation(requiredFields);
    if(requiredVal.length > 0){
        html += '<li>Please fill ';
        for(let field in requiredVal){
            html += `${requiredFieldsVal[requiredVal[field]]}, `;
        }
        html = html.slice(0, -2) + '</li>'
    }
    if(!emailVal){
        html += '<li>Please enter valid email adress.</li>';
    }
    if(!phoneVal){
        html += '<li>Please enter valid phone number.</li>';
    }
    return html;
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
                    <img src="./img/members/${member.id}.jpg" alt="${member.name}">
                </figure>
                <table>
                    <tr>
                        <th>Age</th>
                        <th>Weight</th>
                        <th>Height</th>
                        <th>Caps</th>
                    </tr>
                    <tr>
                        <td>${member.age}</td>
                        <td>${member.weight}</td>
                        <td>${member.height}</td>
                        <td>${member.caps}</td>
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
                    <img src="./img/news/news1.jpg" alt="${member.news1Title}_news1">
                    <figcaption class="${member.id}_news"><a href="${member.news1}">${member.news1Title}</a></figcaption>
                </figure>
                <figure>
                    <img src="./img/news/news2.png" alt="${member.news2Title}_news2">
                    <figcaption class="${member.id}_news"><a href="${member.news2}">${member.news2Title}</a></figcaption>
                </figure>
                <figure>
                    <img src="./img/news/news3.png" alt="${member.news3Title}_news3">
                    <figcaption class="${member.id}_news"><a href="${member.news3}">${member.news3Title}</a></figcaption>
                </figure>
                <figure>
                    <img src="./img/news/news4.png" alt="${member.news4Title}_news4">
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
    if (e.target.tagName == "A" || e.target.tagName == "LI"){
        hideElement(NavList);
        let selected = e.target.dataset.nav;
        let selectedEl = document.getElementById(selected);
        showElement(selectedEl);
        removeActive(firstNavLists);
        addActive(e.target);
    }
});

secondNav.addEventListener('click', function(e){
    e.preventDefault();
    if (e.target.tagName == "LI"){
        let selected = e.target.dataset.nav;
        let selectedEl = document.getElementById(selected);
        selectedEl.scrollIntoView();
        removeActive(secondNavLists);
        addActive(e.target);
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

footerNav.addEventListener('click', function(e){
    e.preventDefault();
    if (e.target.tagName == "LI"){
        let selected = e.target.dataset.nav.split('-');
        let topNav = selected[0];
        let position = selected[1];
        let selectedEl1 = document.getElementById(topNav);
        let selectedEl2 = document.getElementById(position);
        let selectedNav = document.getElementById(`nav-${topNav}`);
        hideElement(NavList);
        showElement(selectedEl1);
        removeActive(firstNavLists);
        addActive(selectedNav);
        if(position == "top"){
            header.scrollIntoView();
        }else{
            selectedEl2.scrollIntoView();
        }
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

submitContact.addEventListener('click', function(e){
    e.preventDefault();
    while (alertList.hasChildNodes()) {
        alertList.removeChild(alertList.firstChild);
    }
    let html = generateValidationHthml();
    if (html.length > 0){
        showElement(alertContainer);
        alertList.insertAdjacentHTML("afterbegin", html);
    }else if(html.length == 0){
        hideElement([alertContainer]);
        console.log('ok');
    }
});