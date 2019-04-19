<script src="../script/app.js"></script>

<style src="../style/app.less" lang="less"></style>

<template>
    <div id="main" :data-theme="theme">
        <header data-0="bottom: 0%;" data-500="bottom: 100%;">
            <div class="background">
                <div v-html="title"
                     class="title title-top"
                     data-0="margin-left: -450px"
                     data-500="margin-left: -400px"
                ></div>

                <div v-html="tagline"
                     class="tagline"
                     data-0="display: !block; opacity: 1; top: 182px; transform: rotateX(0deg) rotateZ(0deg);"
                     data-400="display: !none; opacity: 0; top: 165px; transform: rotateX(60deg) rotateZ(1.5deg);"
                ></div>

                <div v-html="title"
                     class="title title-bottom"
                     data-0="margin-left: -400px;"
                     data-500="margin-left: -450px;"
                ></div>

                <ul class="menu-foreground">
                    <li v-for="(item, i) in menu"
                        v-bind="getMenuItemDynamicSkrollrAttributes(i)"
                    >
                        <a v-html="item.label"
                           :href="item.link"
                           :data-theme="item.theme"
                           @click.prevent="currentMenuItem = item"
                        ></a>
                    </li>
                </ul>
            </div>
        </header>

        <div class="layer" data-100="top[sqrt]: 100px" data-end="top[sqrt]: -150px">
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="break"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="break"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
        </div>

        <div class="layer" data-100="top[sqrt]: 100px" data-end="top[sqrt]: -100px">
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="break"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="break"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
                <div class="hex"></div>
        </div>

        <div class="layer" data-100="top: 100px" data-end="top: -250px">
            <div class="break"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="break"></div>
            <div class="break"></div>
            <div class="hex"></div>
            <div class="break"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="break"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="hex"></div>
            <div class="break"></div>
            <div class="hex"></div>
        </div>

        <div v-html="content"
             ref="content"
             class="content"
             data-0="opacity: 0"
             data-400="opacity: 1"
        ></div>

        <footer v-html="footer"></footer>
    </div>
</template>
