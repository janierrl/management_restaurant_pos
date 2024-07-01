<template>
    <vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />
    <div class="menu-section">
        <div class="heading">
            <span>menú</span>
            <h3>Nuestros platillos</h3>
        </div>

        <div class="row">
            <div class="col-sm-4 col-12 filter-box">
                <div class="row search-box">
                    <input type="text" class="search-input" v-model="foodObj.name" placeholder="Buscar..." />
                </div>

                <div class="row filter-drop-down">
                    <p @click="displayFilterDrop">Filter<span v-if="showDropDown">x</span><span v-else>v</span></p>
                </div>

                <div class="row filter-heading">
                    <h1>Estados</h1>
                </div>

                <div class="row filter-section">
                    <ul class="filter-option">
                        <li>
                            <input type="button" name="cbStatus" id="bsStatus" value="Más vendido" hidden
                                @click="filterStatusBtn($event)" />
                            <label for="bsStatus" class="d-flex justify-content-between">Más vendido
                                <button class="unselect-btn" @click="unselectStatusBtn($event)"
                                    value="Más vendido">X</button></label>
                        </li>


                        <li>
                            <input type="button" name="cbStatus" id="soStatus" value="En descuento" hidden
                                @click="filterStatusBtn($event)" />
                            <label for="soStatus" class="d-flex justify-content-between">En descuento <button
                                    class="unselect-btn" @click="unselectStatusBtn($event)"
                                    value="En descuento">X</button></label>
                        </li>


                        <li>
                            <input type="button" name="cbStatus" id="sdStatus" value="Platillos de temporada" hidden
                                @click="filterStatusBtn($event)" />
                            <label for="sdStatus" class="d-flex justify-content-between">Platillos de temporada <button
                                    class="unselect-btn" @click="unselectStatusBtn($event)"
                                    value="Platillos de temporada">X</button></label>
                        </li>


                        <li>
                            <input type="button" name="cbStatus" id="ndStatus" value="Nuevos platillos" hidden
                                @click="filterStatusBtn($event)" />
                            <label for="ndStatus" class="d-flex justify-content-between">Nuevos platillos <button
                                    class="unselect-btn" @click="unselectStatusBtn($event)"
                                    value="Nuevos platillos">X</button></label>
                        </li>

                    </ul>
                    <hr />
                </div>

                <div class="row filter-heading">
                    <h1>Precio</h1>
                </div>

                <div class="row filter-section">
                    <ul class="filter-option">
                        <li>
                            <input type="button" name="rPrice" id="rtfPrice" value="2,5" hidden
                                @click="filterPriceBtn($event)" />
                            <label for="rtfPrice" class="d-flex justify-content-between">$2 - $5 <button
                                    class="unselect-btn" @click="unselectPriceBtn($event)">X</button></label>
                        </li>

                        <li>
                            <input type="button" name="rPrice" id="rftPrice" value="5,10" hidden
                                @click="filterPriceBtn($event)" />
                            <label for="rftPrice" class="d-flex justify-content-between">$5 - $10 <button
                                    class="unselect-btn" @click="unselectPriceBtn($event)">X</button></label>
                        </li>

                        <li>
                            <input type="button" name="rPrice" id="rttPrice" value="10,12" hidden
                                @click="filterPriceBtn($event)" />
                            <label for="rttPrice" class="d-flex justify-content-between">$10 - $12 <button
                                    class="unselect-btn" @click="unselectPriceBtn($event)">X</button></label>
                        </li>

                        <li>
                            <input type="button" name="rPrice" id="mtPrice" value="12" hidden
                                @click="filterPriceBtn($event)" />
                            <label for="mtPrice" class="d-flex justify-content-between">{{ ">" }} $12 <button
                                    class="unselect-btn" @click="unselectPriceBtn($event)">X</button></label>
                        </li>

                        <li>
                            <input type="button" name="rPrice" id="ltPrice" value="2" hidden
                                @click="filterPriceBtn($event)" />
                            <label for="ltPrice" class="d-flex justify-content-between">{{ "<" }} $2 <button
                                    class="unselect-btn" @click="unselectPriceBtn($event)">X</button></label>
                        </li>

                    </ul>
                    <hr />
                </div>


                <div class="row filter-heading">
                    <h1>Tipo</h1>
                </div>

                <div class="row filter-section">
                    <ul class="filter-option">
                        <li>
                            <input type="button" name="rType" id="mType" value="carne" hidden
                                @click="filterTypeBtn($event)" />
                            <label for="mType" class="d-flex justify-content-between">carne<button class="unselect-btn"
                                    @click="unselectTypeBtn($event)">X</button></label>
                        </li>

                        <li>
                            <input type="button" name="rType" id="vType" value="vegano" hidden
                                @click="filterTypeBtn($event)" />
                            <label for="vType" class="d-flex justify-content-between">vegano<button class="unselect-btn"
                                    @click="unselectTypeBtn($event)">X</button></label>
                        </li>

                    </ul>
                </div>
            </div>

            <div class="col-sm-8">
                <div class="row">
                    <div class="menu-tabs">
                        <input type="button" ref="allBtn" id="allFilterFoodBtn" name="allFilterFoodBtn" value="all"
                            class="menu-tab-item" @click="filterFoodBtn($event)" />
                        <input type="button" ref="líquidosBtn" id="líquidosFilterFoodBtn" name="líquidosFilterFoodBtn" class="menu-tab-item"
                            value="líquidos" @click="filterFoodBtn($event)" />
                        <input type="button" ref="postresBtn" id="postresFilterFoodBtn" name="postresFilterFoodBtn" class="menu-tab-item"
                            value="postres" @click="filterFoodBtn($event)" />
                        <input type="button" ref="principalesBtn" id="principalesFilterFoodBtn" name="principalesFilterFoodBtn" class="menu-tab-item"
                            value="principales" @click="filterFoodBtn($event)" />
                        <input type="button" ref="entrantesBtn" id="entrantesFilterFoodBtn" name="entrantesFilterFoodBtn" class="menu-tab-item"
                            value="entrantes" @click="filterFoodBtn($event)" />
                        <input type="button" ref="pastasBtn" id="pastasFilterFoodBtn" name="pastasFilterFoodBtn" class="menu-tab-item"
                            value="pastas" @click="filterFoodBtn($event)" />
                        <input type="button" ref="panesBtn" id="panesFilterFoodBtn" name="panesFilterFoodBtn" class="menu-tab-item"
                            value="panes" @click="filterFoodBtn($event)" />
                        <input type="button" ref="guarnicionesBtn" id="guarnicionesFilterFoodBtn" name="guarnicionesFilterFoodBtn" class="menu-tab-item"
                            value="guarniciones" @click="filterFoodBtn($event)" />
                        <input type="button" ref="pizzasBtn" id="pizzasFilterFoodBtn" name="pizzasFilterFoodBtn" class="menu-tab-item"
                            value="pizzas" @click="filterFoodBtn($event)" />
                        <input type="button" ref="tacosBtn" id="tacosFilterFoodBtn" name="tacosFilterFoodBtn" class="menu-tab-item"
                            value="tacos" @click="filterFoodBtn($event)" />
                        <input type="button" ref="favoriteBtn" id="favoriteFilterFoodBtn" name="favoriteFilterFoodBtn" class="menu-tab-item"
                            value="favoritos" @click="filterFoodBtn($event)" />
                    </div>
                </div>

                <div class="row box-container">
                    <div v-for="(f, index) in currentPageItems" :key="index">
                        <div class="box">
                            <a v-if="user" :class="[{'favorite': this.allFavoriteFoods.some(favorite => favorite.food_id === f.food_id)} ,'fas fa-heart']" @click="favoriteBtn(f.food_id, this.user.user_id)"></a>
                            <div class="image">
                                <img :src="f.food_src" alt="" />
                            </div>
                            <div class="content">
                                <h3>{{ f.food_name }}</h3>
                                <div class="stars">
                                    <div v-for="s in Math.floor(parseFloat(f.food_star))" :key="'full' + s" class="d-inline">
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <div v-if="parseFloat(f.food_star) % 1 >= 0.5" class="d-inline">
                                        <i class="fas fa-star-half-alt"></i>
                                    </div>
                                    <div v-for="e in (5 - Math.floor(parseFloat(f.food_star)) - (parseFloat(f.food_star) % 1 >= 0.5 ? 1 : 0))" :key="'empty' + e" class="d-inline">
                                        <i class="far fa-star"></i>
                                    </div>
                                    <span> ({{ f.food_vote }}) </span>
                                </div>
                                <div class="desc">
                                    <p>{{ f.food_desc }}</p>
                                </div>
                                <div class="price">
                                    ${{ parseFloat(f.food_price) - parseFloat(f.food_discount) }}
                                    <span v-if="parseFloat(f.food_discount) != 0.00">${{ parseFloat(f.food_price) }}</span>
                                </div>
                                <div v-if="user" class="action-container">
                                    <button class="btn" @click="addToCart(index)">Agregar</button>
                                    <div class="qty">
                                        <input type="number" name="qty" id="qty" value="1" min="1" max="1000"
                                            @change="onQtyChange($event, index)" />
                                    </div>
                                </div>

                                <div v-if="user" class="user-rating">
                                    <i v-for="n in 5" :key="n" class="fas fa-star" :class="{ 'selected': n <= getUserRating(f.food_id) }" @click="rateBtn(f, this.user.user_id, n)"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="!filterFoods.length">
                        <div class="box">
                            <div class="content">
                                <h1 style="color: #057835fa;">No match found!</h1>
                            </div>
                            <div class="image">
                                <img src="../assets/images/notfound.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="calculatePages > 1" class="action-row">
                    <button v-if="pageNum != 0" @click="previous()" class="action-btn"> {{ "<" }} </button>
                    <div v-for="(p, i) in calculatePages" :key="i" class="d-inline">
                        <span v-if="i == pageNum" class="highlight" @click="set(i)">{{ i + 1 }}</span>
                        <span v-else @click="set(i)">{{ i + 1 }}</span>
                    </div>
                    <button v-if="pageNum != calculatePages - 1" @click="next()" class="action-btn"> {{ ">" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { mapActions } from 'vuex';
import { mapState } from "vuex";
import VueBasicAlert from 'vue-basic-alert';
export default {
    name: "Menu",

    data() {
        return {
            foodObj: { name: "", category: "", status: [], price: "", type: "" },

            showDropDown: false,

            perPage: 6,
            pageNum: 0,
            previousCategoryClicked: "",
            previousPriceClicked: "",
            previousTypeClicked: "",

            allFavoriteFoods: [],
            allRateFoods: [],
            interval: "",
            qty: [],
        };
    },

    computed: {
        ...mapState(["allFoods", "user"]),

        filterFoods: function () {
            return this.allFoods.filter((food) => {
                const baseFilter = food.food_name.toLowerCase().includes(this.foodObj.name.toLowerCase()) &&
                    this.evaluatePrice(food, this.foodObj.price) &&
                    food.food_type.toLowerCase().includes(this.foodObj.type.toLowerCase()) &&
                    this.evaluateStatus(food, this.foodObj.status);
                
                if (this.foodObj.category === 'favoritos') {
                    return baseFilter && this.allFavoriteFoods.some(favorite => favorite.food_id === food.food_id);
                } else {
                    return baseFilter && 
                        (food.food_category[0].category_name.includes(this.foodObj.category) || 
                        this.foodObj.category === "all" || 
                        this.foodObj.category === "");
                }
            });
        },
        currentPageItems() {
            return this.filterFoods.slice(this.pageNum * this.perPage, this.pageNum * this.perPage + this.perPage);
        },
        calculatePages() {
            if (this.filterFoods.length % this.perPage !== 0) {
                return Math.floor(this.filterFoods.length / this.perPage) + 1;
            } else {
                return this.filterFoods.length / this.perPage;
            }
        },
    },

    created() {
        if (this.user) {
            this.getAllFavoriteFoods();
            this.getAllRateFoods();
        }
    },
    
    mounted() {
        const currentCategory = this.$route.query.category;
        const categoryButtonMap = {
            'líquidos': this.$refs.líquidosBtn,
            'postres': this.$refs.postresBtn,
            'principales': this.$refs.principalesBtn,
            'entrantes': this.$refs.entrantesBtn,
            'pastas': this.$refs.pastasBtn,
            'panes': this.$refs.panesBtn,
            'guarniciones': this.$refs.guarnicionesBtn,
            'pizzas': this.$refs.pizzasBtn,
            'tacos': this.$refs.tacosBtn,
        };

        if (categoryButtonMap[currentCategory]) {
            categoryButtonMap[currentCategory].click();
        }

        this.autoUpdate();
    },

    beforeUnmount() {
        clearInterval(this.interval)
    },

    methods: {
        ...mapActions(["getFoodsData"]),
        set(val) {
            this.pageNum = val;
        },
        next() {
            this.pageNum++;
        },
        previous() {
            this.pageNum--;
        },
        checkSale: function (food, statusArray) {
            if (statusArray.includes("En descuento")) {
                if (food.food_discount > 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return true;
        },
        checkBest: function (food, statusArray) {
            if (statusArray.includes("Más vendido")) {
                if (food.food_status.some(status => status.status_name === 'más vendido')) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return true;
        },
        checkSeason: function (food, statusArray) {
            if (statusArray.includes("Platillos de temporada")) {
                if (food.food_status.some(status => status.status_name === 'platillos de temporada')) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return true;
        },
        checkNew: function (food, statusArray) {
            if (statusArray.includes("Nuevos platillos")) {
                if (food.food_status.some(status => status.status_name === 'nuevos platillos')) {
                    return true;
                }
                else {
                    return false;
                }
            }
            return true;
        },
        evaluateStatus: function (food, statusArray) {
            if (statusArray.length != 0) {
                if (this.checkSale(food, statusArray) && this.checkBest(food, statusArray) && this.checkNew(food, statusArray) && this.checkSeason(food, statusArray)) {
                    return food;
                }
            }
            else {
                return food;
            }
        },
        evaluatePrice: function (food, priceRange) {
            var cal = parseFloat(food.food_price) - parseFloat(food.food_discount);
            if (priceRange == "2,5") {
                if (2 <= cal && cal <= 5) {
                    return food;
                }
            }
            else if (priceRange == "5,10") {
                if (5 <= cal && cal <= 10) {
                    return food;
                }
            }
            else if (priceRange == "10,12") {
                if (10 <= cal && cal <= 12) {
                    return food;
                }
            }
            else if (priceRange == "2") {
                if (cal <= 2) {
                    return food;
                }
            }
            else if (priceRange == "12") {
                if (cal >= 12) {
                    return food;
                }
            }
            else if (priceRange == "") {
                return food;
            }
        },
        filterFoodBtn: function (e) {
            this.pageNum = 0;
            if (this.foodObj.category != e.target.value && this.previousCategoryClicked != "") {
                this.previousCategoryClicked.target.style.background = "#27ae60";
            }
            this.foodObj.category = e.target.value;
            this.previousCategoryClicked = e;
            e.target.style.background = "#057835fa";
        },
        filterStatusBtn: function (e) {
            this.pageNum = 0;
            if (this.foodObj.status.includes(e.target.value) == false) {
                this.foodObj.status.push(e.target.value);
                document.querySelector(`[for=${e.target.id}]`).style.background = "#057835fa";
                document.querySelector(`[for=${e.target.id}]`).style.color = "white";
                document.querySelector(`[for=${e.target.id}]`).querySelector(":scope > button").style.display = "block";
            }
        },
        filterPriceBtn: function (e) {
            this.pageNum = 0;
            this.foodObj.price = "";
            this.foodObj.price += e.target.value;
            document.querySelector(`[for=${e.target.id}]`).style.background = "#057835fa";
            document.querySelector(`[for=${e.target.id}]`).style.color = "white";
            document.querySelector(`[for=${e.target.id}]`).querySelector(":scope > button").style.display = "block";
            if (this.previousPriceClicked != "") {
                document.querySelector(`[for=${this.previousPriceClicked.target.id}]`).style.background = "inherit";
                document.querySelector(`[for=${this.previousPriceClicked.target.id}]`).style.color = "inherit";
                document.querySelector(`[for=${this.previousPriceClicked.target.id}]`).querySelector(":scope > button").style.display = "none";
            }
            this.previousPriceClicked = e;
        },
        filterTypeBtn: function (e) {
            this.pageNum = 0;
            this.foodObj.type = "";
            this.foodObj.type += e.target.value;
            document.querySelector(`[for=${e.target.id}]`).style.background = "#057835fa";
            document.querySelector(`[for=${e.target.id}]`).style.color = "white";
            document.querySelector(`[for=${e.target.id}]`).querySelector(":scope > button").style.display = "block";
            if (this.previousTypeClicked != "") {
                document.querySelector(`[for=${this.previousTypeClicked.target.id}]`).style.background = "inherit";
                document.querySelector(`[for=${this.previousTypeClicked.target.id}]`).style.color = "inherit";
                document.querySelector(`[for=${this.previousTypeClicked.target.id}]`).querySelector(":scope > button").style.display = "none";
            }
            this.previousTypeClicked = e;
        },
        unselectStatusBtn: function (e) {
            this.pageNum = 0;
            this.foodObj.status = this.foodObj.status.filter(function (a) { return a !== e.target.value; });
            e.target.parentNode.style.background = "inherit";
            e.target.parentNode.style.color = "inherit";
            e.target.parentNode.querySelector(":scope > button").style.display = "none";
        },
        unselectPriceBtn: function () {
            this.pageNum = 0;
            this.foodObj.price = "";
            document.querySelector(`[for=${this.previousPriceClicked.target.id}]`).style.background = "inherit";
            document.querySelector(`[for=${this.previousPriceClicked.target.id}]`).style.color = "inherit";
            document.querySelector(`[for=${this.previousPriceClicked.target.id}]`).querySelector(":scope > button").style.display = "none";
            this.previousPriceClicked = "";
        },
        unselectTypeBtn: function () {
            this.pageNum = 0;
            this.foodObj.type = "";
            document.querySelector(`[for=${this.previousTypeClicked.target.id}]`).style.background = "inherit";
            document.querySelector(`[for=${this.previousTypeClicked.target.id}]`).style.color = "inherit";
            document.querySelector(`[for=${this.previousTypeClicked.target.id}]`).querySelector(":scope > button").style.display = "none";
            this.previousTypeClicked = "";
        },

        closeView: function () {
            this.showQuickView = !this.showQuickView;
        },

        displayFilterDrop: function () {
            let divControl1 = document.getElementsByClassName("filter-heading");
            let divControl2 = document.getElementsByClassName("filter-section");
            for (var i = 0; i < divControl1.length; i++) {
                if (this.showDropDown) {
                    divControl1[i].style.display = "none";
                    divControl2[i].style.display = "none";
                }
                else {
                    divControl1[i].style.display = "block";
                    divControl2[i].style.display = "block";
                }
            }
            this.showDropDown = !this.showDropDown;
        },

        async favoriteBtn(food_id, user_id) {
            if (this.allFavoriteFoods.some(favorite => favorite.food_id === food_id)) {
                await axios.delete('/food_favorite/' + user_id + '/' + food_id);
            } else {
                const favoriteData = {
                    food_id: food_id,
                    user_id: user_id
                };
                
                await axios.post('/food_favorite/', favoriteData);
            }
        },

        async getAllFavoriteFoods() {
            const favorite_foods = (await axios.get('/food_favorite/' + this.user.user_id)).data;
            this.allFavoriteFoods = favorite_foods;
        },
        
        async rateBtn(food, user_id, rating) {
            if (this.allRateFoods.some(rate => rate.food_id === food.food_id)) {
                const rateData = {
                    rating: rating
                };
                await axios.put('/food_rating/' + user_id + '/' + food.food_id, rateData);
            } else {
                const rateData = {
                    food_id: food.food_id,
                    user_id: user_id,
                    rating: rating
                };
                
                await axios.post('/food_rating/', rateData);
            }

            const rate_global = (await axios.get('/food_rating/global/' + food.food_id)).data; 
                const length = rate_global.length;
                const sum = rate_global.reduce((acc, curr) => acc + curr.rating, 0);
                const average = length > 0 ? sum / length : 0;

                const foodData = {
                    food_star: average,
                    food_vote: length
                };

                await axios.put('/foods/rating/' + food.food_id, foodData);
        },

        async getAllRateFoods() {
            const rate_foods = (await axios.get('/food_rating/' + this.user.user_id)).data;
            this.allRateFoods = rate_foods;
        },

        getUserRating(food_id) {
            const ratingObj  = this.allRateFoods.find(rate => rate.food_id === food_id);
            return ratingObj  ? ratingObj.rating : 0;
        },

        onQtyChange: function (e, index) {
            if (e.target.value < 1) {
                e.target.value = 1;
                this.qty[index] = e.target.value;
            } else {
                this.qty[index] = e.target.value;
            }
        },

        async addToCart(index) {
            if (!this.qty[index]) {
                this.qty[index] = 1;
            }
            const food_id = parseInt(this.currentPageItems[index].food_id);
            let existItem = await axios.get('/cartItem/' + parseInt(this.user.user_id) + '/' + parseInt(food_id));

            if (existItem.data.length == 1) {
                let data = {
                    user_id: parseInt(this.user.user_id),
                    food_id: parseInt(food_id),
                    item_qty: parseInt(this.qty[index]) + parseInt(existItem.data[0].item_qty)
                };
                await axios.put("/cartItem/", data)
                this.$refs.alert.showAlert('success', 'Gracias!', 'Añadido al carrito satisfactoriamente!')

            } else {
                let data = {
                    user_id: parseInt(this.user.user_id),
                    food_id: parseInt(food_id),
                    item_qty: parseInt(this.qty[index])
                };

                await axios.post("/cartItem/", data)
                this.$refs.alert.showAlert('success', 'Gracias!', 'Añadido al carrito satisfactoriamente!')
            }
        },

        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getAllFavoriteFoods();
                this.getAllRateFoods();
                this.getFoodsData();
            }.bind(this), 1000);
        },
    },

    components: {
        VueBasicAlert
    }
};
</script>

<style scoped>
input[type="button"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
}

.unselect-btn:active,
.unselect-btn:focus,
.action-btn:active,
.action-btn:focus {
    border: none;
    outline: none;
}

hr {
    border-top: 3px solid #057835fa;
    width: 100%;
}

.unselect-btn {
    background: transparent;
    padding-right: 10px;
    cursor: pointer;
    color: inherit;
    display: none;
}


.filter-section {
    width: inherit;
}

.filter-heading {
    padding-top: 30px;
}

.filter-heading h1 {
    color: #27ae60;
}

.filter-option {
    list-style-type: none;
    width: inherit;
}

.filter-option label {
    width: 100%;
    font-size: 15px;
    padding: 3px 0px;

}

.filter-option label:hover {
    color: white;
    background-color: #f38609 !important;
    transition: all 0.5s ease;
}

.search-box {
    width: 100%;
    justify-content: center;
    position: relative;
    display: flex;
}

.search-input {
    margin: 0;
    width: 100%;
    height: 40px;
    font-size: 20px;
    color: white;
    background: #27ae60;
}

::placeholder {
    color: white;
}

.menu-section {
    padding: 2rem 9%;
}

.menu-section .menu-tabs {
    margin-bottom: 30px;
    flex: 0 0 100%;
    max-width: 100%;
    text-align: center;
    background-color: #27ae60;
}

.menu-section .menu-tabs .menu-tab-item {
    display: inline-block;
    cursor: pointer;
    padding: 5px 30px;
    border-radius: 30%;
    font-size: 20px;
    color: whitesmoke;
    font-weight: 500;
    text-transform: capitalize;
    transition: all 0.3s ease;
    margin: 0;
}

.menu-section .menu-tabs .menu-tab-item:hover {
    background-color: #f38609 !important;
}

.menu-section .menu-tabs .menu-tab-item p {
    padding: none;
    margin: none;
}

.menu-section .box-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 1.5rem;
}

.menu-section .box-container .box {
    border-radius: 0.5rem;
    position: relative;
    background: #f7f7f7;
    padding: 2rem;
    text-align: center;
}

.menu-section .box-container .box .fa-heart {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    font-size: 2.5rem;
    color: #666;
    cursor: pointer;
}

.menu-section .box-container .box .favorite {
    color: red;
}

.menu-section .box-container .box .fa-heart:hover {
    color: rgb(49, 166, 45);
}

.menu-section .box-container .box .favorite:hover {
    color: red;
}
   

.menu-section .box-container .box .image {
    margin: 1rem 0;
}

.menu-section .box-container .box .image img {
    height: 15rem;
}

.menu-section .box-container .box .content h3 {
    font-size: 2rem;
    color: #130f40;
}

.menu-section .box-container .box .content .stars {
    padding: 1rem 0;
    font-size: 1.7rem;
}

.menu-section .box-container .box .content .stars i {
    color: gold;
}

.menu-section .box-container .box .content .stars span {
    color: #666;
}

.user-rating {
    margin-top: 10px;
}

.user-rating .fa-star {
    cursor: pointer;
    color: #ccc;
}

.user-rating .fa-star.selected {
    color: #FFD700;
}

.menu-section .box-container .box .content .desc p {
    font-size: 14px;
    margin: 0;
}

.menu-section .box-container .box .content .price {
    font-size: 2rem;
    color: #130f40;
}

.menu-section .box-container .box .content .price span {
    font-size: 1.5rem;
    color: #666;
    text-decoration: line-through;
}

.menu-section .box-container .box .content .action-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
}

.menu-section .box-container .box .content .action-container .qty {
    display: flex;
    align-items: center;
}

.menu-section .box-container .box .content .action-container .qty input[type="number"] {
    width: 60px;
    padding: 5px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
}

.menu-section .box-container .box .content .action-container .qty input[type="number"]:focus {
    outline: none;
    border-color: #27ae60;
}

.menu-section .action-row {
    padding-top: 30px;
    width: 100%;
    text-align: center;
    font-size: 20px;
}

.menu-section .action-row .action-btn {
    background-color: #27ae60;
    padding: 3px;
    border: 2px solid #27ae60;
    border-radius: 30%;
    color: white;
}

.menu-section .action-row span {
    margin-right: 15px;
}

.menu-section .action-row span:hover {
    cursor: pointer;
}

.menu-section .action-row span.highlight {
    color: #f38609;
}

.menu-section .action-row span:first-of-type {
    margin-left: 15px;
}

.filter-drop-down {
    display: none;
}

@media (min-width: 576px) {
    .filter-heading,
    .filter-section {
        display: block !important;
    }
    
    .menu-section .box-container .box .content .action-container {
        flex-direction: column;
    }

    .menu-section .box-container .box .content .action-container .qty {
        margin-top: 10px;
    }
}

@media (max-width: 768px) {
    .menu-section .box-container {

        grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
        gap: 1rem;
    }

    .menu-section .box-container .box .content h3 {
        height: 4rem;
    }
}

@media (max-width: 576px) {

    .search-box,
    .filter-heading,
    .filter-section {
        width: auto;
    }

    .filter-option {
        width: 100%;
    }

    .filter-drop-down {
        display: block;
        background-color: #27ae60;
        color: white;
        font-weight: 400;
        margin-bottom: 15px;
        margin-top: 15px;

    }

    .filter-drop-down p {
        font-size: 20px;
        padding: 5px 0px;
        margin: 0;
        display: flex;
        justify-content: space-between;
    }

    .filter-drop-down p span {
        font-size: 20px;
        padding-right: 10px;
        text-transform: lowercase;
        font-weight: 300;
    }

    .filter-heading,
    .filter-section {
        display: none;
    }

    .menu-tabs .menu-tab-item {
        font-size: 12px !important;
        padding: 5px 20px !important;
    }

    .menu-section .action-row {
        font-size: 16px !important;
    }

    .menu-section .action-row span {
        margin-right: 5px;
    }

    .menu-section .box-container .box .image img {
        height: 10rem;
    }

    .menu-section .box-container .box .desc p,
    .menu-section .box-container .box .content .stars {
        font-size: 10px !important;
    }

    .menu-section .box-container .box .content h3 {
        font-size: 14px !important;
        height: 28px;
    }
}
</style>
