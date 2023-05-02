import { SanityDocument } from '@sanity/client';

interface News extends SanityDocument {
  _type: 'news';
  title: string;
  slug: {
    _type: 'slug';
    current: string;
  };
  image: {
    _type: 'image';
    asset: {
      _type: 'reference';
      _ref: string;
    };
  };
  body: {
    _type: 'block';
    children: {
      _type: 'span';
      text: string;
    }[];
  }[];
  date: string;
}

export default {
  name: 'news',
  title: 'News',
  type: 'document',
  fieldsets: [
    {
      name: 'main',
      title: 'Main Fields',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'body',
      title: 'Body',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
      fieldset: 'main',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
      fieldset: 'main',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
      fieldset: 'main',
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
      fieldset: 'main',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: (Rule: any) => Rule.required(),
      fieldset: 'body',
      options: {
        inlineImages: true,
      },
    },
  ],
} as const;
