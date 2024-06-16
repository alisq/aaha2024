import { joinClasses } from '../utils/styleUtils'

export const PAVILION_BREAKPOINT = 800

export const CLS = {
  RED: 'red',
  WHITE_BG: 'white-bg',
  MULTIPLY: 'multiply',
  INVERSE: 'inverse',

  THREE: 'three',
  FOUR: 'four',
  SIX: 'six',
  THIRDS: 'thirds',

  ROW: 'row',
  COLUMNS: 'columns',

  ACTIVE: 'active',
  STICKY: 'sticky',
  STICKY_BOTTOM: 'sticky-bottom',

  TITLE_TOP: 'title-top',
  TITLE_BOTTOM: 'title-bottom',
  TEXT_CENTER: 'text-center',
  TEXT_RIGHT: 'text-right',
  SMALL_HALF: 'small-half',
  CAPTION: 'caption',
  LABEL: 'label',
  NO_BREAK: 'no-break',

  PAGE: 'page',
  CONTAINER: 'container',
  BLOCK_CONTAINER: 'block-container',
  DEMAND: 'demand',
  DEMANDS: 'demands',
  MANIFESTO: 'manifesto',
  INTRO: 'intro',
  FILTER: 'filter',
  ACTIONS: 'actions',
  ACTION_BAR: 'action-bar',
  TEAM_TITLE: 'team-title',
  MEMBERS: 'members',
  ORG_LINKS: 'org-links',

  CLOSE: 'close',
  NUM: 'num',
  SIDEBEARING: 'sidebearing',
  EXALT_2: 'exAlt2',

  CAROUSEL: 'carousel',
  SLIDE_FULLSCREEN: 'slide-fullscreen',
  DEMAND_SLIDE: 'demand-slide',
  SLIDE: 'slide',
  IMG: 'img',

  FOOTER_LOGO: 'footer-logo',
  PARTNERS: 'partners',
  SOCIALS: 'socials',
  AAHA_TEXT: 'aaha-text',

  MENU_BUTTON_SQUARE: 'menu-button-square',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  CENTER: 'center',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
}

export const CLSES = {
  CENTER_CAPTION: joinClasses(CLS.CAPTION, CLS.TEXT_CENTER),
  FOUR_COLUMNS: joinClasses(CLS.FOUR, CLS.COLUMNS)
}