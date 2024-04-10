<script>
export default {
  name: 'NoData',
  functional: true,
  props: {
    nodata: {
      type: Boolean,
      default: false
    },
  },
  render(h, context) {
    const { nodata } = context.props
    const nodataImg = require('@/assets/images/nodata.png')
    return nodata && <div style='display:flex;align-items:center;justify-content:space-around;height:200px;'>
      <img src={nodataImg} style='display:block;width:100px'/>
    </div>
  }
}
</script>
