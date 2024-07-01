<template>
    <div class="admin-container">
        <div class="d-flex justify-content-between">
            <h1>Detalles de Ingredientes</h1>
            <router-link class="btn" to="/register_ingredients">+ Nuevo</router-link>
        </div>
        <div class="table-responsive">
            <!-- PROJECT TABLE -->
            <table class="table colored-header datatable project-list">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Medida</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(b) in allIngredients" :key="b.ingredient_id">
                        <td>{{ b.ingredient_name }}</td>
                        <td>{{ b.ingredient_amount }}</td>
                        <td>{{ b.amount_type_name }}</td>
                        <td>
                            <button class="action-btn" @click="updateBtn(b.ingredient_name)">
                                Actualizar
                            </button>

                            <button class="cancel-btn" @click="deleteBtn(b.ingredient_id)">
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
    name: 'Users',

    data() {
        return {
            avaiableStatus: ["cancel", "confirmed", "preparing", "checking", "delivering", "delivered", "completed"],
            allIngredients: [],
            showOrderDetails: false,
            sendId: undefined,
            interval: "",
        }
    },

    created() {
        this.getAllIngredients();
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

        async getAllIngredients() {
            const ingredients = (await axios.get('/ingredients')).data;

            for (const ingredient of ingredients) {
                const amountTypeId = ingredient.amount_type_id;
                const amountTypeResponse = await axios.get('/amount_types/' + amountTypeId);
                const amountTypeName = amountTypeResponse.data.amount_type_symbol;
                ingredient.amount_type_name = amountTypeName;
                delete ingredient.amount_type_id;
            }
            
            this.allIngredients = ingredients;
        },

        async updateBtn(id) {
            const data = await axios.get('/ingredients/name/' + id);
            this.$router.push({
                path: '/register_ingredients',
                query: {
                    ingredient_data: JSON.stringify(data.data),
                    isUpdate: true
                }
            });
        },

        async deleteBtn(id) {
            await axios.delete('/ingredients/' + id);
            this.getAllIngredients();
        },

        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getAllIngredients();
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