import { Tab } from "jokudevs-ionic-angular-dynamic-tabs";
import { HomePage } from "./pages/home/home.page";
import { Tab1Page } from "./pages/tab1/tab1.page";
import { Tab2Page } from "./pages/tab2/tab2.page";
import { Tab3Page } from "./pages/tab3/tab3.page";

export const APP_TABS: Tab[] = [
  {
    name: "home",
    label: "Home",
    iconName: "home",
    urlPath: "/tabs/home",
    component: HomePage,
  },
  {
    name: "tab1",
    label: "Tab 1",
    iconName: "apps",
    urlPath: "/tabs/tab1",
    component: Tab1Page,
  },
  {
    name: "tab2",
    label: "Tab 2",
    iconName: "apps",
    urlPath: "/tabs/tab2",
    component: Tab2Page,
  },
  {
    name: "tab3",
    label: "Tab 3",
    iconName: "apps",
    urlPath: "/tabs/tab3",
    component: Tab3Page,
  },
];
