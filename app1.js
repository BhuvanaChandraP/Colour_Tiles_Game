let score ;
var high1 ;
var n;
n = window.localStorage.length;
if (n==0 || n==1)
{
    localStorage.setItem("highscore1",0);
}

var high1 = localStorage.getItem("highscore1");
document.querySelector('#highscore').innerHTML = `${localStorage.getItem("highscore1")}`;
console.log(high1);
let colors = ["green","red","blue","orange","yellow","brown","grey"]
var ctr=0;
let boxColors = colors.concat(colors)
boxColors = boxColors.concat(boxColors);
boxColors = boxColors.concat(colors);
console.log(boxColors);

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
   
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  shuffle(boxColors);

var y = document.getElementById("mouse"); 
function playSound(){
    y.play();
}

let upboxes = document.getElementById("up4x4").querySelectorAll('.upbox');

let upColors=boxColors.slice(16);
for (let i = 0; i < 16; i++) 
{
    upboxes[i].style.backgroundColor = upColors[i];
}

shuffle(boxColors);
function boxClicked(i)
{  
    ctr++;
    let x1=Math.floor(i/6),y1=i%6,x2=Math.floor(eNum/6),y2=eNum%6;
    if(setMover(x1,y1,x2,y2))
    {
        playSound();
        boxNum=i;
        elem=downboxes[boxNum];
        clearInterval(animateId);
        animateId = setInterval(frame, 6);
        document.querySelector('.moves').innerHTML = `${ctr}`;
    }
    else
    {
        
    }
}
let downboxes = document.getElementById("down6x6").querySelectorAll('.downbox');

for (let i = 0; i < 36; i++) 
{
    downboxes[i].style.backgroundColor = boxColors[i];
    downboxes[i].onclick=function(){
        boxClicked(i);
        // ctr++;
    };
}
downboxes[35].onclick=function(){
    boxClicked(35);
};




let animateId=null,pos=0,elem=null,boxNum=null,topVal=0,leftVal=0,eBox=downboxes[35],eNum=35,mover=null;
function moveLeft()
{
    leftVal+=5;
    elem.style.left=leftVal+"px";
}
function moveRight()
{
    leftVal-=5;
    elem.style.left=leftVal+"px";    
}
function moveTop()
{
    topVal+=5;
    elem.style.top=topVal+"px";
}
function moveBottom()
{
    topVal-=5;
    elem.style.top=topVal+"px";    
}


let downSelect = document.querySelector('.whole');
function frame() {
    if (pos == 60) {
        clearInterval(animateId);
        eBox.style.backgroundColor=elem.style.backgroundColor;
        elem.style.backgroundColor="transparent";        
        elem.style.top="0px";
        elem.style.left="0px";
        eNum=boxNum;
        eBox=downboxes[eNum];
        pos=0;
        topVal=0;
        leftVal=0;
        if(isGameWon())
        {
            for (let i = 0; i < 36; i++) 
            {
              
                downboxes[i].onclick=function(){
                    return false;
                     
                }
            }
            downSelect.style.opacity = "0.1";
            showModal1();
            playAudio();
            
            //console.log(score);
            var score = 3000 -(500-c) -ctr;
            var hc = parseInt(localStorage.getItem("highscore1"));
            
            if (score > hc)
            {
                
                localStorage.setItem("highscore1",score);
            }
            else
            {
               
                localStorage.setItem("highscore1",hc);
            }
            
            high1 = localStorage.getItem("highscore1");
            document.querySelector('#highscore').innerHTML = `${high1}`;
            clearInterval(update);
        }
    } 
    else
    {
        pos+=10; 
         mover();
    }
  }
function setMover(x1,y1,x2,y2)
{
    if(x1==x2)
    {
        if(y1+1==y2)
        {
            mover=moveLeft;
        }
        else if(y1-1==y2)
        {
            mover=moveRight;
        }
        else
        {
            return false;
        }
    }
    else if(y1==y2)
    {
        if(x1+1==x2)
        {
            mover=moveTop;
        }
        else if(x1-1==x2)
        {
            mover=moveBottom;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
    return true;
}
let centre3x3=[7,8,9,10,13,14,15,16,19,20,21,22,25,26,27,28];
function isGameWon()
{
    for (let i = 0; i < 16; i++) {
        let rhs=downboxes[centre3x3[i]].style.backgroundColor, lhs=upColors[i];
        //console.log(rhs,lhs);
        if(rhs!=lhs)
            return false;    
    }
    console.log(ctr);
    return true; 
}


let c = 500;
    let timer = document.querySelector('.time');
    function timing(){
        c = c-1;
        if(c<500)
        {
            timer.innerHTML = c;
            
            
        }
        if (c<1)
        {
            timer.innerHTML = 0;
            clearInterval(update);
            
            downSelect.style.opacity = "0.1";
            showModal();
            for (let i = 0; i < 36; i++) 
            {
                downboxes[i].onclick=function(){
                    return false;
                     
                }
            }
           
        }
    }
const strBtn = document.querySelector('.newGame');
strBtn.addEventListener('click',function(){
    
    update = setInterval('timing()' ,1000)
})


function showModal(){
    
    document.getElementById('message').innerHTML = '&nbsp &nbsp &nbsp You lost' + '<br>' + '&nbsp &nbsp &nbsp Try again';
    
    document.getElementById('modal').classList.remove("hide");
    
}
function showModal1(){
    score = 3000 -(500-c) -ctr;
    document.getElementById('message').innerHTML = ' &nbsp &nbsp &nbsp You Won!' +'<br>' + `Your score :  ${score}` ;    //your Score = ${ctr}`;
    document.getElementById('modal').classList.remove("hide");
    
}
const hideModal = () => {
    document.getElementById('modal').classList.add("hide");
}

var x = document.getElementById("myAudio"); 

function playAudio() { 
  x.play(); 
} 








