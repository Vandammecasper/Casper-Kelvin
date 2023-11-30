<template>
    <div class="tooltip-container" @mouseover="showTooltip" @mouseleave="hideTooltip">
      <slot></slot>
      <div v-if="isVisible" class="tooltip">
        {{ content }}
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    props: {
      content: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isVisible: false,
      };
    },
    methods: {
      showTooltip() {
        this.isVisible = true;
      },
      hideTooltip() {
        this.isVisible = false;
      },
    },
  });
  </script>
  
  <style scoped>
  .tooltip-container {
    position: relative;
    display: inline-block;
  }
  
  .tooltip {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 14px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
    min-width: 160px;
  }
  
  .tooltip-container:hover .tooltip {
    opacity: 1;
    visibility: visible;
  }
  </style>
  