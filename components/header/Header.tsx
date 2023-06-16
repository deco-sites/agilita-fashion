import Modals from "$store/islands/HeaderModals.tsx";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import NavbarScroll from "./NavbarScroll.tsx";

import { headerHeight } from "./constants.ts";

export interface NavItem {
  label: string;
  href: string;
  children?: Array<{
    label: string;
    href: string;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
}

export interface Props {
  alerts: string[];
  /** @title Search Bar */
  searchbar?: SearchbarProps;
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];

  /**
   * @title Product suggestions
   * @description Product suggestions displayed on search
   */
  products?: LoaderReturnType<Product[] | null>;

  /**
   * @title Enable Top Search terms
   */
  suggestions?: LoaderReturnType<Suggestion | null>;
  logo: {
    black: LiveImage;
    white: LiveImage;
    icon: LiveImage;
    iconWhite: LiveImage;
  };
}

function colorHeader() {
  let header1: Element | null;
  let header2: Element | null;
  globalThis.addEventListener("scroll", () => {
    if (!header1) {
      header1 = document.querySelector("div[header-Position]");
      if (!header1) return;
    }

    if (!header1) return;
    if (!header2) {
      header2 = document.querySelector("div[header-2]");
      if (!header2) return;
    }

    if (!header2) return;

    if (window.scrollY > 200) {
      header1.classList.add("hidden");
      header2.classList.remove("hidden");
    } else {
      header1.classList.remove("hidden");
      header2.classList.add("hidden");
    }
  });
  globalThis.addEventListener("scroll", () => {
    if (!header1) {
      header1 = document.querySelector("div[header-Position]");
      if (!header1) return;
    }

    if (!header1) return;
    if (!header2) {
      header2 = document.querySelector("div[header-2]");
      if (!header2) return;
    }

    if (!header2) return;

    if (window.location.pathname !== "/") {
      header1.classList.remove("bg-transparent ");
      header1.classList.remove("absolute");
      header1.classList.add("bg-white");
      header1.classList.add("relative");
 
    } else {
      header1.classList.add("bg-transparent ");
      header1.classList.add("absolute");
      header1.classList.remove("bg-white");
      header1.classList.remove("relative");
    }
  });
}

function Header({
  alerts,
  searchbar: _searchbar,
  products,
  navItems = [],
  suggestions,
  logo,
}: Props) {
  const searchbar = { ..._searchbar, products, suggestions };
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: `(${colorHeader.toString()})()` }}
      />
      <header>
        <div class="bg-transparent  absolute w-full z-50 " header-Position="">
          <Alert alerts={alerts} />
          <Navbar items={navItems} searchbar={searchbar} logo={logo} />
        </div>

        <div class="hidden bg-white  fixed w-full z-50 " header-2="">
          <NavbarScroll items={navItems} searchbar={searchbar} logo={logo} />
        </div>

        <Modals
          menu={{ items: navItems }}
          searchbar={searchbar}
        />
      </header>
    </>
  );
}

export default Header;
