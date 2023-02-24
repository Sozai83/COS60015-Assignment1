const matches = document.getElementById('matches');
const home =  document.getElementById('home');
const contact = document.getElementById('contact');
const firstNav = document.getElementById("top-nav");

const firstNavList = [matches, home, contact]

const hideElements = function(list){
    for (item in list){
        console.log(list[item]);
        list[item].classList.add("hidden");
    }
}

const toggleElement = function(el){
    temp_id = el.dataset.nav;
    document.getElementById(temp_id).classList.toggle("hidden")
}

firstNav.addEventListener('click', function(e){
    if (e.target.tagName == "A"){
        hideElements(firstNavList);
        toggleElement(e.target);
    }
});