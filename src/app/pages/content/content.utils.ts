import * as qs from 'qs'

const query = qs.stringify(
  {
    populate: {
      arcs: {
        populate: {
          arc: {
            populate: {
              chapters: {
                populate: {
                  comics: {
                    populate: {
                      picture: {
                        fields: ['url'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    encodeValuesOnly: true,
  },
)

export const contentUrl = `/contents?${query}`
