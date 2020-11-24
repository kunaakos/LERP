# LERP

... which is short for Lego REmote Project - and that's what this is! This browser app can be used to connect to various Lego bluetooth hubs using the brilliant [node-poweredup](https://github.com/nathankellenicki/node-poweredup) library and control connected devices using a UI that you create using the WYSWYG editor.

I started making this because the official LEGO apps are anything but flexible: you need specific apps for specific creations, and I couldn't find any that allowed you to control ANY wild creation you or your little buddies come up with. There are alternatives out there, but those weren't designed to be kid-friendly either.

One thing it already does pretty well is to provide a josytick control for tracked vehicles. This is more intuitive than the dual slider controls found in LEGO apps, which I found to annoy and confuse tiny kids and myself (looking at you Lego Batmobile and companion app). It emulates how joystick controls work for cars in video games, but allows you to spin the vehicle around its axis while it's not moving forward or backwards.

It also allows you to control devices connected to multiple hubs at once, which is pretty neat.

At this stage the app is very much a POC, but it does work [as seen here](https://photos.google.com/share/AF1QipOujeyrya8FWCSCX_WGrFERaHA2qyC7hn782WWnPW8J-p6XTaWVRg2MzOHjzGmRdg/photo/AF1QipOjn4wz1iMhKEHYFZgIi77jRg0UfZglyswCW0rl?key=TXI1RDR6NmdJLU9sbzB6dWpvOXVNQ29obWRWRG9R). You might run into hardcoded values, incomprehensible UX and reversed directions, you were warned. I'm aiming to create a UI without any text, so treat anything you see as a placeholder.

Not currently working on it, because I'm separated from my legos :( But will resume once I get them back. Be aware that this currently works in desktop browsers only, because of a bug in `node-poweredup` - it's okay on desktops, too, but it was designed with handheld devices in mind. The remote is currently a fixed 16/9 aspect ratio in landscape orientation (because that's the most convenient layout on a smartphone), but this will be configurable.

I have only added support for devices that I had at hand, but adding support for anything that `node-poweredup` uses is pretty simple. Will not add support for anything else until I figure out UX and some abstractions that are currently half-assed.
