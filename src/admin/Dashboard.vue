<template>
    <div class="admin-container">
        <div class="table-responsive">
            <!-- PROJECT TABLE -->
            <table class="table colored-header datatable project-list">
                <thead>
                    <tr>
                        <th>Orden No</th>
                        <th>Usuario</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Fecha</th>
                        <th>Pagado</th>
                        <th>Estado</th>
                        <th>Status</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(b) in filterBills.slice().reverse()" :key="b.bill_id">
                        <td>{{ b.bill_id }}</td>
                        <td>{{ b.user_name }}</td>
                        <td>{{ b.bill_phone }}</td>
                        <td>{{ b.bill_address }}</td>
                        <td>{{ formatDate(b.bill_when) }}</td>
                        <td>{{ b.bill_paid }}</td>
                        <td>${{ b.bill_total }}</td>
                        <td>{{ avaiableStatus[b.bill_status] }}</td>
                        <td>
                            <button class="action-btn" @click="sendBillId(b.bill_id)">
                                Detalles
                            </button>

                            <button v-if="b.bill_status < 5" :disabled="(user.role_name === 'delivery' && b.bill_status < 3) || ((user.role_name === 'chef' || user.role_name === 'admin') && b.bill_status > 2)" :class="[{ 'disabled-btn': (user.role_name === 'delivery' && b.bill_status < 3) || ((user.role_name === 'chef' || user.role_name === 'admin') && b.bill_status > 2) }, 'action-btn']" @click="nextStatusBtn(b.bill_id)">
                                {{ avaiableStatus[b.bill_status + 1] }}
                            </button>

                            <button v-if="b.bill_status == 1" :disabled="user.role_name === 'delivery'" :class="[{ 'disabled-btn': user.role_name === 'delivery' }, 'cancel-btn']" @click="cancelBtn(b.bill_id)">
                                Eliminar
                            </button>

                            <button v-else-if="b.bill_status == 5 && b.bill_paid == 'false'" :disabled="user.role_name === 'chef' && b.bill_status > 2" :class="[{ 'disabled-btn': user.role_name === 'chef' && b.bill_status > 2 }, 'paid-btn']"
                                @click="paidBtn(b.bill_id)">
                                Paid
                            </button>

                            <button v-else-if="b.bill_status == 5 && b.bill_paid == 'true'" :disabled="user.role_name === 'chef' && b.bill_status > 2" :class="[{ 'disabled-btn': user.role_name === 'chef' && b.bill_status > 2 }, 'action-btn']"
                                @click="nextStatusBtn(b.bill_id)">
                                {{ avaiableStatus[b.bill_status + 1] }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <OrderDetails v-if="showOrderDetails" :bill="sendId">
        <button class="btn" @click="closeView">X</button>
    </OrderDetails>
</template>


<script>
import OrderDetails from "@/components/OrderDetails.vue";
import axios from "axios";
import { mapState, mapMutations } from "vuex";
export default {
    name: 'Dashboard',

    data() {
        return {
            avaiableStatus: ["cancel", "confirmed", "preparing", "checking", "delivering", "delivered", "completed"],
            allBills: [],
            showOrderDetails: false,
            sendId: undefined,
            interval: "",
        }
    },

    created() {
        this.getAllBills();
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

        filterBills: function () {
            return this.allBills.filter((b) => b.bill_status < 6 && b.bill_status > 0);
        },
    },

    methods: {
        ...mapMutations(["setAdmin"]),
        ...mapMutations(["setUser"]),

        async getAllBills() {
            const bills = (await axios.get('/billstatus')).data;

            for (const bill of bills) {
                const userId = bill.user_id;
                const userResponse = await axios.get('/users/id/' + userId);
                const userName = userResponse.data.user_name;
                bill.user_name = userName;
                delete bill.user_id;
            }

            this.allBills = bills;
        },

        sendBillId: function (id) {
            this.sendId = id
            this.showOrderDetails = !this.showOrderDetails;
        },

        closeView: function () {
            this.showOrderDetails = !this.showOrderDetails;
        },

        async nextStatusBtn(id) {
            await axios.put('/billstatus/' + id);
            this.getAllBills();
        },

        async paidBtn(id) {
            await axios.put('/billstatus/paid/' + id);
            this.getAllBills();
        },

        async cancelBtn(id) {
            await axios.put('/billstatus/cancel/' + id);
            this.getAllBills();
        },

        formatDate(dateString) {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return new Intl.DateTimeFormat('es-ES', options).format(date);
        },

        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getAllBills();
            }.bind(this), 1000);
        }

    },
    components: { OrderDetails }
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