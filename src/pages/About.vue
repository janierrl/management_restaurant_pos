<template>
    <section class="about-section">
        <div class="heading">
            <span>{{ allInfos[6].info_spanish_text }}</span>
            <h3>{{ allInfos[7].info_spanish_text }}</h3>
        </div>

        <div class="row">
            <div class="about-content">
                <div class="about-content-text">
                    <p>{{ allInfos[8].info_spanish_text }}</p>
                    <p>{{ allInfos[9].info_spanish_text }}</p>
                </div>
                <div class="map-container">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1094.6830327533353!2d-82.38490784260327!3d22.971462607150333!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88cd65f4fed0d7af%3A0x7b1f20d6e3930891!2sTanokura!5e0!3m2!1ses!2sus!4v1708816744980!5m2!1ses!2sus" 
                        width="100%" height="100%" style="border:0; border-radius:.5rem;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>

        <div class="icons-container">
            <div class="icons">
                <img src="../assets/images/icon-1.png" alt="">
                <h3>12:00 - 23:00</h3>
            </div>
            <div class="icons">
                <img src="../assets/images/icon-2.png" alt="">
                <h3>(+53) 7683 2173</h3>
            </div>
            <div class="icons">
                <img src="../assets/images/icon-3.png" alt="">
                <h3>Calle 403 e/ 180 y 184, Santiago de las Vegas, Boyeros, La Habana</h3>
            </div>
        </div>

        <div class="row">
            <div class="about-article">
                <h3>{{ allInfos[10].info_spanish_text }}</h3>
            </div>
        </div>

        <div class="row gallery">
            <div class="wrapper">
                <img src="../assets/images/taco/taco-2.jpg" alt="">
                <img src="../assets/images/taco/taco-4.jpg" alt="">
                <img src="../assets/images/burrito/burrito-6.jpg" alt="">
                <img src="../assets/images/burrito/burrito-2.jpg" alt="">
                <img src="../assets/images/burrito/burrito-3.jpg" alt="">
                <img src="../assets/images/nachos/nachos-1.jpg" alt="">
                <img src="../assets/images/nachos/nachos-2.jpg" alt="">
                <img src="../assets/images/nachos/nachos-3.jpg" alt="">
                <img src="../assets/images/dessert/dessert-2.jpg" alt="">
                <img src="../assets/images/dessert/dessert-6.jpg" alt="">
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "About",

    computed: {
        ...mapState(["allInfos"]),
    }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Satisfy&display=swap");

.about-section {
    padding: 2rem 9%;
}

.about-section .icons-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.about-section .icons-container .icons {
    border-radius: 1.5rem;
    padding: 2rem;
    text-align: center;
    background: #f7f7f7;
}

.about-section .icons-container .icons img {
    height: 6.5rem;
}

.about-section .icons-container .icons h3 {
    font-size: 2rem;
    color: #130f40;
    margin-top: .5rem;
}

.about-section .about-content {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    width: 100%;
}

.about-section .about-content .about-content-text {
    flex: 1;
    font-size: 16px;
}

.about-section .map-container {
    flex: 1;
    min-width: 300px;
    height: 400px;
}

.about-section .about-article {
    margin-top: 50px;
    padding: 10px;
    text-align: center;
    background-color: #27ae60;
    width: 100%;
}

.about-section .about-article h3 {
    font-family: 'Satisfy', cursive;
    font-size: 32px;
    color: white;
}

.about-section .gallery {
    overflow: hidden;
    padding: 100px;
}

.about-section .gallery .wrapper {
    position: relative;
    flex-grow: 1;
    margin: auto;
    max-width: 1200px;
    max-height: 1200px;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 2vmin;
    justify-items: center;
    align-items: center;
}

.about-section .gallery .wrapper img {
    z-index: 1;
    grid-column: span 2;
    max-width: 100%;
    margin-bottom: -52%;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    transform: scale(1);
    transition: all .25s;
}

.about-section .gallery .wrapper img:nth-child(7n + 1) {
    grid-column: 2 / span 2;
}

.about-section .gallery .wrapper img:hover {
    z-index: 2;
    transform: scale(2);
}

@media (max-width: 768px) {
    .about-section .gallery .wrapper img:hover {
        transform: scale(2.5);
    }
}

@media (max-width: 576px) {
    .about-section .about-content {
        flex-direction: column;
    }

    .about-section .about-content .about-content-text {
        padding-left: 0px;
    }

    .about-section .gallery {
        padding: 50px 0px;
    }

    .about-section .gallery .wrapper {
        grid-gap: 2vmin;
    }

    .about-section .gallery .wrapper img:hover {
        transform: scale(2);
    }
}

@media (max-width: 576px) {
    .about-section .icons-container {
        grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    }
}

@media (max-width: 768px) {
    .about-section .map-container {
        height: 300px;
    }
}
</style>
