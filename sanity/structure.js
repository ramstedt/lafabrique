import { PiHouseLineFill } from 'react-icons/pi';
import { RiLayoutBottom2Fill } from 'react-icons/ri';
import { MdPalette } from 'react-icons/md';
import { FaWineGlassAlt } from 'react-icons/fa';
import { PiChairLight } from 'react-icons/pi';

export const structure = (S) =>
  S.list()
    .title('Innehåll')
    .items([
      S.listItem()
        .title('Sidor')
        .child(
          S.list()
            .title('Sidor')
            .items([
              S.listItem()
                .title('Hem')
                .child(
                  S.document()
                    .schemaType('landingPage')
                    .documentId('751f1205-787a-456c-b7aa-611a5ab0fb8b')
                )
                .icon(PiHouseLineFill),
              S.listItem()
                .title('Artists')
                .child(S.documentTypeList('artist').title('Artists'))
                .icon(MdPalette),
            ])
        ),
      S.listItem()
        .title('Kurser')
        .child(S.documentTypeList('course').title('Kurser'))
        .icon(PiChairLight),
      S.listItem()
        .title('Workshops')
        .child(S.documentTypeList('workshop').title('Workshop'))
        .icon(FaWineGlassAlt),

      S.listItem()
        .title('Footer')
        .child(S.document().schemaType('footer').documentId('footer'))
        .icon(RiLayoutBottom2Fill),
    ]);
