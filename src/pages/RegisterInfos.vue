<template>
    <div class="register-container">
        <div class="register-form-container">
            <form id="registerForm" @submit="handleSubmit" novalidate autocomplete="off">
                <h3>Actualiza una información</h3>
                <div class="form-group">
                    <label for="iName">Introduce un nombre:
                    </label>
                    <input type="text" name="iName" placeholder="nombre de la información" id="iName" class="form-control"
                        v-model="registerObj.name" disabled="true" />
                    <p class="error-mess" v-if="errorObj.nameErr.length > 0">{{ errorObj.nameErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="iSpanish">Texto en español:
                    </label>
                    <input type="text" name="iSpanish" placeholder="texto en español de la información" id="iSpanish" class="form-control"
                        v-model="registerObj.spanishText" />
                    <p class="error-mess" v-if="errorObj.spanishTextErr.length > 0">{{ errorObj.spanishTextErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="iEnglish">Texto en inglés:
                    </label>
                    <input type="text" name="iEnglish" placeholder="texto en inglés de la información" id="iEnglish" class="form-control"
                        v-model="registerObj.englishText" />
                    <p class="error-mess" v-if="errorObj.englishTextErr.length > 0">{{ errorObj.englishTextErr[0] }}</p>
                </div>
                
                <div v-if="this.admin && user.role_name === 'business owner'" class="form-group">
                    <label for="iSection">Selecciona una sección:</label>
                    <select name="iSection" id="iSection" class="form-select" v-model="registerObj.section" disabled="true">
                        <option value="" disabled>select section</option>
                        <option v-for="section in allSections" :key="section.section_id" :value="section.section_id">{{ section.section_name }}</option>
                    </select>
                    <p class="error-mess" v-if="errorObj.sectionErr.length > 0">{{ errorObj.sectionErr[0] }}</p>
                </div>

                <div class="form-group">
                    <input type="submit" :value="((this.admin && user.role_name === 'business owner') && (this.isUpdateF)) ? 'actualizar' : 'crear'" class="btn" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from "vuex";
export default {
    name: "RegisterAmountTypes",

    data() {
        return {
            registerObj: { name: "", englishText: "", spanishText: "", section: "" },
            errorObj: { nameErr: [], englishTextErr: [], spanishTextErr: [], sectionErr: [] },
            matchInfo: undefined,
            isUpdateF: undefined,
            idInfo: undefined
        }
    },
    
    mounted() {
        const { info_data, isUpdate } = this.$route.query;

        if (isUpdate === "true" && info_data) {
            const infoDataObj = JSON.parse(info_data);
            this.registerObj = {
                name: infoDataObj.info_name,
                spanishText: infoDataObj.info_spanish_text,
                englishText: infoDataObj.info_english_text,
                section: infoDataObj.section_id
            };
            this.isUpdateF = isUpdate;
            this.idInfo = infoDataObj.info_id;
        }
    },

    computed: {
        ...mapState(["allSections", "admin", "user"]),
    },

    methods: {
        async getMatchInfo(name) {
            let data = await axios.get('/infos/' + name);
            this.matchInfo = data.data;
        },

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        resetCheckErr: function () {
            this.errorObj.nameErr = [];
            this.errorObj.englishTextErr = [];
            this.errorObj.spanishTextErr = [];
            this.errorObj.sectionErr = [];
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
            }

            // English text validate
            if (!this.registerObj.englishText) {
                this.errorObj.englishTextErr.push("Es necesario introducir un texto en inglés");
            }

            // Spanish text validate
            if (!this.registerObj.spanishText) {
                this.errorObj.englishTextErr.push("Es necesario introducir un texto en español");
            }

            // Section validate
            if (!this.registerObj.englishText) {
                this.errorObj.sectionErr.push("Es necesario introducir una sección");
            }
        },

        async handleSubmit(e) {
            e.preventDefault();

            this.checkForm();
            
            if (!this.checkEmptyErr()) {
                e.preventDefault();
            } else {
                e.preventDefault();

                const infoData = {
                    info_name: this.registerObj.name,
                    info_spanish_text: this.registerObj.spanishText,
                    info_english_text: this.registerObj.englishText,
                    section_id: this.registerObj.section
                };

                try {
                    if (this.isUpdateF === "true") {
                        await axios.put("/infos/" + this.idInfo, infoData);
                    } else {
                        await this.getMatchInfo(this.registerObj.name);
                        if (this.matchInfo) {
                            this.errorObj.nameErr.push("Amount type already exists");
                            return;
                        }

                        await axios.post("/amount_types/", infoData);
                    }

                    if (this.admin && this.user.role_name === 'business owner') {
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
