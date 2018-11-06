<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size:30px;"><i class="el-icon-tickets"></i> 当天用户信息</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button type="primary" style="float:right;margin-top:-31px;" @click="getInfo()">一键导出数据</el-button>
        </div>
        <div class="container">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="realname" label="姓名" width="180"></el-table-column>
                <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
                <el-table-column prop="name" label="奖品名称" width="180"></el-table-column>
                <el-table-column prop="level" label="奖品等级" width="180"></el-table-column>
                <el-table-column prop="province" label="微信填写省份" width="180"></el-table-column>
                <el-table-column prop="coordinateProvince" label="当前位置-省" width="180"></el-table-column>
                <el-table-column prop="coordinateCity" label="当前位置-市" width="180"></el-table-column>
                <el-table-column prop="mobile_number" label="手机号" width="180"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" :small="true" layout="prev, pager, next" :page-count="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        data() {
            return {
                tableData: [],
                cur_page: 1,
                total:0
            }
        },
        created() {
            this.getTotal();
            this.getData();
            this.ifLogin();
        },
        methods: {
            //判断是否登录
            ifLogin(){
                let username = sessionStorage.getItem('ms_username');
                console.log(username)
                if(username==null){
                    this.$router.replace('/login')
                }
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getData() {
                let params={
                        number:10,
                        pagesNum:this.cur_page
                }
                
                this.$http.post("/api/activity/web/loginFrom/usermessage",qs.stringify(params)).then((res) => {
                     if(res.status==200){
                         this.tableData=res.data.list
                     }
                     
                }).catch((err)=>{
                    console.log(err)
                })
            },
            getTotal(){
                this.$http.post("/api/activity/web/loginFrom/usermessageNumber").then((res) => {
                     console.log(res);
                     if(res.status==200){
                         this.total=Math.ceil(res.data.list[0].number)
                     }
                     console.log(this.total)
                     
                }).catch((err)=>{
                    console.log(err)
                })
            },
            getInfo(){
                // this.$http.post("/api/copyDate").then((res) => {
                //      console.log(res.data);
                // }).catch((err)=>{
                //     console.log(err)
                // })
                window.location.href="http://47.99.54.35:8081/activity/web/loginFrom/copyDate"
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
