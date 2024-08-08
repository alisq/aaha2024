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
  SMALL: 'small',

  ROW: 'row',
  ROW_EXPANDED: 'row-expanded',
  COLUMNS: 'columns',

  ACTIVE: 'active',
  STICKY: 'sticky',
  STICKY_BOTTOM: 'sticky-bottom',

  TITLE_TOP: 'title-top',
  TITLE_BOTTOM: 'title-bottom',
  TEXT_CENTER: 'text-center',
  TEXT_RIGHT: 'text-right',
  CAPTION: 'caption',
  LABEL: 'label',
  LABEL_RED: 'label-red',
  LABEL_RED_STATIC: 'label-red-static',
  NO_BREAK: 'no-break',

  PAGE: 'page',
  CONTAINER: 'container',
  BLOCK_CONTAINER: 'block-container',
  DEMAND: 'demand',
  DEMANDS: 'demands', // TODO
  MANIFESTO: 'manifesto',
  INTRO: 'intro',
  FILTER: 'filter',
  ACTION: 'action',
  ACTIONS: 'actions',
  ACTION_BAR: 'action-bar',
  TEAM_TITLE: 'team-title',
  MEMBERS: 'members',
  ORG_LINKS: 'org-links',

  CLOSE: 'close',
  NUM: 'num',
  EXALT_2: 'ex-alt-2',

  CAROUSEL: 'carousel',
  SLIDE_FULLSCREEN: 'slide-fullscreen',
  DEMAND_SLIDE: 'demand-slide',
  SLIDE: 'slide',
  IMG: 'img',
  EMBED_CONTAINER: 'embedContainer',

  FOOTER_LOGO: 'footer-logo',
  PARTNERS: 'partners',
  SOCIALS: 'socials',
  AAHA_TEXT: 'aaha-text',

  // MENU
  MENU_BUTTON_SQUARE: 'menu-button-square',
  MENU_RIGHT: 'menu-right',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  CENTER: 'center',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',

  // STYLING
  SPACED_CONTENT: 'spaced-content',

  // TABLE
  COMMITTEE_TABLE: 'committee-table',
  COLLECTIVE_MEMBER_TABLE: 'collective-member-table',
  TEAM_MEMBER_TABLE: 'team-member-table',
  HIDE_TEAM: 'hide-team',
  EVENT_TABLE: 'event-table',
  EVENT_TAGS: 'event-tags',
  PRESS_TABLE: 'press-table',
  HAS_BUTTON: 'has-button',
  BUTTON_CELL: 'button-cell'
}

export const CLSES = {
  CENTER_CAPTION: joinClasses(CLS.CAPTION, CLS.TEXT_CENTER),
  FOUR_COLUMNS: joinClasses(CLS.FOUR, CLS.COLUMNS),
  SMALL_HEADER: joinClasses(CLS.TEXT_CENTER, 'small-header')
}

export const CSS_ID = {
  LANG: 'lang',
  MENU: 'menu',
  MENU_BUTTON: 'menu-button',
  MENU_FIST: 'menu-fist',
  CONTACT: 'contact',
  LOGO: {
    CCA: 'logo-cca',
    SALA: 'logo-sala',
    UW: 'logo-uw',
    RAIC: 'logo-raic',
    OAA: 'logoOAA',
    AFBC: 'logoAFBC',
    FED: 'logoFed'
  }
}