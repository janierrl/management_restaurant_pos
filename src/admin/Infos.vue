<template>
    <div class="admin-container">
        <div class="d-flex justify-content-between">
            <h1>Info Details</h1>
            <!-- <router-link class="btn" to="/register_info"  @click="handleLogout()">+ Add New</router-link> -->
        </div>
        <div class="table-responsive">
            <!-- PROJECT TABLE -->
            <table class="table colored-header datatable project-list">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Spanish Text</th>
                        <th>English Text</th>
                        <th>Section</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(b) in allInfos" :key="b.info_id">
                        <td>{{ b.info_name }}</td>
                        <td>{{ b.info_spanish_text }}</td>
                        <td>{{ b.info_english_text }}</td>
                        <td>{{ b.section_name }}</td>
                        <td>
                            <button class="action-btn" @click="updateBtn(b.info_name)">
                                Update
                            </button>

                            <!-- <button class="cancel-btn" @click="deleteBtn(b.info_id)">
                                Delete
                            </button> -->
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
            allInfos: [],
            showOrderDetails: false,
            sendId: undefined,
            interval: "",
        }
    },

    created() {
        this.getAllInfos();
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
        ...mapState(["admin", "user"]),
    },

    methods: {
        ...mapMutations(["setAdmin"]),
        ...mapMutations(["setUser"]),

        async getAllInfos() {
            const infos = (await axios.get('/infos')).data;

            for (const info of infos) {
                const sectionId = info.section_id;
                const sectionResponse = await axios.get('/sections/' + sectionId);
                console.log('sectionResponse: ', sectionResponse)
                const sectionName = sectionResponse.data.section_name;
                info.section_name = sectionName;
                delete info.section_id;
            }
            
            this.allInfos = infos;
        },

        async updateBtn(id) {
            const data = await axios.get('/infos/' + id);
            this.$router.push({
                path: '/register_infos',
                query: {
                    info_data: JSON.stringify(data.data),
                    isUpdate: true
                }
            });
        },

        // async deleteBtn(id) {
        //     await axios.delete('/amount_types/' + id);
        //     this.getAllInfos();
        // },

        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getAllInfos();
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