<template>
    <div class="admin-container">
        <div class="d-flex justify-content-between">
            <h1>Detalles de Usuarios</h1>
            <router-link class="btn" to="/register">+ Nuevo</router-link>
        </div>
        <div class="table-responsive">
            <!-- PROJECT TABLE -->
            <table class="table colored-header datatable project-list">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Rol</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(b) in allUsers" :key="b.user_id">
                        <td>{{ b.user_name }}</td>
                        <td>{{ b.user_email }}</td>
                        <td>{{ b.user_phone }}</td>
                        <td>{{ b.user_address }}</td>
                        <td>{{ b.role_name }}</td>
                        <td>
                            <button class="action-btn" @click="updateBtn(b.user_email)">
                                Actualizar
                            </button>

                            <button class="cancel-btn" @click="deleteBtn(b.user_id)">
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
            allUsers: [],
            showOrderDetails: false,
            sendId: undefined,
            interval: "",
        }
    },

    created() {
        this.getAllUsers();
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

        async getAllUsers() {
            const users = (await axios.get('/users')).data;

            for (const user of users) {
                const roleId = user.role_id;
                const roleResponse = await axios.get('/roles/' + roleId);
                const roleName = roleResponse.data.role_name;
                user.role_name = roleName;
                delete user.role_id;
            }
            
            this.allUsers = users;
        },

        async updateBtn(email) {
            const data = await axios.get('/users/' + email);
            this.$router.push({
                path: '/register',
                query: {
                    user_data: JSON.stringify(data.data),
                    isUpdate: true
                }
            });
        },

        async deleteBtn(id) {
            await axios.delete('/users/' + id);
            this.getAllUsers();
        },

        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getAllUsers();
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