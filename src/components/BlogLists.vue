<template>
  <div>
      <v-row dense class="mx-auto">
          <v-col v-for="(item, i) in items" :key="i" cols="12" class="my-3" @click="goBlogInfo()">
              <v-card :color="item.color" dark>
                  <v-card-title v-text="item.title"></v-card-title>
                  <v-card-subtitle v-text="item.artist" class="text-over"></v-card-subtitle>
                  <v-card-actions class="justify-space-between mr-3">
                    <v-btn text>Listen Now</v-btn>
                    <span>{{new Date().toISOString().substr(0, 10)}}</span>
                  </v-card-actions>
              </v-card>
          </v-col>
      </v-row>
  </div>
</template>
<script>
  export default {
    data: () => ({
      items: [
        {
          color: '#1F7087',
          title: 'Git常用命令总结',
          artist: 'Listen to your favorite artists and albums whenever and wherever, online and offline.Listen to your favorite artists and albums whenever and wherever, online and offline.',
        },
        {
          color: '#952175',
          title: 'VS code的快捷键',
          artist: '项目开发人员从远端库克隆代码到本机（clone），此时本地仅有一个master分支；新建dev分支并切换、在Dev分支中进行开发工作，其实就是修改并提交代码（add+commit）；当开发的dev分支的代码没问题时，将dev分支合并（merge）到master；将master推送到远端分支，至此，其他的项目开发人员就可以查看到你提交的代码了！',
        },
        {
          color: '#867175',
          title: 'Vue实现底部导航',
          artist: 'Listen to your favorite artists and albums whenever and wherever, online and offline.Listen to your favorite artists and albums whenever and wherever, online and offline.',
        },
      ],
    }),
    methods: {
      goBlogInfo(){
        console.log(123456)
        this.$router.push('./BlogInfo')
      }
    }
  }
</script>

<style scoped>
  .text-over{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 40px;
  }
</style>