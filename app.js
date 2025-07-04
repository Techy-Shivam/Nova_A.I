let anim=document.getElementById("voice");
let content=document.getElementById("content");
let btn=document.getElementById("btn");

function speech(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    text_speak.lang="en-US"
    window.speechSynthesis.speak(text_speak)
}

function wishhMe(){
    let date=new Date()
    let hours=date.getHours();
    // console.log(hours);
    
    if(hours >= 0  && hours <12 ){
        speech("Good Morning my friend tell me what can i do for you")
    }
    else if(hours >=12 && hours <16 ){
        speech("Good Afternoon my friend tell me what can i do for you")
    }
    else{
        speech("Good Evening my friend tell me what can i do for you")
    }
}
window.addEventListener('load',()=>{
// wishhMe()
})

let speechrecog=window.SpeechRecognition || window.webkitSpeechRecognition

let recognition= new speechrecog()

recognition.onresult=(event)=>{
    let currentIndex=event.resultIndex //we use it to access the result index in our speechrecognition Event 
    let transcript=event.results[currentIndex][0].transcript
    content.innerText=transcript
    console.log(event);
    takeCommand(transcript.toLowerCase())
}
btn.addEventListener('click',function(){
    btn.style.display="none"
    anim.style.display="block"
    recognition.start()
})

function takeCommand(message){
    btn.style.display="flex"
    anim.style.display="none"
    if(message.includes("hello") || message.includes("hey")){
        speech("Hello my friend , how can i help you?")
    }
    else if(message.includes("who are you?")){
        speech("I am NOVA a virtual assistant , created by Shivam Shukla")
    }
    else if(message.includes("how are you?")){
        speech("I'm doing great — thanks for asking! , tell me my friend how can i help you?")
    }
    else if(message.includes("open google")){
        speech("opening google")
        window.open("https://www.google.co.in/?hl=hi")
    }
    else if(message.includes("open youtube")){
        speech("opening youtube")
        window.open("https://www.youtube.com/")
    }
    else if(message.includes("open chatgpt")){
        speech("opening chat gpt")
        window.open("chatgpt://")
    }
    else if(message.includes("open facebook")){
        speech("opening facebook")
        window.open("https://www.facebook.com/")
    }
    else if(message.includes("open calculator")){
        speech("opening calculator")
        window.open("calculator://")
    }
    else if(message.includes("open whatsapp")){
        speech("opening whatsapp")
        window.open("whatsapp://")
    }
    else if(message.includes("time")){
        let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speech(time)
    }
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speech(date)
    }
    else if (message.toLowerCase().includes("youtube")) {

  // remove trigger words so only the query remains
  const ytQuery = message
    .toLowerCase()
    .replace(/(nova|noah|search|on|in|youtube|tell me about)/g, "")
    .trim();
  speech(`Searching YouTube for ${ytQuery}`);
  window.open(
    `https://www.youtube.com/results?search_query=${encodeURIComponent(ytQuery)}`,
    "_blank"
  );
}
    else{
        let cleanedQuery = message
  .toLowerCase()
  .replace("nova", "")
  .replace("noah", "")
  .replace("tell me about", "")
  .trim();
        speech(`this is what i found on internet regarding ${cleanedQuery}`)
        window.open(`https://www.google.co.in/search?q=${cleanedQuery}`,"_blank")
    }
}