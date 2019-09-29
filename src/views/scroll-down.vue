<style lang="less" scoped>
    @import '../style/utils';

    .scroll-down {
        .animation(10s ease-out 0s 1 appear);

        z-index: 102;
        position: absolute;
        width: 110px;
        height: 90px;
        left: 50%;
        margin-left: -110px / 2;
        bottom: 10px;
        overflow: hidden;

        a {
            padding-top: 60px;
            display: inline-block;
            text-decoration: none;
            font-weight: bold;

            .transition(color .3s, opacity .6s;);

            &:hover {
                opacity: .65;
            }

            span {
                position: absolute;
                top: 0;
                left: 50%;
                width: 30px;
                height: 50px;
                margin-left: -15px;
                border-color: #fff;
                border-width: 2px;
                border-style: solid;
                border-radius: 50px;
                box-sizing: border-box;

                .transition(border-color .3s);

                &::before {
                    position: absolute;
                    top: 10px;
                    left: 50%;
                    content: '';
                    width: 6px;
                    height: 6px;
                    margin-left: -3px;
                    background-color: #fff;
                    border-radius: 100%;
                    box-sizing: border-box;

                    .animation(scroll 2s infinite);
                    .transition(background-color .3s);
                }
            }
        }

        @keyframes appear {
            0% {
                transform: translateY(-20px);
                opacity: 0;
            }
            80% {
                transform: translateY(-20px);
                opacity: 0;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }

        @-webkit-keyframes appear {
            0% {
                -webkit-transform: translateY(-20px);
                opacity: 0;
            }
            80% {
                -webkit-transform: translateY(-20px);
                opacity: 0;
            }
            100% {
                -webkit-transform: translateY(0);
                opacity: 1;
            }
        }

        @-webkit-keyframes scroll {
            0% {
                -webkit-transform: translate(0, 0);
                opacity: 0;
            }
            40% {
                opacity: 1;
            }
            80% {
                -webkit-transform: translate(0, 20px);
                opacity: 0;
            }
            100% {
                opacity: 0;
            }
        }

        @keyframes scroll {
            0% {
                transform: translate(0, 0);
                opacity: 0;
            }
            40% {
                opacity: 1;
            }
            80% {
                transform: translate(0, 20px);
                opacity: 0;
            }
            100% {
                opacity: 0;
            }
        }
    }
</style>

<script>
    export default {
        methods: {
            scrollDown() {
                this.$skrollr.animateTo(
                    window.innerHeight - 80 /* header bar height */,
                    {
                        duration: 2000,
                        easing: 'swing'
                    }
                )
            }
        }
    }
</script>

<template>
    <div class="scroll-down" data-0="bottom: 10px" data-90="bottom: -90px">
        <a href="#" @click.prevent="scrollDown">
            <span></span>
            scroll down
        </a>
    </div>
</template>
