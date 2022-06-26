<template>
  <div>
    <div class="title">推荐歌单</div>
    <van-row gutter="5">
      <van-col span="8" v-for="item in this.list" :key="item.id">
        <van-image
          width="100%"
          height="3.5rem"
          fit="cover"
          :src="item.picUrl"
        />
        <p class="song_name">{{ item.name }}</p>
      </van-col>
    </van-row>

    <div class="title">最新音乐</div>
    <van-cell-group>
      <van-cell center :title="item.name"  :label="item.song.artists[0].name" v-for="item in this.newMusic" :key="item.id">
        <template #right-icon>
          <van-icon name="play-circle-o" size="0.7rem" />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { recommendMusicAPI, newMusicAPI } from "@/api/index";

export default {
  async created() {
    const res = await recommendMusicAPI({
      limit: 6,
    });
    const newMusic = await newMusicAPI({});
    
    this.list = res.data.result;
    this.newMusic = newMusic.data.result
    console.log(newMusic);
 
  },
  data() {
    return {
      list: [],
      newMusic: [],
    };
  },
};
</script>

<style scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
 
</style>