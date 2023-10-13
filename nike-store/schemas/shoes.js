import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'shoes',
  title: 'Shoes',
  type: 'document',
  fields: [
    defineField({
      name: 'shoeNumber',
      title: 'Shoe No.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'subCategory',
      title: 'Sub Category',
      type: 'reference',
      to: [{type: 'categories'}],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'oldPrice',
      title: 'Old Price',
      type: 'number',
      validation: (Rule) => Rule.precision(2),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.precision(2),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
    }),
    defineField({
      name: 'images',
      title: 'Shoe images',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'descriptionText',
      title: 'Description Text',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'extraInfo',
      title: 'Extra Info',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
