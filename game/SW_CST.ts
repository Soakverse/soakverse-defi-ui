const FONT_FAMILY = 'Poppins';
const COLOR_TEXT = '#4D2B1D';

export const SW_CST = {
  INDEX_INVALID: -1,
  SCENES: {
    BOOT: 'BOOT',
    GAME: 'GAME',
    GAME_UI: 'GAME_UI',
    DEBUG: 'DEBUG',
  },
  GAME: {
    WIDTH: 800,
    HEIGHT: 500,
    ZOOM: 1.5,
    IS_MOBILE: false,
    PLAYER: {
      WALK_SPEED: 120,
      RUN_SPEED: 200,
    },
  },
  MAP: {
    SUBMAP_THRESHOLD: 0.46,
  },
  STYLE: {
    TEXT: {
      FONT_FAMILY: FONT_FAMILY,
      FONT_STYLE_REGULAR: '400',
      FONT_STYLE_MEDIUM: '500',
      FONT_STYLE_BOLD: '700',
      SECTION: {
        fontSize: '14px',
        fontFamily: FONT_FAMILY,
        fontStyle: '700',
        color: COLOR_TEXT,
        align: 'left',
      },
      LABEL: {
        fontSize: '12px',
        fontFamily: FONT_FAMILY,
        fontStyle: '500',
        color: COLOR_TEXT,
        align: 'left',
      },
      SETTINGS_VALUE: {
        fontSize: '13px',
        fontFamily: FONT_FAMILY,
        fontStyle: 'bold',
        color: COLOR_TEXT,
        align: 'left',
      },
    },
    COLOR: {
      BLUE: '#2c4b7e',
      BLACK: '#000000',
      WHITE: '#f9f9f9',
      TEXT: COLOR_TEXT,
    },
  },
  DEBUG: {
    PHYSIC: false,
    GAME: false,
    UI: true,
  },
};
