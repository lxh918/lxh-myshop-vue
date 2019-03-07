<template>
	
	<div class="view">
		
		<div class="btn">
			<div class="btn_c" :class="{con:flag}" @click="flag=true">登录</div>
			<div class="btn_c" :class="{con:!flag}" @click="flag=false">注册</div>
		</div>

		<div class="group" v-show="flag">
			<p>
				<el-input v-model="login_user" placeholder="请输入用户名" class="inpu"></el-input>
			</p>
			<p>
				<el-input placeholder="请输入密码" class="inpu" v-model="login_pwd" show-password></el-input>
			</p>
			<p>
				<el-button type="danger" round  @click="login">登录</el-button>
			</p>
		</div>
		
		<div class="group" v-show="!flag">
			
			<p>
				<el-input v-model="reg_user" placeholder="请输入用户名" class="inpu"></el-input>
			</p>
			<p>
				<el-input placeholder="请输入密码" class="inpu" v-model="reg_pwd" show-password></el-input>
			</p>
			<p>
				  <el-button type="danger" round  @click="reg">注册</el-button>
			</p>

		</div>

	</div>

</template>
<script>
export default{
	data(){
		return{
			flag:true,
			reg_user:"",
			reg_pwd:"",
			login_user:"",
			login_pwd:""
		}
	},
	methods:{
		login(){

			if(!(/^.{6,12}$/.test(this.login_user))){

				this.$alert("userName is wrong","check",{
					confirmButtonText: 'I see'
				})

				return false;

			}

			if(!(/^\w{6,12}$/.test(this.login_pwd))){

				this.$alert("password is wrong","check",{
					confirmButtonText: 'I see'
				})

				return false;

			}
			
			this.$store.commit("loading_show");

			this.$http.get("/api/login",{params:{userName:this.login_user,password:this.login_pwd}}).then((res)=>{

				this.$store.commit("loading_hide");

				console.log(res.data)

				if(res.data.code){
					 
					this.$store.commit("update_token",res.data.token)

					this.$alert("登录成功","",{
						confirmButtonText: '关闭',
						callback:()=>{
							if(this.$route.query.url){
								this.$router.push(this.$route.query.url)
							}else{
								this.$router.push("/")
							}
						}
					})

				}else{

					this.$alert("登录失败","",{
						confirmButtonText: '关闭'
					})

				}

			})

		},
		reg(){

			if(!(/^.{6,12}$/.test(this.reg_user))){

				this.$alert("用户名错误","错误提示",{
					confirmButtonText: '知道啦'
				})

				return false;

			}

			if(!(/^\w{6,12}$/.test(this.reg_pwd))){

				this.$alert("密码错误","错误提示",{
					confirmButtonText: '知道啦'
				})

				return false;

			}
			
			this.$store.commit("loading_show");

			this.$http.get("/api/register",{params:{userName:this.reg_user,password:this.reg_pwd}}).then((res)=>{

				this.$store.commit("loading_hide");

				if(res.data.code){
					this.$alert("注册成功！去登录吧","",{
						confirmButtonText: '关闭',
						callback:()=>{
							this.flag=true
						}
					})

				}else{

					this.$alert("抱歉，已注册过","",{
						confirmButtonText: '关闭'
					})

				}

			})

		}
	}
}
</script>
<style scoped>
	.group button{
		width: 300px;
		height: 50px;
		background: red;
		font-size:16px;
		color:white;
		outline: 0;
		 
	}
	
	.inpu{
		width:500px;
		text-indent: .5em;
	}

	.inpu:focus{
		border:2px solid #f10125;
	}
	.group{
		margin-top:100px;
	}
	.group p{
		text-align: center;
		margin-top:20px;
	}
	.btn{
		box-shadow:0 2px 2px rgba(0,0,0,0.4);
	}
	.btn .btn_c{
		width:400px;
		height:50px;
		float:left;
		line-height: 50px;
		background:white;
		cursor: pointer;
		color:black;
	}
	.btn .con{
		
		background: #f10125;
		
		color:white;
	}
	.btn{
		overflow: hidden;
	}
	.view{
		width:800px;
		height: 500px;
		background: white;
		margin:100px auto;
	}

</style>