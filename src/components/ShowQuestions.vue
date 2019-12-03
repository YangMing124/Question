<template>
    <div id="all">
        <div id="header"></div>
        <div id="show_content">
            <h1>调查问卷</h1>
            <hr style= "border:1px dotted rgb(221,221,221);margin-top:10px;">
            <el-form :model="formdata" ref="formdata" label-width="100px" id="form_content">
                <el-form-item label-width=auto v-for="(list,index) in formdata.Lists" :key='index'>
                    <span>{{list.id}}.{{list.title}}</span>
                    <div v-for="it in list.radios">
                        <div :class="['radios', it.status ? 'radios-active' :'radios-normal']" id="ra" @click="change(it,index)"></div>
                        <div class="labels">{{ it.label }}</div>
                    </div>
                </el-form-item>
                <router-link to="/answer" exact> <el-button id="submit">提交</el-button></router-link>
            </el-form>
        </div>
    </div>
</template>

<script>

export default {
    name:"show",
    data(){
        return{
            formdata:{
                Lists:[//题目数组
                {
                    id:'',//题目标号
                    title:"",//题目
                    radios:[//每个题目都有的一个选项数组
                        {   
                            label: '',//选项所显示的值
                            value: '', //选项的value，三个分别为abc，在Design中已经设定好
                            status: false
                        }
                    ],
                }
            ]}
        }
    },
    methods:{
        change(data,index) {
            for (let item of this.formdata.Lists[index].radios) {
                // 如果值相等，即为点击的数据，状态为active，其他normal
                item.status = data.value === item.value;
            }
            // console.log(data.value);
        },
    }
}   
</script>
  
<style scoped  lang="scss">
    *{
    margin: 0;
    padding: 0;
}
    #all *{
        box-sizing:border-box;
        /* *是add-blog下面所有的全选 */
    }
    #all{
        width: 100%;
        height: 600px;
        background-color: rgb(97,203,255);
    }
    #header{
        width: 66%;
        height: 16%;
        margin:auto;
        background-image: url("../assets/tit.png");
        background-size: 100%;
        background-repeat: no-repeat;
        /* background-color: rgb(136,136,136); */
    }
    #show_content{
        width: 66%;
        height: 84%;
        margin: auto;
        background-color: white;
        overflow:scroll;
    }
    h1{
        text-align: center;
        color: rgb(30,160,250);
    }
    .labels{
        display:inline-block;
    }
    .radios {
         margin-top: 13px;
         margin-left: 30px;
         vertical-align: top;
         display: inline-block;
         width: 24px;
         height: 24px;
         background-size: 60%;
         background-repeat: no-repeat;
         &-active {
           background-image: url("../assets/radio-active.png");
         }
         &-normal {
           background-image: url("../assets/radio-normal.png");
         }
    }
    #form_content{
        // background-color: rgb(197, 162, 230);
        width: 70%;
        // height: 200px;
        margin:auto;
    }
    #submit{
        height: 30px;
        width: 100px;
        margin-top: 50px;
        margin-left: 230px;
    }
</style>
