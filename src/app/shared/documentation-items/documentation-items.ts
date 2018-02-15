import {Injectable} from '@angular/core';

export interface DocItem {
  id: string;
  name: string;
  component: string;
  packageName?: string;
  examples?: string[];
}

export interface DocCategory {
  id: string;
  name: string;
  items: DocItem[];
  summary?: string;
}

const CDK = 'cdk';
const COMPONENTS = 'components';
export const SECTIONS = {
  [COMPONENTS]: 'Components',
  [CDK]: 'CDK',
};


const DOCS: {[key: string]: DocCategory[]} = {
  [COMPONENTS]: [
    {
      id: 'account',
      name: 'Account',
      items: [
        {id: 'marketing-report', name: 'Marketing report', component: 'app-marketing-report', examples: []},
      ]
    },
    {
      id: 'sale_coordinator',
      name: 'Sale coordinator',
      items: [
        {id: 'po-daily', name: 'PO. daily report', component: 'app-marketing-report', examples: []},
      ]
    },
    
    // {
    //   id: 'nav',
    //   name: 'Navigation',
    //   summary: 'Sidenavs, toolbars, menus',
    //   items: [
    //     {id: 'menu', name: 'Menu', examples: ['menu-icons']},
    //     {
    //       id: 'sidenav',
    //       name: 'Sidenav',
    //       examples: [
    //         'sidenav-overview',
    //         'sidenav-drawer-overview',
    //         'sidenav-position',
    //         'sidenav-open-close',
    //         'sidenav-mode',
    //         'sidenav-disable-close',
    //         'sidenav-autosize',
    //         'sidenav-fixed',
    //         'sidenav-responsive'
    //       ]
    //     },
    //     {id: 'toolbar', name: 'Toolbar', examples: ['toolbar-multirow']},
    //   ]
    // },
    // {
    //   id: 'layout',
    //   name: 'Layout',
    //   items: [
    //     {id: 'card', name: 'Card', examples: ['card-fancy']},
    //     {id: 'divider', name: 'Divider', examples: ['divider-overview']},
    //     {id: 'expansion', name: 'Expansion Panel',
    //         examples: ['expansion-overview', 'expansion-steps']},
    //     {id: 'grid-list', name: 'Grid list', examples: ['grid-list-dynamic']},
    //     {id: 'list', name: 'List', examples: ['list-sections']},
    //     {id: 'stepper', name: 'Stepper', examples: ['stepper-overview']},
    //     {id: 'tabs', name: 'Tabs', examples: ['tabs-template-label']},
    //   ]
    // },
    // {
    //   id: 'buttons',
    //   name: 'Buttons & Indicators',
    //   items: [
    //     {id: 'button', name: 'Button', examples: ['button-types']},
    //     {id: 'button-toggle', name: 'Button toggle', examples: ['button-toggle-exclusive']},
    //     {id: 'chips', name: 'Chips', examples: ['chips-stacked']},
    //     {id: 'icon', name: 'Icon', examples: ['icon-svg']},
    //     {id: 'progress-spinner', name: 'Progress spinner',
    //         examples: ['progress-spinner-configurable']},
    //     {id: 'progress-bar', name: 'Progress bar', examples: ['progress-bar-configurable']},
    //   ]
    // },
    // {
    //   id: 'modals',
    //   name: 'Popups & Modals',
    //   items: [
    //     {id: 'dialog', name: 'Dialog', examples: ['dialog-overview']},
    //     {id: 'snack-bar', name: 'Snackbar', examples: ['snack-bar-component']},
    //     {id: 'tooltip', name: 'Tooltip', examples: ['tooltip-position']},
    //   ]
    // },
    // {
    //   id: 'tables',
    //   name: 'Data table',
    //   items: [
    //     {id: 'paginator', name: 'Paginator', examples: ['paginator-configurable']},
    //     {id: 'sort', name: 'Sort header', examples: ['sort-overview']},
    //     {id: 'table', name: 'Table', examples: [
    //       'table-filtering',
    //       'table-pagination',
    //       'table-sorting',
    //       'table-http',
    //       'table-overview',
    //     ]},
    //   ]
    // }
  ],
  [CDK] : [
    // {
    //   id: 'component-composition',
    //   name: 'Common Behaviors',
    //   items: [
    //     {id: 'a11y', name: 'Accessibility', examples: []},
    //     {id: 'bidi', name: 'Bidirectionality', examples: []},
    //     {id: 'layout', name: 'Layout', examples: []},
    //     {id: 'observers', name: 'Observers', examples: []},
    //     {id: 'overlay', name: 'Overlay', examples: []},
    //     {id: 'portal', name: 'Portal', examples: []},
    //     {id: 'scrolling', name: 'Scrolling', examples: []},
    //   ]
    // },
    // {
    //   id: 'components',
    //   name: 'Components',
    //   items: [
    //     {id: 'stepper', name: 'Stepper', examples: []},
    //     {id: 'table', name: 'Table', examples: []},

    //   ]
    // },


    // TODO(jelbourn): re-add utilities and a11y as top-level categories once we can generate
    // their API docs with dgeni. Currently our setup doesn't generate API docs for constants
    // and standalone functions (much of the utilities) and we have no way of generating API
    // docs more granularly than directory-level (within a11y) (same for viewport).
  ]
};

for (let category of DOCS[COMPONENTS]) {
  for (let doc of category.items) {
    doc.packageName = 'material';
  }
}

for (let category of DOCS[CDK]) {
  for (let doc of category.items) {
    doc.packageName = 'cdk';
  }
}

const ALL_COMPONENTS = DOCS[COMPONENTS].reduce(
  (result, category) => result.concat(category.items), []);
const ALL_CDK = DOCS[CDK].reduce((result, cdk) => result.concat(cdk.items), []);
const ALL_DOCS = ALL_COMPONENTS.concat(ALL_CDK);
const ALL_CATEGORIES = DOCS[COMPONENTS].concat(DOCS[CDK]);

@Injectable()
export class DocumentationItems {
  getCategories(section: string): DocCategory[] {
    return DOCS[section];
  }

  getItems(section: string): DocItem[] {
    if (section === COMPONENTS) {
      return ALL_COMPONENTS;
    }
    if (section === CDK) {
      return ALL_CDK;
    }
    return [];
  }

  getItemById(id: string, section: string): DocItem {
    const sectionLookup = section == 'cdk' ? 'cdk' : 'material';
    return ALL_DOCS.find(doc => doc.id === id && doc.packageName == sectionLookup);
  }

  getCategoryById(id: string): DocCategory {
    return ALL_CATEGORIES.find(c => c.id == id);
  }
}
