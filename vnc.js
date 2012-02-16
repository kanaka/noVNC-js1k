// TODO:
// - mouse drag
// - mouse middle,right,wheel (suppress default behavior)
// - special key 0xff00 translation
// - cross-browser
// - close alert
b.style.margin=r=s=v=0;
Q=[];
Z=255;
S=new(window.MozWebSocket||WebSocket)(location.hash.slice(1),'base64');

// A(d,e,f,g,h) -> concat shorts onto array d
A=function(d,e,f,g,h){return e+1?A(d.concat(e>>8,e&Z),f,g,h):d};

// B(array,e) -> peek short from array starting at position e
B=function(d,e,f,g,h){return (d[e]<<8)+d[e+1]};

// C(array/string) -> send array or string via websocket
C=function(d,e,f,g,h){return d.map?C(d.map(E).join('')):S.send(btoa(d))};

// D(character) -> return character code
D=function(d,e,f,g,h){return d.charCodeAt(0)};

// E(number) -> return character for number code
E=function(d,e,f,g,h){return String.fromCharCode(d)};

// F() -> send FBU request
F=function(d,e,f,g,h){return C(A([3,v],0,0,W,H)),v=1};
//
// V(event.type==ke[y]press) -> onkeypress
// V(event.type==ke[y]press,down) -> send key event
// V(event.type==mo[u]sedown) -> send mousedown event
// V(event.type==mo[u]seup) -> send mouseup event
// V(event.type==mo[u]semove) -> send mouse move event
M=function(d,e,f,g,h){return T=d.type,C(A([5,T[5]=='d'?1:0],d.pageX,d.pageY))};
K=function(d,e,f,g,h){return T=d.which,C(A([4,1],0,0,T).concat(A([4,0],0,0,T)))};
// RFB/VNC handshake
R=function(d,e,f,g,h){
    //if (d.length < 30) { console.log('d (' + d.length + '): ' + d);
    //} else { console.log('d[0..30] (' + d.length + '): ' + d.slice(0,30)) }
    return s==2 ? (
        W=c.width=B(d,0),H=c.height=B(d,2),
        console.log('Connected: width ' + W + ' height ' + H),
        onkeypress=K,
        onmousedown=onmouseup=onmousemove=M,
        setInterval(F,Z))
        : 0,
    s<3 ? C(['RFB 003.003\n',[1],A([2,0],1,0,0)][s++])
        : G(Q.push.apply(Q,d));
};

// Normal VNC message. Length of Q in d
G=function(d,e,f,g,h){
    t = Q[0];
    if (!r) {
        l = [20,1,2,8+B(Q,6)][t];
        if (d<l) return;
        if (t==0) r=B(Q,2),l=4;
        //if (t==0) console.log('new FBU, rects: ' + r);
        Q.splice(0,l)
    }
    for(;r;r--) {
        // Process it
        w=B(Q,4),h=B(Q,6);
        l = 12+4*w*h;
        //console.log('Q.length: ' + Q.length + ' size: 12 + 4*' + w + 'x' + h + '=' + (12 + 4*w*h));
        if (!l||Q.length<l) break;
        //console.log('w:' + w);
        I=a.createImageData(w,h);
        z=I.data;
        //console.log('Drawing image ' + w + 'x' + h);
        for (i=0,j=12; j<l; i+=4,j+=4) {
            for (k=0;k<3;k++) z[i+k]=Q[j+2-k];
            z[i+3] = Z; // Set Alpha
        }
        a.putImageData(I,B(Q,0),B(Q,2));
        Q.splice(0,l)
    }
};

S.onmessage=function(d,e,f,g,h){return R([].map.call(atob(d.data),D))};
S.onclose=function(d,e,f,g,h){return console.log('closed: ' + a.code + ', ' + a.reason); }
