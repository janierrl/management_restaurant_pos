<template>
    <button
      class="floating-button"
      :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"
      @mousedown="startDrag"
      @click="toggleChatbot"
    >
        <font-awesome-icon style="font-size: 18px;" icon="robot" />
    </button>
  </template>
  
  <script>
  export default {
    props: {
      isChatbotVisible: Boolean,
    },
    data() {
      return {
        dragging: false,
        position: { x: 20, y: 20 }, // Posición inicial del botón flotante
        offset: { x: 0, y: 0 }, // Offset para ajustar la posición del botón al arrastrarlo
      };
    },
    methods: {
      toggleChatbot() {
      this.$emit('toggle-chatbot', this.position);
      },
      startDrag(event) {
        this.dragging = true;
        this.offset.x = event.clientX - this.position.x;
        this.offset.y = event.clientY - this.position.y;
        document.addEventListener('mousemove', this.moveButton);
        document.addEventListener('mouseup', this.stopDrag);
      },
      moveButton(event) {
        if (!this.dragging) return;
        this.position.x = event.clientX - this.offset.x;
        this.position.y = event.clientY - this.offset.y;
      },
      stopDrag() {
        this.dragging = false;
        document.removeEventListener('mousemove', this.moveButton);
        document.removeEventListener('mouseup', this.stopDrag);
      },
    },
  };
  </script>
  
  <style scoped>
  .floating-button {
    position: fixed;
    bottom: 40px;
    right: 40px;
    background-color: #27ae60;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
  .floating-button:hover {
    background-color: #f38609;
  }
  </style>
  