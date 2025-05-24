<script>
import "@components-lit/molecules/check/ik-check-form-pre-creation/ik-check-form-pre-creation.js"
import "@components-lit/molecules/check/ik-check-form-creation/ik-check-form-creation.js"
import "@components-lit/molecules/check/ik-check-form-post-creation/ik-check-form-post-creation.js"
import {ChecksApi} from "@client/ChecksApi.js";
import {RegionsApi} from "@client/RegionsApi.js";
import parseDuration from 'parse-duration';
import {useRouter} from "vue-router";

export default {
  data(){
    return {
      step: 1,
      checksMeta: [],
      checkType: "",
      checkApi: new ChecksApi(),
      regionsApi: new RegionsApi(),
      dataCheck: {},
      errorMessage: "",
      router: useRouter()
    }
  },
  async mounted() {
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
    nextStep(step, e){
      switch(step){
        case 2:
          this.checkType = e.detail.type;
          this.dataCheck = this.generateInitialCheckData();
          this.step = step;
          break;
        case 3:
          this.dataCheck = e.detail;
          if(this.validate(this.dataCheck.kind[this.checkType])) {
            this.step = step;
          }
          break;
      }
    },
    back(){
      this.errorMessage = "";
      this.step = this.step - 1;
    },
    getCheckType(){
      return this.checksMeta.map((item) => item.type)
    },
    generateInitialCheckData() {
      const schema = this.checksMeta.filter((item) => item.type === this.checkType)[0];
      const kindType = schema.type;

      const result = {
        name: "",
        interval: 0,
        zones: [],
        kind: {
          [kindType]: {}
        }
      };

      const kindObject = result.kind[kindType];

      const parseInput = (input) => {
        const key = normalizeKey(input.title);
        const kind = input.kind;

        switch (kind.type) {
          case "Text":
            kindObject[key] = kind.default_value || null;
            break;

          case "Select":
            kindObject[key] = kind.default_value || kind.selectOptions?.[0]?.value || "";
            break;

          case "KeyValue":
            kindObject[key] = kind.default_value || {};
            break;

          default:
            kindObject[key] = null;
            break;
        }
      };

      const normalizeKey = (label = "") =>
          label.trim().toLowerCase().replace(/\s+/g, "_");

      [...(schema.inputs || []), ...(schema.inputs_advanced || [])].forEach(parseInput);

      return result;
    },
    validate(values){
      const capitalize = s => s && String(s[0]).toUpperCase() + String(s).slice(1)

      this.errorMessage = "";
      for (const [key, value] of Object.entries(values)) {
        if(value === null){
          this.errorMessage = capitalize(key)+" are required.";
        }
      }
      return this.errorMessage === "";
    },
    save(e){
      if(this.validate(e.detail)){
        this.dataCheck.name = e.detail.name;

        if(e.detail.zones.includes('all')){
          this.dataCheck.zones = [{"All": {}}]
        } else {
          this.dataCheck.zones = e.detail.zones.map(item => ({ Region: item }));
        }

        const msValue = parseDuration(e.detail.interval);
        if(msValue != null){
          this.dataCheck.interval = msValue / 1000;
          // this.checkApi.createCheckV1({
          //   tenant: localStorage.getItem('organization'),
          //   apiCheckInput: this.dataCheck
          // });
          this.router.push("/")
        } else {
          this.errorMessage = "The format of your interval is invalid (format: 10min, 20s, 3 days,...)";
        }
      }
    },
    getZone(){
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
    }
  }
}
</script>

<template>
  <ik-check-form-pre-creation v-if="step === 1"
    :checksType="this.getCheckType()"
    @ik-check-form-pre-creation:click="(e) => nextStep(2,e)"
  ></ik-check-form-pre-creation>
  <ik-check-form-creation v-if="step === 2"
    :schema="this.checksMeta.filter((item) => item.type === this.checkType)[0]"
    :data="this.dataCheck"
    :errorMessage="this.errorMessage"
    @ik-check-form-creation:click-next="(e) => nextStep(3,e)"
  ></ik-check-form-creation>
  <ik-check-form-post-creation v-if="step === 3"
     :typeCheck="this.checkType"
     :errorMessage="this.errorMessage"
     :zoneOptions="getZone()"
     @ik-check-form-post-creation:click-create="(e) => save(e)"
  ></ik-check-form-post-creation>
  <ik-button class="back-button"
             v-if="step !== 1"
             text="Back"
             @ik-button:click="() => back()"
             type="outlined"
             height="auto"
             width="auto"
  ></ik-button>
</template>

<style scoped>
.back-button {
  margin: 2em;
}

</style>