<template>
  <div>
    <h1>Note</h1>
    <table class="table table-bordered">
      <tr>
        <th width="100%" class="center">bulletin de :</th>
      </tr>
    </table>
    <table class="table table-bordered">
      <tr>
        <th width="33%">Mathématique</th>
        <th width="33%"><div v-for="(mark,i) in marks" :key=i>{{mark}} </div></th>
        <th>Coef</th>
      </tr>
      <td width="33%">nom matiere</td>
      <td width="33%">note</td>
      <td>coeff</td>
    </table>
    <table class="table table-bordered">
      <th>Votre Moyenne générale</th>
      <td width="50%">resultat moyenne</td>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => ({
    marks: null
  }),
  methods: {
  },
  async mounted () {
    console.log(this.user)
    const res = await this.$axios.post('/api/marks', { email: this.user.email })
    this.marks = res
  },
  computed: {
    ...mapState['auth/user']
  }
}
</script>
