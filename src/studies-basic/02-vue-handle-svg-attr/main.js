const main = {main:'main'}
const local = window.local = {local:'local'}

export default main;

const vm = window.vm = new Vue({
  el: '#app',

  template: `
  <svg width="200" height="100">
    <g style="transform: translate(0, 10px)">
      <path :d="path" />
    </g>
  </svg>`,

  data() {
    return {
      data : [],
    }
  },

  computed: {
    getScales(){
      const xScale = d3.scaleLinear().range([0, 200])
      const yScale = d3.scaleLinear().range([100, 0])

      xScale.domain(d3.extent(this.data, (d,i)=>i))
      yScale.domain([0, d3.max(this.data)])

      return {xScale, yScale}
    },

    path() {
      const {xScale, yScale} = this.getScales
      const path = d3.line()
        .x( (d,i)=>xScale(i) )
        .y( (d,i)=>yScale(d) )
      return path(this.data)
    }
  },

})


setInterval( ()=>{
  const tmpData = []
  let i = 0
  while (++i <= 10) {
   tmpData.push(chance.natural({min:0, max:100}))
  }
  vm.data = tmpData
} , 1000)

