export const SW_CST = {
  INDEX_INVALID: -1,
  SCENES: {
    BOOT: 'BOOT',
    GAME: 'GAME',
    GAME_UI: 'GAME_UI',
  },
  GAME: {
    WIDTH: 800,
    HEIGHT: 500,
    ZOOM: 1,
    IS_MOBILE: false,
    PLAYER: {
      WALK_SPEED: 130,
      RUN_SPEED: 800,
    },
  },
  MAP: {
    SUBMAP_THRESHOLD: 0.46,
  },
  STYLE: {
    TEXT: {
      FONT_FAMILY: 'Poppins',
    },
    COLOR: {
      BLUE: '#2c4b7e',
      BLACK: '#000000',
      WHITE: '#f9f9f9',
      LIGHT_GREY: '#dcdcdc',
    },
  },
  DEBUG: {
    PHYSIC: false,
    GAME: true,
  },
};
