<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePointer } from '@vueuse/core'
import Welcome from './welcome.component.vue'
import AppWindow from './appWindow.component.vue'

const { x, y } = usePointer();
const router = useRouter();
const AppOpened = ref('');

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
    const apps = document.getElementsByClassName('app');
    for (const app of apps) {
      const appRect = app.getBoundingClientRect();
      const selectionRect = selection.getBoundingClientRect();
      if (appRect.left < selectionRect.right && appRect.right > selectionRect.left && appRect.top < selectionRect.bottom && appRect.bottom > selectionRect.top) {
        app.classList.add('app-selected');
      } else {
        app.classList.remove('app-selected');
      }
    };
  }, 12);

  const onMouseUp = () => {
    desktop.removeChild(selection);
    clearInterval(interval);
  }

  desktop.addEventListener('mouseup', onMouseUp, { once: true });
}

function appSelect(event) {
  const selected = document.getElementsByClassName('app-selected');
  for (const app of selected) {
    app.classList.remove('app-selected');
  }
  var app
  if (event.target.classList.contains('app')) {
    app = event.target;
  }
  else {
    app = event.target.parentElement;
  }
  app.classList.add('app-selected');
}

function appOpen(appName) {
  const selected = document.getElementsByClassName('app-selected');
  for (const app of selected) {
    app.classList.remove('app-selected');
  }
  AppOpened.value = appName;
  router.push('/' + appName);
}

</script>

<template>
  <div class="w-full gap-x-1" id="desktop" @mousedown.self="drawSelection()">
    <Welcome class="absolute left-[80%] top-[25%] -translate-x-1/2 -translate-y-1/2 z-10" />
    <AppWindow v-if="AppOpened" @appClose="AppOpened = ''" id="appWindow"/>
    <div class="app row-start-1 col-start-1 hover:app-selected" id="bio" @click="appSelect" @dblclick="appOpen('projects')">
      <img src="/assets/icons/notepad.svg" alt="notepad">
      <span>Projects</span>
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
  background-image: url('/assets/background.avif');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>