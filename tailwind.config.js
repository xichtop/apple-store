const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{html,js}",
    './projects/**/*.{html,ts}',
  ],
  theme: {
    theme: {
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      extend: {
        scale: {
          '97': '0.97',
          '98': '0.98',
          '99': '0.99'
        },
        opacity: {
          '12': '0.12',
          '38': '0.38',
          '87': '0.87'
        },
        zIndex: {
          '-1': -1,
          '1': 1,
          '49': 49,
          '60': 60,
          '70': 70,
          '80': 80,
          '90': 90,
          '99': 99,
          '999': 999,
          '9999': 9999,
          '99999': 99999
        },
        spacing: {
          '13': '3.25rem',
          '15': '3.75rem',
          '18': '4.5rem',
          '22': '5.5rem',
          '26': '6.5rem',
          '30': '7.5rem',
          '50': '12.5rem',
          '90': '22.5rem'
        },
        fontSize: {
          '3xl': ['1.875rem', '2.5rem'],
          '4xl': ['2.25rem', '2.75rem']
        },
        fontFamily: {
          sans: [
            'Nunito',
            'Roboto',
            '-apple-system',
            'BlinkMacSystemFont',
            'Segoe UI',
            'Helvetica Neue',
            'Noto Sans',
            'sans-serif',
            'Apple Color Emoji',
            'Segoe UI Emoji',
            'Segoe UI Symbol',
            'Noto Color Emoji',
          ],
          serif: [
            'ui-serif',
            'Georgia',
            'Cambria',
            'Times New Roman',
            'Times',
            'serif'
          ],
          mono: [
            'ui-monospace',
            'SFMono-Regular',
            'Menlo',
            'Monaco',
            'Consolas',
            'Liberation Mono',
            'Courier New',
            'monospace',
          ],
        },
        extendedSpacing: {
          // Fractional values
          '1/2': '50%',
          '1/3': '33.333333%',
          '2/3': '66.666667%',
          '1/4': '25%',
          '2/4': '50%',
          '3/4': '75%',
          // Bigger values
          '100': '25rem',
          '120': '30rem',
          '128': '32rem',
          '132': '33rem',
          '140': '35rem',
          '160': '40rem',
          '180': '45rem',
          '192': '48rem',
          '200': '50rem',
          '240': '60rem',
          '256': '64rem',
          '280': '70rem',
          '320': '80rem',
          '360': '90rem',
          '400': '100rem',
          '480': '120rem'
        },
        maxWidth: theme => ({
          'container': '1440px',
          ...theme('spacing'),
          ...theme('extendedSpacing'),
        }),
        minWidth: theme => ({
          ...theme('spacing'),
          ...theme('extendedSpacing'),
          screen: '100vw'
        }),
        minHeight: theme => ({
          ...theme('spacing'),
          ...theme('extendedSpacing')
        }),
        typography: ({ theme }) => ({
          DEFAULT: {
            css: {
              '--tw-prose-body': 'var(--text-default) !important',
              maxWidth: 'unset',
            }
          }
        }),
      },
    },
  },
  daisyui: {
    themes: [ 'bumblebee', 'halloween']
  },
  darkMode: ['class', '[data-theme="halloween"]'],
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),

    plugin(
      ({ matchUtilities, theme }) => {
        matchUtilities(
          {
            'icon-size': (value) => ({
              width: value + '!important',
              height: value + '!important',
              minWidth: value + '!important',
              minHeight: value + '!important',
              fontSize: value + '!important',
              lineHeight: value + '!important',
            }),
          },
          {
            values: theme('iconSize'),
          }
        );
      },
      {
        theme: {
          iconSize: {
            3: '0.75rem',
            3.5: '0.875rem',
            4: '1rem',
            4.5: '1.125rem',
            5: '1.25rem',
            6: '1.5rem',
            7: '1.75rem',
            8: '2rem',
            10: '2.5rem',
            12: '3rem',
            14: '3.5rem',
            16: '4rem',
            18: '4.5rem',
            20: '5rem',
            22: '5.5rem',
            24: '6rem',
          },
        },
      }
    )
  ],
}

