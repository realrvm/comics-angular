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
                        fields: ['formats'],
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

export const contentUrl = `https://blood-of-azra.site/api/contents?${query}`
