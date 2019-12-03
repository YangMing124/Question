<template>
    <div id="all">
        <div id="header"></div>
        <div id="show_content">
            <h1>统计</h1>
            <hr style= "border:1px dotted rgb(221,221,221);margin-top:10px;">
             <div v-for="(list,index) in Lists" :key='index'>
                 <p style="margin-left:20%;">{{list.id}}.{{list.title}}</p>
                 <el-table
                :data="list.tableData"
                border
                :header-cell-style="tableHeaderColor"
                style="width: 70%; margin:auto;">
                
                <el-table-column
                label="选项"
                 align="center"
                width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.choice }}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="小计"
                 align="center"
                width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.times }}</span>
                </template>
                </el-table-column>
                <el-table-column label="比例" align="center">
                <template slot-scope="scope">
                    <el-progress :text-inside="true" :stroke-width="24" :percentage="scope.row.jin" status="success"></el-progress>
                </template>
                </el-table-column>
            </el-table>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
      return {
          Lists:[//所有题目数组
            {
                id:'',//问题标号
                title:"",//问题内容
                tableData: [{ //每个题目都有一个的选项数组
                choice: "", //哪一个选项，可以把label或者value值引入也可以获取数据时循环设置为123
                times: '',//次数
                jin: ''//进度，获取数据并计算后赋值给jin
                },
                ]
            }]
      }
    },
    methods:{
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {      
            if (rowIndex === 0) {        
                return 'background-color: rgb(228,231,235);'      
                }    
            }
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
        background-color: blueviolet;
        width: 70%;
        // height: 200px;
        margin:auto;
    }
</style>
