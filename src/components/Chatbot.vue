<template>
  <div
    v-if="isVisible"
    :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"
    class="chatbot"
    @click.stop
  >
    <div class="messages" ref="messagesContainer">
      <ChatMessage
        v-for="(msg, index) in messages"
        :key="index"
        :message="msg.text"
        :isUser="msg.isUser"
        :options="msg.options"
        @option-clicked="handleOptionClick"
      />
    </div>
  </div>
</template>

<script>
import ChatMessage from './ChatMessage.vue';

export default {
  props: {
    isVisible: Boolean,
    position: Object,
  },
  components: {
    ChatMessage,
  },
  data() {
    return {
      messages: [
        {
          text: 'Hola! Bienvenido a TanoBot!, Estoy aquí para ayudarte a sacar el máximo provecho de Tanokura Web',
          isUser: false,
          options: ['Hola'],
        },
      ],
      conversationFlow: {
        'Hola': [
          {
            text: 'TanoBot es un asistente virtual diseñado para enriquecer tu experiencia con Tanokura.',
            isUser: false,
          },
          {
            text: 'Permíteme presentarte las características que TanoBot tiene para ofrecer, ¿Estás listo/a para explorar?',
            isUser: false,
            options: ['Sí, vamos allá', 'No estoy seguro/a, ¿puedes explicarme más?'],
          },
        ],
        'Sí, vamos allá': [
          {
            text: 'Genial! Aquí tienes algunas de las características...',
            isUser: false,
          },
          // Añade más mensajes o lógica aquí
        ],
        'No estoy seguro/a, ¿puedes explicarme más?': [
          {
            text: 'Claro, déjame explicarte...',
            isUser: false,
          },
          // Añade más mensajes o lógica aquí
        ],
      },
    };
  },
  methods: {
    handleOptionClick(option) {
      // Usuario selecciona una opción
      this.messages.push({ text: option, isUser: true });
      // Eliminar las opciones de todos los mensajes anteriores
      this.messages.forEach(msg => {
        if (msg.options) {
          delete msg.options;
        }
      });
      this.$nextTick(() => this.scrollToBottom());
      setTimeout(() => {
        // Bot responde basado en la opción seleccionada
        const response = this.conversationFlow[option];
        if (response) {
          response.forEach((msg) => {
            this.messages.push(msg);
            this.$nextTick(() => this.scrollToBottom());
          });
        } else {
          this.messages.push({ text: "Lo siento, no entiendo esa opción.", isUser: false });
          this.$nextTick(() => this.scrollToBottom());
        }
      }, 1000);
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
  },
  mounted() {
    this.scrollToBottom();
  },
};
</script>

<style scoped>
.chatbot {
  position: fixed;
  bottom: 100px;
  right: 40px;
  width: 250px;
  max-height: 350px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 999;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px; /* Reduce el espacio entre mensajes */
}

.input-container {
  display: flex;
  align-items: center;
  border-top: 1px solid #ccc;
  padding: 10px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
