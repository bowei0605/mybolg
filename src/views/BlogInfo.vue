<template>
    <div>
        <v-main>
            <v-row justify="center" class="mx-4">
                <v-col cols="12" sm="7" md="7" xs="12" xl="6"><BlogListInfo /></v-col>
                <v-col cols="0" sm="5" md="3" xs="0" xl="2">
                    <BlogerInfo />
                    <NewBlogList />
                </v-col>
            </v-row>
        </v-main>
    </div>
</template>
<script>
import HeaderNav from '@/components/HeaderNav'
import BlogListInfo from '@/components/BlogListInfo'
import BlogerInfo from '@/components/BlogerInfo'
import NewBlogList from '@/components/NewBlogList'
export default {
    data:()=>({
        //
    }),
    components: {
        HeaderNav,
        BlogListInfo,
        BlogerInfo,
        NewBlogList
    },
}
</script>