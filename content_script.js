// Find <video> element for seeking functionality
const videotags = document.getElementsByTagName('video');
const player = videotags[0]

// Find control bar element (lower part of UI)
const jwcontrolbar = document.querySelector('.jw-wrapper > .jw-controls');
const jwbackdrop = document.querySelector('.jw-wrapper > .jw-controls-backdrop');
// Find captions element
const jwcaptions = document.querySelector('.jw-wrapper > .jw-captions');

// Keep track of control bar hidden state
let barhidden = false;
// Keep track of captions hidden state
let captionshidden = false;

// Wind back 1 second if not at beginning
function windBack() {
  if(player.currentTime > 1) {
    player.currentTime -= 1;
  }
}

// Wind forward 1 second if not at end
function windForward() {
  if(player.currentTime < player.duration - 1) {
    player.currentTime += 1;
  }
}

function runContentScript() {
  // Listen for keypresses
  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    // On right arrow, wind 1 second forward
    if (keyName === 'ArrowRight' && (!event.shiftKey)) {
      windForward();
    }
    // On left arrow, wind 1 second back
    else if (keyName === 'ArrowLeft' && (!event.shiftKey)) {
      windBack();
    }
    // On z, hide or show the UI
    else if (keyName === 'z') {
      if (barhidden) {
        jwcontrolbar.classList.remove('disappeared');
        jwbackdrop.classList.remove('disappeared');
        barhidden = false;
      }
      else {
        jwcontrolbar.classList.add('disappeared');
        jwbackdrop.classList.add('disappeared');
        barhidden = true;
      }
    }
    // On s, hide or show captions
    else if (keyName === 's') {
      if (captionshidden) {
        jwcontrolbar.classList.remove('disappeared');
        captionshidden = false;
      }
      else {
        jwcontrolbar.classList.add('disappeared');
        captionshidden = true;
      }
    }
  });
}

runContentScript();
