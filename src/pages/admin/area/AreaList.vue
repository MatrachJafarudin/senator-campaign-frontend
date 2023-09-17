<template>
  <va-card>
    <va-card-title>
      List Data Pemilih
      <va-spacer />
      <va-button icon="add_circle_outline" color="primary" @click="openModalArea()"> Baru </va-button>
    </va-card-title>
    <va-card-content class="overflow-auto">
      <table class="va-table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Nama area</th>
            <th>Total Pemilih</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(area, index) in areas" :key="area.id">
            <td>{{ index + 1 }}</td>
            <td>{{ area.name }}</td>
            <td>{{ area.countVoters }}</td>
            <td>
              <va-button-group preset="plain" class="col-span-12" size="large">
                <va-button color="info" icon="edit" @click="editArea(area.id)" />
                <va-button color="danger" icon="delete" @click="confirmDelete(area.id)" />
              </va-button-group>
              <!-- <router-link :to="`${area.id}/edit`">
                <va-button>Edit</va-button>
              </router-link> -->
            </td>
          </tr>
        </tbody>
      </table>
    </va-card-content>
  </va-card>
  <va-modal v-model="showAreaModal" size="large" title="Tambah Wilayah Baru" blur close-button hide-default-actions>
    <div class="flex col-span-12">
      <va-input v-model="name" placeholder="Nama Wilayah" />
    </div>
    <template #footer="{ toggle }">
      <va-button color="warning" class="mr-2" @click="toggle">Batal</va-button>
      <va-button color="primary" @click="submitAreaForm()">Simpan</va-button>
    </template>
  </va-modal>

  <va-modal
    v-model="showConfirmationModal"
    size="large"
    title="Konfirmasi"
    message="Apakah Anda yakin ingin menghapus data ini?"
    blur
    close-button
    hide-default-actions
  >
    <template #footer="{ toggle }">
      <va-button color="warning" class="mr-2" @click="toggle">Tidak</va-button>
      <va-button color="primary" @click="deleteArea(areaId)">Ya</va-button>
    </template>
  </va-modal>
</template>

<script setup>
  import { ref } from 'vue'
  import axiosInstance from '../../../libs/axios-instance'

  const areas = ref([])
  const showAreaModal = ref(false)
  const isEditing = ref(false)
  const name = ref('')
  const areaId = ref(null)
  const showConfirmationModal = ref(false)

  axiosInstance
    .get('/areas')
    .then((resp) => (areas.value = resp.data.data))
    .catch((err) => console.log(err))

  function submitAreaForm() {
    if (!isEditing.value) {
      axiosInstance
        .post('/areas', { name: name.value })
        .then((resp) => areas.value.push(resp.data.data))
        .catch((err) => console.log(err))
    } else {
      axiosInstance
        .put(`/areas/${areaId.value}`, { name: name.value })
        .then((resp) => {
          areas.value.map((item) => {
            if (item.id === resp.data.data.id) {
              item.name = resp.data.data.name
            }
          })
        })
        .catch((err) => console.log(err))
    }
    showAreaModal.value = false
    name.value = ''
    isEditing.value = false
    areaId.value = null
  }

  function editArea(id) {
    axiosInstance
      .get(`/areas/${id}`)
      .then((resp) => {
        name.value = resp.data.data.name
        showAreaModal.value = true
        isEditing.value = true
        areaId.value = id
      })
      .catch((err) => console.log(err))
  }

  function confirmDelete(id) {
    showConfirmationModal.value = true
    areaId.value = id
  }

  function deleteArea(id) {
    axiosInstance
      .delete(`/areas/${id}`)
      .then(() => {
        areas.value = areas.value.filter((item) => item.id !== id)
        showConfirmationModal.value = false
        areaId.value = null
      })
      .catch((err) => console.log(err))
  }

  function openModalArea() {
    showAreaModal.value = true
    name.value = ''
    isEditing.value = false
    areaId.value = null
  }
</script>

<style lang="css">
  .va-modal--size-large {
    width: 796px;
  }
</style>
