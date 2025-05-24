<script>
import '@components-lit/molecules/other/ik-header/ik-header.js'

export default {
  data() {
    return {
      theme: 'light',
      organizations: [
        { value: 'orga1', label: 'MyOrganisation' },
        { value: 'orga2', label: 'OtherOrganisation' },
      ],
      organizationSelect: 'org1',
    };
  },
  mounted() {
    this.theme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light') || 'light';
    this.setTheme(this.theme);
    this.setOrganization(localStorage.getItem('organization') || this.organizations[0].value);
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
    },
    setOrganization(organization) {
      this.organizationSelect = organization;
      localStorage.setItem('organization', organization);
    },
    isConnected(){
      return !!localStorage.getItem('user-token');
    }
  }
};
</script>

<template>
  <div class="app">
    <ik-header
        class="header"
        :optionsSelect="this.organizations"
        fontSizeTitle="4em"
        fontSizeSelect="1.2em"
        widthSelect="20vw"
        iconSize="1.7em"
        width="97vw"
        :valueSelect="this.organizationSelect"
        :iconTheme="this.theme === 'dark' ? 'material-symbols:dark-mode-outline-rounded' : 'material-symbols:light-mode-outline-rounded'"
        :connected="this.isConnected()"
        @ik-header:click-theme="toggleTheme()"
        @ik-header:click-account="$router.push('/account')"
        @ik-header:change-organization="(e) => this.setOrganization(e.detail.value)"
        @ik-header:click-title="$router.push('/')"
    ></ik-header>
    <router-view />
  </div>
</template>

<style>
.app {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  width: 100vw;
  transition: background-color 0.3s ease;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
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
