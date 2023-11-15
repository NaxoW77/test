    function startPt(){
        let Pt = document.getElementById("Pt");
        let PT1;
        let PTT;
        if(!localStorage.getItem("PT1") || !localStorage.getItem("PT1")){
        localStorage.setItem("PT1", 0);
        localStorage.setItem("PTT", 0);
        }
        PT1 = localStorage.getItem("PT1");
        PTT = localStorage.getItem("PTT");

        Pt.innerHTML = `Puntaje: <span id='P1'>0</span> | Puntaje total: <span id='P2'>${PTT}</span>`;
    }

    var cd = 0;
    var cd2 = 0;
    var gm = 0;
    document.body.addEventListener("keypress", function(k){
        if(cd==0){
            cd=1;
            setTimeout(function(){
            cd=0;
            },780)
            
            
            if(k.key==" " && gm == 1){
            Jump();
            }
        }
    
        if(k.key=="Enter" && cd2 == 0){
            start();
            cd2=1;
        }

        if(k.key=="r"){
            window.location.reload();
        }

        if(k.key=="x" && gm == 0){
            localStorage.setItem("PT1", 0);
            localStorage.setItem("PTT", 0);
            Pt.innerHTML = `Puntaje: 0 | Puntaje total: 0`
            Pt.style.animation = "N 3s"
            window.alert("Se han borrado tu puntaje.")
        }

    })
    
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    function start(){
        document.getElementById("stMsg").style.display = "none";
        document.getElementById("jpMsg").style.display ="";
        document.getElementById("jpMsg").style.animation ="fadeOut 3s";
        setTimeout(function(){
            document.getElementById("jpMsg").style.animation ="";
            document.getElementById("jpMsg").style.display ="none";
        },3000)

        document.getElementById("game").style.display ="";
        document.getElementById("game").style.animation ="fadeIn 1s";
        
        document.getElementById("Pt").style.display ="";
        moveCt();
        movePx();
        check();
        updatePt();
        gm = 1;
    }

    function gameover(){
        gm = 0;
        document.getElementById("game").style.filter = "blur(5px)"
        document.getElementById("gameover").style.display = "";
        document.getElementById("gameover").style.animation= "fadeIn 1.5s";
        document.getElementById("gameover").style.animation= "N 1.5s";
        document.getElementById("Pt").style.animation= "Y 1.5s";
    }

    function check(){
        
        var Ct = document.getElementById("Ct1");
        var Rn = document.getElementById("Rn");
        setInterval( async function(){
            if(gm == 1){
            if(parseInt(Ct.style.left)>=225 && parseInt(Ct.style.left)<=375 && parseInt(Rn.style.top)>=500-88){
                gameover();

            }
        }
        },0.3)
    }

    function updatePt(){
        var Pt = document.getElementById("Pt");
        var PT1 = 0
        var PTT = parseInt(localStorage.getItem("PTT"));
        
        setInterval( async function(){
            var an = 0;
            if(gm == 1){
            PT1=PT1+1;
            if(PT1>PTT){
                PTT=PT1
                an = 1;
            }
            
            localStorage.setItem("PT1", PT1);
            localStorage.setItem("PTT", PTT);

            Pt.innerHTML = `Puntaje: <span id='P1'>${PT1}</span> | Puntaje total: <span id='P2'>${PTT}</span>`
            if(an==1){
                document.getElementById("P2").style.animation="J 0.7s"
            }
            document.getElementById("P1").style.animation="J 0.7s"
            
            setTimeout(function(){
                document.getElementById("P1").style.animation=""
                document.getElementById("P2").style.animation=""
            },700)
        }
        },1000)
    }


    async function moveCt(){
        
        var Ct = document.getElementById("Ct1");
        var val = 1920;
        var speed = 3;
        setInterval( async function(){
            if(gm == 1){
            if(parseInt(Ct.style.left)<-100){
                val = 1920;
                Ct.style.left=`${val}px`
                speed = 2+Math.floor(Math.random()*8)
            }else{
                val=val-speed;
                Ct.style.left=`${val}px`
            }
        }
        },0.3)
    }

    async function movePx(){
        
        var px0 = document.getElementById("Parallax0");
        px0.style.backgroundPositionX="0px"
        var px1 = document.getElementById("Parallax1");
        px1.style.backgroundPositionX="0px"
        var px2 = document.getElementById("Parallax2");
        px2.style.backgroundPositionX="0px"
        var px0Speed = 1;
        var px1Speed = 1.3;
        var px2Speed = 1.7;
        setInterval( async function(){
            if(gm == 1){
                px0.style.backgroundPositionX=`${parseFloat(px0.style.backgroundPositionX)-px0Speed}px`
                px1.style.backgroundPositionX=`${parseFloat(px1.style.backgroundPositionX)-px1Speed}px`
                px2.style.backgroundPositionX=`${parseFloat(px2.style.backgroundPositionX)-px2Speed}px`
        }
        },0.3)
    }

    let jmpCd = 0;
async function Jump(){
    var accel=5.5;
    if(jmpCd==0){
    jmpCd=1
    for(var x = 0; x<120;x++){
        if(gm==1){
        document.getElementById("Rn").style.top = `${parseInt(document.getElementById("Rn").style.top)-accel}px`
        accel-=0.1;
        await sleep(0)
        }
    }
    setTimeout(function(){
        jmpCd = 0;
    },1)
}
}