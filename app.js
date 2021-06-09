let score;
// let setLocal;
var n;
n = window.localStorage.length;
console.log(n);
if (n==0 || n==1)
{
    localStorage.setItem("highscore",0);
}

var high = localStorage.getItem("highscore");
document.querySelector('#highscore').innerHTML = `${localStorage.getItem("highscore")}`;


let colors=["green","red","blue","orange","yellow","brown"]
var ctr=0;
let boxColors = colors.concat(colors)
boxColors = boxColors.concat(boxColors);


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


let upboxes = document.getElementById("up3x3").querySelectorAll('.upbox');

let upColors=boxColors.slice(9);
for (let i = 0; i < 9; i++) 
{
    upboxes[i].style.backgroundColor = upColors[i];
}

shuffle(boxColors);



let downboxes = document.getElementById("down5x5").querySelectorAll('.downbox');

for (let i = 0; i < 25; i++) 
{
    downboxes[i].style.backgroundColor = boxColors[i];
    
    downboxes[i].onclick=function(){
        boxClicked(i);
        //ctr++;
    };
}

downboxes[24].onclick=function(){
    boxClicked(24);
};

let animateId=null,pos=0,elem=null,boxNum=null,topVal=0,leftVal=0,eBox=downboxes[24],eNum=24,mover=null;
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




function boxClicked(i)
{  
    ctr++;
    let x1=Math.floor(i/5),y1=i%5,x2=Math.floor(eNum/5),y2=eNum%5;
    if(setMover(x1,y1,x2,y2))
    {
        playSound();
        boxNum=i;
        elem=downboxes[boxNum];
        clearInterval(animateId);
        animateId = setInterval(frame, 5);
        document.querySelector('.moves').innerHTML = `${ctr}`;
    }
    else
    {
       
    }
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
            for (let i = 0; i < 25; i++) 
            {
              
                downboxes[i].onclick=function(){
                    return false;
                     
                }
            }
            downSelect.style.opacity = "0.1";
            showModal1();
            playAudio();
           
            console.log(score);
            var score = 1000+((200-c)*5) -ctr;
            var hc = parseInt(localStorage.getItem("highscore"));
            
            if (score > hc)
            {
                
                localStorage.setItem("highscore",score);
            }
            else
            {
                
                localStorage.setItem("highscore",hc);
            }
            //localStorage.setItem("highscore",hc);
            high = localStorage.getItem("highscore");
            document.querySelector('#highscore').innerHTML = `${high}`;
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
let centre3x3=[6,7,8,11,12,13,16,17,18];
function isGameWon()
{
    for (let i = 0; i < 9; i++) {
        let rhs=downboxes[centre3x3[i]].style.backgroundColor, lhs=upColors[i];
        //console.log(rhs,lhs);
        if(rhs!=lhs)
            return false;    
    }
    console.log(ctr);
    return true; 
}
let c = 200;

    let timer = document.querySelector('.time');
    function timing(){
        
        c = c-1;
        if(c<200)
        {
            timer.innerHTML = c;
            
            
        }
        if (c<1)       //&& c>5
        {
            timer.innerHTML = 0;
            clearInterval(update);
            downSelect.style.opacity = "0.1";
            showModal();
            for (let i = 0; i < 25; i++) 
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
    
    //  document.getElementById('message').innerHTML = ' &nbsp &nbsp &nbsp You Won!' +'<br>' + `Your score : ${score}` ;    //your Score = ${ctr}`;
    //  document.getElementById('modal').classList.remove("hide");
     

    document.getElementById('message').innerHTML = '&nbsp &nbsp &nbsp You lost' + '<br>' + '&nbsp &nbsp &nbsp Try again';
    document.getElementById('modal').classList.remove("hide");  
}
function showModal1(){
    score = 1000+((200-c)*5) -ctr;
    document.getElementById('message').innerHTML = ' &nbsp &nbsp &nbsp You Won!' +'<br>' + `Your score : ${score}` ;    //your Score = ${ctr}`;
    document.getElementById('modal').classList.remove("hide");
    
}
const hideModal = () => {
    document.getElementById('modal').classList.add("hide");
}

var x = document.getElementById("myAudio"); 

function playAudio() { 
  x.play(); 
}


