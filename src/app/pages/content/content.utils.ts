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

export function getCorrectValue(value = 1): number {
  if (value <= 1) return 1

  return value - 1
}
