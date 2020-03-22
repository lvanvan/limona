let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let cnvX = canvas.width = window.innerWidth;
let cnvY = canvas.height = window.innerHeight;
let fakeArray;
let score = 0;
let mouse = {
    x: null,
    y: null,
}
let newR = 12;
let me = {
    x: cnvX / 2,
    y: cnvY / 2,
    r: newR + score,
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.clientX
    mouse.y = event.clientY
});
function updateFake(){
    for (let i = 0; i < fakeArray.length; i++) {
        let a=fakeArray[i];
        //Particle-Player Distance
        let dx = me.x - a.x;
        let dy = me.y - a.y;
        let dist = Math.hypot(dx, dy)
        let dxToDist=(Math.abs(dx)/dist);
        let dyToDist=(Math.abs(dy)/dist);
        //border colider
        if (a.x > cnvX - a.r || a.x <a.r) {
            a.sx = -a.sx;
        }
        if (a.y > cnvY-a.r ||a.y < a.r) {
            a.sy = - a.sy;
        }
        //Particle-Player Colider 
        if (dist <= me.r+a.r){
            if(me.r/2>=a.r){
                if (me.r > 12) {
                    me.r -= 0.1;
                }
                if(a.r>1.4*((me.r/2)/a.r)){
                    a.r-=1.4*((me.r/2)/a.r);
                }else{
                    a.r=3;
                }
                if (a.r < 4) {
                    me.r += .5;
                    let spawnOrErase=randomInt(1,2)
                    if(spawnOrErase<2){
                        a.x = randomInt(a.r, cnvX - a.r);
                        a.y = randomInt(a.r, cnvY - a.r);
                        a.r = randomInt(me.r/2 - 1, me.r/2 + .7);
                    }else{
                        fakeArray.splice(i,1);
                    }
                }
            }else{
            a.r-=1/2;
                if (me.r > 12) {
                    me.r -= 2;
                }
            }
            
            //recoils
            if (me.x < a.x && me.y<a.y) {
                me.x-=a.r*2*dxToDist;
                me.y-=a.r*2*dyToDist;
                if(a.x>=cnvX-me.r*dxToDist-1){
                    a.x=cnvX-a.r-1;
                }else{
                    a.x+=me.r*dxToDist;
                }
                if(a.y>=cnvY-me.r*dyToDist-1){
                    a.y=cnvY-a.r-1;
                }else{
                    a.y+=me.r*dyToDist;
                } 
                a.sy=Math.abs(a.sy);
                a.sx=Math.abs(a.sx);
            }
            if (me.x > a.x && me.y<a.y) {
                me.x+=a.r*2*dxToDist;
                me.y-=a.r*2*dyToDist;
                if(a.x<=me.r*dxToDist+1){
                    a.x=a.r+1;
                }else{a.x -= me.r*dxToDist;}
                if(a.y>=cnvY-me.r*dyToDist-1){
                    a.y=cnvY-a.r-1;
                }else{a.y += me.r*dyToDist;
                }
                a.sy=Math.abs(a.sy);
                a.sx=-1*Math.abs(a.sy);
            }
            if (me.x > a.x && me.y>a.y) {
                me.y+=a.r*2*dyToDist;
                me.x+=a.r*2*dxToDist;
                if(a.x<=me.r*dxToDist+1){
                    a.x=a.r+1;
                }else{a.x -= me.r*dxToDist;}
                if(a.y<=me.r*dyToDist+1){
                    a.y=a.r+1;
                }else{a.y -= me.r*dyToDist;} 
                a.sy=-1*Math.abs(a.sy);
                a.sx=-1*Math.abs(a.sx);
            }
            if (me.x < a.x && me.y>a.y) {
                me.x-=a.r*2*dxToDist;
                me.y+=a.r*2*dyToDist;
                if(a.x>=cnvX-me.r*dxToDist-1){
                    a.x=cnvX-a.r-1;
                }else{
                    a.x += me.r*dxToDist;
                }
                if(a.y<=me.r*dyToDist+1){
                    a.y=a.r+1;
                }else{
                    a.y -= me.r*dyToDist;
                }
                a.sy=-1*Math.abs(a.sy);
                a.sx=Math.abs(a.sx);
            }
        }
        //update position and redra
        a.x += a.sx;
        a.y += a.sy;
        drawBall(a.x,a.y,a.r,a.color);
    }
}
class Fake {
    constructor(x, y, r, sx, sy, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.sx = sx;
        this.sy = sy;
        this.color = color;
    }
}
function drawBall(x,y,r,color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}

//multiplicateParticle
function cloneFake() {
    fakeArray = [];
    let fakeParts = (cnvX * cnvY) / 50000;
    for (let i = 0; i < fakeParts; i++) {
        let r = randomInt(me.r / 2 - 1.5, me.r / 2 + 3);
        let x = randomInt(r, cnvX - r);
        let y = randomInt(r, cnvY - r);
        let sx = randomInt(1,3);
        let sy = randomInt(1,3);
        let color = 'darkred';
        fakeArray.push(new Fake(x, y, r, sx, sy, color));
    }
}
function moveCursor() {
    let mmDistX = mouse.x - me.x;
    let mmDistY = mouse.y - me.y;
    let egineX3=me.x-mmDistX/20;
    let egineY3=me.y-mmDistY/20;
    let egineX2=me.x-mmDistX/30;
    let egineY2=me.y-mmDistY/30;
    let egineX1=me.x-mmDistX/50;
    let egineY1=me.y-mmDistY/50;
    let frontX1=me.x+mmDistX/90;
    let frontY1=me.y+mmDistY/90;
    let frontX2=me.x+mmDistX/70;
    let frontY2=me.y+mmDistY/70;
    let frontX3=me.x+mmDistX/55;
    let frontY3=me.y+mmDistY/55;
    let frontX4=me.x+mmDistX/45;
    let frontY4=me.y+mmDistY/45;
    let speedMeX ;
    let speedMeY ;
    let MeDistMo=Math.hypot(mmDistX, mmDistY);
    
    drawBall(frontX1,frontY1,me.r*.75,'darkblue');
    drawBall(frontX2,frontY2,me.r*.60,'darkblue');
    drawBall(frontX3,frontY3,me.r*.45,'darkblue');
    drawBall(frontX4,frontY4,me.r*.3,'darkblue');
    drawBall(egineX3,egineY3,me.r*.3,'orange');
    drawBall(egineX2,egineY2,me.r*.5,'orange');
    drawBall(egineX1,egineY1,me.r*.7,'red');
    drawBall(egineX3+me.r*.4,egineY3,me.r*.05,'yellow');
    drawBall(egineX3-me.r*.4,egineY3,me.r*.05,'yellow');
    drawBall(egineX2+me.r*.4,egineY2,me.r*.05,'yellow');
    drawBall(egineX2-me.r*.4,egineY2,me.r*.05,'yellow');
    drawBall(egineX1+me.r*.4,egineY1,me.r*.05,'orange');
    drawBall(egineX1-me.r*.4,egineY1,me.r*.05,'orange');
    drawBall(egineX3,egineY3+me.r*.4,me.r*.05,'yellow');
    drawBall(egineX3,egineY3-me.r*.4,me.r*.05,'yellow');
    drawBall(egineX2,egineY2+me.r*.4,me.r*.05,'yellow');
    drawBall(egineX2,egineY2-me.r*.4,me.r*.05,'yellow');
    drawBall(egineX1,egineY1+me.r*.4,me.r*.05,'orange');
    drawBall(egineX1,egineY1-me.r*.4,me.r*.05,'orange');
    context.beginPath();
    context.fillRect(mouse.x - me.r, mouse.y, 2 * me.r, 1);
    context.fillRect(mouse.x, mouse.y - me.r, 1, 2 * me.r);
    context.arc(mouse.x, mouse.y, me.r, 0, Math.PI * 2);
    context.closePath();
    context.stroke();
    context.fillStyle = 'pink';
    context.beginPath();
    context.arc(me.x, me.y, me.r, 0, Math.PI * 2);
    context.closePath();
    context.fill();
    context.fillStyle = 'darkblue';
    context.beginPath();
    context.arc(me.x, me.y, me.r / 2, 0, Math.PI * 2);
    context.closePath();
    context.fill();
    context.beginPath();
    context.arc(me.x, me.y, me.r, 0, Math.PI * 2);
    context.closePath();
    context.stroke();
    context.fillRect(me.x - me.r, me.y, 2 * me.r, 1);
    context.fillRect(me.x, me.y - me.r, 1, 2 * me.r);
    if (MeDistMo < 1) {
        speedMeX = 0;
        speedMeY =0;

    } else if (MeDistMo< me.r*5) {
        speedMeX = 1;
        speedMeY = 1;
    } else if (MeDistMo< me.r * 15) {
        speedMeX =2;
        speedMeY =2;
    } else if (MeDistMo < me.r * 45) {
        speedMeX =3;
        speedMeY =3;
    } else {
        speedMeX =4;
        speedMeY =4;
    }
    if (me.x < mouse.x && me.x < cnvX - me.r) {
        me.x += speedMeX*((Math.abs(mmDistX))/MeDistMo);
    }
    if (me.y > mouse.y && me.y > me.r) {
        me.y -= speedMeY*((Math.abs(mmDistY))/MeDistMo);
    }
    if (me.x > mouse.x && me.x > me.r) {
        me.x -= speedMeX*((Math.abs(mmDistX))/MeDistMo);
    }
    if (me.y < mouse.y && me.y < cnvY - me.r) {
        me.y += speedMeY*((Math.abs(mmDistY))/MeDistMo);
    }
    
}
function partSelfSense(){
    for (let ap = 0; ap < fakeArray.length; ap++) {
        let aa=fakeArray[ap];
        for (let bp = ap; bp < fakeArray.length; bp++) {
            
            let bb=fakeArray[bp];
            let partToPartDist=Math.hypot((aa.x-bb.x),(aa.y-bb.y))
            if (partToPartDist<aa.r+bb.r){
                if (aa.x < bb.x && aa.y<bb.y) {
                    aa.x-=bb.r*(Math.abs(aa.x-bb.x)/partToPartDist);
                    aa.y-=bb.r*(Math.abs(aa.y-bb.y)/partToPartDist);
                    if(bb.x>=cnvX-aa.r*(Math.abs(aa.x-bb.x)/partToPartDist)-1){
                        bb.x=cnvX-bb.r-1;
                    }else{
                        bb.x+=aa.r*(Math.abs(aa.x-bb.x)/partToPartDist);
                    }
                    if(bb.y>=cnvY-aa.r*(Math.abs(aa.y-bb.y)/partToPartDist)-1){
                        bb.y=cnvY-bb.r-1;
                    }else{
                        bb.y+=aa.r*(Math.abs(aa.y-bb.y)/partToPartDist);
                    }
                    if(bb.r>=2*aa.r){
                        aa.sy=-1*Math.abs(aa.sy);
                        aa.sx=-1*Math.abs(aa.sx);
                    }else if(aa.r>=2*bb.r){
                        bb.sy=Math.abs(bb.sy);
                        bb.sx=Math.abs(bb.sx);
                    }else{ 
                        bb.sy=Math.abs(bb.sy);
                        bb.sx=Math.abs(bb.sx);
                        aa.sy=-1*Math.abs(aa.sy);
                        aa.sx=-1*Math.abs(aa.sx);
                    }
                }
                if (aa.x > bb.x && aa.y<bb.y) {
                    aa.x+=bb.r*(Math.abs(aa.x-bb.x)/partToPartDist);
                    aa.y-=bb.r*(Math.abs(aa.y-bb.y)/partToPartDist);
                    if(bb.x<=aa.r*(Math.abs(aa.x-bb.x)/partToPartDist)+1){
                        bb.x=bb.r+1;
                    }else{bb.x -= aa.r*(Math.abs(aa.x-bb.x)/partToPartDist);}
                    if(bb.y>=cnvY-aa.r*(Math.abs(aa.y-bb.y)/partToPartDist)-1){
                        bb.y=cnvY-bb.r-1;
                    }else{bb.y += aa.r*(Math.abs(aa.y-bb.y)/partToPartDist);
                    }
                    if(bb.r>=2*aa.r){
                        aa.sy=-1*Math.abs(aa.sy);
                        aa.sx=Math.abs(aa.sx);
                    }else if(aa.r>=2*bb.r){
                        bb.sy=Math.abs(bb.sy);
                        bb.sx=-1*Math.abs(bb.sy);
                    }else{
                        bb.sy=Math.abs(bb.sy);
                        bb.sx=-1*Math.abs(bb.sy);
                        aa.sy=-1*Math.abs(aa.sy);
                        aa.sx=Math.abs(aa.sx);
                    }
                }
                if (aa.x > bb.x && aa.y>bb.y) {
                    aa.y+=bb.r*(Math.abs(aa.y-bb.y)/partToPartDist);
                    aa.x+=bb.r*(Math.abs(aa.x-bb.x)/partToPartDist);
                    if(bb.x<=aa.r*(Math.abs(aa.x-bb.x)/partToPartDist)+1){
                        bb.x=bb.r+1;
                    }else{
                        bb.x -= aa.r*(Math.abs(aa.x-bb.x)/partToPartDist);
                    }
                    if(bb.y<=aa.r*(Math.abs(aa.y-bb.y)/partToPartDist)+1){
                        bb.y=bb.r+1;
                    }else{
                        bb.y -= aa.r*(Math.abs(aa.y-bb.y)/partToPartDist);
                    } 
                    if(bb.r>=2*aa.r){
                        aa.sy=Math.abs(aa.sy);
                        aa.sx=Math.abs(aa.sx);
                    }else if(aa.r>=2*bb.r){
                        bb.sy=-1*Math.abs(bb.sy);
                        bb.sx=-1*Math.abs(bb.sx);
                    }else{
                        bb.sy=-1*Math.abs(bb.sy);
                        bb.sx=-1*Math.abs(bb.sx);
                        aa.sy=Math.abs(aa.sy);
                        aa.sx=Math.abs(aa.sx);
                    }
                }
                if (aa.x < bb.x && aa.y>bb.y) {
                    aa.x-=bb.r*(Math.abs(aa.x-bb.x)/partToPartDist);
                    aa.y+=bb.r*(Math.abs(aa.y-bb.y)/partToPartDist);
                    if(bb.x>=cnvX-aa.r*(Math.abs(aa.x-bb.x)/partToPartDist)-1){
                        bb.x=cnvX-bb.r-1;
                    }else{
                        bb.x += aa.r*(Math.abs(aa.x-bb.x)/partToPartDist);
                    }
                    if(bb.y<=aa.r*(Math.abs(aa.y-bb.y)/partToPartDist)+1){
                        bb.y=bb.r+1;
                    }else{
                        bb.y -= aa.r*(Math.abs(aa.y-bb.y)/partToPartDist);
                    }
                    if(bb.r>=2*aa.r){
                        aa.sy=Math.abs(aa.sy);
                        aa.sx=-1*Math.abs(aa.sx);
                    }else if(aa.r>=2*bb.r){
                        bb.sy=-1*Math.abs(bb.sy);
                        bb.sx=Math.abs(bb.sx);
                    }else{
                        bb.sy=-1*Math.abs(bb.sy);
                        bb.sx=Math.abs(bb.sx);
                        aa.sy=Math.abs(aa.sy);
                        aa.sx=-1*Math.abs(aa.sx);
                    }
                }
            }
        }
    } 

}

//Best Loop!!
function Upd() {
    window.requestAnimationFrame(Upd);
    context.clearRect(0, 0, cnvX, cnvY);
    moveCursor();
    updateFake();
    partSelfSense();
}


cloneFake();
Upd();