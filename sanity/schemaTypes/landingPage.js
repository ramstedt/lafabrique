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
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description:
                'Enligt WCAG2 måste bilder ha en text som beskriver bilden för de som inte kan se. https://bernskioldmedia.com/sv/sa-skriver-du-bra-alt-texter-till-bilder-for-battre-seo-och-tillganglighet',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'smallText',
              title: 'Text 1',
              type: 'string',
            },
            {
              name: 'largeText',
              title: 'Text 2',
              type: 'string',
            },
            {
              name: 'buttonText',
              title: 'Text knapp',
              type: 'string',
            },
            {
              name: 'url',
              title: 'Länk knapp',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'infoCards',
      title: 'Info-kort',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'infoCard',
          title: 'Info Card',
          fields: [
            {
              name: 'title',
              title: 'Titel',
              type: 'string',
              validation: (Rule) => Rule.required().min(2).max(50),
            },
            {
              name: 'description',
              title: 'Kort beskrivning',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required().min(10).max(200),
            },
            {
              name: 'image',
              title: 'Bild',
              type: 'image',
              description:
                'Försök hålla filen så liten som möjligt för snabbare laddning. Bra sida för optimering av bilder: https://squoosh.app',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description:
                'Enligt WCAG2 måste bilder ha en text som beskriver bilden för de som inte kan se. https://bernskioldmedia.com/sv/sa-skriver-du-bra-alt-texter-till-bilder-for-battre-seo-och-tillganglighet',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    },
  ],
};
