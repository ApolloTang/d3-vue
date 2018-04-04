const main = {main:'main'}
const local = window.local = {local:'local'}

export default main;


const data = [99, 71, 78, 25, 36, 92];

const vm = window.vm = new Vue({
  el: '#app',

  template: `
  <svg width="200" height="100">
    <g style="transform: translate(0, 10px)">
      <path :d="line" />
    </g>
  </svg>`,

  data() {
    return {
      'line': ''
    }
  },

  mounted() {
    this.calculatePath();
  },

  methods: {

    getScales(){
      const svg = d3.select(this.$el)
        .append('svg')
        .attr('width', 200)
        .attr('height', 100)
        .append('g')
        .attr('transform', 'translate(0,10)')

      const xScale = d3.scaleLinear().range([0, 200])
      const yScale = d3.scaleLinear().range([100, 0])

      xScale.domain(d3.extent(data, (d,i)=>i))
      yScale.domain([0, d3.max(data)])

      return {xScale, yScale}
    },

    calculatePath() {
      const {xScale, yScale} = this.getScales()
      const path = d3.line()
        .x( (d,i)=>xScale(i) )
        .y( (d,i)=>yScale(d) )
      this.line = path(data)
    }
  },

})

