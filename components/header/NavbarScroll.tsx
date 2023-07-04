import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import NavItemScroll from "./NavItemScroll.tsx";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

function NavbarScroll({ items, searchbar, logo }: {
  items: INavItem[];

  searchbar: SearchbarProps;
  logo: {
    black: LiveImage;
    white: LiveImage;
    icon: LiveImage;
    iconWhite: LiveImage;
  };
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden  flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <Buttons variant="menu" />

        <a
          href="/"
          class="flex-grow inline-flex justify-center items-center"
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <Icon id="Logo" width={126} height={16} />
        </a>

        <div class="flex gap-1">
          <Buttons variant="search" />
          <Buttons variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}

      <div class="hidden md:flex flex-row justify-between  items-center  w-full px-[100px]">
        <div class="flex-none w-44">
          <a href="/" aria-label="Store logo" class="block px-4 py-3">
            <img
              src={logo.black}
              alt="logo"
              class="object-cover w-[70px]"
            />
          </a>
        </div>

        <div class="flex-auto flex  items-center justify-start w-full gap-[50px] text-[10px] xl:tracking-[2.2px]">
          {items.map((item) => <NavItemScroll item={item} />)}
        </div>

        <div class="flex-none  flex items-center justify-end gap-[50px]">
          <a
            class=""
            href="/"
          >
            <div class="flex justify-around items-center flex-col h-[47px]  text-[10px]">
              <img
                src={logo.icon}
                alt="icon"
                class="object-cover  w-[5px] h-[20px]"
              />
              <span>IT'S AGILITA</span>
            </div>
          </a>
          <a
            class=""
            href="/"
          >
            <div class="flex justify-around items-center flex-col h-[47px]  text-[10px]">
              <Icon
                id="MapPin"
                size={20}
                strokeWidth={2}
                fill="none"
              />
              <span>LOJAS</span>
            </div>
          </a>
          <a
            class=""
            href="/"
          >
            <div class="flex justify-around items-center flex-col h-[47px]  text-[10px]">
              <Icon
                id="Message"
                size={20}
                strokeWidth={2}
                fill="none"
              />
              <span>FALE CONOSCO</span>
            </div>
          </a>

          <div class="flex justify-around items-center flex-col h-[47px]  text-[10px]">
            <Buttons variant="search" />
            <span>BUSCA</span>
          </div>
          <Searchbar searchbar={searchbar} />

          <div class="flex justify-around items-center flex-col h-[47px]  text-[10px]">
            <a
              class="btn btn-circle btn-sm btn-ghost"
              href="/wishlist"
              aria-label="Wishlist"
            >
              <Icon
                id="Heart"
                size={20}
                strokeWidth={2}
                fill="none"
              />
            </a>
            <span>WISHLIST</span>
          </div>

          <div class="flex justify-around items-center flex-col h-[47px]  text-[10px]">
            <a
              class="btn btn-circle btn-sm btn-ghost"
              href="/login"
              aria-label="Log in"
            >
              <Icon id="User" width={20} height={20} strokeWidth={0.4} />
            </a>
            <span>LOGIN</span>
          </div>
          <div class="flex justify-around items-center flex-col h-[47px]  text-[10px]">
            <Buttons variant="cart" />
            <span>0</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavbarScroll;