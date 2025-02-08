export const landingPage = {
  name: 'landingPage',
  title: 'Förstasidan',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(25),
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'object',
          name: 'galleryObject',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description:
                'Enligt WCAG2 måste bilder ha en text som beskriver bilden för de som inte kan se. https://bernskioldmedia.com/sv/sa-skriver-du-bra-alt-texter-till-bilder-for-battre-seo-och-tillganglighet',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'image',
              type: 'image',
              title: 'Image',
              description:
                'Försök hålla filen så liten som möjligt för snabbare laddning. Bra sida för optimering av bilder: https://squoosh.app',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'smallText',
              title: 'Text 1',
              type: 'string',
              description: 'Den mindre texten på bilden',
            },
            {
              name: 'largeText',
              title: 'Text 2',
              type: 'string',
              description: 'Den större texten på bilden',
            },
            {
              name: 'buttonText',
              title: 'Text knapp',
              type: 'string',
              description: 'Texten på knappen',
            },
            {
              name: 'url',
              title: 'Länk knapp',
              type: 'string',
              description: 'Länken som knappen leder till',
            },
          ],
        },
      ],
    },
  ],
};
