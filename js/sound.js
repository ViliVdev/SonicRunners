var x = document.getElementById("gameAudio"); 

function playAudio() { 
   
if (typeof x.loop == 'boolean')
{
    x.loop = true;
}
else
{
    x.pause;
}
x.play();
  
} 

function pauseAudio() { 
  
  x.loop = false;
  
  x.pause(); 
} 