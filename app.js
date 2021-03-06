document.addEventListener('DOMContentLoaded', ()=>{

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    let updateTime = 200;
    
    let time = 0;
    var head = {
        height: 25,
        width: 25,
        x: 25,
        y: 25, 
        prevX:25,
        prevY:25,
        ar : []     
    };
    var apple = {
        height: 25,
        width: 25,
        x: (Math.floor(Math.random() * 10)+1)*25,
        y: (Math.floor(Math.random() * 10)+1)*25,
        color: "red"
    }

    let tails = [
        
    ]

    var keys = {
        up : false,
        down : false,
        left : false,
        right : true
    }
    

    function renderCanvas(){
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } 
    function renderhead(){
        ctx.fillStyle = "green";
        ctx.fillRect(head.x, head.y, head.width, head.height);

        for(let i = 0 ; i < head.ar.length; i++){
            ctx.fillRect(head.ar[i].x, head.ar[i].y, head.width, head.height);
        }

    }
    function createApple(){
        ctx.fillStyle = "red";
        ctx.fillRect(apple.x, apple.y, apple.width, apple.height);
    }
    function movehead(){
     

        head.prevX = head.x;
        head.prevY = head.y;
        if(keys.up)  {
        
            head.y -= 25;
        }
        if(keys.down) {
           
            head.y += 25;
        }
        if(keys.right) {

            head.x +=25;
        }
        if(keys.left) {

            head.x -=25;
        }

       if(head.ar.length===1){

        head.ar[0].prevX = head.ar[0].x;
        head.ar[0].prevY = head.ar[0].y;

        head.ar[0].x = head.prevX;
        head.ar[0].y = head.prevY;
       }

       if(head.ar.length>1){

      

     
       }

       for(let i = 0 ; i < head.ar.length;i++){
           if(i===0){
            head.ar[0].prevX = head.ar[0].x;
            head.ar[0].prevY = head.ar[0].y;
    
            head.ar[0].x = head.prevX;
            head.ar[0].y = head.prevY;
           }
           else{
            head.ar[i].prevX = head.ar[i].x;
            head.ar[i].prevY = head.ar[i].y;
    
            head.ar[i].x = head.ar[i-1].prevX;
            head.ar[i].y = head.ar[i-1].prevY;
           }
       }
        //console.log(head.x, head.y, head.prevX, head.prevY);
        if(head.x < 0) head.x = canvas.width-head.width;
        if(head.x >= canvas.width) head.x = 0;
        if(head.y < 0) head.y = canvas.height-head.width ;
        if(head.y >= canvas.height) head.y = 0;

      
    }
    function gameCheck(){
        if(head.ar.length === (canvas.width/head.width)*(canvas.height/head.height)){
            alert("gameover");
        }
    }
    let score = 0;
    function update(){
        renderCanvas();
        createApple();
        movehead();
        renderhead();
        appleCheck();
        collideCheck();
        gameCheck();
    }
    
    let interval = setInterval(update, updateTime);

    function appleCheck(){
        if(apple.x === head.x && apple.y === head.y){
            updateTime -= 1;
            clearInterval(interval);
            interval = setInterval(update, updateTime);
            apple.x= (Math.floor(Math.random() * 10)+1)*25;
            apple.y=(Math.floor(Math.random() * 10)+1)*25;
            score++;
            document.querySelector('#score').innerHTML = score;

            if(keys.up){
                head.ar.push({x:head.x,y:head.y+25,prevX:head.x, prevY: head.y+25});
                head.ar.push({x:head.ar.x,y:head.y+50,prevX:head.x, prevY: head.y+50});
                head.ar.push({x:head.x,y:head.y+75,prevX:head.x, prevY: head.y+75});
            }
            if(keys.down){
                head.ar.push({x:head.x,y:head.y-25,prevX:head.x, prevY: head.y-25});
                head.ar.push({x:head.x,y:head.y-50,prevX:head.x, prevY: head.y-50});
                head.ar.push({x:head.x,y:head.y-75,prevX:head.x, prevY: head.y-75});
            }
            if(keys.left){
                head.ar.push({x:head.x+25,y:head.y,prevX:head.x+25, prevY: head.y});
                head.ar.push({x:head.x+50,y:head.y,prevX:head.x+50, prevY: head.y});
                head.ar.push({x:head.x+75,y:head.y,prevX:head.x+75, prevY: head.y});
            }
            if(keys.right){
                head.ar.push({x:head.x-25,y:head.y,prevX:head.x-25, prevY: head.y});
                head.ar.push({x:head.x-50,y:head.y,prevX:head.x-50, prevY: head.y});
                head.ar.push({x:head.x-75,y:head.y,prevX:head.x-75, prevY: head.y});
            }
        }
    }
    function collideCheck(){
        for(let i =  0 ; i < head.ar.length; i++){
                if(head.y === head.ar[i].y && head.x === head.ar[i].x){
                    alert("ÇARPIŞMA OLDU");
                    clearInterval(interval);
                }
          
        }
    }

    function addKey(e){

        if(e.key==='ArrowUp' && keys.down !==true) {
            keys.up = true;
            keys.down = false;
            keys.left = false;
            keys.right = false;
        }
        else if(e.key==='ArrowDown' && keys.up !== true) {
            keys.up = false;
            keys.down = true;
            keys.left = false;
            keys.right = false;
            
        }
        else if(e.key==='ArrowLeft' && keys.right !== true){
            keys.up = false;
            keys.down = false;
            keys.left = true;
            keys.right = false;
       
        }
        else if(e.key==='ArrowRight' && keys.left !== true) {
            keys.up = false;
            keys.down = false;
            keys.left = false;
            keys.right = true;

        }

        document.removeEventListener('keydown', addKey);
        let timeout = setTimeout(addKeyList, updateTime-150);

    }
    
    function addKeyList(){
        document.addEventListener('keydown', addKey);
    }
    addKeyList();            


});