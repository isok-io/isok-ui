<script>
import '@components-lit/molecules/other/ik-user-account/ik-user-account.js'

</script>

<template>
  <ik-user-account
      email="test@example.com"
      @click-logout="() => console.log('logout')"
      @click-manage-organizations="() => $router.push('/organizations')"
      @click-delete-account="() => console.log('delete-account')"
  ></ik-user-account>
</template>

<style scoped>

</style>