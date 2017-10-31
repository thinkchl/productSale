<template>
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <template v-for="(item,index) in items">
        <li data-target="#carousel-example-generic" :data-slide-to="index" :class="{'active':item.default}"></li>
    </template>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    <div class="item" v-for="item in items"  :class="{'active':item.default}">
         <a :href="item.link">
      		<img :src="'static/slideShow/pic'+item.id+'.jpg'">
    	</a>
    </div>
  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

</template>

<script>
	export default {
		data () {
			return {
				items:[
          {
            "id":1,
            "link":"http://baidu.com",
            "default":true
          },
          {
            "id":2,
            "link":"http://qq.com"
          },
          {
            "id":3,
            "link":"http://oracle.com"
          },
          {
            "id":4,
            "link":"http://linux.com"
          }
        ]
			}
		},
		created () {
			// this.$http.get('/api/getSlideList')
			// 	.then( function(data)  {
			// 		this.$data.items = data.data.data;
			// 	},function(err){

			// 	})
		},
		mounted () {
			$('.carousel').carousel({
  				interval: 3000
			})
		}
	}

</script>

<style scoped lang="less">
	

</style>