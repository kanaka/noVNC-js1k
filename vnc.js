//for(i in a){a[i[0]+i[7]]=a[i]}
b.style.margin=r=s=v=0;
Q=u=[];
O=255;
S = new WebSocket("ws://"+location.search.slice(1),"base64");
// S.send, peek short, or push short depending on arguments
P=function(a,b,c) {
    //console.log("P: " + a.slice(0,5) + "... (" + b + "," + c + ")");
    //if (!(c+1) && !(b+1)) console.log("Sending: " + a);
    return (c+1 ? a.concat(b>>8,b&O,c>>8,c&O) : b+1 ? (a[b]<<8)+a[++b] : S.send(btoa(a.pop ? a.map(function(x) {return String.fromCharCode(x)}).join("") : a)))
};
U=function(d,e) {P(d+1 ? [4,d,0,0,0,0,0,e.which] : [3,v].concat(u));v=1}
S.onmessage = function (e) {
    q = [].map.call(atob(e.data),function(x){return x.charCodeAt(0)});
    //if (q.length < 30) { console.log("q (" + q.length + "): " + q);
    //} else { console.log("q[0..30] (" + q.length + "): " + q.slice(0,30)) }
    if (s==2) {
        w = c.width = P(q,0);
        h = c.height = P(q,2);
        console.log("Connected: width " + w + " height " + h);
        u = P([0,0,0,0],w,h);
        setInterval(U,O);
            //setTimeout(function(){U();}, 200);
        onmousedown=onmouseup=onmousemove=onkeypress=function(e) {e.type=="keypress" ? (U(1,e),U(0,e)) : P(P([5,e.type=="mousedown"?1:0],e.x,e.y))}
    }
    if (s<3) {
        P(["RFB 003.003\n",[1],[2,0,0,1,0,0,0,0]][s++])
    } else {
        L = Q.push.apply(Q,q);
        t = Q[0];
        if (!r) {
            l = [20,1,2,8+P(Q,6)][t];
            if (L<l) return;
            if (t==0) r=P(Q,2),l=4;
            //if (t==0) console.log("new FBU, rects: " + r);
            Q.splice(0,l)
        }
        for(;r;r--) {
            // Process it
            w=P(Q,4),h=P(Q,6);
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
            a.putImageData(I,P(Q,0),P(Q,2));
            Q.splice(0,l)
        }
    }
}
