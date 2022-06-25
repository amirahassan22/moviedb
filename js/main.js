// controlling side bar

$("#list").click(function () {
    let sideWidth = $(".sidebar-content").innerWidth() - 10;
    if ($(".sidebar-icons").css('left') == sideWidth + `px`) {
        $(".open-icon").html('<i class="fa-solid fa-bars"></i>')
        $(".sidebar-icons").css({ 'left': '0' })
        $(".sidebar-content").css({ 'transform': 'translate(-100%)' });
        $(".sidebar-links ul li").eq(0).fadeOut(200,function(){
            $(".sidebar-links ul li").eq(0).animate({'padding-top':'400px'},500)
            $(".sidebar-links ul li").eq(1).fadeOut(200,function(){
                $(".sidebar-links ul li").eq(1).animate({'padding-top':'400px'},500)
                $(".sidebar-links ul li").eq(2).fadeOut(200,function(){
                    $(".sidebar-links ul li").eq(2).animate({'padding-top':'400px'},500)
                    $(".sidebar-links ul li").eq(3).fadeOut(200,function(){
                        $(".sidebar-links ul li").eq(3).animate({'padding-top':'400px'},500)
                        $(".sidebar-links ul li").eq(4).fadeOut(200,function(){
                            $(".sidebar-links ul li").eq(4).animate({'padding-top':'400px'},500)
                            $(".sidebar-links ul li").eq(5).fadeOut(200)
                            $(".sidebar-links ul li").eq(5).animate({'padding-top':'400px'},500)
                        })
                    })
                })
            })
        })
    }
    else {
        $(".open-icon").html('<i class="fa-solid fa-xmark"></i>')
        $(".sidebar-icons").css({ 'left': `${sideWidth}px` })
        $(".sidebar-content").css({ 'transform': 'translate(0)' });
        $(".sidebar-links ul li").eq(0).fadeIn(200,function(){
            $(".sidebar-links ul li").eq(0).animate({'padding-top':'20px'},200)
            $(".sidebar-links ul li").eq(1).fadeIn(200,function(){
                $(".sidebar-links ul li").eq(1).animate({'padding-top':'20px'},200)
                $(".sidebar-links ul li").eq(2).fadeIn(200,function(){
                    $(".sidebar-links ul li").eq(2).animate({'padding-top':'20px'},200)
                    $(".sidebar-links li").eq(3).fadeIn(200,function(){
                        $(".sidebar-links ul li").eq(3).animate({'padding-top':'20px'},200)
                        $(".sidebar-links ul li").eq(4).fadeIn(200,function(){
                            $(".sidebar-links ul li").eq(4).animate({'padding-top':'20px'},200)
                            $(".sidebar-links ul li").eq(5).fadeIn(200)
                            $(".sidebar-links ul li").eq(5).animate({'padding-top':'20px'},200)
                        })
                    })
                })
            })
        })
        // $(".sidebar-content").animate({'width':'250px'})
    }
})


let arrData = [];
let sidebarLinks = Array.from( $(".sidebar-links ul").children().children());
let ha = sidebarLinks.filter(ele => $(ele).attr('id') == 'trending')[0]
console.log(sidebarLinks);
console.log(ha);
async function getApi(category) {
    let api;
    if (category == 'trending') {
        api = `https://api.themoviedb.org/3/${category}/all/day?api_key=fb873dbb0c137597410413d1ca2667c5`

    }
    else {
        api = `https://api.themoviedb.org/3/movie/${category}?api_key=fb873dbb0c137597410413d1ca2667c5&language=en-US&page=1`;
    }
    let moviedb = await fetch(api)
    let moviedbAPI = await moviedb.json()
    console.log(moviedbAPI.results);
    arrData = moviedbAPI.results
    display(arrData,'show')
}

let searchAll = document.getElementById("searchAll");
searchAll.addEventListener('keyup',async function(e){
    let searchApi;
    let searchMovie = e.target.value;
    searchApi =await fetch(`https://api.themoviedb.org/3/search/movie?query='${searchMovie}'&api_key=fb873dbb0c137597410413d1ca2667c5&language=en-US&page=1&include_adult=false`);
    let x = await searchApi.json();
    let y = x.results;
    console.log(x)
    display(y,'show')
})

let searchSection= document.getElementById("searchSection");
searchSection.addEventListener('keyup',function searchSec(){
    // if(""==searchSection.value){
        
    // }
    let search = []
    for (let i = 0; i< arrData.length; i++) {
      if(arrData[i].original_title.includes(searchSection.value)){
        search.push(arrData[i])
       
      }
    }
    console.log(search)
       display(search,'showSearch')
       
})




$("#trending").click(function (e) {
    getApi('trending')
})

$("#nowPlaying").click(function () {
    getApi("now_playing")
})
$("#popular").click(function () {
    getApi('popular')
})
$("#topRated").click(function () {
    getApi('top_rated')
})
$("#upcoming").click(function () {
    getApi('upcoming')
})

function display(cat,rowId) {
    let box = ``;
    for (let i = 0; i < cat.length; i++) {
        box += `<div class="col-md-6 col-lg-4">
    <div class="movie-details position-relative">
        <div class="inner-layer">
            <h2>${cat[i].title}</h2>
            <p>${cat[i].overview}</p>
            <p>rate: ${cat[i].vote_average}</p>
            <p>${cat[i].release_date}</p>
        </div>
        <img src="https://image.tmdb.org/t/p/w500${cat[i].poster_path}" class="w-100" alt="">
    </div>
</div>`

    }
    document.getElementById(`${rowId}`).innerHTML = box;
}

getApi("now_playing")


// validating data
let  username = document.querySelector("#name")
let  email = document.querySelector("#email")
let  phone = document.querySelector("#phone")
let  age = document.querySelector("#age")
let  pass = document.querySelector("#pass")
let  rePass = document.querySelector("#repass")
let input = document.querySelectorAll(".form-element")
let btn = document.querySelector(".btn-sub button");
btn.disabled = true
// let arrInput = [...input]
for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('keyup',function(e){
        let fieldId = $(e.target).attr('id');
        if(fieldId == "name"){
            usernameValidation(username.value)
        }
        else if(fieldId == "email"){
            emailValidation(email.value)
        }
        else if(fieldId == "phone"){
            phoneValidation(phone.value)
        }
        else if(fieldId == "age"){
            ageValidation(age.value)
        }
        else if(fieldId == 'pass'){
            agePassword(pass.value)
        }
        else if(fieldId == 'repass'){
            if (pass.value == rePass.value) {
                $(`.validRepassword`).css({'display':'none'})
            }
            else{
                $(`.validRepassword`).css({'display':'block'})
                $(`.validRepassword`).text('inncorrect password')
                if(usernameValidation(username.value) && emailValidation(email.value) &&  phoneValidation(phone.value) && ageValidation(age.value) && agePassword(pass.value)){
                    btn.disabled = false
                }
            }
            
        }
    })
}

function checkValidatin(element,uInfo,classN,msg){
    if(element.test(uInfo)){
        $(`.${classN}`).css({'display':'none'})
    }
    else{
        $(`.${classN}`).css({'display':'block'})
        $(`.${classN}`).text(msg)
    }
}

function usernameValidation(uName){
    let userRejex = /^[a-zA-Z]{1}[a-zA-Z0-9]{2,}$/;
    let validName = 'validName'
    checkValidatin(userRejex,uName,validName,'Your Name is not valid, atleast 3characters ,starts with a letter')
}
function emailValidation(uEmail){
    let validEmail = 'validEmail'
    let emailRejex = /^\w{3,}@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
    checkValidatin(emailRejex,uEmail,validEmail,'Enter valid Email')
}
function phoneValidation(uPhone){
    let phoneRejex = /^(\+0201)[0-9]{8}$/
    let validPhone = 'validPhone'
    checkValidatin(phoneRejex,uPhone,validPhone,'Enter valid phone,must start with +0201')
}
function ageValidation(uAge){
    let ageRejex = /^[1-9][0-9]?$|^100$/
    let validAge = 'validAge'
    checkValidatin(ageRejex,uAge,validAge,'Enter valid age')
}

function agePassword(uPassword){
    let passRejex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let validPassword = 'validPassword'
    checkValidatin(passRejex,uPassword,validPassword,'entre valid password *Minimum eight characters, at least one letter and one number')
}