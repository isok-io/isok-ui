<script>
import '@components-lit/molecules/organization/ik-organizations-list/ik-organizations-list.js'
import '@components-lit/molecules/organization/ik-organization-form-creation/ik-organization-form-creation.js'
import '@components-lit/molecules/organization/ik-organization-form-update/ik-organization-form-update.js'
import '@components-lit/atoms/ik-button/ik-button.js'
export default {
  data(){
    return {
      modal: undefined,
      organizations: [
        {name: "Orga de test", members: ["m1","m2"]}
      ],
      activeOrganization: {}
    }
  },
  methods: {
    toggleModal(state){
      this.modal = state;
    }
  }
}
</script>

<template>
  <ik-organizations-list
    @click-add-organization="() => modal = 'creation'"
    @click-settings-organization="(e) => {this.activeOrganization = e.detail.organization; modal = 'update'}"
    :organizationsList="this.organizations"
    fontSizeOrgaTitle="2.5em"
  ></ik-organizations-list>
  <div v-if="modal">
    <div class="modal-backdrop" @click="() => this.toggleModal(undefined)"></div>
    <div class="modal">
      <ik-button type="icon" icon="material-symbols:close-rounded" iconSize="1.3em" style="margin: -1em" @click="() => this.toggleModal(undefined)"></ik-button>
      <ik-organization-form-creation v-if="modal === 'creation'"></ik-organization-form-creation>
      <ik-organization-form-update v-if="modal === 'update'"
        :nameOrga="this.activeOrganization.name"
        :membersOrga="this.activeOrganization.members"
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