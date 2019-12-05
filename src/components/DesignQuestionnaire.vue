<template>
    <div id="design">
        <div id="header">
            <router-link to="/show" exact>
            <input type="button" id="achieve" value="完成编辑" @click="sub"></router-link>
        </div>
        <div id="footer">
            <div id="content">
                <div id="single">
                    <input type="radio" name="radio" id="radio"  value="1" v-model="param">
                    <label for="radio" class="radio-label">单选</label>
                </div>
                <div id="form_zone">
                    <h3 id="question">本调查用于调查高校在校生对社会满意度</h3>
                    <el-form :model="formdata" ref="formdata" label-width="100px" id="form_content">
                        <el-form-item label-width=auto v-for="(list,index) in formdata.Lists" :key='index' 
                        :class="['changes', list.isActive ? 'changes-active' :'changes-normal']">
                            <p class="firsttitle">{{list.title}}</p>
                            <span  @click="addEle(index)" class="add" >在此题后插入新题</span>
                            <el-button @click="up(index)" class="up">上移</el-button>
                            <el-button @click="down(index)" class="down">下移</el-button>
                            <el-button @click="top(index)" class="totop">置顶</el-button>
                            <el-button @click="under(index)" class="tolast">置底</el-button>
                            <el-button  @click="EdiEle(list)"  class="edit">编辑</el-button>
                            <el-button @click="deleteEle(index)" class="dele">删除</el-button>
                            <div v-for="it in list.radios" v-show="list.show">
                                <div :class="['radios', it.status ? 'radios-active' :'radios-normal']" id="ra" @click="change(it,index)"></div>
                                <div class="labels">{{ it.label }}</div>
                            </div>
                            <div v-show="!list.show" class="hide">
                                <textarea id="contentsarea" @input="sizecontrol(list)" class="textare" v-model="list.rtitle" placeholder="请输入要添加的内容"  style="width:50%;"/>
                                <div v-for="it in list.radios" class="radioall">
                                    <label><input type="radio"><input type="text" v-model="it.label"></label>
                                    <span class="choicedel" @click="delans(index)" style="cursor:pointer;margin-left:20px;color:rgb(157,157,157)">删除</span>
                                </div>
                                <span @click="addans(index)" class="adnew">增加选项</span>
                                <el-button class="cancel" @click="canceled(list,index)">取消编辑</el-button>
                                <el-button class="editin" @click="oked(list)">完成编辑</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
     name: "Design",
    data(){
        return{
            param:'1',//设置默认值为1，即设置第一个单选框为选中状态
            formdata:{
                Lists:[
                {
                    title:"请输入问题",
                    show:true,
                    isActive:false,
                    rtitle:"请输入问题",
                    radios:[
                        {   
                            label: '请输入选项',
                            value: 'a',
                            status: false
                        }
                    ],
                }
            ]},
        }
    },
    methods:{
        // saveProblem:function(){
        //     for(let i=0;i<this.formdata.Lists.length;i++)
        //     {
        //         var option = {};
        //         for(let j=0;j<this.formdata.Lists[i].radios.length;j++){
        //             option[this.formdata.Lists[i].radios[j].value]=this.formdata.Lists[i].radios[j].label;
        //         }
        //         this.$axios({
        //             methods:"post",
        //             url:"http://localhost:8080/problem/saveProblem",
        //             data:{
        //                 prblemName:this.formdata.Lists[i].title,
        //                 problemDsc:this.formdata.Lists[i].rtitle,
        //                 option:option
        //             }
        //         }).then((res)=>{
        //             console.log("data");
        //         })
        //     }
        // },
        addEle:function(index) {
            // var c=0;
            var obj={title:"请输入问题",show: true,rtitle:"请输入问题",
                    radios:[{label: '请输入选项',value: 'a',status: false}]};
            this.formdata.Lists.splice(index+1,0,JSON.parse(JSON.stringify(obj))); 
            // while(this.formdata.Lists){
            //     this.formdata.Lists[c].id=c+1;
            //     c++;
            // }
        },
        addans:function(index){
            var length=this.formdata.Lists[index].radios.length-1;
            var revalue=this.formdata.Lists[index].radios[length].value;
            if(revalue=='a')
            {
                this.formdata.Lists[index].radios.push({
                label: '请输入选项',
                value: 'b',
                status: false
                });
            }
            if(revalue=='b')
            {
                this.formdata.Lists[index].radios.push({
                label: '请输入选项',
                value: 'c',
                status: false
                });
            }
            if(length==2)
                alert("只可增加三个选项");
        },
        delans:function(index){
            var c=0;
            var obj=this.formdata.Lists[index].radios[c];
            while(obj)
            {
                c++;
                var obj=this.formdata.Lists[index].radios[c];
            }
            if(c==1)
                alert("只剩一个不可删除！");
            else
                this.formdata.Lists[index].radios.splice(index,1); 
            this.formdata.Lists[index].radios[0].value='a';
            if(this.formdata.Lists[index].radios[1]){
                this.formdata.Lists[index].radios[1].value='b';
            }
        },
        EdiEle:function(list){
            list.isActive=true;
            if(list.show==false)
                return;
            list.rtitle=list.title;
            list.show = !list.show;
        },
        oked:function(list){
            list.isActive=false;
            list.title=list.rtitle;
            list.rtitle="请输入问题";
            list.show = !list.show;
        },
        canceled:function(list,index){
            var a=this.formdata.Lists[index].title;
            var c=[];
            var i=0;
            while(list.radios)
            {
                c[i]=this.formdata.Lists[index].radios[i];
                i++;
            }
            this.formdata.Lists[index].radios.splice(index,3);
            i=0;
            while(c)
            {
                this.formdata.Lists[index].radios.push(c[i]);
                i++;
            }
            this.formdata.Lists[index].title=a;
            this.formdata.Lists[index].rtitle=a;
            list.show=!list.show;
        },
        deleteEle:function(index){
            var c=0;
            var obj=this.formdata.Lists[c];
            while(obj)
            {
                c++;
                var obj=this.formdata.Lists[c];
            }
            if(c==1)
                alert("只剩一个不可删除！");
            else
                this.formdata.Lists.splice(index,1); 
        },
        up:function(index){
            if(index==0)
                alert("第一个无法上移动");
            else{
                this.formdata.Lists.splice(index,0,this.formdata.Lists[index-1]);
                this.formdata.Lists.splice(index-1,0,this.formdata.Lists[index+1]); 
                this.formdata.Lists.splice(index+1,1); 
                this.formdata.Lists.splice(index+1,1); 
            }
        },
        top:function(index){
            if(index==0)
                alert("第一个无需置顶");
            else
            {
            this.formdata.Lists.splice(0,0,this.formdata.Lists[index]);  
            this.formdata.Lists.splice(index+1,1);
            }
             
        },
        down(index){
            if(index==this.formdata.Lists.length-1)    
                alert("最后一个无法下移");
            else
            {
                this.formdata.Lists.splice(index+1,0,this.formdata.Lists[index+1]);
                this.formdata.Lists.splice(index+3,0,this.formdata.Lists[index]); 
                this.formdata.Lists.splice(index,1); 
                this.formdata.Lists.splice(index,1);
            } 
        },
        under(index){
            var len=this.formdata.Lists.length;
            if(index==len-1)    
                alert("最后一个无需置底");
            else
            {
                this.formdata.Lists.splice(len,0,this.formdata.Lists[index]); 
                this.formdata.Lists.splice(index,1); 
            } 
        },
        change(data,index) {
            for (let item of this.formdata.Lists[index].radios) {
                // 如果值相等，即为点击的数据，状态为active，其他normal
                item.status = data.value === item.value;
            }
            // console.log(data.value);
        },
        sizecontrol(list){
            var maxl=50//总长
            var s=list.rtitle.length;
            if(s>maxl){
                list.rtitle=list.rtitle.substr(0,maxl);
                alert("问题题目最长可输入50字！");
                }
            if(s==0){
                alert("不可为空");
            }
        },
            
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
*{
    margin: 0;
    padding: 0;
}
td{
    width: 10px;
    height: 10px;
}
    #design *{
        box-sizing:border-box;
        /* *是add-blog下面所有的全选 */
    }
    #design{
        width: 100%;
        height: 600px;
        background-color: rgb(238,238,238);
    }
    #header{
        width: 100%;
        height: 11%;
        background-color: rgb(136,136,136);
    }
    #footer{
        width: 100%;
        height: 89%;
    }
    #achieve{
        width: 100px;
        height: 35px;
        border-radius: 10px;
        border: 0;
        position: relative;
        top: 14.5px;
        left: 300px;
        background-color: rgb(241,120,25);
        color: white;
        cursor: pointer;
    }
    #content{
        width: 70%;
        height: 95%;
        margin: auto;
        position: relative;
        top: 5%;
    }
    #single{
        width: 100%;
        height: 10%;
        background-color: rgb(0,162,232);
    }
    #form_zone{
        width: 100%;
        height: 90%;
        overflow:scroll;
        background-color: white;
    }
    #radio{
        width: 20px;
        height: 20px;
        position: relative;
        left: 200px;
        top: 15px;
    }
    .radio-label{
        position: relative;
        left: 203px;
        top: 10px;
        color: white;
    }
    #question{
        /* position: relative; */
        margin-left: 60px;
        margin-top: 30px;
    }
    #form_content{
        width: 86%;
        height: 100%;
        /* background-color: brown; */
        margin: auto;
        margin-top: 12px;
    }
    .changes{
        list-style-type:none;
        width: 100%;
        margin-top: 10px;
        // background-color: chartreuse;
        border: 1px solid rgb(253,189,103);
        &-active {
           height:310px;
         }
         &-normal {
            height:230px;
         }
    }
    .add,.addop{
        cursor: pointer;
    }
    .add{
        margin-left: 240px;
        font-size: 12px;
        color:red;
    }
    .addop{
        color: rgb(28,165,252);
    }
    .hide{
        height: 223px;
        width: 99%;
        margin-left: 2px;
        background-color: rgb(242,242,242);
        display: inline-block;
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
    .editin{
        display: inline-block;
        width: 100px;
        height: 30px;
        margin-left: 30px;
    }
    .firsttitle{
        margin-left: 30px;
        // display: inline-block;
    }
    .up,.down,.totop,.tolast,.edit,.dele{
        font-size: 13px;
        width: 50px;
        height: 25px;
        text-align: center;
    }
    .textare{
        margin-left: 10px;
        margin-top: 10px;
    }
    .adnew{
        position: relative;
        left: 40px;
        cursor: pointer;
        font-size: 13px;
        color: rgb(0,162,232);
    }
    .radioall{
        margin-left: 20px;
    }
    .cancel{
        margin-left: 250px;
        width: 100px;
        height: 30px;
    }
</style>
