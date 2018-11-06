<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="font-size:12px;line-height:18px;color:#999;text-align:center;margin-top:20px;">Tips : 本系统仅为客户提供数据查看方便，如有侵犯隐私，与本公司无关。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                console.log(this.ruleForm.username);
                console.log(this.ruleForm.password);   
                let params={
                    username:this.ruleForm.username,
                    password:this.ruleForm.password
                }
                // sessionStorage.setItem('ms_username',this.ruleForm.username);
                // this.$router.replace('/')
                this.$http.post("/api/activity/web/loginFrom/loginFrom",qs.stringify(params)).then((res) => {
                     console.log(res);
                     if(res.data.state=='ok'){
                        sessionStorage.setItem('ms_username',this.ruleForm.username);
                        this.$router.replace('/')
                     }else{
                         alert(res.data.msg)
                     }
                }).catch((err)=>{
                    console.log(err)
                    
                })
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>