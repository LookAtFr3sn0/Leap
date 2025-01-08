<script setup>
import { useMouse, usePointer, useMousePressed } from '@vueuse/core'
const { x, y } = usePointer()
const { pressed } = useMousePressed()
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
// clock
const clock = () => {
  const date = new Date()
  document.getElementById('date').children[0].innerHTML = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  document.getElementById('date').children[1].innerHTML = date.toLocaleDateString([], { day: 'numeric', month: 'numeric', year: 'numeric' })
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
  }, 16);
  desktop.addEventListener('mouseup', () => {
    desktop.removeChild(selection);
    clearInterval(interval);
  });
}
function dateExpand() {
  const datePanel = document.getElementById('date');
  let date = new Date();
  let panel = document.createElement('div');
  panel.id = 'datePanel';
  panel.style.position = 'absolute';
  panel.style.right = '0';
  panel.style.bottom = '60px';
  panel.style.backgroundColor = '#222222DF';
  panel.style.borderRadius = '6px';
  panel.style.padding = '10px';
  panel.style.zIndex = '100';
  panel.innerHTML = '<div class="flex flex-col text-start gap-4"><span>' + weekday[date.getDay()] + ', ' + month[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + '</span><span>' + date.toLocaleTimeString([], {weekday: 'short',hour: 'numeric', minute: '2-digit'}) + ' (Local time)</span></div>';
  datePanel.appendChild(panel);
  panel = document.getElementById('datePanel');
  // if mouse hovers outside the panel, remove the panel
  let interval = setInterval(() => {
    date = new Date();
    panel.innerHTML = '<div class="flex flex-col text-start gap-4"><span>' + weekday[date.getDay()] + ', ' + month[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + '</span><span>' + date.toLocaleTimeString([], {weekday: 'short', hour: 'numeric', minute: '2-digit'}) + ' (Local time)</span></div>';
  }, 3000);
  datePanel.addEventListener('mouseleave', () => {
    datePanel.removeChild(panel);
    clearInterval(interval);
  });
}
</script>

<template>
  <div class="h-full w-full" id="desktop" @mousedown="drawSelection">
  </div>
  <div class="w-screen glass" id="taskbar">
    <div class="flex flex-row h-full justify-end align-middle *:text-white *:rounded-md *:bg-transparent *:text-xs *:my-1 *:px-2 *:justify-center hover:*:bg-[#FFFFFF0C]">
      <div class="mr-3 flex flex-col text-end min-w-max" id="date" @mouseenter="dateExpand()">
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
#date {
  font-weight: 600;
  font-size: 9pt;
}
</style>