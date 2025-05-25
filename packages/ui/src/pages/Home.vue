<script>
import "@components-lit/molecules/check/ik-checks-list/ik-checks-list.js"
import {ChecksApi} from "@client/ChecksApi.js";
import Fuse from 'fuse.js';
import {useRouter} from "vue-router";
import {Configuration} from "client/src/index.js";
import {apiBase} from "../consts.js";

export default {
  data(){
    return {
      checks: [],
      checksVisible: [],
      checksApi: new ChecksApi(new Configuration({basePath: apiBase, accessToken: localStorage.getItem('user-token')}))
    }
  },
  mounted() {
    this.getChecks();
    this.router = useRouter();
  },
  methods: {
    getChecks() {
      // const checkList = this.checksApi.getChecksV1({tenant: localStorage.getItem("organization")});
      this.checks = [
        {
          id: "1",
          name: "First check",
          type: "HTTP",
          domain: "http://domain-exemple",
          uptime: 20,
          responseTime: 300,
          bars: Array.from({ length: 20 }, () => ({
            uptime: Math.floor(Math.random() * 101)
          }))
        },
        {
          id: "2",
          name: "Second check",
          type: "HTTP",
          domain: "http://domain-exemple",
          uptime: 40,
          responseTime: 300,
          bars: Array.from({ length: 20 }, () => ({
            uptime: Math.floor(Math.random() * 101)
          }))
        },
        {
          id: "3",
          name: "Other check",
          type: "HTTP",
          domain: "http://domain-exemple2",
          uptime: 20,
          responseTime: 300,
          bars: Array.from({ length: 20 }, () => ({
            uptime: Math.floor(Math.random() * 101)
          }))
        },
        {
          id: "4",
          name: "TCP check",
          type: "TCP",
          domain: "http://domain-exemple",
          uptime: 40,
          responseTime: 300,
          bars: Array.from({ length: 20 }, () => ({
            uptime: Math.floor(Math.random() * 101)
          }))
        }
      ]
      this.checksVisible = this.checks
    },
    filterChecks(searchInput) {
      const fuse = new Fuse(this.checks, {
        keys: [
          { name: 'name', weight: 0.6 },
          { name: 'domain', weight: 0.3 },
          { name: 'type', weight: 0.1 }
        ],
        threshold: 0.3,
        includeScore: true
      });

      if (!searchInput) {
        this.checksVisible = this.checks;
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
      @ik-checks-list:change-checkin="(e) => console.log(e.detail)"
      @ik-checks-list:change-research="(e) => this.filterChecks(e.detail.value)"
      @ik-check-list:click-info="(e) => navigate('info',e.detail)"
      @ik-check-list:click-add="() => navigate('add',{})"
  ></ik-checks-list>
</template>

<style scoped>

</style>