<script>
import "@components-lit/molecules/check/ik-check-details/ik-check-details.js"
import "@components-lit/molecules/check/ik-check-form-update/ik-check-form-update.js"
import {ChecksApi} from "@client/ChecksApi.js";
import {useRouter} from "vue-router";
import parseDuration from "parse-duration";

export default {
  data(){
    return {
      data: {},
      data2 : {
        name: "First check",
        type: "Http",
        domain: "http://domain-exemple",
        uptime: 20,
        responseTime: 300,
        bars: Array.from({ length: 60 }, () => ({
          color: ["red","yellow","green"][Math.floor(Math.random() * ["red","yellow","green"].length)],
          data: ["Date : 03/22/1999 05:06", "Status code : 200"]
        })),
        latency: Array.from({ length: 20 }, () => Math.floor(Math.random() * 151) + 50),
      },
      checkApi: new ChecksApi(),
      modal: false,
      checksMeta: [],
      errorMessage: ""
    }
  },
  mounted(){
    this.router = useRouter();

    this.data = {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "interval": 300,
      "kind": {
        "Http": {
          "headers": [],
          "body": "{test}",
          "method": "POST",
          "url": "http://domain-exemple2"
        }
      },
      "name": "Mycheck",
      "zones": ["all"]
    };

    // this.checksMeta = await this.checkApi.getChecksMetaV1()
    this.checksMeta = [
      {
        "inputs": [
          {
            "kind": {
              "default_value": null,
              "placeholder": "https://example.com",
              "type": "Text",
              "variant": "Url"
            },
            "title": "URL"
          }
        ],
        "inputs_advanced": [
          {
            "kind": {
              "selectOptions": [
                {
                  "label": "GET",
                  "value": "GET"
                },
                {
                  "label": "POST",
                  "value": "POST"
                },
                {
                  "label": "PUT",
                  "value": "PUT"
                },
                {
                  "label": "DELETE",
                  "value": "DELETE"
                },
                {
                  "label": "PATCH",
                  "value": "PATCH"
                },
                {
                  "label": "HEAD",
                  "value": "HEAD"
                },
                {
                  "label": "OPTIONS",
                  "value": "OPTIONS"
                },
                {
                  "label": "CONNECT",
                  "value": "CONNECT"
                },
                {
                  "label": "TRACE",
                  "value": "TRACE"
                }
              ],
              "type": "Select"
            },
            "title": "Method"
          },
          {
            "kind": {
              "default_value": "{}",
              "placeholder": null,
              "type": "Text",
              "variant": "Area"
            },
            "title": "Body"
          },
          {
            "kind": {
              "keyPlaceholder": "Key",
              "type": "KeyValue",
              "valuePlaceholder": "Value"
            },
            "title": "Headers"
          }
        ],
        "type": "Http",
        "version": 1
      }
    ];
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
      if(this.validate()) {
        const msValue = parseDuration(newData.interval);
        if (msValue != null) {
          newData.interval = msValue / 1000;
        } else {
          this.errorMessage = "The format of your interval is invalid (format: 10min, 20s, 3 days,...)";
        }

        if(newData.zones.includes('all')){
          newData.zones.zones = ["All"]
        } else {
          newData.zones = newData.zones.map(item => ({ Region: item }));
        }

        console.log(newData);
        // this.checkApi.updateCheckV1({
        //   checkId: this.data.id,
        //   tenant: localStorage.getItem("organization"),
        //   apiCheckInput: newData
        // });
        this.modal = false;
      }
    },
    toggleModal(){
      this.modal = !this.modal;
    },
    getCheckType(){
      return Object.entries(this.data.kind).find(([key, value]) => value !== null)?.[0];
    },
    getZone() {
      // return this.regionsApi.getRegionsV1().map((item) => {
      //   item.value = item.id;
      //   item.label = item.name
      //   return item;
      // });
      return [
        {
          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
          "name": "France",
          "tags": {
            "property1": "string",
            "property2": "string"
          },
          "zones": [
            {
              "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
              "name": "string",
              "tags": {
                "property1": "string",
                "property2": "string"
              }
            }
          ]
        },
        {
          "id": "497f6eca-6276-4993-bfeb-53cbbbba6f09",
          "name": "England",
          "tags": {
            "property1": "string",
            "property2": "string"
          },
          "zones": [
            {
              "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
              "name": "string",
              "tags": {
                "property1": "string",
                "property2": "string"
              }
            }
          ]
        }
      ].map((item) => {
        item.value = item.id;
        item.label = item.name
        return item;
      })
    },
    normalizeKey(label = "") {
      return label.trim().toLowerCase().replace(/\s+/g, "_");
    },
    validate(){
      const capitalize = s => s && String(s[0]).toUpperCase() + String(s).slice(1)

      const checkType = this.getCheckType()
      const requiredKey = this.checksMeta.filter((check) => check.type === checkType )[0].inputs.map((input) => this.normalizeKey(input.title)).concat(['name', 'zones', 'interval'])
      this.errorMessage = "";
      for (const key of requiredKey) {
        if((this.data.kind[checkType][key] === undefined || this.data.kind[checkType][key] === "")
            && (this.data[key] === undefined || this.data[key] === "")){
          this.errorMessage = capitalize(key)+" are required.";
        }
      }
      return this.errorMessage === "";
    },
  }
}
</script>

<template>
  <div class="check-details">
    <ik-check-details
        :data="data2"
        @ik-check-details:click-edit="() => this.toggleModal()"
        @ik-check-details:click-delete="() => this.deleteCheck()"
    ></ik-check-details>
    <div v-if="modal">
      <div class="modal-backdrop" @click="() => this.toggleModal()"></div>
      <div class="modal" v-if="modal">
        <ik-button type="icon" icon="material-symbols:close-rounded" iconSize="1.3em" style="margin: -1em" @click="() => this.toggleModal(undefined)"></ik-button>
        <ik-check-form-update
          :schema="this.checksMeta.filter((check) => check.type === this.getCheckType())[0]"
          :data="this.data"
          :zones="getZone()"
          :errorMessage="errorMessage"
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