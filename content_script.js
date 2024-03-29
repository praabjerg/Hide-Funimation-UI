// Find <video> element for seeking functionality
// const videotags = document.getElementsByTagName('video');
// const player = videotags[0]

// Find info text element (upper part of UI)
// const vjsdocktext = document.querySelector('#brightcove-player > .vjs-dock-text');
// Find control bar element (lower part of UI)
// const vjscontrolbar = document.querySelector('.vjs-control-bar');
// Keep track of UI hidden state
let hidden = false;


// Wind back 1 second if not at beginning
function windBack() {
  const player = document.getElementsByTagName('video')[0];
  if(player.currentTime > 1) {
    player.currentTime -= 1;
  }
}

// Wind forward 1 second if not at end
function windForward() {
  const player = document.getElementsByTagName('video')[0];
  if(player.currentTime < player.duration - 1) {
    player.currentTime += 1;
  }
}

function runContentScript() {
  // Listen for keypresses
  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    // On right arrow, wind 1 second forward
    if (keyName === 'PageDown' || keyName === 'ArrowDown') {
      windForward();
    }
    // On left arrow, wind 1 second back
    else if (keyName === 'PageUp' || keyName === 'ArrowUp') {
      windBack();
    }
    // On z, hide or show the UI
    else if (keyName === 'z') {
      if (hidden) {
        document.querySelector('.meta-overlay').classList.remove('disappeared');
        document.querySelector('.vjs-control-bar').classList.remove('disappeared');
        hidden = false;
      }
      else {
        document.querySelector('.meta-overlay').classList.add('disappeared');
        document.querySelector('.vjs-control-bar').classList.add('disappeared');
        hidden = true;
      }
    }
  });
}

runContentScript();
