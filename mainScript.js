const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

//Disable/enable button
function toggleButton () {
    button.disabled = !button.disabled;
}

//passing joke to voicerss API
function tellMe(joke){
    VoiceRSS.speech({
        key: 'a23efc9a46be49a99a28f6001faae549',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

//Get jokes from API
async function getJokes(){
    let joke = '';
    const apiURL = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist'
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        
        //checks if one or two part and formats joke
        if (data.setup){
            joke = `${data.setup}...${data.delivery}`;
        }else {
            joke = `${data.joke}`;
        }
        //Text-to-Speech
        tellMe(joke);
        //Disable Button
        toggleButton();
    } catch (error) {
        //catch error
        console.log("Whoops, error: ", error);   
    }
}

//Event listeners
button.addEventListener('click',getJokes);
audioElement.addEventListener('ended',toggleButton);