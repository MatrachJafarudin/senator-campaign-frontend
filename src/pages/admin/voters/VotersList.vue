<template>
  <va-card>
    <va-card-title>
      List Data Pemilih
      <va-spacer />
      <router-link to="add">
        <va-button>Tambah</va-button>
      </router-link>
    </va-card-title>
    <va-card-content class="overflow-auto">
      <table class="va-table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>IMEI</th>
            <th>Wilayah</th>
            <th>Gambar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(voter, index) in voters" :key="voter.index">
            <td>{{ index }}</td>
            <td>{{ voter.device_imei }}</td>
            <td>{{ voter.area.name }}</td>
            <td>
              <img :src="apiUrl + '/storage/uploads/' + voter.image" width="150" />
            </td>
          </tr>
        </tbody>
      </table>
    </va-card-content>
  </va-card>
</template>

<script setup>
  import axiosInstance from '../../../libs/axios-instance'
  import { ref } from 'vue'

  const apiUrl = import.meta.env.VITE_API_URL
  const voters = ref([])
  axiosInstance
    .get('/voters')
    .then((resp) => (voters.value = resp.data.data))
    .catch((err) => console.log(err))
</script>

<style lang="css">
  .va-table td {
    vertical-align: middle;
  }
  td img {
    border-radius: 5px;
  }
</style>
