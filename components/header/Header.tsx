import Modals from "$store/islands/HeaderModals.tsx";
import type { EditableProps as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product, Suggestion } from "deco-sites/std/commerce/types.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

import Alert from "./Alert.tsx";
import Navbar from "./Navbar.tsx";
import NavbarScroll from "./NavbarScroll.tsx";
import NavbarBlack from "./NavbarBlack.tsx";

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
  let header3: Element | null;

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
      header1.classList.add("sm:hidden");
      
      header2.classList.remove("sm:hidden");
      header2.classList.remove("hidden");
      header2.classList.add("sm:flex");
      header2.classList.add("flex");
    } else {
      header1.classList.remove("sm:hidden");
      header2.classList.add("sm:hidden");
      header2.classList.add("hidden");

      header2.classList.remove("sm:flex");
      header2.classList.remove("flex");
    }
  });
  globalThis.addEventListener("load", () => {
    if (!header1) {
      header1 = document.querySelector("div[header-Position]");
      if (!header1) return;
    }

    if (!header1) return;
    if (!header3) {
      header3 = document.querySelector("div[header-3]");
      if (!header3) return;
    }

    if (!header3) return;

    if (window.location.pathname !== "/") {
      header1.classList.add("sm:hidden");
      header1.classList.add("hidden");
      header3.classList.remove("sm:hidden")
      header3.classList.remove("hidden")
      header3.classList.remove("bg-transparent");
      header3.classList.remove("absolute");
      header3.classList.add("bg-white");
      header3.classList.add("relative");
 
    } else {
      header1.classList.remove("sm:hidden");
      header1.classList.remove("hidden");
      header3.classList.add("bg-transparent ");
      header3.classList.add("absolute");
      header3.classList.add("sm:hidden")
      header3.classList.add("hidden")
      header3.classList.remove("bg-white");
      header3.classList.remove("relative");
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
        <div class="bg-white sm:bg-transparent  absolute w-full z-50 " header-Position="">
          <Alert alerts={alerts} />
          <Navbar items={navItems} searchbar={searchbar} logo={logo} />
        </div>

        <div class="sm:hidden bg-white hidden   fixed w-full z-50 " header-2="">
          <NavbarScroll items={navItems} searchbar={searchbar} logo={logo} />
        </div>

        <div class="sm:hidden  bg-white hidden absolute fixed w-full z-50 " header-3="">
          <NavbarBlack items={navItems} searchbar={searchbar} logo={logo} />
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
