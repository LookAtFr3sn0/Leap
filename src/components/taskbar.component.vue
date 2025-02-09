<script setup>
const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
var isBatterySupported = 'getBattery' in navigator;
var batteryLevel;
if (isBatterySupported) {
  navigator.getBattery().then(battery => {
    batteryLevel = battery.level * 100;
    battery.addEventListener('levelchange', () => {
      batteryLevel = battery.level * 100;
    });
  });
}

const clock = () => {
  const date = new Date()
  document.getElementById('date').children[0].innerHTML = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  document.getElementById('date').children[1].innerHTML = date.toLocaleDateString([], { day: 'numeric', month: 'numeric', year: 'numeric' })
}
setInterval(clock, 3000)

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
    <div class="w-screen" id="taskbar">
        <div class="flex flex-row h-full justify-end align-middle *:text-white *:rounded-md *:bg-transparent *:text-xs *:my-1 *:justify-center">
            <div class="flex gap-1 mx-auto hover:*:bg-[#FFFFFF0C] *:rounded-md" id="icons">
                <img class="p-2 my-auto h-full" src="/assets/icons/Windows.svg" alt="Start menu">
                <img class="p-2 my-auto h-full" src="/assets/icons/Firefox.svg" alt="Firefox">
                <img class="p-2 my-auto h-full" src="/assets/icons/vscode.svg" alt="vscode">
            </div>
            <div class="flex px-1 hover:bg-[#FFFFFF0C]">
                <span class="material-symbols-outlined my-auto">keyboard_arrow_up</span>
            </div>
            <div class="flex *:text-[16px] *:my-auto px-2 gap-[8px] hover:bg-[#FFFFFF0C]">
                <span class="material-symbols-outlined">wifi</span>
                <span class="material-symbols-outlined">volume_up</span>
                <span class="material-symbols-outlined" v-if="batteryLevel && batteryLevel < 100 && batteryLevel >= 80">battery_full_alt</span>
                <span class="material-symbols-outlined" v-else-if="batteryLevel && batteryLevel < 80 && batteryLevel >= 60">battery_horiz_075</span>
                <span class="material-symbols-outlined" v-else-if="batteryLevel && batteryLevel < 60 && batteryLevel >= 30">battery_horiz_050</span>
                <span class="material-symbols-outlined" v-else-if="batteryLevel && batteryLevel < 30 && batteryLevel >= 10">battery_low</span>
                <span class="material-symbols-outlined" v-else-if="batteryLevel && batteryLevel < 30 && batteryLevel >= 10">battery_horiz_000</span>
            </div>
            <div class="mr-3 flex flex-col text-end min-w-max px-2 hover:bg-[#FFFFFF0C]" id="date" @mouseenter="dateExpand()">
                <span>{{ (new Date()).toLocaleTimeString([], {hour: 'numeric', minute: '2-digit'}) }}</span>
                <span>{{ (new Date()).toLocaleDateString([], {day: 'numeric', month: 'numeric', year: 'numeric'}) }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
#taskbar {
    position: absolute;
    bottom: 0;
    height: 48px;
    background-color: #222222FE;
    backdrop-filter: blur(200px);
    z-index: 100;
    /* padding: 6px; */
  }
  #taskbar .clicked {
    color: #FFFFFF0C;
    background-color: #FFFFFF0A;
  }
  #date {
    font-weight: 600;
    font-size: 9pt;
  }
  #icons {
    margin-left: 50%;
    transform: translateX(-50%);
  }
</style>