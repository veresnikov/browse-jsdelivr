<script>
import { Line } from 'vue-chartjs'
import axios from '../../utils/api'

export default {
  extends: Line,
  async mounted () {
    const { data } = await axios.get(`/package/npm/${this.$store.state.package.name}/stats`)
    const version = this.$store.state.package.version // { "total": 63, "dates": { "2020-05-14": 0, "2020-05-15": 10,
    if (!data.versions[version]) return
    const { dates } = data.versions[version] // {  "2020-05-14": 0, "2020-05-15": 10, ... }
    const labelsForChart = Object.keys(dates)
    const valuesForChart = Object.values(dates) // 1, 10, 20...

    this.renderChart({
      labels: labelsForChart,
      datasets: [
        {
          label: this.$store.state.package.name,
          backgroundColor: '#f87979',
          data: valuesForChart
        }
      ]
    }, { responsive: true, maintainAspectRatio: false })
  }
}
</script>
