//  when word enter then form will appear

const search = document.querySelector('.serachbtn')
const result = document.querySelector('.result')

search.addEventListener('click', () => {
    result.style.transform = 'scale(100%)'
})


// dictionary form

const form = document.querySelector('form')
const resultDiv = document.querySelector('.result')


form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value)
});

const getWordInfo = async (word) => {
    try {
        resultDiv.innerHTML = "Fetching Data...."

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        
        console.log(response) //this console have no of data 
        
        const data = await response.json();
        console.log(data) // we have data convert in to objects
         

        let definitions = data[0].meanings[0].definitions[0];

        //  from this we are getting information from API 
        // Through the .innerHTML stores in resultDiv  

        resultDiv.innerHTML = `
     <h2><b>Word: </b>${data[0].word}!</h2>
     <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
     <p><b>Meaning: </b>${definitions.definition === undefined ? "Not Found" :
                definitions.definition}</p>
     <p><b>Example: </b>${definitions.example === undefined ? "Not Found" :
                definitions.example}</p>
    
                <p><b>synonyms: </b> </p>
    <p><b>Antonyms: </b> </p>
    
    `;

        // Fetching Antonyms data
   
        if (definitions.synonyms.length === 0) {
            resultDiv.innerHTML += `<h4>No synonyms available</h4>`
        }
        else {
            for (let i = 0; i < definitions.synonyms.length; i++) {
                resultDiv.innerHTML += `<li>${definitions.synonyms[i]} </li>`
            }
        }

        if (definitions.antonyms.length === 0) {
            resultDiv.innerHTML += `<h4>No antonyms available</h4>`
        }
        else {
            for (let i = 0; i < definitions.antonyms.length; i++) {
                resultDiv.innerHTML += `<li>${definitions.antonyms[i]} </li>`
            }
        }

        //  Adding read more button

        resultDiv.innerHTML += `<a href="${data[0].sourceUrls}"target="_blank">READ MORE</a>`;
    }
    catch (error) {
        resultDiv.innerHTML = `<p>Sorry!... The word not found</p>`;
    }


}