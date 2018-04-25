var tagList = ['HTML', 'HEAD', 'BODY', 'DIV', 'SECTION']; 
var isSpeaking = false;
var speakRate = 0.5
$(document).ready(function(){ 
    // FULLSCREEN ALERT
     var key = 0;
    $(document).keyup(function(e){
        if(e.key === 'F11')
        {       
                if(key===1){       // (remember that key is 0 initially)
                  // alert('FULLSCREEN OFF');
                    var fullscreentext = "Full screen mode off";  
                    var fullscreenmsg = new SpeechSynthesisUtterance(fullscreentext);
                    speechSynthesis.speak(fullscreenmsg);
                    key=0;
                }
                else{
                var fullscreentext = "Full screen mode on";  
                var fullscreenmsg = new SpeechSynthesisUtterance(fullscreentext);
                speechSynthesis.speak(fullscreenmsg); 
                }
                key=1;        
        }
    }); // END OF FULLSCREEN ALERT

// START OF
    // MAIN PROGRAM
    $(document).mousemove(function (e) {
        //SELECT TARGET
        var target = $(e.target);

        //FOR INPUT FIELD
        var inputtext = target.attr("placeholder");
        if(target.prop("tagName")=="INPUT"){
         inputtext = "Input field" + inputtext;
        }
        var inputmsg = new SpeechSynthesisUtterance(inputtext);
        

        //FOR BUTTON TEXT
        var msgtext = target.text();
        if(target.prop("tagName")=="BUTTON"){
           msgtext = "Button text" + msgtext;
        }
        if(target.prop("tagName")=="A"){
           msgtext = "Link text" + msgtext;
        }
        var msg = new SpeechSynthesisUtterance(msgtext);

        //FOR ALT TEXT
        var msgalt = target.attr("alt");
        var msgaltnew = new SpeechSynthesisUtterance(msgalt);

        //FOR ARIA LABELS
        var msglabel= target.attr('aria-label');
        var msglabelnew = new SpeechSynthesisUtterance(msglabel);

        //TO SPEAK
        function speaker()
        {   
            speechSynthesis.speak(msg);
            msg.onend = function(){
                alert("SPEECH ENDED");
            }            
            speechSynthesis.speak(inputmsg);     
            speechSynthesis.speak(msgaltnew);
            speechSynthesis.speak(msglabelnew);
        }
        function pauseSpeaker(){
            target.removeClass("speakText");
            speechSynthesis.pause();
        }
        function resumeSpeaker(){
            target.addClass("speakText");
            speechSynthesis.resume();
        }
        //TO STOP
        function stopSpeaker()
        {
            target.removeClass("speakText");
            speechSynthesis.cancel();
        }
        //TO CHECK CLASS
        function classCheck()
        {
            if(target.is(".speakText") ) {
                speaker();
                var isSpeaking=true;
                // USE CTRL TO STOP
                if(isSpeaking) {
                    $(document).keyup(function(e) {
                        if(e.key === "Control"){
                            pauseSpeaker();
                            var isSpeaking = false;
                            console.log(isSpeaking);
                        }
                        $(document).keyup(function(e) {
                            if(!isSpeaking){
                            
                                if(e.key === "Shift"){
                                    resumeSpeaker();
                                    var isSpeaking = true;
                                    console.log(isSpeaking);
                                }
                            }
                        });
                   });
                }
                
            }
        }
        if(tagList.indexOf(target.prop("tagName")) == -1){
            target.addClass("speakText");
            setTimeout(function(){
                $(target).mouseleave(function(){
                    stopSpeaker();  
                });
            },10);
            classCheck();     
            }
    }); //END of MAIN PROGRAM
   
});


