<style src="./app.less" lang="less"></style>

<script>
    const MENU_HEIGHT = 100

    import skrollr from './skrollr'

    export default {
        data: () => ({
            title: 'schwarzkopfb',
            tagline: 'the guy who solves problems from CSS to NoSQL Database Clusters',

            menu: {
                about: '/about',
                projects: '/projects',
                'open source': '/open',
                team: '/team',
                contact: '/contact'
            }
        }),

        methods: {
            adjustContentTop() {
                this.$refs.content.style.marginTop = `${window.innerHeight + MENU_HEIGHT}px`
            },

            getMenuItemDynamicSkrollrAttributes(i) {
                return {
                    [ `data-${i * 35}` ]: 'top: 20px; opacity: 0; transform: rotateX(-60deg);',
                    [ `data-${i * 35 + 400}` ]: 'top: 0px; opacity: 1; transform: rotateX(0deg);'
                }
            }
        },

        mounted() {
            const s = skrollr.init({ forceHeight: false })

            this.adjustContentTop()

            // maybe we have to reload the whole page here (?) :(
            // because of dynamically generated skrollr attributes
            window.addEventListener('resize', () => this.adjustContentTop())
        }
    }
</script>

<template>
    <div id="main" data-content="about">
        <header data-0="bottom: 0%;" data-500="bottom: 100%;">
            <div class="background">
                <div class="title title-top"
                     data-0="margin-left: -450px"
                     data-500="margin-left: -400px"
                >
                    {{ title }}
                </div>

                <div class="tagline"
                     data-0="display: !block; opacity: 1; top: 182px; transform: rotateX(0deg) rotateZ(0deg);"
                     data-400="display: !none; opacity: 0; top: 165px; transform: rotateX(60deg) rotateZ(1.5deg);"
                >
                    {{ tagline }}
                </div>

                <div class="title title-bottom"
                     data-0="margin-left: -400px;"
                     data-500="margin-left: -450px;"
                >
                    {{ title }}
                </div>

                <ul class="menu-foreground">
                    <li v-for="(value, key, i) in menu" v-bind="getMenuItemDynamicSkrollrAttributes(i)">
                        <a :href="value">{{ key }}</a>
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

        <div ref="content" class="content" data-0="opacity: 0" data-400="opacity: 1">

            <h1>About</h1>

            <hr>

            <p>We Are Break is a NodeJS Dev Studio and Creative Research Lab. Our mission is to make the world a better place using cutting edge technology and unique user experiences.
            <p>Our methodology is to innovate beyond the well known and wrong schemes and creates products that change how we think, work and live. This applies even to the smallest website we create. Even to a simple search box. But also applies to large scale projects like reinventing business cards, or the entire education.</p>
            <p>We are a young, but experienced creative team. We see the world with the eyes of the current generation, and able to rethink the world and make something awesome. We do everything from websites to movies, the only rule is that we BREAK with the stereotypes and the wrong schemes.</p>

            <h2>Our history</h2>
            <p>Our history started with eTech-Studio Ltd. Founded more than 10 years ago, it was a Hungarian software development company working on large scale projects. We have founded We Are Break in 2013 as a division of the company.</p>
            <p>This way we have the required financial stability, software, hardware and long years of experience, whilst having a fresh team, with creative and innovative minds from the beginning.</p>

            <h2>Main Activity</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet at beatae blanditiis dolorem exercitationem in, laudantium libero nam natus neque numquam pariatur, quam, qui reiciendis rem sit soluta sunt?</p>

            <h2>Technologies We Use</h2>
            <p>
                Ennél kevésbé felsorolásosan. (Insert some töltelék...) + kellenek még menő szavak/kifejezések, mint REST API, JSON, non-sql, in-memory, high performance, automation, integrated, stb.
            <ul>
                <li>NodeJS, MongoDB, Redis <strike>and Memcached</strike></li>
                <li>Phonegap, <strike>NativeScript</strike><strong>(te egyáltalán kipróbáltad már?)</strong> and native mobile development</li>
                <li>HTML5, CSS3, JavaScript</li>
                <li>Windows Azure, cloud infrastructures and scalable applications</li>
            </ul>
            </p>
        </div>

        <footer>&copy; 2018 We Are Break</footer>
    </div>
</template>
