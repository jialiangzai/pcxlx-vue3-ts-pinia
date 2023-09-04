import { defineStore } from "pinia";
import { ApiDictItemQueryBatch } from "@/utils/api/role";
const ENUMS = {
  // 全局允许禁止
  system_global_status: [],
  // 全局性别
  system_global_gender: [],
  // 菜单类型
  system_menu_type: [],
  // 显示隐藏
  system_global_visibility: [],
  // 全局缓存
  system_global_cache: [],
  // 公告类型
  system_notice_type: [],
  // 日志业务类型
  system_operator_type: [],
  // 异常类型
  system_global_expstatus: [],
  // 允许禁止
  system_allow_prohibit: [],
  // 执行策略
  system_misfire_policy: [],
  // 全局是否
  system_global_yesorno: [],
  // 定时任务组名
  system_global_taskgroup: [],
  // 定时任务状态
  system_task_status: [],
  //商品上下架
  system_products_rack: [],
  //全局意见反馈
  system_products_feedback: [],
  //全局支付状态
  system_products_isPay: [],
  //全局发货状态
  system_products_deliveryStatus: [],
  //全局订单状态
  system_products_status: [],
  //全局退换货类型
  system_products_returnsType: [],
  //全局收货状态
  system_products_received: [],
  // 全局退换货审核状态
  system_products_verifyed: [],
  //退换货原因类型
  system_returns_type: []
}
export const dictStore = defineStore('dict',{
  state:()=>{
    return {
      ...ENUMS
    }
  },
  actions:{
    async  resolveDictItemEnum(params) {
     let {data} =  await ApiDictItemQueryBatch([params])
    //  注意vuex中的actions不可以return
     return data[params]
    }
  },
})