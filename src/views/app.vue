<script src="../script/app.js"></script>

<style src="../style/app.less" lang="less"></style>

<template>
    <div>
        <div id="main" :data-theme="$router.page.theme">
        <header data-0="bottom: 0%;" data-500="bottom: 100%;">
            <div class="background">
                <div v-html="$router.page.title"
                     class="title title-top"
                     data-0="margin-left: -450px"
                     data-500="margin-left: -400px">
                 </div>

                <div v-html="$router.page.tagline"
                     class="tagline"
                     data-0="display: !block; opacity: 1; top: 182px; transform: rotateX(0deg) rotateZ(0deg);"
                     data-400="display: !none; opacity: 0; top: 165px; transform: rotateX(60deg) rotateZ(1.5deg);">
                 </div>

                <div v-html="$router.page.title"
                     class="title title-bottom"
                     data-0="margin-left: -400px;"
                     data-500="margin-left: -450px;">
                 </div>

                <ul class="menu-foreground">
                    <li v-for="(item, i) in menuItems"
                        v-bind="getMenuItemDynamicSkrollrAttributes(i)"
                        :key="item.title"
                    >
                        <nav-link :to="item.link"
                                  v-html="item.label"
                                  :data-theme="item.theme" />
                    </li>
                </ul>
            </div>

            <scroll-down />
        </header>

        <bg-layer />
        <bg-layer end="top[sqrt]: -100px" />
        <bg-layer end="top[sqrt]: -250px" />

        <div :style="{ marginTop: contentTop }"
             class="content"
             data-0="opacity: 0"
             data-400="opacity: 1"
        >
            <transition name="component-fade" mode="out-in">
                <component :is="$router.page.component" />
            </transition>
        </div>

        <footer v-if="$router.page.footer"
                v-html="content.footer"></footer>

        </div>
    </div>
</template>
