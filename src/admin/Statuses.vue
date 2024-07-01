<template>
    <div class="admin-container">
        <div class="d-flex justify-content-between">
            <h1>Detalles de Estados</h1>
            <router-link class="btn" to="/register_statuses">+ Nuevo</router-link>
        </div>
        <div class="table-responsive">
            <!-- PROJECT TABLE -->
            <table class="table colored-header datatable project-list">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(b) in allStatuses" :key="b.status_id">
                        <td>{{ b.status_name }}</td>
                        <td>
                            <button class="action-btn" @click="updateBtn(b.status_name)">
                                Actualizar
                            </button>

                            <button class="cancel-btn" @click="deleteBtn(b.status_id)">
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
    name: 'Statuses',

    data() {
        return {
            avaiableStatus: ["cancel", "confirmed", "preparing", "checking", "delivering", "delivered", "completed"],
            allStatuses: [],
            showOrderDetails: false,
            sendId: undefined,
            interval: "",
        }
    },

    created() {
        this.getAllStatuses();
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

        async getAllStatuses() {
            const statuses = (await axios.get('/statuses')).data;
            this.allStatuses = statuses;
        },

        async updateBtn(id) {
            const data = await axios.get('/statuses/' + id);
            this.$router.push({
                path: '/register_statuses',
                query: {
                    status_data: JSON.stringify(data.data),
                    isUpdate: true
                }
            });
        },

        async deleteBtn(id) {
            await axios.delete('/statuses/' + id);
            this.getAllStatuses();
        },

        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getAllStatuses();
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