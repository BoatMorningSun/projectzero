<template>
  <div>
    <div class="search_wrap">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        @clear="del"
        @search="onSearch"
        @input="input"
      />
    </div>

    <div class="hot_name_wrap" v-show="this.searchMusic.length === 0">
      <p class="hot_title">热门搜索</p>
      <van-tag
        round
        plain
        type="primary"
        class="hot_item"
        v-for="(item, index) in this.searchTip"
        :key="index"
        @click="clickTag(index)"
        >{{ item.first }}</van-tag
      >
    </div>

    <div class="searchRes" v-show="this.searchMusic.length !== 0">
      <div class="title">搜索结果</div>
      <van-cell-group>

<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>

        <van-cell
          center
          :title="item.name"
          :label="item.artists[0].name"
          v-for="(item, index) in this.searchMusic"
          :key="index"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" size="0.7rem" />
          </template>
        </van-cell>


       </van-list> 
      </van-cell-group>
 
    </div>
  </div>
</template>

<script>
import { defaultSearchAPI, hotSearchAPI, searchMusicAPI } from "@/api/index";

export default {
  data() {
    return {
      searchValue: "",
      searchTip: [],
      searchMusic: [],
      loading: false,
      finished: false,
      page:1,
      timer:null
    };
  },
  async created() {
    const defaultList = await defaultSearchAPI({});
    const hotList = await hotSearchAPI({
      limit: 15,
    });

    this.searchValue = defaultList.data.data.showKeyword;
    this.searchTip = hotList.data.result.hots;
  },

  methods: {
    del() {
      this.searchValue = " ";
    },
    clickTag(index) {
      this.finished = false
      this.searchValue = this.searchTip[index].first;
      this.onSearch();
    },
    async onSearch() {
      this.page = 1
      this.finished = false
      const search = await searchMusicAPI({
        limit: 10,
        keywords: this.searchValue,
        type: 1,
        offset:(this.page -1) * 10
      });
      
      console.log(search);
      if(search.data.result.songs === undefined){
        this.searchMusic  = [];
        this.finished = true
        return
      }
      this.searchMusic = search.data.result.songs;
    },



    async input() {
      if (this.searchValue == "") {
        this.searchMusic.length = 0;
        return;
      }
      if(this.timer) {clearTimeout(this.timer)} 
      this.timer = setTimeout(() => {
             this.onSearch();
      }, 500);
 
    },
    
    async onLoad(){
        this.page+=1
        this.finished = false
        const search = await searchMusicAPI({
        limit: 10,
        keywords: this.searchValue,
        type: 1,
        offset:(this.page -1) * 10
      });
        if(search.data.result.songs === undefined){
        this.finished  = true;
        return
      }
      this.searchMusic = [...this.searchMusic, ...search.data.result.songs]
      this.loading = false
    }
  },
};
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0.6rem;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
/* 搜索歌曲结果 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
.searchRes {
  margin-bottom: 1rem;
}
</style>