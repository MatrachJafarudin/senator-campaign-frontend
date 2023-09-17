<template>
  <va-card>
    <va-card-title>List Data Pemilih</va-card-title>
    <va-card-content class="overflow-auto">
      <table class="va-table w-full">
        <thead>
          <tr>
            <th>Nama area</th>
            <th>Total Pemilih</th>
            <th></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </va-card-content>
  </va-card>
</template>

<script setup>
  import axiosInstance from '../../../libs/axios-instance'

  const voters = []
  axiosInstance.get('/areas').then((resp) => console.log(resp))
</script>
