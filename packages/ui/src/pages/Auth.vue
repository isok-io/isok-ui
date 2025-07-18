<script>
import "@components-lit/molecules/other/ik-auth/ik-auth.js"
import {AuthApi} from "@client/AuthApi.ts"
import { useRouter } from 'vue-router'
import {Configuration} from "client/src/index.js";
import {apiBase} from "../consts.js";

export default {
  data(){
    return {
      authMethods:["ep"],
      step: "",
      errorMessage: "",
      authApi: new AuthApi(new Configuration({basePath: apiBase})),
    }
  },
  mounted() {
    this.step = localStorage.getItem("auth-step") || "login-menu";
    this.router = useRouter();
  },
  methods: {
    navigate(nextStep){
      this.step = nextStep;
      localStorage.setItem("auth-step", this.step);
    },
    validData(data){
      const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };
      const validatePassword = (password) => {
        return password.match(
            /^.{6,128}$/
        );
      };

      if(data.email === '' || !validateEmail(data.email)){
        this.errorMessage = "You need to enter a valid email address";
        return false;
      } else if(data.password === '' || !validatePassword(data.password)){
        this.errorMessage = "You need to enter a valid password ";
        return false;
      } else {
        return true;
      }
    },
    async login(data) {
      if (this.validData(data)) {
        try {
          const auth = await this.authApi.authV1({ creds: data });
          console.info(`user ${auth.userId} connected`);
          const token = auth.token;

          if (token) {
            localStorage.setItem("user-token", token);
            await this.router.push({ path: "/" });
            localStorage.removeItem("auth-step");
            document.location.reload();
          } else {
            this.errorMessage = "Invalid email or password";
          }

        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.errorMessage = "Invalid email or password"; // Erreur utilisateur connue
          } else {
            this.errorMessage = "An unexpected error occurred. Please try again.";
            console.error("Login error:", error);
          }
        }
      }
    },
    async signup(data) {
      if (this.validData(data)) {
        try {
          const auth = await this.authApi.registerV1({ creds: data });
          console.info(`user ${auth.userId} registered`);
          const token = auth.token;

          if (token) {
            localStorage.setItem("user-token", token);
            await this.router.push({ path: "/" });
            localStorage.removeItem("auth-step");
            document.location.reload();
          } else {
            this.errorMessage = "Error in account creation";
          }

        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.errorMessage = error.response.data?.message || "This email is already in use.";
          } else if (error.response && error.response.status === 409) {
            this.errorMessage = "An account with this email already exists.";
          } else {
            this.errorMessage = "An unexpected error occurred during registration.";
            console.error("Registration error:", error);
          }
        }
      }
    }
  }
}
</script>

<template>
  <ik-auth
      :methods="this.authMethods"
      :type="this.step"
      :errorMessage="this.errorMessage"
      @ik-auth:click-signup="() => this.navigate(this.step === 'login-menu' ? 'signup-menu' : 'signup-form')"
      @ik-auth:click-login="() => this.navigate(this.step === 'signup-menu' ? 'login-menu' : 'login-form')"
      @ik-auth:click="(e) => {
        if(e.detail.method === 'ep') {
          e.detail.type === 'login-menu'
          ? this.navigate('login-form')
          : this.navigate('signup-form')
        }
      }"
      @ik-auth:click-back="() => this.step === 'login-form' ? this.navigate('login-menu') : this.navigate('signup-menu')"
      @ik-auth:click-validate="(e) => this.step === 'login-form' ? this.login(e.detail.data) : this.signup(e.detail.data)"
  ></ik-auth>
</template>

<style scoped>

</style>