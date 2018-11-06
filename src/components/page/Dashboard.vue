<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-row>
                    <el-col>
                        <el-card shadow="hover" class="mgb20">
                            <div class="user-info">
                                <img src="static/img/img.jpg" class="user-avator" alt="">
                                <div class="user-info-cont">
                                    <div class="user-info-name">{{name}}</div>
                                    <div>{{role}}</div>
                                </div>
                            </div>
                            <!-- <div class="user-info-list">欢迎您<span>来到后台数据中心</span></div> -->
                            <div class="user-info-list"><span>欢迎您来到后台数据中心</span></div>
                        </el-card>
                        <el-card shadow="hover">
                            <div slot="header" class="clearfix">
                                <span>今天与上一天数据对比</span>
                            </div>
                            用户访问总量
                            <el-progress :percentage="parseFloat(comparedate.click)*100" color="#42b983"></el-progress>
                            用户转发总量
                            <el-progress :percentage="parseFloat(comparedate.forward)*100" color="#f1e05a"></el-progress>
                            用户抽奖总量
                            <el-progress :percentage="parseFloat(comparedate.znum)*100"></el-progress>
                            用户二次抽奖总量
                            <el-progress :percentage="parseFloat(comparedate.twonum)*100" color="#f58c6c"></el-progress>
                            填写信息中奖数量
                            <el-progress :percentage="parseFloat(comparedate.writenum)*100" color="#f93c6d"></el-progress>
                            核销兑奖数量
                            <el-progress :percentage="parseFloat(comparedate.cancelnum)*100" color="#f56c6c"></el-progress>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="16">
                <el-row style="font-size:40px;margin-bottom:50px;">今日大数据：</el-row>
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-view grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{getnowdate.click}}</div>
                                    <div>用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-share grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{getnowdate.forward}}</div>
                                    <div>转发数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-edit grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{getnowdate.writenum}}</div>
                                    <div>信息填写数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-more grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{getnowdate.znum}}</div>
                                    <div>参与抽奖总人数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-more-outline grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{getnowdate.twonum}}</div>
                                    <div>参与二次抽奖总人数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-success grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{getnowdate.cancelnum}}</div>
                                    <div>核销兑奖数量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: sessionStorage.getItem('ms_username'),
                comparedate:{click:0.3,forward:0.4,znum:0.6,twonum:0.4,writenum:0.1,cancelnum:0.8},
                getnowdate:{}
            }
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        created() {
            this.ifLogin();
            this.getnowDate();
            this.getcompareDate();
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
            // 今日数据
            getnowDate(){
                this.$http.get("/api/activity/web/loginFrom/nowDate").then((res) => {
                     console.log(res);
                     if(res.status==200){
                         this.getnowdate=res.data.list[0]
                     }
                }).catch((err)=>{
                    console.log(err)
                })
            },
            // 今日和昨天比较
            getcompareDate(){
                this.$http.get("/api/activity/web/loginFrom/compareDate").then((res) => {
                     console.log(res);
                     if(res.status==200){
                         this.comparedate=res.data.list[0]
                     }
                     
                }).catch((err)=>{
                    console.log(err)
                })
            }
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

</style>
