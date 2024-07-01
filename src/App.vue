<template>
    <div id="app">
        <div>
            <NavBar />
            <div class="auth-wrapper">
                <div class="auth-inner">
                    <router-view></router-view>
                </div>
            </div>
            <FooterComponent />
            <FloatingButton
                v-if="user"
                :isChatbotVisible="isChatbotVisible"
                @toggle-chatbot="toggleChatbot"
                ref="floatingButton"
            />
            <Chatbot
                v-if="user"
                :isVisible="isChatbotVisible"
                :position="chatbotPosition"
                ref="chatbot"
            />
        </div>
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import FooterComponent from './components/FooterComponent.vue';
import FloatingButton from './components/FloatingButton.vue';
import Chatbot from './components/Chatbot.vue';
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { mapState } from 'vuex';
import { jwtDecode } from 'jwt-decode';

export default {
    name: 'App',
    components: {
        NavBar,
        FooterComponent,
        FloatingButton,
        Chatbot
    },

    data() {
        return {
            isChatbotVisible: false,
            chatbotPosition: { x: 20, y: 20 },
        };
    },

    created() {
        this.getFoodsData(),
        this.getRolesData(),
        this.getAmountTypesData(),
        this.getSectionsData(),
        this.getInfosData(),
        this.getCategoriesData(),
        this.getStatusesData(),
        this.getIngredientsData()
    },

    computed: {
        ...mapState(["admin", "user"]),
        ...mapGetters(['isAuthenticated', 'getUser'])
    },

    mounted() {
        this.checkAuth();
        document.addEventListener('click', this.handleClickOutside);
    },

    beforeUnmount() { 
        document.removeEventListener('click', this.handleClickOutside);
    },

    methods: {
        ...mapActions([
            "getFoodsData",
            "getRolesData",
            "getAmountTypesData",
            "getSectionsData",
            "getInfosData",
            "getCategoriesData",
            "getIngredientsData",
            "getStatusesData",
            "logout"
        ]),
        ...mapMutations(["setAdmin"]),

        checkAuth() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    const currentTime = Date.now() / 1000;

                    if (decodedToken.exp < currentTime) {
                        this.logout();
                        this.$router.push('/');
                    } else {
                        this.$store.commit('setToken', token);
                        this.$store.commit('setUser', decodedToken);
                        
                        if (this.user.role_name !== "client") {
                            this.setAdmin("admin");
                        }
                    }
                } catch (e) {
                    console.error("Token inválido", e);
                    this.logout();
                    this.$router.push('/');
                }
            } else {
                this.$router.push('/');
            }
        },

        toggleChatbot(position) {
            this.isChatbotVisible = !this.isChatbotVisible;
            if (position) {
                this.chatbotPosition = position;
                console.log(this.chatbotPosition);
            }
        },

        handleClickOutside(event) {
            const chatbot = this.$refs.chatbot?.$el;
            const button = this.$refs.floatingButton?.$el;
            if (chatbot && !chatbot.contains(event.target) && button && !button.contains(event.target)) {
                this.isChatbotVisible = false;
            }
        },
    }
}
</script>

<style>
@import "./assets/css/global_style.css";
</style>
