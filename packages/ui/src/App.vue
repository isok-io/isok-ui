<script>
import '@components-lit/molecules/other/ik-header/ik-header.js'

export default {
  data() {
    return {
      theme: 'light',
    };
  },
  mounted() {
    this.theme = localStorage.getItem('theme') || 'light';
    this.setTheme(this.theme);
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      this.setTheme(this.theme);
      localStorage.setItem('theme', this.theme);
    },
    setTheme(theme) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
  }
};
</script>

<template>
  <div class="app">
    <ik-header
        class="header"
        :optionsSelect="[
          { value: 'orga1', label: 'MyOrganisation' },
          { value: 'orga2', label: 'OtherOrganisation' },
        ]"
        fontSizeTitle="4em"
        fontSizeSelect="1.2em"
        widthSelect="20vw"
        iconSize="1.7em"
        connected=true
        width="97vw"
        :iconTheme="this.theme === 'dark' ? 'material-symbols:dark-mode-outline-rounded' : 'material-symbols:light-mode-outline-rounded'"
        @change-theme="toggleTheme()"
        @click-account="$router.push('/account')"
        @change-organization-value="(e) => console.log('change-organization-value', e)"
        @click-home="$router.push('/')"
    ></ik-header>
    <router-view />
  </div>
</template>

<style>
.app {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  transition: background-color 0.3s ease;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  z-index: 10;
}

:root.light .app {
  background-color: #D9D9D9;
}

:root.dark .app {
  background-color: #242424;
}
</style>
