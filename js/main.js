var siteName = document.getElementById("bookMarkName");
var siteUrl = document.getElementById("siteUrl");
tableBody = document.getElementById("tableBody")
validationModal = document.getElementById("validationModal")

var bookMarkList ;


if (localStorage.getItem("bookMarkList")){

    bookMarkList = JSON.parse(localStorage.getItem("bookMarkList"));
    displayBookMark(bookMarkList)

    } else {
        bookMarkList = [];
}



function addBookMark() {

    if (validateSiteName () && validateSiteUrl () ){
        var bookMark ={
        name: siteName.value ,
        url: siteUrl.value ,
        }
        bookMarkList.push(bookMark);
        setToLocalStorage()
        displayBookMark(bookMarkList) 
        clearInputs ()
    }else {
        validationModal.classList.replace ("d-none","d-block");
        console.log(error)
    }
   
}


function displayBookMark() {
    var cartona = "";
    for (var i=0 ; i < bookMarkList.length ; i++ ){
        cartona += ` <tr>
                        <td>${i+1}</td>
                        <td>${bookMarkList[i].name}</td>
                        <td> <a class="btn btn-warning" target="_blank" href="${bookMarkList[i].url.startsWith('https')?bookMarkList[i].url : "https://" + bookMarkList[i].url }"><i class="fa-solid fa-eye"></i> Visit </a></td>
                        <td><button onclick="deleteBookMarak(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button></td>
                    </tr>`;
    } 
    tableBody.innerHTML = cartona;
}

function clearInputs () {
    siteName.value = null ;
    siteUrl.value = null ;
}


function deleteBookMarak(index){
    bookMarkList.splice(index, 1);
    setToLocalStorage()
    displayBookMark(bookMarkList) 

}

function setToLocalStorage(){

    localStorage.setItem("bookMarkList",JSON.stringify(bookMarkList));  

}

function validateSiteName (){

    var regex = /^[A-Za-z]{3,50}$/;
    if(regex.test(siteName.value) && bookMarkList.some(bookMark => bookMark.name === siteName.value) == false){

        siteName.classList.add("is-valid")
        siteName.classList.remove("is-invalid")
        return true ;

    }else {

        siteName.classList.add("is-invalid")
        siteName.classList.remove("is-valid")
        return false ;
    }
}


function validateSiteUrl (){

    var regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if(regex.test(siteUrl.value) && bookMarkList.some(bookMark => bookMark.url === siteUrl.value) == false){
        siteUrl.classList.add("is-valid")
        siteUrl.classList.remove("is-invalid")
        return true ;
    }else {
        siteUrl.classList.add("is-invalid")
        siteUrl.classList.remove("is-valid")
        return false ;
    }
    }



