<template>
	
	<div>
		
		<h2>{{item.title}}</h2>
		<img :src="item.imageUrl" alt="">
		<p class="sale">商品卖点：{{item.salePoint}}</p>
		<p class="price">商品价格：￥{{item.priceStr}}</p>
		<p class="like">❤{{item.nice}}</p>
		<el-button type="danger" round  @click="add" class="buy">立即抢购</el-button>
	</div>

</template>
<script>
export default{

	data(){
		return{
			item:{}
		}
	},
	created(){

		this.$store.commit("loading_show");

		this.$http.get("/api/detail",{params:{goodId:this.$route.query.goodId}}).then((res)=>{

			this.item=res.data[0];

			this.$store.commit("loading_hide");

		})

	},
	methods:{
		add(){

			if(this.$store.state.token){

				this.$http.get("/api/add",{params:{goodId:this.$route.query.goodId,token:this.$store.state.token}}).then((res)=>{

					if(res.data.code){

						this.$alert("添加成功","添加消息");

					}else{

						this.$store.commit("update_token","");
						localStorage.removeItem("token");

						this.$alert("token expired,we will let you go to login page","add goods",{
							callback:()=>{
								this.$router.push("/login?url="+this.$route.fullPath)
							}
						});

					}

				})

			}else{
				alert("您好没有登录")
			}

		}
	}

}
</script>
<style scoped>
div{
	 width:1200px;
	 margin:100px auto;
	 position:relative;
}
	img{
		width:500px;
		float:left;
		 
	}
	h2{
		position:absolute;
		left:550px;
	}
	button{
		margin-top:50px;
		font-size:20px;
		outline: 0;
		box-shadow: 5px 5px 10px rgba(0,0,0,0.6);
		border:none;
		cursor: pointer;
	}
	
	button:active{
		box-shadow:0 0 0;
		transform: translate(5px,5px);
	}
	.sale{
		position:absolute;
		left:550px;
		top:50px;
		color:#f10125;
	}
	.price{
		position:absolute;
		left:550px;
		top:100px;
		color:#f10125;
	}
	.like{
		color:#f10125;
		position:absolute;
		left:550px;
		top:150px;
	}
	.buy{
		position:absolute;
		left:550px;
		top:150px;
	}
</style>