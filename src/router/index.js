import { createRouter, createWebHistory } from "vue-router";
import PageSize from "@/views/PageSize.vue"
import PageColor from "@/views/PageColor.vue"
import PageSale from "@/views/PageSale.vue"
import PageVoucher from "@/views/PageVoucher.vue"
import PageCategory from "@/views/PageCategory.vue"
const routes = [
    {
      path: '/admin/size',
      name: 'PageSize',
      component: PageSize
    },
    {
      path: '/admin/color',
      name: 'PageColor',
      component: PageColor
    },
    {
      path: '/admin/sale',
      name: 'PageSale',
      component: PageSale
    },
    {
      path: '/admin/category',
      name: 'PageCategory',
      component: PageCategory
    },
    {
      path: '/admin/voucher',
      name: 'PageVoucher',
      component: PageVoucher
    },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
