<script>
import '@components-lit/molecules/organization/ik-organizations-list/ik-organizations-list.js'
import '@components-lit/molecules/organization/ik-organization-form-creation/ik-organization-form-creation.js'
import '@components-lit/molecules/organization/ik-organization-form-update/ik-organization-form-update.js'
import '@components-lit/atoms/ik-button/ik-button.js'
import {OrganisationsApi} from "@client/OrganisationsApi.js";
import {UsersApi} from "@client/UsersApi.js";
import {Configuration} from "client/src/index.js";
import {apiBase} from "../consts.js";

export default {
  data(){
    return {
      modal: undefined,
      organizations: [],
      activeOrganization: {},
      errorMessage: '',
      organizationsApi: new OrganisationsApi(new Configuration({
        basePath: apiBase,
        accessToken: localStorage.getItem('user-token')
      })),
      usersApi: new UsersApi(new Configuration({basePath: apiBase, accessToken: localStorage.getItem('user-token')}))
    }
  },
  async mounted() {
    await this.fetchOrganizations()
  },
  methods: {
    async fetchOrganizations() {
      const simpleOrgaList = await this.organizationsApi.listOrgsV1()
      this.organizations = await Promise.all(simpleOrgaList.map(async org =>
          await this.organizationsApi.getOrgV1({organisationId: org.id})));
    },
    toggleModal(state){
      this.modal = state;
      this.errorMessage = '';
    },
    async updateOrganization(newData) {
      const old = this.activeOrganization;

      if (old.name !== newData.name) {
        await this.organizationsApi.renameOrgV1({
          organisationId: old.id,
          organisationInput: {name: newData.name}
        });
      }

      const oldMembers = old.members;
      const newMembers = newData.members;

      const added = newMembers.filter(m => !oldMembers.map(m => m.email).includes(m));
      for (const member of added) {
        await this.organizationsApi.addOrgMemberV1({
          organisationId: old.id,
          body: member,
        });
      }

      const removed = oldMembers.filter(m => !newMembers.includes(m.email));
      for (const member of removed) {
        await this.organizationsApi.removeOrgMemberV1({
          organisationId: old.id,
          userId: member.id
        });
      }

      this.toggleModal(undefined);

      await this.fetchOrganizations()

      this.$refs.orgList.requestUpdate();
    },
    async deleteOrganization() {
      const confirmed = window.confirm("Are you sure you want to delete this organization?");
      if(confirmed) {
        await this.organizationsApi.deleteOrgV1({organisationId: this.activeOrganization.id});
        this.toggleModal(undefined);
        await this.fetchOrganizations()
        this.$refs.orgList.requestUpdate();
      }
    },
    async leaveOrganization(organization) {
      const confirmed = window.confirm("Are you sure you want to leave this organization?");
      if(confirmed) {
        const user = await this.usersApi.getMeV1();
        await this.organizationsApi.removeOrgMemberV1({organisationId: organization.id, userId: user.id});
        await this.fetchOrganizations()
        this.$refs.orgList.requestUpdate();
      }
    },
    async addOrganization(organization) {
      if (organization.name !== '') {
        await this.organizationsApi.createOrgV1({organisationInput: organization});
        this.toggleModal(undefined);
        await this.fetchOrganizations()
        this.$refs.orgList.requestUpdate();
      } else {
        this.errorMessage = "You need to enter a name to create an organization.";
      }
    }
  }
}
</script>

<template>
  <ik-organizations-list
    ref="orgList"
    @ik-organizations-list:click-add="() => this.modal = 'creation'"
    @ik-organization-list:click-settings="(e) => {this.activeOrganization = e.detail.organization; this.modal = 'update'}"
    @ik-organization-list:click-leave="(e) => this.leaveOrganization(e.detail.organization)"
    :organizationsList="this.organizations"
    fontSizeOrgaTitle="2.5em"
  ></ik-organizations-list>
  <div v-if="modal">
    <div class="modal-backdrop" @click="() => this.toggleModal(undefined)"></div>
    <div class="modal">
      <ik-button type="icon" icon="material-symbols:close-rounded" iconSize="1.3em" style="margin: -1em" @click="() => this.toggleModal(undefined)"></ik-button>
      <ik-organization-form-creation v-if="modal === 'creation'"
        :errorMessage="errorMessage"
        @ik-organization-form-creation:click-create="(e) => this.addOrganization(e.detail)"
      ></ik-organization-form-creation>
      <ik-organization-form-update v-if="modal === 'update'"
        :nameOrga="this.activeOrganization.name"
        :membersOrga="this.activeOrganization.members.map(m => m.email)"
         @ik-organization-form-update:click-save="(e) => this.updateOrganization(e.detail)"
         @ik-organization-form-update:click-delete="() => this.deleteOrganization()"
      ></ik-organization-form-update>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--bg);
  padding: 2em;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  z-index: 1001;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
</style>