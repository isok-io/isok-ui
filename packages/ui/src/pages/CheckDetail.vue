<script>
import "@components-lit/molecules/check/ik-check-details/ik-check-details.js"
import "@components-lit/molecules/check/ik-check-form-update/ik-check-form-update.js"
import {ChecksApi} from "@client/ChecksApi.js";
import {useRoute, useRouter} from "vue-router";
import parseDuration from "parse-duration";
import {Configuration, RegionsApi} from "client/src/index.js";
import {apiBase} from "../consts.js";

export default {
  data(){
    return {
      router: useRouter(),
      route: useRoute(),
      checkId: null,
      checkinValue: localStorage.getItem("checkinValue") || 600000,
      check: {},
      checksSummary: {},
      checkSchema: {},
      zonesList: [],
      data : {},
      checkApi: new ChecksApi(new Configuration({basePath: apiBase, accessToken: localStorage.getItem('user-token')})),
      regionsApi: new RegionsApi(new Configuration({basePath: apiBase, accessToken: localStorage.getItem('user-token')})),
      modal: false,
      errorMessage: "",
    }
  },
  async mounted() { await this.getCheck()},
  methods: {
    async getCheck() {
      {

        this.router = useRouter();
        this.checkId = this.route.params.checkId;

        this.check = await this.checkApi.getCheckV1(
            {
              checkId: this.checkId,
              tenant: localStorage.getItem('organization')
            }
        );

        this.checksSummary = {};
        this.checksSummary[this.checkId] = await this.checkApi.getCheckMetricsV1(
            {
              checkId: this.checkId,
              tenant: localStorage.getItem('organization'),
              end: new Date(),
              points: 80,
              start: new Date(new Date().getTime() - this.checkinValue)
            }
        );

        const checksMeta = await this.checkApi.getChecksMetaV1()
        this.checkSchema = checksMeta.filter((check) => check.type.toLowerCase() === this.getCheckType().toLowerCase())[0]

        const regions = await this.regionsApi.getRegionsV1()
        this.zonesList = regions.map((item) => {
          item.value = item.id;
          item.label = item.name
          return item;
        });

        let uptime = this.checksSummary[this.checkId]
                .filter(e => e != null)
                .filter(e => e.status === "Reachable").length
            /
            this.checksSummary[this.checkId]
                .filter(e => e != null).length * 100

        uptime = isNaN(uptime) ? 0 : uptime;

        const latency = this.checksSummary[this.checkId]
            .filter(e => e != null && e.status === "Reachable")
            .reduce((acc, e, _, arr) => acc + e.metrics.latency / arr.length, 0);

        const color = (status) => {
          switch (status) {
            case 'Unreachable':
              return "red";
            case 'ReachableUnreachable':
              return "yellow";
            case 'Reachable':
              return "green";
            default:
              return "grey";
          }
        }

        let nbBars = Math.max(50, Math.min(80, this.checkinValue / (this.check.interval * 1000)))

        let bars = [];
        bars = this.checksSummary[this.checkId].map(e => {
          if (e == null) return ({color: "grey", data: []})
          else return {
            color: color(e.status),
            data: [e.start, "Status: " + e.status],
          }
        });
        bars = bars.slice(0, nbBars).concat(
            Array.from({length: Math.max(0, nbBars - bars.length)}, () => ({color: "grey", data: []}))
        );

        this.data = {
          name: this.check.name,
          type: this.getCheckType(),
          uptime: uptime.toFixed(0) + "%",
          latency: latency.toFixed(0) + "ms",
          bars: bars,
          latencyBars: this.checksSummary[this.checkId].map(e => e !== null ? e.metrics.latency : 0),
        }

        this.checkSchema.inputs.map((input) => {
          if (input.kind.type === "Text") {
            this.data[input.title] = this.check.kind[this.getCheckType()][this.normalizeKey(input.title)]
          }
        })


      }
    },
    deleteCheck(){
      const confirmed = window.confirm("Are you sure you want to delete this check?");
      if(confirmed){
        this.checkApi.deleteCheckV1({checkId: this.checkId, tenant: localStorage.getItem("organization")})
        this.router.push("/");
      }
    },
    async updateCheck(newData) {
      console.log(newData);
      if (this.validate()) {
        const msValue = parseDuration(newData.interval);
        if (msValue != null) {
          newData.interval = msValue / 1000;
        } else {
          this.errorMessage = "The format of your interval is invalid (format: 10min, 20s, 3 days,...)";
        }

        if (newData.zones.includes('all')) {
          newData.zones.zones = ["all"]
        } else {
          newData.zones = newData.zones.map(item => ({region: item}));
        }

        await this.checkApi.updateCheckV1({
          checkId: this.checkId,
          tenant: localStorage.getItem("organization"),
          apiCheckInput: newData
        });
        this.modal = false;
        await this.getCheck();
      }
    },
    toggleModal(){
      this.modal = !this.modal;
    },
    getCheckType(){
      return Object.entries(this.check.kind).find(([key, value]) => value !== null)?.[0];
    },
    normalizeKey(label = "") {
      return label.trim().toLowerCase().replace(/\s+/g, "_");
    },
    validate(){
      const capitalize = s => s && String(s[0]).toUpperCase() + String(s).slice(1)

      const checkType = this.getCheckType()
      const requiredKey = this.checkSchema.inputs.map((input) => this.normalizeKey(input.title)).concat(['name', 'zones', 'interval'])
      this.errorMessage = "";
      for (const key of requiredKey) {
        if((this.check.kind[checkType][key] === undefined || this.check.kind[checkType][key] === "")
            && (this.check[key] === undefined || this.check[key] === "")){
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
        v-if="data && data.bars"
        :data="data"
        :widthBar="(data.bars.length * 0.8)+'em'"
        @ik-check-details:click-edit="() => this.toggleModal()"
        @ik-check-details:click-delete="() => this.deleteCheck()"
    ></ik-check-details>
    <div v-if="modal">
      <div class="modal-backdrop" @click="() => this.toggleModal()"></div>
      <div class="modal" v-if="modal">
        <ik-button type="icon" icon="material-symbols:close-rounded" iconSize="1.3em" style="margin: -1em" @click="() => this.toggleModal(undefined)"></ik-button>
        <ik-check-form-update
          :schema="this.checkSchema"
          :data="this.check"
          :zones="this.zonesList"
          :errorMessage="errorMessage"
          @ik-check-form-update:click-save="async (e) => await updateCheck(e.detail)"
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