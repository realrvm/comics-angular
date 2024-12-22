import { definePreset } from '@primeng/themes'
// eslint-disable-next-line
import Lara from '@primeng/themes/lara'

export const preset = definePreset(Lara, {
  components: {
    drawer: {
      background: 'black',
      borderColor: 'black',
    },
    inputtext: {
      background: 'black',
      borderColor: 'black',
      focusBorderColor: 'black',
      hoverBorderColor: 'black',
      focusRingShadow: 'none',
      paddingY: '5px',
    },
  },
})
