<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="username"
      class="mb-4"
      type="text"
      :label="t('auth.username')"
      :error="!!usernameErrors.length"
      :error-messages="usernameErrors"
    />

    <va-input
      v-model="password"
      class="mb-4"
      type="password"
      :label="t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="auth-layout__options flex items-center justify-between">
      <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="t('auth.keep_logged_in')" />
      <!-- <router-link class="ml-1 va-link" :to="{ name: 'recover-password' }">{{
        t('auth.recover_password')
      }}</router-link> -->
    </div>

    <div class="flex justify-center mt-4">
      <va-button class="my-0" @click="onsubmit">{{ t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import stores from '../../../stores'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  const username = ref('')
  const password = ref('')
  const keepLoggedIn = ref(false)
  const usernameErrors = ref<string[]>([])
  const passwordErrors = ref<string[]>([])
  const router = useRouter()

  const formReady = computed(() => !usernameErrors.value.length && !passwordErrors.value.length)

  function onsubmit() {
    if (!formReady.value) return

    usernameErrors.value = username.value ? [] : ['Username harus diisi']
    passwordErrors.value = password.value ? [] : ['Password harus diisi']

    stores
      .dispatch('login', { username: username.value, password: password.value })
      .then((_) => router.push({ name: 'dashboard' }))
      .catch((err) => console.log(err))
  }
</script>
