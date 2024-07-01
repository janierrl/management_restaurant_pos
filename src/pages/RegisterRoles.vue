<template>
    <div class="register-container">
        <div class="register-form-container">
            <form id="registerForm" @submit="handleSubmit" novalidate autocomplete="off">
                <h3>Crea un rol</h3>
                <div class="form-group">
                    <label for="rName">Introduce un rol:
                    </label>
                    <input type="text" name="rName" placeholder="nombre del rol" id="rName" class="form-control"
                        v-model="registerObj.name" />
                    <p class="error-mess" v-if="errorObj.nameErr.length > 0">{{ errorObj.nameErr[0] }}</p>
                </div>

                <div class="form-group">
                    <input type="submit" :value="((this.admin && user.role_name === 'admin') && (this.isUpdateF)) ? 'update' : 'create'" class="btn" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from "vuex";
export default {
    name: "RegisterRole",

    data() {
        return {
            registerObj: { name: "" },
            errorObj: { nameErr: [] },
            matchRole: undefined,
            isUpdateF: undefined,
            idRole: undefined
        }
    },
    
    mounted() {
        const { role_data, isUpdate } = this.$route.query;

        if (isUpdate === "true" && role_data) {
            const roleDataObj = JSON.parse(role_data);
            this.registerObj = {
                name: roleDataObj.role_name
            };
            this.isUpdateF = isUpdate;
            this.idRole = roleDataObj.role_id;
        }
    },

    computed: {
        ...mapState(["admin", "user"]),
    },

    methods: {
        async getMatchRole(name) {
            let data = await axios.get('/roles/name/' + name);
            this.matchRole = data.data;
        },

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        resetCheckErr: function () {
            this.errorObj.nameErr = [];
        },

        checkEmptyErr: function () {
            for (var typeErr in this.errorObj) {
                if (this.errorObj[typeErr].length != 0) {
                    return false;
                }
            }
            return true;
        },

        checkForm: function () {
            this.resetCheckErr();

            // Name validate
            if (!this.registerObj.name) {
                this.errorObj.nameErr.push("Es necesario introducir un nombre");
            } else {
                if (!/^[A-Za-záÁéÉíÍóÓúÚ]+$/.test(this.registerObj.name.replace(/\s/g, ""))) {
                    this.errorObj.nameErr.push('Un nombre sólo puede contener letras');
                }
            }
        },

        async handleSubmit(e) {
            e.preventDefault();

            this.checkForm();
            
            if (!this.checkEmptyErr()) {
                e.preventDefault();
            } else {
                e.preventDefault();

                const roleData = {
                    role_name: this.registerObj.name
                };

                try {
                    if (this.isUpdateF === "true") {
                        await axios.put("/roles/" + this.idRole, roleData);
                    } else {
                        await this.getMatchRole(this.registerObj.name);
                        if (this.matchRole) {
                            this.errorObj.nameErr.push("Role already exists");
                            return;
                        }

                        await axios.post("/roles/", roleData);
                    }

                    if (this.admin && this.user.role_name === 'admin') {
                        this.$router.go(-1);
                    } else {
                        this.$router.push("/");
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            }
        }
    },
};
</script>


<style scoped>
.register-container {
    padding: 2rem 9%;
}

.register-container .register-form-container {
    background: #fff;

}

.register-container .register-form-container form {
    position: relative;
    left: 50%;
    transform: translate(-50%, 0%);
    max-width: 70rem;
    width: 100%;
    box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border-radius: 0.5rem;
    animation: fadeUp 0.4s linear;
}

.register-container .register-form-container form h3 {
    padding-bottom: 1rem;
    font-size: 2rem;
    text-transform: uppercase;
    color: #130f40;
    margin: 0;
}

.register-container .register-form-container form .form-control {
    margin: 0.7rem 0;
    border-radius: 0.5rem;
    background: #f7f7f7;
    padding: 2rem 1.2rem;
    font-size: 1.6rem;
    color: #130f40;
    text-transform: none;
    width: 100%;
    border: none;
}

.register-container .register-form-container form .form-select {
    margin: 0.7rem 0;
    border-radius: 0.5rem;
    background: #f7f7f7;
    padding: 2rem 1.2rem;
    font-size: 1.6rem;
    color: #130f40;
    text-transform: none;
    width: 100%;
    border: none;
}

.register-container .register-form-container form label {
    font-size: 2rem;
    margin: 0;
    padding: 0;
}

.register-container .register-form-container form span {
    font-size: 18px;
    padding-left: 5px;
    padding-right: 40px;
}

.register-container .register-form-container form .btn {
    margin: 1rem 0;
    width: 100%;
    text-align: center;
}

.register-container .register-form-container form p {
    padding-top: 1rem;
    font-size: 1.5rem;
    color: #666;
    margin: 0;
}

.register-container .register-form-container form p a {
    color: #27ae60;
}

.register-container .register-form-container form p a:hover {
    color: #130f40;
    text-decoration: underline;
}

.register-container .register-form-container form .form-group {
    margin: 0;
}

.register-container .register-form-container form .form-group .error-mess {
    font-size: 1.5rem;
    position: relative;
    color: rgb(243, 47, 47);
    margin: 0;
    padding: 0;
}
</style>
