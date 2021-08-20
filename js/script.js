function changeColor(color1,color2, parent_class) {
    var parent = document.querySelector(`.${parent_class}`);
    if(parent.style.backgroundColor==color1){
        parent.style.backgroundColor = color2;
    }
    else{
        parent.style.backgroundColor = color1;
    }   
}

var parent = "msg-button";
var blink = setInterval(() => {
    changeColor("rgb(49, 60, 78)", "#262e3b",parent)
}, 500);
document.querySelector("main").addEventListener("click", function (event) {
    if (document.querySelector(".checkout").className != "checkout loaded") {
        document.querySelector(".checkout").className = "checkout checkout-disappear";
    }
    blink = setInterval(() => {
        changeColor("rgb(49, 60, 78)", "#262e3b", parent)
    }, 500);
})
document.querySelector("."+parent).addEventListener("click", function (event) {
    event.stopPropagation()
    document.querySelector(".checkout").className = "checkout checkout-reappear";
    clearInterval(blink);
},true)

// form handling
document.querySelector(".checkout .button").addEventListener("click", (event) =>{
    var name = document.querySelector(".checkout form input.name").value;
    var email = document.querySelector(".checkout form input.email").value;
    var message = document.querySelector(".checkout form textarea.message").value;
    var feedback = document.querySelector(".checkout form div p");
    feedback.className="hide";
    event.preventDefault();
    if(validateForm()){
        postData('inc/send.php', { "name":name , "email": email,"message":message})
            .then(data => {
                if(data =="true"){
                    feedback.innerText="Message Sent Successfully";
                    feedback.className="show success"
                }
                else{
                    feedback.innerText = "Error Occured while sending Message";
                    feedback.className = "show danger"
                }
                
            });
    }
});

// helper functions


function validateForm() {
    var name = document.querySelector(".checkout form input.name").value;
    var nameError = false;
    var email = document.querySelector(".checkout form input.email").value;
    var emailError = false;
    var message = document.querySelector(".checkout form textarea.message").value;
    var messageError = false;
    if (name == "") {
        document.querySelector(".checkout form .error-message.name").innerText = "Opps! name is required";
        nameError = true;
    }
    if (email == "") {
        document.querySelector(".checkout form .error-message.email").innerText = "Opps! Email is required";
        emailError = true;
    }

    else if (!validateEmail(email)) {
       
        document.querySelector(".checkout form .error-message.email").innerText = "Pls Enter a valid email";
        emailError = true;
    }

    if (message == "") {
        document.querySelector(".checkout form .error-message.msg").innerText = "Opps! message is required";
        messageError = true;
    }
    if (emailError) {
        document.querySelector(".checkout form .error-message.email").style.display = "block";
        document.querySelector(".checkout form input.email").className = " email input-error";
    }
    else {
        document.querySelector(".checkout form .error-message.email").style.display = "hidden";
        document.querySelector(".checkout form .error-message.email").innerText = ""
        document.querySelector(".checkout form input.email").className = "email";
    }

    if (messageError) {
        document.querySelector(".checkout form .error-message.msg").style.display = "block";
        document.querySelector(".checkout form textarea.message").className = " message input-error";
    }
    else {
        document.querySelector(".checkout form .error-message.msg").style.display = "hidden";
        document.querySelector(".checkout form .error-message.msg").innerText = "";
        document.querySelector(".checkout form textarea.message").className = "message";
    }

    if (nameError) {
        document.querySelector(".checkout form .error-message.name").style.display = "block";
        document.querySelector(".checkout form input.name").className = " name input-error";
    }
    else {
        document.querySelector(".checkout form .error-message.name").style.display = "hidden";
        document.querySelector(".checkout form .error-message.name").innerText = ""
        document.querySelector(".checkout form input.name").className = "name";
    }

    return !(nameError || messageError || emailError);
}

function validateEmail(email) {
    const re = /^\w+([\.-]?w+)*@\w+([\.-]?w+)*(\.\w{2,})+$/;
    return re.test(email.toLowerCase());
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.text(); // parses JSON response into native JavaScript objects
}