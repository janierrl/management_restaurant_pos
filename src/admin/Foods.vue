<template>
    <div class="admin-container">
        <div class="d-flex justify-content-between">
            <h1>Detalles de platillos</h1>
            <router-link v-if="user.role_name === 'chef'" class="btn" to="/register_foods">+ Nuevo</router-link>
        </div>
        <div class="table-responsive">
            <!-- PROJECT TABLE -->
            <table class="table colored-header datatable project-list">
                <thead>
                    <tr>
                        <th>Imágen</th>
                        <th>Nombre</th>
                        <th>Puntuación</th>
                        <th>Votos</th>
                        <th>Precio</th>
                        <th>Descuento</th>
                        <th>Descripción</th>
                        <th>Tipo</th>
                        <th>Categoría</th>
                        <th>Ingredientes</th>
                        <th>Estados</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(b) in allFoods" :key="b.food_id">
                        <td><img :src="b.food_src" alt="" style="max-width: 100px; max-height: 100px;" /></td>
                        <td>{{ b.food_name }}</td>
                        <td>{{ b.food_star }}</td>
                        <td>{{ b.food_vote }}</td>
                        <td>{{ b.food_price }}</td>
                        <td>{{ b.food_discount }}</td>
                        <td>{{ b.food_desc }}</td>
                        <td>{{ b.food_type }}</td>
                        <td>{{ b.category_name }}</td>
                        <td>
                            <ul>
                                <li v-for="ingredient in b.food_ingredient" :key="ingredient.ingredient_name">
                                    {{ ingredient.ingredient_name }}: {{ ingredient.amount }} {{ ingredient.amount_type_symbol }}
                                </li>
                            </ul>
                            </td>
                            <td>
                            <ul>
                                <li v-for="status in b.food_status" :key="status">
                                    {{ status.status_name }}
                                </li>
                            </ul>
                        </td>

                        <td>
                            <button class="action-btn" @click="updateBtn(b.food_id)">
                                Actualizar
                            </button>

                            <button class="cancel-btn" @click="deleteBtn(b.food_id)">
                                Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
export default {
    name: 'Foods',

    data() {
        return {
            avaiableStatus: ["cancel", "confirmed", "preparing", "checking", "delivering", "delivered", "completed"],
            allFoods: [],
            showOrderDetails: false,
            sendId: undefined,
            interval: "",
        }
    },

    created() {
        this.getAllFoods();
        if (!this.admin) {
            this.$router.push("/");
        }
    },

    mounted: function () {
        this.autoUpdate();
    },

    beforeUnmount() {
        clearInterval(this.interval)
    },

    computed: {
        ...mapState(["allFoods", "admin", "user"]),
    },

    methods: {
        ...mapMutations(["setAdmin"]),
        ...mapMutations(["setUser"]),

        async getAllFoods() {
            const foods = (await axios.get('/foods')).data;

            for (const food of foods) {
                const categoryId = food.category_id;
                const categoryResponse = await axios.get('/categories/' + categoryId);
                const categoryName = categoryResponse.data.category_name;
                food.category_name = categoryName;
                delete food.category_id;
            }
            
            this.allFoods = foods;
        },

        async updateBtn(id) {
            const data = await axios.get('/foods/' + id);
            this.$router.push({
                path: '/register_foods',
                query: {
                    food_data: JSON.stringify(data.data),
                    isUpdate: true
                }
            });
        },

        async deleteBtn(id) {
            await axios.delete('/foods/' + id);
            this.getAllFoods();
        },

        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getAllFoods();
            }.bind(this), 1000);
        }

    },
}
</script>

<style scoped>
.admin-container {
    background-color: #fff;
    padding: 2rem 9%;
    font-size: 16px;
}

.project-list>tbody>tr>td {
    padding: 12px 8px;
}

.project-list>tbody>tr>td .avatar {
    width: 22px;
    border: 1px solid #CCC;
}

.table-responsive {
    margin-top: 8vh;
}

.action-btn,
.cancel-btn,
.paid-btn {
    width: 100px;
    height: 25px;
    color: white;
    text-transform: capitalize;
}

.action-btn {
    background-color: #0da9ef;
    margin-right: 10px;
}

.cancel-btn,
.paid-btn {
    background-color: red;
}

.disabled-btn {
    cursor: not-allowed;
    background-color: #dddddd;
    color: #999999;
}

.action-btn:hover:not(:disabled) {
    background-color: #27ae60;
}
</style>