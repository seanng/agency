import { buildConfig } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { sqliteAdapter } from '@payloadcms/db-sqlite';

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'your-secret-here',
  admin: {
    user: 'users',
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      slug: 'products',
      labels: {
        singular: '产品',
        plural: '产品列表',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: '产品名称',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: '价格',
          min: 0,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: '产品图片',
        },
        {
          name: 'description',
          type: 'textarea',
          label: '产品描述',
        },
        {
          name: 'inStock',
          type: 'checkbox',
          defaultValue: true,
          label: '库存状态',
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          label: '特色产品',
        },
        // SEO Fields
        {
          name: 'seoTitle',
          type: 'text',
          label: 'SEO标题',
        },
        {
          name: 'seoDescription',
          type: 'textarea',
          label: 'SEO描述',
        },
        {
          name: 'seoKeywords',
          type: 'text',
          label: 'SEO关键词',
        },
      ],
    },
    {
      slug: 'media',
      labels: {
        singular: '媒体',
        plural: '媒体库',
      },
      upload: {
        staticDir: 'public/uploads',
        mimeTypes: ['image/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          label: '替代文本',
        },
      ],
    },
    {
      slug: 'navigation',
      labels: {
        singular: '导航',
        plural: '导航菜单',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: '菜单标签',
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: '链接',
        },
        {
          name: 'order',
          type: 'number',
          label: '排序',
          defaultValue: 0,
        },
      ],
    },
  ],
  globals: [
    {
      slug: 'site-settings',
      label: '网站设置',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          label: '网站名称',
          defaultValue: '极简',
        },
        {
          name: 'tagline',
          type: 'text',
          label: '标语',
          defaultValue: '纯净美学',
        },
        {
          name: 'heroTitle',
          type: 'text',
          label: '主标题',
          defaultValue: '简约至美',
        },
        {
          name: 'heroSubtitle',
          type: 'textarea',
          label: '副标题',
          defaultValue: '每一件T恤都是对简约美学的诠释，精选面料与工艺，呈现纯粹的穿着体验。',
        },
        // SEO Defaults
        {
          name: 'defaultSeoTitle',
          type: 'text',
          label: '默认SEO标题',
          defaultValue: '极简T恤商店 - 纯净美学',
        },
        {
          name: 'defaultSeoDescription',
          type: 'textarea',
          label: '默认SEO描述',
          defaultValue: '探索极简主义T恤的纯净美学。精选面料与工艺，呈现纯粹的穿着体验。',
        },
        {
          name: 'defaultSeoKeywords',
          type: 'text',
          label: '默认SEO关键词',
          defaultValue: '极简T恤,纯净美学,简约设计,精选面料,T恤商店',
        },
      ],
    },
  ],
  editor: lexicalEditor({}),
  typescript: {
    outputFile: './payload-types.ts',
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || 'file:./payload.db',
    },
  }),
  localization: {
    locales: ['zh'],
    defaultLocale: 'zh',
  },
});