<template>
    <div>
        <div class="home-main">
            <div class="content">
                <span>{{ allInfos[0].info_spanish_text }}</span>
                <h3>{{ allInfos[1].info_spanish_text }}</h3>
                <p>{{ allInfos[2].info_spanish_text }}</p>
                <router-link @click="scrollToTop()" to="/menu" class="btn">ordena ahora</router-link>
            </div>
            <div class="image">
                <img src="../assets/images/c.png" alt="" class="home-img">
            </div>
        </div>


        <div class="home-category">
            <router-link @click="scrollToTop()" :to="{ path: '/menu', query: { category: 'líquidos' } }" class="box">
                <img src="../assets/images/liquido-img.png" alt="">
                <h3>líquidos</h3>
            </router-link>

            <router-link @click="scrollToTop()" :to="{ path: '/menu', query: { category: 'postres' } }" class="box">
                <img src="../assets/images/postre-img.png" alt="">
                <h3>postres</h3>
            </router-link>

            <router-link @click="scrollToTop()" :to="{ path: '/menu', query: { category: 'principales' } }" class="box">
                <img src="../assets/images/principal-img.png" alt="">
                <h3>principales</h3>
            </router-link>

            <router-link @click="scrollToTop()" :to="{ path: '/menu', query: { category: 'entrantes' } }" class="box">
                <img src="../assets/images/entrante-img.png" alt="">
                <h3>entrantes</h3>
            </router-link>

            <router-link @click="scrollToTop()" :to="{ path: '/menu', query: { category: 'pastas' } }" class="box">
                <img src="../assets/images/pasta-img.png" alt="">
                <h3>pastas</h3>
            </router-link>

            <router-link @click="scrollToTop()" :to="{ path: '/menu', query: { category: 'panes' } }" class="box">
                <img src="../assets/images/pan-img.png" alt="">
                <h3>panes</h3>
            </router-link>
        </div>

        <div class="home-banner">
            <div class="grid-banner row">
                <div class="grid col-md-4">
                    <img src="../assets/images/dis-1.jpg" alt="">
                    <div class="content">
                        <span>especialidad</span>
                        <h3>guarniciones</h3>
                        <router-link @click="scrollToTop()" :to="{ path: '/menu', query: { category: 'guarniciones' } }" class="btn">ordenar ahora</router-link>
                    </div>
                </div>

                <div class="grid col-md-4">
                    <img src="../assets/images/dis-2.jpg" alt="">
                    <div class="content center">
                        <span>especialidad</span>
                        <h3>pizzas</h3>
                        <router-link @click="scrollToTop()" :to="{ path: '/menu', query: { category: 'pizzas' } }" class="btn">ordenar ahora</router-link>
                    </div>
                </div>

                <div class="grid col-md-4">
                    <img src="../assets/images/dis-3.jpg" alt="">
                    <div class="content">
                        <span>especialidad</span>
                        <h3>tacos</h3>
                        <router-link @click="scrollToTop()" :to="{ path: '/menu', query: { category: 'tacos' } }" class="btn">ordenar ahora</router-link>
                    </div>
                </div>

            </div>

        </div>

        <div class="home-about">
            <div class="image">
                <img src="../assets/images/about-img.jpg" alt="">
            </div>
            <div class="content">
                <span>{{ allInfos[3].info_spanish_text }}</span>
                <h3 class="title">{{ allInfos[4].info_spanish_text }}</h3>
                <p>{{ allInfos[5].info_spanish_text }}</p>
                <router-link @click="scrollToTop()" to="/about" class="btn">read more</router-link>

                <div class="icons-container">
                    <div class="icons">
                        <img src="../assets/images/serv-1.png" alt="">
                        <h3>entrega rápida</h3>
                    </div>
                    <div class="icons">
                        <img src="../assets/images/serv-2.png" alt="">
                        <h3>comida fresca</h3>
                    </div>
                    <div class="icons">
                        <img src="../assets/images/serv-3.png" alt="">
                        <h3>mejor calidad</h3>
                    </div>
                    <div class="icons">
                        <img src="../assets/images/serv-4.png" alt="">
                        <h3>soporte 24/7</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "Home",

    computed: {
        ...mapState(["allInfos"]),
    },

    methods: {
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    }
};
</script>

<style scoped>
.home-main,
.home-about,
.home-banner,
.home-category {
    padding: 2rem 9%;
}

.home-main {
    display: flex;
    align-items: center;
    flex-wrap: wrap-reverse;
    gap: 2rem;
    position: relative;
    overflow: hidden;
}

.home-main .content {
    flex: 1 1 41rem;
}

.home-main .content span {
    font-size: 2rem;
    color: #27ae60;
}

.home-main .content h3 {
    font-size: 4rem;
    color: #130f40;
    padding-top: 1rem;
}

.home-main .content p {
    font-size: 1.4rem;
    color: #666;
    line-height: 2;
    padding: 1rem 0;
}

.home-main .image {
    flex: 1 1 41rem;
    margin: 2rem 0;
    pointer-events: none;
}

.home-main .image .home-img {
    width: 100%;
    margin-top: 5rem;
}

.home-main .home-parallax-img {
    position: absolute;
    top: -15rem;
    right: -15rem;
    width: 80vw;

}


/* home category */
.home-category {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    gap: 1.5rem;
    padding-bottom: 5rem;
}

.home-category .box {
    padding: 2rem;
    text-align: center;
    border-radius: .5rem;
    background: #f7f7f7;
}

.home-category .box:hover {
    background: #27ae60;
}

.home-category .box:hover h3 {
    color: #fff;
}

.home-category .box img {
    height: 7rem;
}

.home-category .box h3 {
    font-size: 1.8rem;
    color: #130f40;
}


/* home banner */
.home-banner .row-banner {
    background: url(../assets/images/row-banner.png) no-repeat;
    height: 45rem;
    background-size: cover;
    background-position: center;
    position: relative;
}

.home-banner .row-banner .content {
    position: absolute;
    top: 50%;
    left: 7%;
    transform: translateY(-50%);
}

.home-banner .row-banner .content span {
    font-family: 'Satisfy', cursive;
    font-size: 4rem;
    color: #27ae60;
    color: #130f40;
}

.home-banner .row-banner .content h3 {
    font-size: 6rem;
    color: red;
    text-transform: uppercase;
}

.home-banner .row-banner .content p {
    font-size: 2rem;
    padding-bottom: 1rem;
}


.home-banner .grid-banner .grid {
    border-radius: 1rem;
    overflow: hidden;
    height: 45rem;
}

.home-banner .grid-banner .grid:hover img {
    transform: scale(1.2);
}

.home-banner .grid-banner .grid img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.home-banner .grid-banner .grid .content {
    position: absolute;
    top: 2rem;
    padding: 0 2rem;
}

.home-banner .grid-banner .grid .content.center {
    text-align: center;
    width: 100%;
}

.home-banner .grid-banner .grid .content.center span {
    color: #666;
}

.home-banner .grid-banner .grid .content.center h3 {
    color: #130f40;
}

.home-banner .grid-banner .grid .content span {
    font-size: 2.5rem;
    color: #fff;
}

.home-banner .grid-banner .grid .content h3 {
    font-size: 3rem;
    color: #fff;
    padding-top: .5rem;
}

.home-about {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 2rem;
    background: #f7f7f7;
}

.home-about .image {
    flex: 1 1 40rem;
}

.home-about .image img {
    width: 100%;
}

.home-about .content {

    flex: 1 1 40rem;
}

.home-about .content span {
    font-family: 'Satisfy', cursive;
    font-size: 3rem;
    color: #27ae60;
}

.home-about .content .title {
    font-size: 3rem;
    padding-top: .5rem;
    color: #130f40;
}

.home-about .content p {
    padding: 1rem 0;
    line-height: 2;
    font-size: 1.4rem;
    color: #666;
}

.home-about .content .icons-container {
    margin-top: 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.home-about .content .icons-container .icons {
    flex: 1 1 20rem;
    border-radius: .5rem;
    background: #fff;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
}

.home-about .content .icons-container .icons img {
    height: 4.5rem;
}

.home-about .content .icons-container .icons h3 {
    font-size: 1.7rem;
    color: #130f40;
}

@media (max-width: 768px) {
    #menu-btn {
        display: inline-block;
    }

    .home-main .home-parallax-img {
        top: 0;
        right: 0;
        width: 100%;
    }

    .home-banner .grid-banner .content h3 {
        font-size: 15px !important;
    }

    .home-banner .grid-banner .content.center {
        padding-left: 0px !important;
    }

}

@media (max-width: 576px) {
    .home-main .content h3 {
        font-size: 3rem;
    }

    .home-main .content p {
        font-size: 1.5rem;
    }
}
</style>




