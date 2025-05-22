<script>
import '@components-lit/molecules/other/ik-user-account/ik-user-account.js'

export default {
  methods: {
    logout() {
      localStorage.removeItem('user-token');
      window.location.reload();
    }
  }
}

</script>

<template>
  <ik-user-account
      email="test@example.com"
      @ik-user-account:click-logout="() => logout()"
      @ik-user-account:click-organizations="() => $router.push('/organizations')"
      @ik-user-account:click-delete="() => console.log('delete-account')"
      @ik-user-account:click-confirm="() => console.log('password change')"
  ></ik-user-account>
</template>

<style scoped>

</style>