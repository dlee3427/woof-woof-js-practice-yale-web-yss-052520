document.addEventListener("DOMContentLoaded", () => {
    const dogInfo = document.getElementById("dog-summary-container")

    function fetchPups() {
        fetch("http://localhost:3000/pups")
        .then(resp => resp.json())
        .then(pups => {
            pups.forEach(pup => addPupsToDogBar(pup))
        })
    }

    function addPupsToDogBar(pup) {
        const dogBar = document.getElementById("dog-bar")
        const span = document.createElement("span")
        
        const dogFilter = document.getElementById("good-dog-filter")

        span.innerHTML = `${pup.name}`
        dogBar.append(span)

        span.addEventListener("click", () => {
            dogInfo.innerHTML = ""
            const h2 = document.createElement("h2")
            h2.innerText = pup.name 

            const img = document.createElement("img")
            img.src = pup.image

            const goodDogBtn = document.createElement("button")
            if (pup.isGoodDog === true ) {
                goodDogBtn.innerText = "Good Boy!"
            } else {
                goodDogBtn.innerText = "Bad Boy!"
            }
            goodDogBtn.addEventListener("click", ()=> {
                event.preventDefault()
                pup.isGoodDog = !pup.isGoodDog
                fetch("http://localhost:3000/pups/"+pup.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    },
                    body: JSON.stringify({
                        isGoodDog: pup.isGoodDog
                    })
                })
                .then(res => res.json())
                .then(updatedPup => {
                    if (updatedPup.isGoodDog === true) {
                        goodDogBtn.innerText = "Good Boy!"
                    } else {
                        goodDogBtn.innerText = "Bad Boy!"
                    }
                
                })
            })
            dogInfo.append(h2, img, goodDogBtn)

        })
        
        


    }



    fetchPups()

})

