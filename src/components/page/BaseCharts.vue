<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size:30px;"><i class="el-icon-date"></i> 可视化数据表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="schart" style="">
                <!-- <div class="content-title">柱状图</div> -->
                <schart canvasId="bar" width="700" height="400" :data="data1" type="bar" :options="options1"></schart>
            </div>
            <div class="schart">
                <!-- <div class="content-title">饼状图</div> -->
                <schart canvasId="pie" width="700" height="400" :data="data2" type="line" :options="options2"></schart>
                <!-- <schart canvasId="bar" width="500" height="400" :data="data2" type="bar" :options="options2"></schart> -->
            </div>
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    export default {
        components: {
            Schart
        },
        data: () => ({
            data1:[
                {name:'11-02',value:1141},
                {name:'11-03',value:1499},
                {name:'11-04',value:2260},
                {name:'11-05',value:1170},
                {name:'11-06',value:970},
                {name:'11-07',value:1450},
                {name:'11-08',value:1450}
            ],
            data2 : [
                {name:'点击阅读量',value:1200},
                {name:'转发总次数',value:1200},
                {name:'第一次抽奖',value:1200},
                {name:'第二次抽奖',value:1200},
                {name:'填写信息量',value:2400},
                {name:'核销兑奖量',value:1000}
            ],
            options1: {
                title: '最近一周访问量',
                bgColor: '#009688',
                titleColor: '#ffffff',
                fillColor: '#e0f2f1',
                axisColor: '#ffffff',
                contentColor: '#999'
            },
            options2: {
                title: '最近一周大数据',
                bgColor: '#009688',
                titleColor: '#ffffff',
                fillColor: '#e0f2f1',
                axisColor: '#ffffff',
                contentColor: '#999'
            },
            // options3: {
            //     title: '最近一周抽奖量',
            //     bgColor: '#607d8b',
            //     titleColor: '#ffffff',
            //     legendColor: '#ffffff'
            // },
        }),
        created(){
            this.ifLogin();
            this.getweekVisit();
            this.getweekDate();
        },
        methods:{
            //判断是否登录
            ifLogin(){
                let username = sessionStorage.getItem('ms_username');
                console.log(username)
                if(username==null){
                    this.$router.replace('/login')
                }
            },
            //一周访问量
            getweekVisit(){
                this.$http.get("/api/activity/web/loginFrom/weekVisit").then((res) => {
                     console.log(res);
                     if(res.status==200){
                         this.data1=res.data.list
                     }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            //一周数据
            getweekDate(){
                this.$http.get("/api/activity/web/loginFrom/weekDate").then((res) => {
                     console.log(res.data.list);
                     if(res.status==200){
                         this.data2=res.data.list
                     }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style scoped>
    .schart{
        width: 750px;
        display: inline-block;
    }
    .content-title{
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    
</style>