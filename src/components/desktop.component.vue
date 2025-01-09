<script setup>
import { usePointer } from '@vueuse/core'
const { x, y } = usePointer()

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
  }, { once: true });
}
</script>

<template>
  <div class="h-full w-full" id="desktop" @mousedown="drawSelection()">
    
  </div>
</template>