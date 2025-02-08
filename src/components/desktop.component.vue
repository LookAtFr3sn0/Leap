<script setup>
import { usePointer } from '@vueuse/core'
import Welcome from './welcome.component.vue'
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
  selection.style.zIndex = 0;
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
  }, 12);

  const onMouseUp = () => {
    desktop.removeChild(selection);
    clearInterval(interval);
  }

  desktop.addEventListener('mouseup', onMouseUp, { once: true });
}
</script>

<template>
  <div class="w-full gap-x-1" id="desktop" @mousedown.self="drawSelection()">
    <Welcome class="absolute left-[80%] top-[25%] -translate-x-1/2 -translate-y-1/2 z-10" />
    <div class="app col-start-2 row-start-3">
      <img src="/assets/icons/notepad.svg" class="">
      <span>Bio.txt</span>
    </div>
    <div class="app col-start-1 row-start-3">
      <img src="/assets/icons/notepad.svg" class="">
      <span>Resume.txt</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#desktop {
  width: 100%;
  height: calc(100% - 48px);
  display: grid;
  gap: 0;
  grid-template-rows: repeat(auto-fill, 120px 120px);
  grid-template-columns: repeat(auto-fill, 86px 86px);
  background-image: url('/assets/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>