<script>
import "@components-lit/molecules/check/ik-check-details/ik-check-details.js"
import "@components-lit/molecules/check/ik-check-form-update/ik-check-form-update.js"
import {ChecksApi} from "@client/ChecksApi.js";
import {useRouter} from "vue-router";

export default {
  data(){
    return {
      data : {
        name: "First check",
        type: "HTTP",
        domain: "http://domain-exemple",
        uptime: 20,
        responseTime: 300,
        bars: Array.from({ length: 60 }, () => ({
          color: ["red","yellow","green"][Math.floor(Math.random() * ["red","yellow","green"].length)],
          data: ["Date : 03/22/1999 05:06", "Status code : 200"]
        })),
        latency: Array.from({ length: 20 }, () => Math.floor(Math.random() * 151) + 50)
      },
      formData: {
        type: 'HTTP',
        inputs: [
          {
            type: 'text',
            title: 'Name',
            value: 'My check'
          },
          {
            type: 'check',
            title: 'Zone',
            selectOptions: [
              { value: 'all', label: 'All' },
              { value: 'fr', label: 'France' },
            ],
            value: 'all'
          },
          {
            type: 'text',
            title: 'Interval',
            value: '10min',
          },
          {
            type: 'text',
            title: 'URL',
            value: 'http://my-website.com',
          },
          {
            type: 'select',
            title: 'Method',
            selectOptions: [
              { value: 'get', label: 'GET' },
              { value: 'post', label: 'POST' },
              { value: 'put', label: 'PUT' },
              { value: 'delete', label: 'DELETE' },
              { value: 'patch', label: 'PATCH' },
              { value: 'head', label: 'HEAD' },
              { value: 'options', label: 'OPTIONS' },
              { value: 'connect', label: 'CONNECT' },
              { value: 'trace', label: 'TRACE' }
            ],
            value: 'get'
          },
          {
            type: 'area',
            title: 'Body',
            value: '{}',
          },
          {
            type: 'key-value',
            title: 'Header',
            placeholder: 'Key...',
            placeholder2: 'Value...',
            values: [
              { key: "Accept", value: "*/*" }
            ]
          }
        ]
      },
      checkApi: new ChecksApi(),
      modal: false
    }
  },
  mounted(){
    this.router = useRouter();
  },
  methods: {
    deleteCheck(){
      const confirmed = window.confirm("Are you sure you want to delete this check?");
      if(confirmed){
        // this.checkApi.deleteCheck({checkId: $route.params.id, tenant: localStorage.getItem("organization")})
        this.router.push("/");
      }
    },
    updateCheck(newData){
      this.modal = false;
    },
    toggleModal(){
      this.modal = !this.modal;
    }
  }
}
</script>

<template>
  <div class="check-details">
    <ik-check-details
        :data="data"
        @ik-check-details:click-edit="() => this.toggleModal()"
        @ik-check-details:click-delete="() => this.deleteCheck()"
    ></ik-check-details>
    <div v-if="modal">
      <div class="modal-backdrop" @click="() => this.toggleModal()"></div>
      <div class="modal" v-if="modal">
        <ik-button type="icon" icon="material-symbols:close-rounded" iconSize="1.3em" style="margin: -1em" @click="() => this.toggleModal(undefined)"></ik-button>
        <ik-check-form-update
          :data="formData"
          @ik-check-form-update:click-save="(e) => updateCheck(e.detail)"
        ></ik-check-form-update>
      </div>
    </div>
  </div>
</template>

<style scoped>
.check-details {
  height: 90vh;
  width: 100%;
  overflow: scroll;
  display: flex;
  justify-content: center;
}
.modal-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  max-height: 80vh;
  transform: translate(-50%, -50%);
  background: var(--bg);
  padding: 2em;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  z-index: 1001;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  overflow: scroll;
}
</style>