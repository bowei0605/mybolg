<template>
  <v-app>
    <v-main>
      <v-row justify="center" class="mx-4">
        <v-col cols="12" sm="7" md="7" xs="12" xl="6"><BlogLists /></v-col>
        <v-col cols="0" sm="5" md="3" xs="0" xl="2">
          <MyInfo />
          <NewBlogList />
        </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'
import BlogLists from '@/components/BlogLists'
import MyInfo from '@/components/MyInfo'
import NewBlogList from '@/components/NewBlogList'
export default {
  name: 'Home',
  components:{
    HeaderNav,
    BlogLists,
    MyInfo,
    NewBlogList
  },

  data: () => ({
    //
  })
};
</script>
