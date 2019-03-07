<template>
	
	<div class="view">
		
		<div v-show="!$store.state.token" class="tip"> 
			您还没有登录,快去登录吧 <router-link to="/Login?url=/shopcar">login</router-link>
		 </div>

		 <div v-show="$store.state.token">
			
			<div v-if="list.length">
				
				<ul>
					<li v-for="(item,index) in list">
						<img :src="item.imageUrl">
						<p>{{item.title}} </p>
						<span @click="del(item.Id,index)" class="del"><i class="el-icon-delete" ></i></span>
					</li>
				</ul>

			</div>
			<div class="tip" v-else>
				您的购物车空空如也,快去抢购商品吧  <router-link to="/" style="color:#f10125">去首页</router-link>
			</div>

		 </div>

	</div>

</template>
<script>
export default{
	data(){
		return{
			list:[]
		}
	},
	created(){

		if(this.$store.state.token){

			this.$http.get("/api/shoplist",{params:{token:this.$store.state.token}}).then((res)=>{
				this.list=res.data;
			})	

		}

	},
	methods:{
		del(id,index){
			this.$http.get("/api/del",{params:{token:this.$store.state.token,goodId:id}}).then((res)=>{
				if(res.data.code){
				this.$alert("删除成功","");

					this.list.splice(index,1)
				}else{
					this.$alert("删除失败","");
				}
			})	
		}
	}
}
</script>
<style scoped>
	.view{
		width:1200px;
		margin:0 auto;
	 
	}
	.tip{
		height: 500px;
		line-height:500px;
	}
	li{
		width:100%;
		background:#fff;
		padding:10px;
		height:100px;
		position:relative;
		margin-top:10px;
	}
	img{
		display:inline-block;
		width:200px;
	 	position:absolute;
		left:20px;
	}
	p{
		position:absolute;
		left:300px;
		top:30px;
		font-size:30px;
	}
	.del{
		position:absolute;
		left:800px;
		top:35px;
	}
	span{
		font-size:30px;
		cursor:pointer;
		color:#f10125;
	}
</style>