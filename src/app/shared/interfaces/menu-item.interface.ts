export interface MenuItem {

  label: string;

  icon: string;

  route: string;

  badge?: string;

  children?: MenuItem[];

}
