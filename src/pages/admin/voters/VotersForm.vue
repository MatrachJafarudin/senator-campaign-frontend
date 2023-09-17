<template>
  <va-card>
    <va-card-title>Buat data pemilih</va-card-title>
    <va-card-content class="overflow-auto">
      <div class="grid grid-cols-12 gap-6">
        <div class="flex col-span-6">
          <va-input v-model="voter.device_imei" label="Masukkan Nomor IMEI" />
        </div>
        <div class="col-span-6">
          <va-select
            v-model="voter.area"
            label="Pilih Wilayah"
            :options="areas"
            text-by="name"
            track-by="id"
            searchable
          />
        </div>
      </div>
      <div class="upload-imei gap-6">
        <div>Unggah Gambar</div>
        <va-file-upload v-model="voter.image" type="single" file-types=".png, .jpg, .jpeg, .gif" />
      </div>
      <div class="mt-6 flex justify-end">
        <div class="flex gap-2">
          <va-button color="warning">Batal</va-button>
          <va-button @click="submitNewVoter">Simpan</va-button>
        </div>
      </div>
    </va-card-content>
  </va-card>
</template>

<script setup>
  import axiosInstance from '../../../libs/axios-instance'
  import { ref } from 'vue'
  import router from '../../../router'

  const voter = ref({})
  const areas = ref([])

  axiosInstance
    .get('/areas')
    .then((resp) => (areas.value = resp.data.data))
    .catch((err) => console.log(err))

  function submitNewVoter() {
    const voterData = new FormData()
    voterData.append('area_id', voter.value.area.id)
    voterData.append('device_imei', voter.value.device_imei)
    voterData.append('image', voter.value.image)

    axiosInstance
      .post('voters', voterData)
      .then(() => router.push('/voters/list'))
      .catch((err) => console.log(err))
  }
</script>

<style lang="css">
  .upload-imei {
    display: flex;
    align-items: center;
    margin-top: 1rem;
  }
</style>
