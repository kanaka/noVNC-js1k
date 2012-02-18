## noVNC-js1k: a VNC client in 1k of JavaScript


### Usage

The WebSocket URI is specified in the fragment identifier:
    
    http://example.com/vnc.html#ws://vncserver:5900


### What led you to this insanity?

In Feb of 2010 I started the
[noVNC](https://github.com/kanaka/noVNC) project which is a full
featured open source HTML5 VNC client.

In Sept 2010 I heard about the
[10K Apart](http://10k.aneventapart.com/) contest to do something
interesting in 10k of JavaScript. It was too late to submit an entry
for the contest but I was inspired to see if I could put noVNC on
a diet and reach the 10K size limit.
[Diet noVNC](https://github.com/kanaka/diet-noVNC) was the result.
Diet noVNC weighs in at just under 10K (after minification using
[packer](http://www.iteral.com/)). At the time, the full version of
noVNC was about 120K of Javascript.

After reducing noVNC by an order of magnitude (base 10), the obvious
next question is, "How much further is possible?". Okay, that may not
be such an obvious question, but in Feb 2012 I got wind that the
[JS1K](js1k.com) competition was running again and I wondered if it
was even feasible to create a browser based VNC client in just
1 kilobyte (technicaly 1 kibibyte) of Javascript.

As it turns out, it is possible and noVNC-js1k is the result.


### Caveats

noVNC-js1k (like Diet noVNC) is not intended to replace noVNC in any
sense. The amount of data sent via the VNC protocol in just a few
seconds can be orders of magnitude larger than the size of the full
noVNC client so the code size is really a non-issue in practice.

noVNC-js1k (even in the unminimized form) is definitely not an example
of good coding practices.

You will either need to use a VNC server that support WebSocket
connections (like recent versions of libvncserver/x11vnc) or you will
need to use [websockify](https://github.com/kanaka/websockify) to
bridge between the browser and your VNC server.

noVNC-js1k does not support password authentication (another reason
not to use it for anyting except experimentation). If you use
`vncserver` to start your VNC server, you may need to make a copy of
the script and comment out the `authType` seting near the beginning of
the script.


### Features

noVNC-js1k has the following limited functionality:

* Raw encoding
* Mouse movement and left mouse button clicks
* Keyboard input (some symbols are on the wrong keys)
* Encryption (wss://) support
* Works in Chrome and Firefox (any browser with native WebSocket
  support)


### Missing features (compared to noVNC)

The following features of the full noVNC are missing.

* User interface (WebSocket URI passed as fragment ID)
* VNC authentication (server must have password disabled)
* Other encodings (including no DesktopSize/resize)
* Colour mapped support (true-color only)
* Local cursor rendering
* Clipboard support

