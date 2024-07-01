<template>
    <div class="register-container">
        <div class="register-form-container">
            <form id="registerForm" @submit="handleSubmit" novalidate autocomplete="off">
                <h3>Crea un platillo</h3>
                <div class="form-group">
                    <label for="fName">Introduce un nombre:
                    </label>
                    <input type="text" name="fName" placeholder="nombre del platillo" id="fName" class="form-control"
                        v-model="registerObj.name" :disabled="user.role_name === 'business owner'" />
                    <p class="error-mess" v-if="errorObj.nameErr.length > 0">{{ errorObj.nameErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="fPrice">Introduce un precio:
                    </label>
                    <input type="number" name="fPrice" placeholder="ejemplo: 10 o 10.5" id="fPrice" class="form-control"
                        v-model="registerObj.price" :disabled="user.role_name === 'chef'" />
                    <p class="error-mess" v-if="errorObj.priceErr.length > 0">{{ errorObj.priceErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="fDiscount">Introduce un descuento:
                    </label>
                    <input type="number" name="fDiscount" placeholder="ejemplo: 10 o 10.5" id="fDiscount" class="form-control"
                        v-model="registerObj.discount" :disabled="user.role_name === 'chef'" />
                    <p class="error-mess" v-if="errorObj.discountErr.length > 0">{{ errorObj.discountErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="fDesc">Introduce una descripción:
                    </label>
                    <input type="text" name="fDesc" placeholder="descripción del platillo" id="fDesc" class="form-control"
                        v-model="registerObj.desc" :disabled="user.role_name === 'business owner'" />
                    <p class="error-mess" v-if="errorObj.descErr.length > 0">{{ errorObj.descErr[0] }}</p>
                </div>
                
                <div class="form-group">
                    <label for="fType">Selecciona el tipo:</label>
                    <select name="fType" id="fType" class="form-select" v-model="registerObj.fType" :disabled="user.role_name === 'business owner'">
                        <option value="" disabled>selecciona el tipo de platillo</option>
                        <option key="carne" value="carne">carne</option>
                        <option key="vegano" value="vegano">vegano</option>
                    </select>
                    <p class="error-mess" v-if="errorObj.typeErr.length > 0">{{ errorObj.typeErr[0] }}</p>
                </div>
                
                <div class="form-group">
                    <label for="fCategory">Selecciona la categoría:</label>
                    <select name="fCategory" id="fCategory" class="form-select" v-model="registerObj.category" :disabled="user.role_name === 'business owner'">
                        <option value="" disabled>select la categoría del platillo</option>
                        <option v-for="category in allCategories" :key="category.category_id" :value="category.category_id">{{ category.category_name }}</option>
                    </select>
                    <p class="error-mess" v-if="errorObj.categoryErr.length > 0">{{ errorObj.categoryErr[0] }}</p>
                </div>

                <div class="form-group">
                    <label for="fIngredient">Selecciona ingredientes:</label>
                    <p class="error-mess" v-if="errorObj.ingredientsErr.length > 0">{{ errorObj.ingredientsErr[0] }}</p>
                    <select multiple name="fIngredient" id="fIngredient" class="form-select" v-model="selectedIngredients" :disabled="user.role_name === 'business owner'">
                        <option value="" disabled>selecciona los ingredientes del platillo</option>
                        <option v-for="ingredient in allIngredients" :key="ingredient.ingredient_id" :value="ingredient">{{ ingredient.ingredient_name }}</option>
                    </select>
                    <div v-for="ingredient in registerObj.ingredients" :key="ingredient.ingredient_id" class="form-group">
                        <label :for="'ingredientAmount_' + ingredient.ingredient_id">Cantidad para {{ ingredient.ingredient_name }}({{ ingredient.amount_type_symbol }}):</label>
                        <input type="number" :id="'ingredientAmount_' + ingredient.ingredient_id" v-model="ingredient.amount" min="0" step="1" />
                    </div>
                    <p class="error-mess" v-if="errorObj.ingredientsErr.length > 0">{{ errorObj.ingredientsErr[0] }}</p>
                </div>

                <div v-if="allStatuses.length > 0" class="form-group">
                    <label for="fStatus">Selecciona estados:</label>
                    <select multiple name="fStatus" id="fStatus" class="form-select" v-model="registerObj.statuses" :disabled="user.role_name === 'business owner'">
                        <option value="" disabled>selecciona los estados del platillos</option>
                        <option v-for="status in allStatuses" :key="status.status_id" :value="status">{{ status.status_name }}</option>
                    </select>
                    <p class="error-mess" v-if="errorObj.statusesErr.length > 0">{{ errorObj.statusesErr[0] }}</p>
                </div>
                <div class="form-group">
                    <label for="fName">Imágen:
                    </label>
                    <input type="file" ref="fileInput" accept="image/*" class="form-control" @change="handleFileChange" :disabled="user.role_name === 'business owner'">
                    <p class="error-mess" v-if="errorObj.imageErr.length > 0">{{ errorObj.imageErr[0] }}</p>
                </div>

                <div v-if="this.previewURL">
                   <img :src="this.previewURL" alt="Preview" style="max-width: 200px; max-height: 200px;">
                </div>

                <div class="form-group">
                    <input type="submit" :value="((this.admin && (user.role_name === 'chef' || user.role_name === 'business owner')) && (this.isUpdateF)) ? 'actualizar' : 'crear'" class="btn" />
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from "vuex";
export default {
    name: "RegisterFoods",

    data() {
        return {
            selectedIngredients: [],
            registerObj: { name: "", price: 0, discount: 0, desc: "", fType: "", category: "", ingredients: [], statuses: [], image: null },
            errorObj: { nameErr: [], priceErr: [], discountErr: [], descErr: [], typeErr: [], categoryErr: [], ingredientsErr: [], statusesErr: [], imageErr: [] },
            matchFood: undefined,
            isUpdateF: undefined,
            idFood: undefined,
            previewURL: undefined,
            isImageUpdated: false
        }
    },

    watch: {
        selectedIngredients(newValues) {
            const existingIngredientsMap = new Map();
            this.registerObj.ingredients.forEach(ingredient => {
                existingIngredientsMap.set(ingredient.ingredient_id, ingredient);
            });

            newValues.forEach(async ingredient => {
            if (!existingIngredientsMap.has(ingredient.ingredient_id)) {
                const amount_type_name = await axios.get('/amount_types/' + ingredient.amount_type_id);
                this.registerObj.ingredients.push({
                    ingredient_id: ingredient.ingredient_id,
                    ingredient_name: ingredient.ingredient_name,
                    amount_type_symbol: amount_type_name.data.amount_type_symbol,
                    amount: 0,
                });
            }
            });

            this.registerObj.ingredients = this.registerObj.ingredients.filter(ingredient =>
                newValues.some(item => item.ingredient_id === ingredient.ingredient_id)
            );
        },
    },
    
    mounted() {
        const { food_data, isUpdate } = this.$route.query;

        if (isUpdate === "true" && food_data) {
            const foodDataObj = JSON.parse(food_data);
            this.registerObj = {
                name: foodDataObj.food_name,
                price: foodDataObj.food_price,
                fType: foodDataObj.food_type,
                discount: foodDataObj.food_discount,
                desc: foodDataObj.food_desc,
                category: foodDataObj.category_id,
                ingredients: foodDataObj.food_ingredient,
                statuses: foodDataObj.food_status
            };
            this.isUpdateF = isUpdate;
            this.previewURL = foodDataObj.food_src;
            this.idFood = foodDataObj.food_id;
        }
    },

    computed: {
        ...mapState(["allCategories", "allIngredients", "allStatuses", "admin", "user"]),
    },

    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.registerObj.image = file;
                this.isImageUpdated = true;
                this.previewURL = URL.createObjectURL(file);
            }
        },

        async getMatchFood(id) {
            let data = await axios.get('/foods/' + id);
            this.matchFood = data.data;
        },

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        resetCheckErr: function () {
            this.errorObj.nameErr = [];
            this.errorObj.priceErr = [];
            this.errorObj.discountErr = [];
            this.errorObj.descErr = [];
            this.errorObj.typeErr = [];
            this.errorObj.categoryErr = [];
            this.errorObj.ingredientsErr = [];
            this.errorObj.statusesErr = [];
            this.errorObj.imageErr = [];
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

            // Price validate
            if (!this.registerObj.price && this.user.role_name === 'business owner') {
                this.errorObj.priceErr.push("Es necesario introducir un precio");
            } else {
                if (!/^\d+(\.\d+)?$/.test(this.registerObj.price)) {
                    this.errorObj.priceErr.push("El precio debe ser un número entero o decimal");
                }
            }
            
            // Discount validate
            if (!this.registerObj.discount && this.user.role_name === 'business owner') {
                this.errorObj.discountErr.push("Es necesario introducir el descuento");
            } else {
                if (!/^\d+(\.\d+)?$/.test(this.registerObj.discount)) {
                    this.errorObj.discountErr.push("El descuento debe ser un número entero o decimal");
                } else {
                    const discount = parseFloat(this.registerObj.discount);
                    const price = parseFloat(this.registerObj.price);

                    if (discount > price) {
                        this.errorObj.discountErr.push("El descuento debe ser menor que el precio");
                    }
                }
            }
            
            // Desc validate
            if (!this.registerObj.desc) {
                this.errorObj.descErr.push("Es necesario introducir la descripción");
            }

            // Food type validate
            if (!this.registerObj.fType) {
                this.errorObj.typeErr.push("Por favor seleccione un tipo de platillo");
            }

            // Category validate
            if (!this.registerObj.category) {
                this.errorObj.categoryErr.push("Por favor seleccione una categoría de platillo");
            }

            // Ingredients validate
            if (this.registerObj.ingredients.length === 0) {
                this.errorObj.ingredientsErr.push("Por favor seleccione uno o más ingredientes");
            }

            // Status validate
            if (this.registerObj.statuses.length === 0) {
                this.errorObj.statusesErr.push("Por favor seleccione uno o más estados");
            }

            // Image validate
            if (!this.registerObj.image && this.isUpdateF === undefined) {
                this.errorObj.imageErr.push("Por favor cargue una imágen");
            }
        },

        async handleSubmit(e) {
            e.preventDefault();

            this.checkForm();

            if (!this.checkEmptyErr()) {
                e.preventDefault();
            } else {
                e.preventDefault();

                const formData = new FormData();
                formData.append('name', this.registerObj.name);
                formData.append('price', this.registerObj.price);
                formData.append('type', this.registerObj.fType);
                formData.append('discount', this.registerObj.discount);
                formData.append('desc', this.registerObj.desc);
                formData.append('category', this.registerObj.category);
                formData.append('ingredients', JSON.stringify(this.registerObj.ingredients));
                formData.append('statuses', JSON.stringify(this.registerObj.statuses));
                formData.append('isImageUpdated', this.isImageUpdated);

                if (this.isImageUpdated) {
                    formData.append('image', this.registerObj.image);
                }

                try {
                    if (this.isUpdateF === "true") {
                        await axios.put("/foods/" + this.idFood, formData);
                    } else {
                        await this.getMatchFood(this.registerObj.name);
                        if (this.matchFood) {
                                this.errorObj.nameErr.push("El platillo ya existe");
                            return;
                        }

                        await axios.post("/foods/", formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        });
                    }

                    if (this.admin && (this.user.role_name === 'chef' || this.user.role_name === 'business owner')) {
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
.ingredient-amount {
    margin-top: 10px;
}

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
