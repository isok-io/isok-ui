<script>
import "@components-lit/molecules/check/ik-checks-list/ik-checks-list.js"
import {ChecksApi} from "@client/ChecksApi.js";
import Fuse from 'fuse.js';
import {useRouter} from "vue-router";
import {Configuration} from "client/src/index.js";
import {apiBase} from "../consts.js";
import parseDuration from "parse-duration";

export default {
  data(){
    return {
      checks: [],
      checksSummary: {},
      data: [],
      checksVisible: [],
      checksApi: new ChecksApi(new Configuration({basePath: apiBase, accessToken: localStorage.getItem('user-token')})),
      checkinValue: localStorage.getItem("checkinValue") || 600000
    }
  },
  async mounted() {
    this.router = useRouter();

    this.checksSummary = await this.checksApi.getChecksSummaryV1(
        {
          tenant: localStorage.getItem('organization'),
          end: new Date(),
          points: 20,
          start: new Date(new Date().getTime() - this.checkinValue)
        }
    );
    this.checksSummary["497f6eca-6276-4993-bfeb-53cbbbba6f08"] = [
        {
          "details": {
            "Http": {
              "status_code": 0
            }
          },
          "end": "2019-08-24T14:15:22Z",
          "error": "string",
          "metrics": {
            "latency": 20
          },
          "start": "2019-08-24T14:15:22Z",
          "status": "None"
        },
        {
          "details": {
            "Http": {
              "status_code": 0
            }
          },
          "end": "2019-08-24T14:15:22Z",
          "error": "string",
          "metrics": {
            "latency": 2
          },
          "start": "2019-08-24T14:15:22Z",
          "status": "Reachable"
        },
        {
          "details": {
            "Http": {
              "status_code": 0
            }
          },
          "end": "2019-08-24T14:15:22Z",
          "error": "string",
          "metrics": {
            "latency": 4
          },
          "start": "2019-08-24T14:15:22Z",
          "status": "Reachable"
        },
        {
          "details": {
            "Http": {
              "status_code": 0
            }
          },
          "end": "2019-08-24T14:15:22Z",
          "error": "string",
          "metrics": {
            "latency": 50
          },
          "start": "2019-08-24T14:15:22Z",
          "status": "ReachableUnreachable"
        }
      ]

    this.checks = await this.checksApi.getChecksV1({tenant: localStorage.getItem('organization')})
    this.checks.push(
      {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "interval": 5,
        "kind": {
          "http": {
            "body": "string",
            "headers": {
              "property1": "string",
              "property2": "string"
            },
            "method": "get",
            "url": "http://example.com"
          }
        },
        "name": "Test check",
        "tenant": "93360892-48a4-4f76-a117-3304c9c61771",
        "zones": [
          "all"
        ]
      }
    )

    this.data = this.checks.map(check => {
      const checkId = check.id;
      const summary = this.checksSummary[checkId] || [];

      const validEntries = summary.filter(e => e != null);
      const reachableEntries = validEntries.filter(e => e.status === "Reachable");

      const uptime = validEntries.length > 0
          ? (reachableEntries.length / validEntries.length * 100)
          : 0;

      const latency = reachableEntries.length > 0
          ? reachableEntries.reduce((acc, e) => acc + e.metrics.latency, 0) / reachableEntries.length
          : 0;

      const color = (status) => {
        switch (status) {
          case 'Unreachable': return "red";
          case 'ReachableUnreachable': return "yellow";
          case 'Reachable': return "green";
          default: return "grey";
        }
      };

      const bars = validEntries.map(e => ({
        color: color(e.status),
        data: [e.start, "Status: " + e.status],
      }));

      const checkType = Object.entries(check.kind).find(([key, value]) => value !== null)?.[0];

      const url = check.kind[checkType].url;
      const displayUrl = url.length > 40 ? url.slice(0, 40) + '…' : url;

      return {
        id: checkId,
        name: check.name,
        type: checkType,
        uptime: uptime,
        latency: latency,
        domain: checkType === "http" ? displayUrl : null,
        bars: bars,
      };
    });

    this.checksVisible = this.data
  },
  methods: {
    parseDuration,
    filterChecks(searchInput) {
      const fuse = new Fuse(this.data, {
        keys: [
          { name: 'name', weight: 0.6 },
          { name: 'domain', weight: 0.3 },
          { name: 'type', weight: 0.1 }
        ],
        threshold: 0.3,
        includeScore: true
      });

      if (!searchInput) {
        this.checksVisible = this.data;
      } else {
        const results = fuse.search(searchInput);
        this.checksVisible = results.map(result => result.item);
      }
    },
    navigate(page,data){
      switch (page) {
        case "info":
          this.router.push("/check/"+data.id);
          break;
        case "add":
          this.router.push("/check-creation")
      }
    }
  }
}
</script>

<template>
  <ik-checks-list
      fontSizeFilterBar="1.2em"
      bigCheckWidth="80em"
      smallCheckWidth="60em"
      :checks="checksVisible"
      @ik-checks-list:change-checkin="(e) => {this.checkinValue = parseDuration(e.detail.value1+e.detail.value2); localStorage.setItem('checkinValue', this.checkinValue)}"
      @ik-checks-list:change-research="(e) => this.filterChecks(e.detail.value)"
      @ik-check-list:click-info="(e) => navigate('info',e.detail)"
      @ik-check-list:click-add="() => navigate('add',{})"
  ></ik-checks-list>
</template>

<style scoped>

</style>