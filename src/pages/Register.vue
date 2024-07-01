<template>
    <div class="register-container">
        <div class="register-form-container">
            <form id="registerForm" @submit="handleSubmit" novalidate autocomplete="off">
                <h3>Crea tu cuenta</h3>
                <div class="form-group">
                    <label for="uName">Introduce tu nombre:
                    </label>
                    <input type="text" name="uName" placeholder="tu nombre completo" id="uName" class="form-control"
                        v-model="registerObj.name" />
                    <p class="error-mess" v-if="errorObj.nameErr.length > 0">{{ errorObj.nameErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uEmail">Introduce tu correo:
                    </label>
                    <input type="email" name="uEmail" placeholder="ejemplo@yahoo.com" id="uEmail" class="form-control"
                        v-model="registerObj.email" />
                    <p class="error-mess" v-if="errorObj.emailErr.length > 0">{{ errorObj.emailErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uPass">Introduce tu contraseña:
                    </label>
                    <input type="password" name="uPass" placeholder="ejemplo1234E*" id="uPass"
                        class="form-control" v-model="registerObj.pass" />
                    <p class="error-mess" v-if="errorObj.passErr.length > 0">{{ errorObj.passErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uPassConfirm">Confirma tu contraseña:
                    </label>
                    <input type="password" name="uPassConfirm" placeholder="ejemplo1234E*" id="uPassConfirm"
                        class="form-control" v-model="registerObj.confirm" />
                    <p class="error-mess" v-if="errorObj.confirmErr.length > 0">{{ errorObj.confirmErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uPhone">Introduce tu número de teléfono:
                    </label>
                    <input type="tel" name="uPhone" placeholder="introduce tu número de teléfono" id="uPhone"
                        class="form-control" v-model="registerObj.phone" />
                    <p class="error-mess" v-if="errorObj.phoneErr.length > 0">{{ errorObj.phoneErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="uAddress">Introduce tu dirección:
                    </label>
                    <input type="text" name="uAddress" placeholder="introduce tu dirección" id="uAddress"
                        class="form-control" v-model="registerObj.address" />
                    <p class="error-mess" v-if="errorObj.addressErr.length > 0">{{ errorObj.addressErr[0] }}</p>
                </div>
                
                <div v-if="this.admin && user.role_name === 'admin'" class="form-group">
                    <label for="uType">Select user type:</label>
                    <select name="uType" id="uType" class="form-select" v-model="registerObj.typeUser">
                        <option value="" disabled>select role</option>
                        <option v-for="role in allRoles" :key="role.role_id" :value="role.role_id">{{ role.role_name }}</option>
                    </select>
                    <p class="error-mess" v-if="errorObj.typeErr.length > 0">{{ errorObj.typeErr[0] }}</p>
                </div>

                <div class="form-group">
                    <input type="submit" :value="(this.admin && user.role_name === 'admin') ? (this.isUpdateF) ? 'actualizar' : 'crear' : 'únete a nosotros'" class="btn" />
                    <p>tienes una cuenta? <router-link @click="scrollToTop()" to="/login">iniciar sesión</router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from "vuex";
export default {
    name: "Register",

    data() {
        return {
            registerObj: { name: "", email: "", pass: "", confirm: "", phone: "", address: "", typeUser: 5 },
            errorObj: { nameErr: [], emailErr: [], passErr: [], confirmErr: [], phoneErr: [], addressErr: [], typeErr: [] },
            matchUser: undefined,
            isUpdateF: undefined,
            idUser: undefined
        }
    },
    
    mounted() {
        const { user_data, isUpdate } = this.$route.query;

        if (isUpdate === "true" && user_data) {
            const userDataObj = JSON.parse(user_data);
            this.registerObj = {
                name: userDataObj.user_name,
                email: userDataObj.user_email,
                phone: userDataObj.user_phone,
                address: userDataObj.user_address,
                typeUser: userDataObj.role_id
            };
            this.isUpdateF = isUpdate;
            this.idUser = userDataObj.user_id;
        }
    },

    computed: {
        ...mapState(["allRoles", "admin", "user"]),
    },

    methods: {
        async getMatchUser(email) {
            let data = await axios.get('/users/' + email);
            this.matchUser = data.data;
        },

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        resetCheckErr: function () {
            this.errorObj.nameErr = [];
            this.errorObj.emailErr = [];
            this.errorObj.passErr = [];
            this.errorObj.confirmErr = [];
            this.errorObj.phoneErr = [];
            this.errorObj.addressErr = [];
            this.errorObj.typeErr = [];
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

            // Email validate
            if (!this.registerObj.email) {
                this.errorObj.emailErr.push("Es necesario introducir un correo electrónico");
            } else {
                if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.registerObj.email)) {
                    this.errorObj.emailErr.push('El correo electrónico debe ser válido');
                }
            }

            // Pass validate
            if (!this.registerObj.pass) {
                this.errorObj.passErr.push('Se requiere contraseña');
            } else {
                if (this.registerObj.pass.length < 8) {
                    this.errorObj.passErr.push('La contraseña debe tener más o igual a 8 caracteres');
                }
                
                if (!/[A-Z]/.test(this.registerObj.pass)) {
                    this.errorObj.passErr.push('La contraseña debe contener al menos 1 letra mayúscula');
                }
                
                if (!/[a-z]/.test(this.registerObj.pass)) {
                    this.errorObj.passErr.push('La contraseña debe contener al menos 1 letra minúscula');
                }
    
                if (!/[0-9]/.test(this.registerObj.pass)) {
                    this.errorObj.passErr.push('La contraseña debe contener al menos 1 número');
                }
                
                if (!/[!@#$%^&*]/.test(this.registerObj.pass)) {
                    this.errorObj.passErr.push('La contraseña debe contener al menos 1 carácter especial');
                }
            }

            // Confirm Pass validate
            if (!this.registerObj.confirm) {
                this.errorObj.confirmErr.push('Se requiere confirmar la contraseña');
            } else {
                if (this.registerObj.pass !== this.registerObj.confirm) {
                    this.errorObj.confirmErr.push('Confirmar la contraseña debe coincidir con la contraseña');
                }
            }

            // Phone validate
            if (!this.registerObj.phone) {
                this.errorObj.phoneErr.push('Es necesario introducir el número de teléfono');
            } else {
                if (!this.registerObj.phone.startsWith('5')) {
                    this.errorObj.phoneErr.push('Los números de teléfono deben comenzar con 5');
                }

                if (this.registerObj.phone.length != 8) {
                    this.errorObj.phoneErr.push('Los números de teléfono deben tener exactamente 8 dígitos');
                }

                if (!/[0-9]{8}/.test(this.registerObj.phone)) {
                    this.errorObj.phoneErr.push('Los números de teléfono solo pueden contener números');
                }
            }

            // Address validate
            if (!this.registerObj.address) {
                this.errorObj.addressErr.push("Es necesario introducir la dirección");
            }

            // User type validate
            if (!this.registerObj.typeUser) {
                this.errorObj.typeErr.push("Por favor seleccione un tipo de usuario");
            }
        },

        async handleSubmit(e) {
            e.preventDefault();

            this.checkForm();
            
            if (!this.checkEmptyErr()) {
                e.preventDefault();
            } else {
                e.preventDefault();

                const userData = {
                    user_name: this.registerObj.name,
                    user_email: this.registerObj.email,
                    user_phone: this.registerObj.phone,
                    user_address: this.registerObj.address,
                    user_password: this.registerObj.pass,
                    role_id: this.registerObj.typeUser
                };

                try {
                    if (this.isUpdateF === "true") {
                        await axios.put("/users/" + this.idUser, userData);
                    } else {
                        await this.getMatchUser(this.registerObj.email);
                        if (this.matchUser) {
                            this.errorObj.emailErr.push("La cuenta ya existe");
                            return;
                        }

                        await axios.post("/users/", userData);
                    }

                    if (this.admin && this.user.role_name === 'admin') {
                        this.$router.go(-1);
                    } else {
                        this.$router.push("/login");
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
