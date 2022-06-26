import request from '@/utils/request'
 
//默认搜索框数据
export const defaultSearch = params =>request({
    url:'/search/default',
    params

})

//热搜列表
export const hotSearch = params =>request({
    url:'/search/hot',
    params

})

//搜索歌曲
export const searchMusic = params =>request({
    url:'/search',
    params
})