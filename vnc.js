// TODO:
// - mouse drag
// - mouse middle,right,wheel (suppress default behavior)
// - special key 0xff00 translation
// - cross-browser
// - close alert
b.style.margin=r=s=v=0;
Q=[];
O=255;
S=new(window.MozWebSocket||WebSocket)("ws://"+location.search.slice(1),"base64");
// F(event.type==ke[y]press) -> onkeypress
// F(event.type==ke[y]press,down) -> send key event
// F(event.type==mo[u]sedown) -> send mousedown event
// F(event.type==mo[u]seup) -> send mouseup event
// F(event.type==mo[u]semove) -> send mouse move event
// F(array,b,c) -> push shorts b and c
// F(array,b) -> peek short array[b]<<8+array[b+1]
// F(array) -> send array via websocket
// F(string,-1) -> send string via websocket
// F(character) -> return charCodeAt(0)
// F(number) -> return fromCharCode(number)
// F() -> send FBU request
F=function(a,b,c) {
    a=a?a:NaN;
    t=(T=a.type)?T[2]:0;
//    t=='y'?
//                b+1? console.log("F: " + "send keypress") : console.log("F: " + "onkeypress")
//            :t=='u'? console.log("F: " + "onmouse*")
//            //:t=='s'? "onmessage"
//            :a.pop?
//                c+1? console.log("F: " + "push shorts")
//                :b+1? console.log("F: " + "peek short")
//                //: F(a.map(function(x) {return String.fromCharCode(x)}).join(""),-1)
//                : console.log("F: " + "send array")
//            :b<0? console.log("F: " + "send string")
//            :a[0]? null
//            :b+1? null
//            : console.log("F: " + "send FBU request");
    return t=='y'?
                b+1? F(F([4,b,0,0],0,a.which)) : (F(a,1),F(a,0))
            :t=='u'? F(F([5,T[5]=="d"?1:0],a.pageX,a.pageY))
            :a.pop?
                c+1? a.concat(b>>8,b&O,c>>8,c&O)
                :b+1? (a[b]<<8)+a[b+1] 
                //: F(a.map(function(x) {return String.fromCharCode(x)}).join(""),-1)
                : F(a.map(F).join(""),-1)
            :b<0? S.send(btoa(a))
            :a[0]? a.charCodeAt(0)
            :b+1? String.fromCharCode(a)
            :(F([3,v].concat(u)),v=1)
}
S.onmessage = function (e) {
    q = [].map.call(atob(e.data),F);
    //if (q.length < 30) { console.log("q (" + q.length + "): " + q);
    //} else { console.log("q[0..30] (" + q.length + "): " + q.slice(0,30)) }
    if (s==2) {
        w = c.width = F(q,0);
        h = c.height = F(q,2);
        console.log("Connected: width " + w + " height " + h);
        u = F([0,0,0,0],w,h);
        setInterval(F,O);
            //setTimeout(F, 200);
        onmousedown=onmouseup=onmousemove=onkeypress=F;
    }
    if (s<3) {
        F(["RFB 003.003\n",[1],[2,0,0,1,0,0,0,0]][s++],-1)
    } else {
        L = Q.push.apply(Q,q);
        t = Q[0];
        if (!r) {
            l = [20,1,2,8+F(Q,6)][t];
            if (L<l) return;
            if (t==0) r=F(Q,2),l=4;
            //if (t==0) console.log("new FBU, rects: " + r);
            Q.splice(0,l)
        }
        for(;r;r--) {
            // Process it
            w=F(Q,4),h=F(Q,6);
            l = 12+4*w*h;
            //console.log("Q.length: " + Q.length + " size: 12 + 4*" + w + "x" + h + "=" + (12 + 4*w*h));
            if (!l||Q.length<l) break;
            //console.log("w:" + w);
            I=a.createImageData(w,h);
            z=I.data;
            //console.log("Drawing image " + w + "x" + h);
            for (i=0,j=12; j<l; i+=4,j+=4) {
                for (k=0;k<3;k++) z[i+k]=Q[j+2-k];
                z[i+3] = O; // Set Alpha
            }
            a.putImageData(I,F(Q,0),F(Q,2));
            Q.splice(0,l)
        }
    }
}
S.onclose = function (e) { console.log("closed: " + e.code + ", " + e.reason); }
