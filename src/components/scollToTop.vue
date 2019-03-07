<template>
	
	<div @click="toTop" v-show="flag"> <i class="el-icon-arrow-up"></i></div>

</template>
<script>
export default{
	data(){
		return{
			flag:false
		}
	},

	mounted(){
		window.addEventListener("scroll",()=>{

			var st=document.body.scrollTop||document.documentElement.scrollTop;

			
			this.flag=st>200;
			

		})
	},

	methods:{
		toTop(){

			window.scrollTo(0,0);

		}
	}

}
</script>
<style scoped>
div{
	position: fixed;
	bottom:200px;
	right:150px;
	width: 60px;
	height: 60px;
	background: #f10125;
	color:white;
	text-align: center;
	line-height:60px;
	cursor: pointer;
	transition: all .5s;
	border-radius:50%;
	font-size:30px;
}
div:hover{
	transform: rotate(360deg);
	background: #f40;
}
</style>