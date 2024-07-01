<template>
    <div :class="['message', { 'user-message': isUser }]">
      <font-awesome-icon v-if="!isUser" icon="robot" class="bot-icon" />
      <div class="message-text">{{ message }}</div>
      <div v-if="options" class="options">
        <button v-for="option in options" :key="option" @click="$emit('option-clicked', option)">
          {{ option }}
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      message: String,
      isUser: Boolean,
      options: Array,
    },
  };
  </script>
  
  <style scoped>
  .message {
    max-width: 80%;
    padding: 10px 15px;
    border-radius: 8px;
    position: relative;
    overflow-wrap: break-word;
  }
  
  .user-message {
    align-self: flex-end;
    background-color: #dcf8c6; /* Background for user messages */
    color: black; /* Text color for user messages */
  }
  
  .message-text {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
  
  .message::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    z-index: 1;
  }
  
  .message:not(.user-message)::before {
    border-width: 8px 10px 8px 0;
    border-color: transparent #f1f0f0 transparent transparent;
    top: 50%;
    left: -9px;
    transform: translateY(-50%);
  }
  
  .user-message::before {
    border-width: 8px 0 8px 10px;
    border-color: transparent transparent transparent #dcf8c6;
    top: 50%;
    right: -9px;
    transform: translateY(-50%);
  }
  
  .options {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;
  }
  
  .options button {
    background-color: #27ae60;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 5px 10px;
    margin: 2px;
    cursor: pointer;
    text-align: left;
  }

.options button:hover {
  background-color: #f38609;
}
  </style>
  