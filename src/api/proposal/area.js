import request from '@/utils/request'

// 查询区域列表
export function areaList(query){
    return request({
        url:'/area/getAreaList',
        method:'get',
        params:query
    })
}  

// 新增/修改区域
export function addArea(data){
    return request({
        url:'/area/saveOrUpdateArea',
        method:'post',
        data:data
    })
}


//删除区域 
export function deleteArea(areaId){
    return request({
        url:'/area/deleteArea?ids='+areaId,
        method:'get'
    })
}

// 获取区域详情
export function getArea(areaId){
    return request({
        url:'/area/getAreaDetail?id='+areaId,
        method:'get'
    })
}