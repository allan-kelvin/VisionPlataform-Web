import { SidebarItem } from "./sidebar-item.interface";

export interface SidebarGroup {
  title: string;
  expanded: boolean;
  items: SidebarItem[];
}
