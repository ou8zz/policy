import flatMap from 'lodash/flatMap'

const _originMenu = [
  {
    key: 'interpretation',
    name: '电报',
    icon: 'setting',
    clickable: false,
    child: [
      // {
      //   key: 'classification',
      //   name: '分类'
      // },
      {
        key: 'telegraph',
        name: '电报',
      },
      {
        key: 'remind',
        name: '提醒',
      },
    ],
  },
  {
    key: 'topicHierarchy',
    name: '话题分层',
    icon: 'setting',
    clickable: false,
    child: [
      // {
      //   key: 'classification',
      //   name: '分类'
      // },
      {
        key: 'topicHierarchyList',
        name: '话题分层',
      },
    ],
  },
  {
    key: 'owl',
    name: '猫头鹰',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'news',
        name: '新闻监控',
      },
      {
        key: 'source',
        name: '监控源',
      },
      // {
      //   key: 'setting',
      //   name: '设置',
      // },
    ],
  },
  {
    key: 'plate',
    name: '板块',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'singlePlate',
        name: '单板块',
      },
      {
        key: 'morePlate',
        name: '多板块',
      },
      {
        key: 'plateList',
        name: '板块列表',
      },
      {
        key: 'stockOperation',
        name: '股票池运营',
      },
      {
        key: 'introductionEdit',
        name: '简介编辑',
      },
      {
        key: 'introductionView',
        name: '简介查看',
      },
    ],
  },
  {
    key: 'articleTopic',
    name: '话题',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'articleTopicCreate',
        name: '话题创建',
      },
      {
        key: 'articleTopicList',
        name: '话题列表',
      },
      {
        key: 'articleTopicType',
        name: '话题分类',
      },
      {
        key: 'subjectRecommend',
        name: '主题推荐',
      },
    ],
  },
  {
    key: 'caiLSArticle',
    name: '文章列表',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'allArticle',
        name: '全部文章',
      },
      {
        key: 'articleRelease',
        name: '发布文章',
      },
    ],
  },
  {
    key: 'depth',
    name: '要闻管理',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'depthRoute',
        name: '深度',
        type: 2,
      },
      /*{
        key: 'depthCreate?from=newsArticle',
        name: '添加文章',
      },*/
      {
        key: 'recommended',
        name: '推荐位管理',
      },
      {
        key: 'columnArticle',
        name: '栏目文章置顶管理',
      },
      {
        key: 'softManagement',
        name: '要闻频道软文管理',
      },
    ],
  },
  {
    key: 'internalReference',
    name: '内参',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'limitAnalysis',
        name: '涨停分析',
        type: 203,
      },
      {
        key: 'limitForecast',
        name: '涨停预测',
        type: 208,
      },
      {
        key: 'limitDecrypt',
        name: '涨停解密',
        type: 212,
      },
    ],
  },
  {
    key: 'time',
    name: '时间轴',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'timeAxises',
        name: '时间轴',
      },
    ],
  },
  {
    key: 'featured',
    name: 'VIP',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'article',
        name: '文章',
      },
      {
        key: 'specialColum',
        name: '专栏',
      },
      {
        key: 'carousel',
        name: '轮播图',
      },
      {
        key: 'readRecommended',
        name: '试读推荐',
      },
    ],
  },
  {
    key: 'video',
    name: '名家',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'payVideo',
        name: '视频',
      },
      {
        key: 'albumCenter',
        name: '专辑',
      },
      {
        key: 'banner',
        name: '轮播图',
      },
    ],
  },
  {
    key: 'vTalk',
    name: 'V说',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'talk',
        name: 'V说',
        type: 9,
      },
    ],
  },
  {
    key: 'tag',
    name: '标签',
    icon: 'tags',
    clickable: false,
    child: [
      {
        key: 'tagManage',
        name: '标签管理',
      },
      {
        key: 'tagSort',
        name: '标签分类',
      },
    ],
  },
  {
    key: 'sliderBanner',
    name: '轮播图管理',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'sliderBannerCarousel',
        name: '轮播图',
      },
      {
        key: 'pushManagement',
        name: '推送管理',
      },
    ],
  },
  {
    key: 'discounts',
    name: '运营管理',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'productOperation',
        name: '产品运营管理',
      },
      {
        key: 'grantDiscounts',
        name: '发放优惠劵',
      },
      {
        key: 'discountsList',
        name: '优惠劵列表',
      },
      {
        key: 'columnBuyRecord',
        name: '栏目购买记录',
      },
      {
        key: 'articleBuyRecord',
        name: '文章购买记录',
      },
    ],
  },
  {
    key: 'credits',
    name: '积分商城',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'product',
        name: '商品管理',
      },
      {
        key: 'creditsBanner',
        name: '广告管理',
      },
      {
        key: 'creditsOrder',
        name: '兑换管理',
      },
    ],
  },
  {
    key: 'factFeedback',
    name: '报料反馈',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'factFeedback',
        name: '报料反馈',
      },
    ],
  },
  {
    key: 'comment',
    name: '评论',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'manage',
        name: '评论管理',
      },
      {
        key: 'blackList',
        name: '黑名单',
      },
    ],
  },
  {
    key: 'hot',
    name: '热词',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'hotWord',
        name: '热词',
      },
    ],
  },
  {
    key: 'dummy',
    name: '马甲管理',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'dummyAuthors',
        name: '马甲管理',
      },
    ],
  },
  {
    key: 'ad',
    name: '广告',
    icon: 'setting',
    clickable: false,
    child: [
      /*{ //广告暂时隐藏不能删除
        key: 'advertising',
        name: '广告',
      },*/
      {
        key: 'customerAd',
        name: '客户广告',
      },
    ],
  },
  {
    key: 'jurisdiction',
    name: '权限管理',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'jurisdictionMenu',
        name: '用户',
      },
      {
        key: 'jurisdictionGroups',
        name: '分组',
      },
      {
        key: 'jurisdictionUser',
        name: '用户权限',
      },
    ],
  },
  {
    key: 'tabConfig',
    name: '通用配置',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'cc',
        name: '其他配置',
      },
      {
        key: 'whiteList',
        name: '白名单',
      },
    ],
  },
  {
    key: 'audit',
    name: '文章审核',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'auditInterpretation',
        name: '电报审核',
      },
      {
        key: 'pushTelegraph',
        name: '推送电报',
      },
      // {
      //   key: 'auditRemind',
      //   name: '提醒审核'
      // },
    ],
  },
  {
    key: 'club',
    name: '财联社pro',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'clubArticle',
        name: '俱乐部-文章',
      },
      {
        key: 'referenceArticle',
        name: '内参-文章',
      },
      {
        key: 'member',
        name: '会员管理',
      },
      {
        key: 'referenceMember',
        name: '内参-会员',
      },
    ],
  },
  {
    key: 'editor',
    name: '编辑器',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'articleEditor',
        name: '编辑器',
      },
    ],
  },
  {
    key: 'referenceArticle',
    name: '内参-文章',
    icon: 'setting',
    clickable: false,
    child: [
      {
        key: 'referenceArticle',
        name: '内参-文章',
      },
    ],
  },
]

const handle = (menus) => {
  return menus.map(par => {
    par.child = par.child.map(item => {
      item.path = par.key ? `/${par.key}/${item.key}` : `/${item.key}`
      return item
    })
    return par
  })
}
const menus = handle(_originMenu)
export default menus


export function allMenuPathItems() {
  return flatMap(menus, t => t.child)
}
