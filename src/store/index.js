import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
    state() {
        return {
            allFoods: [],
            allRoles: [],
            allAmountTypes: [],
            allSections: [],
            allInfos: [],
            allCategories: [],
            allIngredients: [],
            allStatuses: [],
            user: undefined,
            admin: undefined,
            token: localStorage.getItem('token') || '',
            errorMessage: undefined,
            isAuthenticated: false,
        };
    },
    mutations: {
        setFoodsData(state, payload) {
            state.allFoods = payload;
        },
        setRolesData(state, payload) {
            state.allRoles = payload;
        },
        setAmountTypesData(state, payload) {
            state.allAmountTypes = payload;
        },
        setSectionsData(state, payload) {
            state.allSections = payload;
        },
        setInfosData(state, payload) {
            state.allInfos = payload;
        },
        setCategoriesData(state, payload) {
            state.allCategories = payload;
        },
        setIngredientsData(state, payload) {
            state.allIngredients = payload;
        },
        setStatusesData(state, payload) {
            state.allStatuses = payload;
        },
        setUser(state, payload) {
            state.user = payload;
            state.isAuthenticated = true;
        },
        setAdmin(state, payload) {
            state.admin = payload;
        },
        setToken(state, token) {
            state.token = token;
            state.isAuthenticated = true;
        },
        setErrorMessage(state, payload) {
            state.errorMessage = payload;
            state.isAuthenticated = false;
        },
        logout(state) {
            state.user = undefined;
            state.admin = undefined;
            state.token = '';
            state.isAuthenticated = false;
        }
    },
    actions: {
        async getFoodsData(context) {
            await axios.get('/foods')
                .then(function (response) {
                    context.commit("setFoodsData", response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        async getRolesData(context){
            await axios.get('/roles')
            .then(function (response) {
                context.commit("setRolesData", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        async getAmountTypesData(context){
            await axios.get('/amount_types')
            .then(function (response) {
                context.commit("setAmountTypesData", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        async getSectionsData(context){
            await axios.get('/sections')
            .then(function (response) {
                context.commit("setSectionsData", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        async getInfosData(context){
            await axios.get('/infos')
            .then(function (response) {
                context.commit("setInfosData", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        async getCategoriesData(context){
            await axios.get('/categories')
            .then(function (response) {
                context.commit("setCategoriesData", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        async getIngredientsData(context){
            await axios.get('/ingredients')
            .then(function (response) {
                context.commit("setIngredientsData", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        async getStatusesData(context){
            await axios.get('/statuses')
            .then(function (response) {
                context.commit("setStatusesData", response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        async loginUser(context, credentials) {
            try {
                const response = await axios.post('/users/login', {
                    email: credentials.email,
                    password: credentials.password
                });
                if (response.data.token && response.data.user) {
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    context.commit('setToken', token);
                    context.commit('setUser', response.data.user);
                    context.commit('setErrorMessage', undefined);
                } else {
                    context.commit('setErrorMessage', response.data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                throw new Error('Login failed');
            }
        },

        logout(context) {
            localStorage.removeItem('token');
            context.commit('logout');
        }
    },
    
    getters: {
        isAuthenticated: state => state.isAuthenticated,
        getUser: state => state.user,
    }
})

export default store;