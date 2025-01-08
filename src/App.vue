<script setup>
import { useMouse, usePointer, useMousePressed } from '@vueuse/core'
const { x, y } = usePointer()
const { pressed } = useMousePressed()

// clock
const clock = () => {
  const date = new Date()
  document.getElementById('date').firstChild.innerHTML = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  document.getElementById('date').lastChild.innerHTML = date.toLocaleDateString([], { day: 'numeric', month: 'numeric', year: 'numeric' })
}
setInterval(clock, 3000)

function drawSelection() {
  const desktop = document.getElementById('desktop');
  if (document.getElementById('selection')) {
    desktop.removeChild(document.getElementById('selection'));
  }
  let selection = document.createElement('div');
  const initialX = x.value;
  const initialY = y.value;
  selection.style.position = 'absolute';
  selection.style.left = initialX + 'px';
  selection.style.top = initialY + 'px';
  selection.style.border = '1px solid rgba(0, 102, 204, 1)';
  selection.style.backgroundColor = 'rgba(0, 120, 215, 0.1)';
  desktop.appendChild(selection);
  let interval = setInterval(() => {
    if (pressed.value) {
      if (x.value < initialX) {
        selection.style.left = x.value + 'px';
        selection.style.width = initialX - x.value + 'px';
      } else {
        selection.style.left = initialX + 'px';
        selection.style.width = x.value - initialX + 'px';
      }
      if (y.value < initialY) {
        selection.style.top = y.value + 'px';
        selection.style.height = initialY - y.value + 'px';
      } else {
        selection.style.top = initialY + 'px';
        selection.style.height = y.value - initialY + 'px';
      }
    } else {
      desktop.removeChild(selection);
      clearInterval(interval);
    }
  }, 16);
}
function dateExpand() {
  const date = document.getElementById('date');
  let time = (new Date()).toLocaleDateString();
  let panel = document.createElement('div');
  panel.style.position = 'absolute';
  panel.style.right = '0';
  panel.style.bottom = '60px';
  panel.style.backgroundColor = '#222222DF';
  panel.style.width = '200px';
  panel.style.height = '100px';
  panel.style.borderRadius = '10px';
  panel.style.padding = '10px';
  panel.style.zIndex = '100';
  panel.innerHTML = time;
  date.appendChild(panel);
  // if mouse hovers outside the panel, remove the panel
  date.addEventListener('mouseleave', () => {
    date.removeChild(panel);
  });
}
</script>

<template>
  <div class="h-full w-full" id="desktop" @mousedown="drawSelection">
  </div>
  <div class="w-screen glass" id="taskbar">
    <div class="flex flex-row h-full justify-end align-middle">
        <div class="my-1 px-2 text-white flex flex-col justify-center text-end min-w-max text-xs rounded-md bg-transparent hover:bg-[#FFFFFF10]" id="date" @mouseenter="dateExpand()">
          <span>{{ (new Date()).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}) }}</span>
          <span>{{ (new Date()).toLocaleDateString([], {day: 'numeric', month: 'numeric', year: 'numeric'}) }}</span>
      </div>
    </div>
  </div>
</template>

<style>
#taskbar {
  position: absolute;
  bottom: 0;
  height: 48px;
  background-color: #222222FE;
  backdrop-filter: blur(200px);
  /* padding: 6px; */
}   
</style>