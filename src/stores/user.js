import { defineStore } from 'pinia'   // 导入 defineStore

export const useUserStore = defineStore('back_user', {
    state:()=> ({
        back_user:{}
    }),
    actions:{
        setManageUser(back_user){
            this.back_user=back_user
        }
    },
    // 开启数据持久化
    persist:true
})