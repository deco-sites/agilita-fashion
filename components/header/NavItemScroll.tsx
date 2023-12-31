import Image from "deco-sites/std/components/Image.tsx";
import { headerHeight } from "./constants.ts";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";
export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
}

function pathAtual() {
  let navB = "";

  globalThis.addEventListener("load", () => {
    navB = window.location.pathname;
  });
  return navB;
}

function NavItemScroll({ item }: { item: INavItem }) {
  const { href, label, children } = item;

  return (
    <li class="group flex items-center ">
      <a href={href} class="px-4 py-3">
        <span class="hover:font-black  text-[10px]">
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`fixed hidden mt-[50px] hover:flex group-hover:flex bg-base-100 z-50 items-center justify-center gap-6 border-b-2 border-base-200 w-screen`}
            nav-height=""
            style={{ top: "0px", left: "0px" }}
          >
            <div class="flex mb-[30px] min-w-[745px] justify-start">
              <ul class="flex flex-col gap-5 flex-wrap max-h-[250px] text-[10px] mt-4">
                {children?.map((leaf) => (
                  <li>
                    <a class="hover:underline" href={leaf.href}>
                      <span class="text-[10px]">{leaf.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItemScroll;
