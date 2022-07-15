const wrapper = document.querySelector(".wrapper");
const searchInput = wrapper.querySelector(".searchInput");
const descriptionText = wrapper.querySelector(".search p")
const wordDetails = wrapper.querySelector(".wrapper .word-info")


searchInput.focus()

function showDetails(result, word){
  
        if(result.title == "No Definitions Found"){
            descriptionText.innerHTML = `<p>Cannot find the meaning for "${word}"</p>`
            wordDetails.classList.add("active")
            descriptionText.classList.remove("active")
        }else{
            result.map(elem => {
            descriptionText.classList.add("active")
            wordDetails.classList.remove("active")
            
            let li = `
                <div class="words">
                        <div class="word">
                        <h4>${elem.word}</h4>
                        <i class="fa-solid fa-volume-high"></i>
                        </div>
                        <span class="word-adjective">${elem.meanings[0].partOfSpeech}/${elem.word}</span>
                        <div class="word-details">
                        <hr>
                        <h3>Meaning</h3>
                        <p>${elem.meanings[0].definitions[0].definition}</p>
                        </div>
                        <div class="word-details">
                        <hr>
                        <h3>Example</h3>
                        <p>${elem.meanings[0].definitions[1].definition}</p>
                        </div>
                       <div clas="wrapperdiv">
                                <div class="word-details">
                                <hr>
                                <h3>Synonyms</h3>
                                ${elem.meanings[0].synonyms.map(item =>(
                                    "<span class='span'>&nbsp;" + item + "</span>"
                                ))}
                            </div>
                       </div>
                </div>
                `
                wordDetails.innerHTML = li
                 document.querySelector(".fa-volume-high").addEventListener("click", ()=>{
                   fetchSound(elem.word)
                });

            });

            }
    }

    function fetchSound(word){
        console.log(word)
        let utterance = new SpeechSynthesisUtterance(word);
        speechSynthesis.speak(utterance)
    }


    function fetchData(word){
        if(word){
            descriptionText.innerHTML = `searching for the meaning of "${word}".`
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(res => res.json())
        .then(result => showDetails(result, word))
        // .catch((err)=> console.log(err))
        
    }else{
        descriptionText.innerHTML = `No meaning found for ${word}`
    }
}


searchInput.addEventListener("keyup", (e)=>{
    if(e.key === "Enter" && searchInput){
       fetchData(searchInput.value)
    }
})
