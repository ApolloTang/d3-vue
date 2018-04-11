const main = {main:'main'}
const local = window.local = {local:'local'}

export default main;

const vm = window.vm = new Vue({
  el: '#app',

  template: `
  <svg width="200" height="100" style="border: 1px solid red;">
    <g style="transform: translate(0, 10px)">
      <path :d="path" />
    </g>
  </svg>`,

  data() {
    return {
      data : [],
      dataAnimated : [],
    }
  },

  computed: {
    getScales(){
      const xScale = d3.scaleLinear().range([0, 200])
      const yScale = d3.scaleLinear().range([90, 0])

      xScale.domain(d3.extent(this.data, (d,i)=>i))
      yScale.domain([0, d3.max(this.data)])

      return {xScale, yScale}
    },

    path() {
      const {xScale, yScale} = this.getScales
      const path = d3.line()
        .x( (d,i)=>xScale(i) )
        .y( (d,i)=>yScale(d) )
      return path(this.dataAnimated)
    }
  },

  watch: {
    data: function dataChange(nextData, prevData) {
      const _vm = this;
      const _shouldNotTween = prevData.length === 0

      if ( _shouldNotTween) {
        _vm.dataAnimated = nextData;
      } else {
        // Setup the animation loop.
        function animate(time) {
            requestAnimationFrame(animate);
            TWEEN.update(time)
        }
        requestAnimationFrame(animate)

        new TWEEN.Tween(prevData)
          .to(nextData, 500)
          .easing(TWEEN.Easing.Bounce.Out)
          .onUpdate( function onTweenUpdate() {
            _vm.dataAnimated = [...this];
          })
          .start()
      }
    }
  },

  mounted() {
    const _vm = this
    function createData() {
      const tmpData = []
      let i = 0
      while (++i <= 10) {
        tmpData.push(chance.natural({min:0, max:100}))
      }
      _vm.data = tmpData
    }

    createData(this)
    _vm.createDataRef = setInterval( createData , 1000)
  },

  beforeDestroy() {
    window.clearInterval(this.createDataRef);
  }
})




