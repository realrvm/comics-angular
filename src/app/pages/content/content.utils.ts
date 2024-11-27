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

export const contentUrl = `http://localhost:1337/api/contents?${query}`
