<script>
import '@components-lit/molecules/other/ik-user-account/ik-user-account.js'
import {UsersApi} from "@client/UsersApi.ts"
import {AuthApi} from "@client/AuthApi.ts"
import {Configuration} from "client/src/index.js";
import {apiBase} from "../consts.js";

export default {
  data(){
    return {
      usersApi: new UsersApi(new Configuration({basePath: apiBase, accessToken: localStorage.getItem('user-token')})),
      authApi: new AuthApi(new Configuration({basePath: apiBase})),
      errorMessage: '',
      user: '',
      modalOpen: false
    }
  },
  async mounted() {
    this.user = await this.usersApi.getMeV1();
  },
  methods: {
    logout() {
      localStorage.removeItem('user-token');
      window.location.reload();
    },
    deleteAccount() {
      const confirmed = window.confirm("Are you sure you want to delete your account?");
      if(confirmed){
        this.usersApi.deleteMeV1();
        this.logout();
      }
    },
    async updatePassword(data) {
      const validatePassword = (password) => {
        return password.match(
            /^.{6,128}$/
        );
      };
      const user = await this.usersApi.getMeV1()
      const token = (await this.authApi.authV1({creds: {email: user.email, password: data.oldPassword}})).token;
      if(token){
        if(validatePassword(data.newPassword)){
          await this.usersApi.editMeV1({patchUser: {password: data.newPassword}});
          this.modalOpen = false;
        } else {
          this.errorMessage = "You need to enter a valid new password";
        }
      } else {
        this.errorMessage = "Old password is incorrect";
      }
    }
  }
}

</script>

<template>
  <ik-user-account
      :email="this.user.email"
      :errorMessage="this.errorMessage"
      :showPasswordModal="this.modalOpen"
      @ik-user-account:click-logout="() => this.logout()"
      @ik-user-account:click-organizations="() => $router.push('/organizations')"
      @ik-user-account:click-delete="() => this.deleteAccount()"
      @ik-user-account:click-confirm="(e) => updatePassword(e.detail)"
      @ik-user-account:click-modal="(e) => this.modalOpen = true"
  ></ik-user-account>
</template>

<style scoped>

</style>