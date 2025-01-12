<template>
    <div class="absolute *:*:px-2 *:*:py-1 flex flex-col bg-black w-64 text-white p-2 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" id="contextMenu">
        <div>
            <div><span>View</span></div>
            <div><span>Sort By</span></div>
            <div><span>Refresh</span></div>
        </div>
        <div>
            <span>Next desktop background</span>
            <span>New</span>
        </div>
        <div>
            <span>Display Settings</span>
            <span>Personalize</span>
        </div>
        <div>
            <span>Open in Terminal</span>
        </div>
    </div>
</template>

<style lang="scss">
#contextMenu {
    background-color: #222222E4;
    backdrop-filter: blur(10px);
    border-radius: 10px;
    z-index: 100;
    & > div {
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #FFFFFF40;
        div:hover {

            background-color: #FFFFFF40;
            border-radius: 4px;
        }
    }
    & > :last-child {
        border-bottom: 0;
    }
}
</style>