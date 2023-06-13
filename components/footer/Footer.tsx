import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { ComponentChildren } from "preact";
import Image from "deco-sites/std/components/Image.tsx";
import type { Image as ImageType } from "deco-sites/std/components/types.ts";
import { useMemo } from "preact/hooks";

export type IconItem = { icon: AvailableIcons };
export type StringItem = {
  label: string;
  href: string;
};

export type Item = StringItem | IconItem;

export type Section = {
  label: string;
  children: Item[];
};

const isIcon = (item: Item): item is IconItem =>
  // deno-lint-ignore no-explicit-any
  typeof (item as any)?.icon === "string";

function SectionItem({ item }: { item: Item }) {
  return (
    <span class="text-black text-[8px]">
      {isIcon(item)
        ? (
          <div class="border-base-100  border border-solid py-1.5 px-2.5">
            <Icon
              id={item.icon}
              width={25}
              height={20}
              strokeWidth={0.01}
            />
          </div>
        )
        : (
          <a href={item.href}>
            {item.label}
          </a>
        )}
    </span>
  );
}
const IMAGES = [
  {
    altText: "deco",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fe7cd8ba-c954-45d6-9282-ee7d8ca8e3c7",
  },
  {
    altText: "deco",
    image:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/637e8601-6b86-4979-aa97-68013a2a60fd",
  },
];

function FooterContainer(
  { children, class: _class = "" }: {
    class?: string;
    children: ComponentChildren;
  },
) {
  return <div class={`py-4 px-4 sm:px-0 ${_class}`}>{children}</div>;
}
export interface Image {
  image: ImageType;
  altText: string;
}
export interface Props {
  sections?: Section[];
  images?: Image[];
}

function Footer({ sections = [], images = [] }: Props) {
  const list = useMemo(
    () =>
      images && images.length > 0
        ? images
        : Array(20).fill(null).map((_, i) => IMAGES[i % 2]),
    [],
  );

  return (
    <footer class="w-full bg-white flex flex-col   divide-primary-content">
      <div>
        <div class="container w-full flex flex-col  items-center divide-y divide-primary-content text-black">
          <FooterContainer>
            {/* Desktop view */}
            <ul class="hidden sm:flex flex-row gap-32 tracking-[2px] ">
              {sections.map((section) => (
                <li>
                  <div>
                    <span class="font-medium text-[12px] ">
                      {section.label}
                    </span>

                    <ul
                      class={`flex ${
                        isIcon(section.children[0]) ? "flex-row" : "flex-col"
                      } flex-wrap`}
                    >
                      {section.children.map((item) => (
                        <li>
                          <SectionItem item={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>

            {/* Mobile view */}
            <ul class="flex flex-col sm:hidden sm:flex-row gap-4 tracking-[2px] ">
              {sections.map((section) => (
                <li>
                  <span class="text-black">
                    <details>
                      <summary>
                        {section.label}
                      </summary>

                      <ul
                        class={`flex ${
                          isIcon(section.children[0]) ? "flex-row" : "flex-col"
                        } gap-2 px-2 pt-2`}
                      >
                        {section.children.map((item) => (
                          <li>
                            <SectionItem item={item} />
                          </li>
                        ))}
                      </ul>
                    </details>
                  </span>
                </li>
              ))}
            </ul>
          </FooterContainer>
        </div>
        <FooterContainer class="w-full text-center items-center">
          {list.map((element) => (
            <div class="inline-block align-middle">
              <div class="flex h-full items-center justify-center">
                <img
                  src={element.image}
                  alt={element.altText || ""}
                  class="max-w-[50px] mx-4 max-h-full w-full"
                />
              </div>
            </div>
          ))}
        </FooterContainer>
      </div>

      <div>
        <div class="container w-full">
          <FooterContainer class="flex justify-between w-full">
            <span class="flex items-center gap-1 text-black">
              Powered by{" "}
              <a
                href="https://www.deco.cx"
                aria-label="powered by https://www.deco.cx"
              >
                <Icon id="Deco" height={20} width={60} strokeWidth={0.01} />
              </a>
            </span>

            <ul class="flex items-center justify-center gap-2">
              <li>
                <a
                  href="https://www.instagram.com/deco.cx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram logo"
                >
                  <Icon
                    class="text-black"
                    width={32}
                    height={32}
                    id="Instagram"
                  />
                </a>
              </li>
              <li>
                <a
                  href="http://www.deco.cx/discord"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Discord logo"
                >
                  <Icon
                    class="text-black"
                    width={32}
                    height={32}
                    id="Discord"
                  />
                </a>
              </li>
            </ul>
          </FooterContainer>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
