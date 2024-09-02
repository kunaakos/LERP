## UPDATE

This is an abandoned project, because the [Web Bluetooth API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API) is still in its infancy, and support has regressed since I started the project. It did tick every box I wanted it to, but I never got around to cleaning up the code. Might dust this off once the Bluetooth API matures - if it ever does.

# LERP

...is short for Lego REmote Project! A browser app that connects to various Lego bluetooth hubs using [node-poweredup](https://github.com/nathankellenicki/node-poweredup) controls connected devices using a UI that you create using the WYSWYG editor.

Contrary to the approach taken by LEGO apps, this allows you to create custom controls for any LEGO build and allows you to use multiple hubs at once.

It also provides a **simple** josytick control for tracked vehicles. It emulates how joystick controls work for cars in video games, but it also allows you to spin the vehicle around its axis while it's not moving forward or backwards. Difficult to explain, fully intuitive to use.

The app is a POC, and work(s/ed) [as seen here](https://photos.google.com/share/AF1QipOujeyrya8FWCSCX_WGrFERaHA2qyC7hn782WWnPW8J-p6XTaWVRg2MzOHjzGmRdg/photo/AF1QipOjn4wz1iMhKEHYFZgIi77jRg0UfZglyswCW0rl?key=TXI1RDR6NmdJLU9sbzB6dWpvOXVNQ29obWRWRG9R).

This was designed with handheld devices in mind. The remote is currently a fixed 16/9 aspect ratio in landscape orientation (because that's the most convenient layout on a smartphone).

I have only added support for devices that I had at hand, but adding support for anything that `node-poweredup` uses is pretty simple.
