import type { Config } from 'tailwindcss'

const palette = {
  light: {
    '100': 'rgba(247, 247, 247, 1)',
    '88': 'rgba(247, 247, 247, 0.88)',
    '80': 'rgba(247, 247, 247, 0.80)',
    '64': 'rgba(247, 247, 247, 0.64)',
    '56': 'rgba(247, 247, 247, 0.56)',
    '48': 'rgba(247, 247, 247, 0.48)',
    '40': 'rgba(247, 247, 247, 0.40)',
    '32': 'rgba(247, 247, 247, 0.32)',
    '24': 'rgba(247, 247, 247, 0.24)',
    '16': 'rgba(247, 247, 247, 0.16)',
    '8': 'rgba(247, 247, 247, 0.08)',
    '4': 'rgba(247, 247, 247, 0.04)',
  },
  rose: {
    '100': 'rgba(204, 41, 136, 1)',
    '88': 'rgba(204, 41, 136, 0.88)',
    '80': 'rgba(204, 41, 136, 0.80)',
    '64': 'rgba(204, 41, 136, 0.64)',
    '56': 'rgba(204, 41, 136, 0.56)',
    '48': 'rgba(204, 41, 136, 0.48)',
    '40': 'rgba(204, 41, 136, 0.40)',
    '32': 'rgba(204, 41, 136, 0.32)',
    '24': 'rgba(204, 41, 136, 0.24)',
    '16': 'rgba(204, 41, 136, 0.16)',
    '8': 'rgba(204, 41, 136, 0.08)',
    '4': 'rgba(204, 41, 136, 0.04)'
  },
  dark: {
    '100': 'rgba(8, 12, 26, 1)',
    '88': 'rgba(8, 12, 26, 0.88)',
    '80': 'rgba(8, 12, 26, 0.80)',
    '64': 'rgba(8, 12, 26, 0.64)',
    '56': 'rgba(8, 12, 26, 0.56)',
    '48': 'rgba(8, 12, 26, 0.48)',
    '40': 'rgba(8, 12, 26, 0.40)',
    '32': 'rgba(8, 12, 26, 0.32)',
    '24': 'rgba(8, 12, 26, 0.24)',
    '16': 'rgba(8, 12, 26, 0.16)',
    '8': 'rgba(8, 12, 26, 0.08)',
    '4': 'rgba(8, 12, 26, 0.04)'
  },
  brand: {
    '100': 'rgba(36, 71, 178, 1)',
    '88': 'rgba(36, 71, 178, 0.88)',
    '80': 'rgba(36, 71, 178, 0.80)',
    '64': 'rgba(36, 71, 178, 0.64)',
    '56': 'rgba(36, 71, 178, 0.56)',
    '48': 'rgba(36, 71, 178, 0.48)',
    '40': 'rgba(36, 71, 178, 0.40)',
    '32': 'rgba(36, 71, 178, 0.32)',
    '24': 'rgba(36, 71, 178, 0.24)',
    '16': 'rgba(36, 71, 178, 0.16)',
    '8': 'rgba(36, 71, 178, 0.08)',
    '4': 'rgba(36, 71, 178, 0.04)'
  }
}

const borderRadius = {
  '16': '16px',
  '20': '20px'
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    borderRadius: {
      button_normal: borderRadius['20'],
      button_small: borderRadius['16']
    },
    colors: {
      palette: {
        light: {
          '100': 'rgba(247, 247, 247, 1)',
          '88': 'rgba(247, 247, 247, 0.88)',
          '80': 'rgba(247, 247, 247, 0.80)',
          '64': 'rgba(247, 247, 247, 0.64)',
          '56': 'rgba(247, 247, 247, 0.56)',
          '48': 'rgba(247, 247, 247, 0.48)',
          '40': 'rgba(247, 247, 247, 0.40)',
          '32': 'rgba(247, 247, 247, 0.32)',
          '24': 'rgba(247, 247, 247, 0.24)',
          '16': 'rgba(247, 247, 247, 0.16)',
          '8': 'rgba(247, 247, 247, 0.08)',
          '4': 'rgba(247, 247, 247, 0.04)',
        },
        dark: {
          '100': 'rgba(8, 12, 26, 1)',
          '88': 'rgba(8, 12, 26, 0.88)',
          '80': 'rgba(8, 12, 26, 0.80)',
          '64': 'rgba(8, 12, 26, 0.64)',
          '56': 'rgba(8, 12, 26, 0.56)',
          '48': 'rgba(8, 12, 26, 0.48)',
          '40': 'rgba(8, 12, 26, 0.40)',
          '32': 'rgba(8, 12, 26, 0.32)',
          '24': 'rgba(8, 12, 26, 0.24)',
          '16': 'rgba(8, 12, 26, 0.16)',
          '8': 'rgba(8, 12, 26, 0.08)',
          '4': 'rgba(8, 12, 26, 0.04)'
        },
        brand: {
          '100': 'rgba(36, 71, 178, 1)',
          '88': 'rgba(36, 71, 178, 0.88)',
          '80': 'rgba(36, 71, 178, 0.80)',
          '64': 'rgba(36, 71, 178, 0.64)',
          '56': 'rgba(36, 71, 178, 0.56)',
          '48': 'rgba(36, 71, 178, 0.48)',
          '40': 'rgba(36, 71, 178, 0.40)',
          '32': 'rgba(36, 71, 178, 0.32)',
          '24': 'rgba(36, 71, 178, 0.24)',
          '16': 'rgba(36, 71, 178, 0.16)',
          '8': 'rgba(36, 71, 178, 0.08)',
          '4': 'rgba(36, 71, 178, 0.04)'
        },
      },
      ui: {
        text: {
          focus: {
            full: palette.rose[100],
            full_onColor: palette.light[100]
          },
          brand: {
            full: {
              regular: palette.brand[100],
              disabled: palette.brand[56]
            },
            full_onColor: {
              regular: palette.light[100],
              disabled: palette.light[80]
            }
          }
        },
        bg: {
          focus: {
            full: palette.rose[80],
            mild: palette.rose[8]
          },
          main: {
            full: {
              regular: palette.brand[100],
              hover: palette.brand[80],
              active: palette.brand[64],
              disabled: palette.brand[56]
            },
            mild: {
              regular: palette.brand[8],
              hover: palette.brand[16],
              active: palette.brand[24],
              disabled: palette.brand[8]
            }
          }
        },
        card: {
          default: 'rgba(253, 253, 253, 1)'
        },
        input: {
          text: {
            default: 'oklch(24.5% 0.1306 273.09)',
            disabled: 'oklch(61.22% 0.0013 286.31)',
            placeholder: 'oklch(79.62% 0.1099 296.36)',
            error: 'oklch(41% 0.157 24.3)',
            message: {
              default: 'oklch(24.5% 0.1306 273.09)',
              error: 'oklch(64.09% 0.229 24.67)',
            }
          },
          main: {
            default: 'oklch(94.12% 0.019 299.06)',
            hover: 'oklch(95.85% 0.0165 300.42)',
            focus: 'oklch(91.75% 0.0376 299.67)',
            active: 'oklch(83.64% 0.085 297.66)',
            disabled: 'oklch(91.38% 0.0003 286.36)',
            error: 'oklch(91.57% 0.035 28.66)'
          }
        },
        button: {
          text: {
            default: 'oklch(95.69% 0.0003 286.36)',
            primary: {
              disabled: 'oklch(56.91% 0.0016 286.28)'
            },
            secondary: {
              disabled: 'oklch(69.83% 0.0008 286.34)'
            }
          },
          main: {
            primary: {
              default: 'oklch(44.06% 0.2647 266.94)',
              hover: 'oklch(52.19% 0.2548 276.88)',
              focus: 'oklch(34.35% 0.2008 268.43)',
              active: 'oklch(24.5% 0.1306 273.09)',
              disabled: 'oklch(91.38% 0.0003 286.36)'
            },
            secondary: {
              default: 'oklch(48.45% 0.2744 270.1)',
              hover: 'oklch(71.6% 0.1541 293.32)',
              focus: 'oklch(79.62% 0.1099 296.36)',
              active: 'oklch(29.42% 0.1655 270.46)',
              disabled: 'oklch(69.83% 0.0008 286.34)'
            }
          }
        }
      }
    },
    extend: {
      width: {
        'ui-input-normal': '400px',
        
        'ui-card-normal': '436px'
      },
      padding: {
        'ui-button-normal': '12px 38px 18px 38px',
        'ui-button-small': '14px 32px 14px 32px',

        'ui-input-normal': '10px 26px 14px 26px',
        
        'ui-content-header': '16px 80px 16px 80px',
        'ui-content-main': '12px 80px 12px 80px',
      },
      letterSpacing: {
        'ui-button-normal': '0.6px'
      },
      fontWeight: {
        'ui-button-normal': '600',
        'ui-button-small': '400',

        'ui-input': '600',
        'ui-input-title': '600',
        'ui-input-message': '500',
      },
      fontSize: {
        'ui-button-normal': '24px',
        'ui-button-small': '20px',

        'ui-input-steady': '20px',
        'ui-input-title': '16px',
        'ui-input-message': '14px',
      },
      lineHeight: {
        'ui-button-normal': 'normal'
      },
      fontFamily: {
        'ui-button-normal': 'inherit',
        'ui-button-small': 'inherit',

        'ui-input': 'inherit',
        'ui-input-title': 'inherit',
        'ui-input-message': 'inherit',
      },
      backgroundColor: {
        'ui-transparent': 'transparent'
      },
      borderRadius: {
        'ui-button-normal': '10px',

        'ui-input-normal': '10px'
      },
      outlineWidth: {
        'ui-input-normal': '2px'
      },
      outlineColor: {
        'ui-input-normal': 'oklch(64.09% 0.229 24.67)'
      },
      outlineOffset: {
        'ui-input-normal': '-2px'
      },
      boxShadow: {
        'ui-card': '0px 20px 40px 0px rgba(18, 15, 93, 0.1)'
      }
    },
  },
  plugins: [],
}
export default config
