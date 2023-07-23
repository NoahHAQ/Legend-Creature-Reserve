document.addEventListener("readystatechange", function(event) {
	if(event.target.readyState == "interactive") {

        // Add a loading animation
        setTimeout(function() {
            document.querySelector("body").classList.add("loaded");
        }, 1000);


        if(document.contains(document.querySelector("body#home"))) {

            // Randomly show a creature in the reserve and corresponsing description
            let background = document.querySelector("#home-content");
            let descriptionContent = document.querySelector("#home-content a p");
            let num = Math.floor(Math.random() * 4); 

            const description = document.querySelectorAll("#content-to-use p span:first-of-type")
            const descriptionExtension = document.querySelectorAll("#content-to-use p span:last-of-type")

            if(num == 0) {
                background.classList.add("unicorn")
            }
            else if(num == 1) {
                background.classList.add("basilisk")
            }
            else if(num == 2) {
                background.classList.add("manticore")
            }
            else if(num == 3) {
                background.classList.add("lamb-plant")
            };

            descriptionContent.innerHTML = description[num].innerHTML;

            descriptionContent.addEventListener("mouseenter",function(event){
                descriptionContent.innerHTML += descriptionExtension[num].innerHTML;
                this.parentElement.classList.toggle("expended");

                event.preventDefault();
            });

            descriptionContent.addEventListener("mouseleave",function(event){
                descriptionContent.innerHTML = description[num].innerHTML;
                this.parentElement.classList.toggle("expended");

                event.preventDefault();
            });

        };

        
        if(document.contains(document.querySelector("body#intro"))) {

            // Location map popup
            let locationButton = document.querySelector("#brief #location a");
            let closeButton = document.querySelector("#brief .close-button");

            locationButton.removeAttribute("href");

            locationButton.addEventListener("click", function(event){
                document.body.classList.toggle("show-popup");
                event.preventDefault();
            });

            closeButton.addEventListener("click", function(event){
                document.body.classList.toggle("show-popup");
                event.preventDefault();
            });

        }


        if(document.contains(document.querySelector("body#recreation, body#accommodation, body#restaurant"))) {
            
            // Appear animation
            window.addEventListener("scroll", function(event){

                let tarHeight = window.innerHeight * 0.85
                let boxList = document.querySelectorAll(".tips-content > div")

                for(let box of boxList){
                    let boxTop = box.getBoundingClientRect().top

                    if(boxTop <= tarHeight) {
                        box.classList.add("show")
                    }
                    else {
                        box.classList.remove("show")
                    }
                }

            })
        }


        if(document.contains(document.querySelector("body#booking"))) {

            // Function to update the info list
            function updateInfoList() {

                let infoBlocks = document.querySelectorAll("#info-list div");
                for(let infoBlock of infoBlocks) {
                    infoBlock.remove();
                }
    
                for(i=0; i<localStorage.length; i++) {
                    let infoName = localStorage.key(i)
                    let infoList = document.querySelector("#info-list");
                    if(infoName.match(/^info\d+$/)) {
    
                        let info = localStorage.getItem(`${infoName}`).split(";");
    
                        // Create info blocks
                        let block = document.createElement("div");
                        block.classList.add("info-block")
                        infoList.append(block);
                        
                        let deleteButton = document.createElement("div");
                        deleteButton.classList.add("delete-button")
                        block.append(deleteButton);
    
                        let line1 = document.createElement("p");
                        line1.innerHTML = info[0];
                        block.append(line1);
    
                        let line2 = document.createElement("p");
                        line2.innerHTML = "<span>Phone: " + info[1] + "</span> <span>Email: " + info[2] + "</span>";
                        block.append(line2);
    
                        let line3 = document.createElement("p");
                        line3.innerHTML = "<span>Number Of People: " + info[3] + "</span> <span>Have Elderly: " + info[4] + "</span> <span>Have Children: " + info[5] + "</span>";
                        block.append(line3);
    
                        let line4 = document.createElement("p");
                        line4.innerHTML = info[6];
                        block.append(line4);
    
                        let line5 = document.createElement("p");
                        line5.innerHTML = infoName;
                        block.append(line5);

                        // Delete reservation from the info list
                        deleteButton.addEventListener("click", function(event) {
                            this.closest(".info-block").remove();
                            let infoName = this.closest(".info-block").querySelector("p:last-of-type").innerHTML;
                            localStorage.removeItem(`${infoName}`)
        
                            event.preventDefault();
                        })
                    }
                    
                };
            }
            
            // Form validation check
            const form = document.querySelector("#sign-up");
            const formButton = document.querySelector("#sign-up button");
            const formItems = document.querySelectorAll("input[type=text]");
            
            for(let formItem of formItems) {
                let errorText = document.createElement("p");
                errorText.classList.add("errortext");
                formItem.parentElement.append(errorText);
            }

            form.addEventListener("submit", function(event) {

                // Check Name
                let fullName = document.querySelector("#form-full-name").value
                let names = fullName.split(" ");
                let firstName = names[0];
                let lastName = names[names.length-1];
                let nameValid = false;

                if(firstName != "" && lastName != "") {
                    nameValid = true;
                }
                else {

                    let item = document.querySelector("#form-full-name");
                    item.classList.add("error");

                    let itemLabel = item.closest(".form-item").querySelector("label");
                    itemLabel.classList.add("error");

                    let errorText = item.parentElement.querySelector("p");
                    errorText.innerHTML = "The entered name is invalid.";

                };

                // Check Phone
                let phone = document.querySelector("#form-phone").value;
                let phoneValid = false;
                
                if(phone.match(/^1\d{10}$/)) {
                    phoneValid = true;
                }
                else {

                    let item = document.querySelector("#form-phone");
                    item.classList.add("error");

                    let itemLabel = item.closest(".form-item").querySelector("label");
                    itemLabel.classList.add("error");
                    
                    let errorText = item.parentElement.querySelector("p");
                    errorText.innerHTML = "The entered phone number is invalid.";

                };

                // Check Email
                let email = document.querySelector("#form-email").value;
                let emailValid = false;

                if(email.match(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/)) {
                    emailValid = true;
                }
                else {

                    let item = document.querySelector("#form-email");
                    item.classList.add("error");

                    let itemLabel = item.closest(".form-item").querySelector("label");
                    itemLabel.classList.add("error");
                    
                    let errorText = item.parentElement.querySelector("p");
                    errorText.innerHTML = "The entered email address is invalid.";

                };

                // Response to valid submit
                if(nameValid && phoneValid && emailValid) {

                    formButton.innerHTML = "Submitted!";
                    formButton.setAttribute("disabled", "true");
                    
                    // Store the information for the info list

                    let count = localStorage.getItem("count")
                    count ++;
                    localStorage.setItem("count", count)

                    let numberOfPeople = document.querySelector("#people-number").value
                    let elderly = document.querySelector("#elderly :checked").value
                    let children = document.querySelector("#children :checked").value
                    
                    localStorage.setItem(
                        "info" + count,
                        fullName + ";" + phone + ";" + email + ";" + numberOfPeople + ";" + elderly + ";" + children + ";" + Date()
                        );

                    updateInfoList()

                }
                else {
                    formButton.innerHTML = "Try Again";
                };

                event.preventDefault();

            });

            for(let formItem of formItems) {
                formItem.addEventListener("keydown", function() {

                    this.classList.remove("error");
                    this.closest(".form-item").querySelector("label").classList.remove("error");

                    let errorText = this.parentElement.querySelector("p");
                    errorText.innerHTML = "";

                });
            }

            updateInfoList()

        }
        
    }
});