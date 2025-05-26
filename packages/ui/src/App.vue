<script>
import '@components-lit/molecules/other/ik-header/ik-header.js'
import {OrganisationsApi} from "@client";
import {Configuration} from "client/src/index.js";
import {apiBase} from "./consts.js";

export default {
  data() {
    return {
      theme: 'light',
      organizations: [],
      organizationSelect: '',
    };
  },
  async mounted() {
    this.theme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light') || 'light';
    this.setTheme(this.theme);
    if (this.isConnected()) {
      this.organizations = await this.getOrganization();
      this.setOrganization(localStorage.getItem('organization') || this.organizations[0].value);
    }
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
    },
    async getOrganization() {
      const organizationsApi = new OrganisationsApi(new Configuration({
        basePath: apiBase,
        accessToken: localStorage.getItem('user-token')
      }));

      const orgs = await organizationsApi.listOrgsV1();
      if (orgs.length === 0) {
        const id = await organizationsApi.createOrgV1({organisationInput: {name: 'My Organisation'}});
        orgs.push({id: id, name: 'My Organisation', tags: {}});
        localStorage.setItem('organization', id);
      }

      return orgs.map(org => {
        return {value: org.id, label: org.name}
      });
    },
    async reload() {
      this.organizations = await this.getOrganization();
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
    <router-view @reload="reload" />
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
