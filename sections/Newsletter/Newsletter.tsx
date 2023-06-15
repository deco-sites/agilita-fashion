import Header from "$store/components/ui/SectionHeader.tsx";

export interface Form {
  placeholder2?: string;
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  instagram: string;
  mensagem: string;
  title?: string;
  /** @format textarea */
  description?: string;
  form?: Form;
  layout?: {
    headerFontSize?: "Large" | "Normal";
    content?: {
      border?: boolean;
      alignment?: "Center" | "Left" | "Side to side";
      bgColor?: "Normal" | "Reverse";
    };
  };
}

const DEFAULT_PROPS: Props = {
  instagram: "",
  mensagem: "",
  title: "",
  description: "",
  form: {
    placeholder2: "Digite seu email",
    placeholder: "Digite seu email",
    buttonText: "Inscrever",
    helpText:
      'Ao se inscrever, você concorda com nossa <a class="link" href="/politica-de-privacidade">Política de privacidade</a>.',
  },
  layout: {
    headerFontSize: "Large",
    content: {
      border: false,
      alignment: "Center",
    },
  },
};

export default function Newsletter(props: Props) {
  const { title, description, form, layout, instagram, mensagem } = {
    ...DEFAULT_PROPS,
    ...props,
  };
  const isReverse = layout?.content?.bgColor === "Reverse";
  const bordered = Boolean(layout?.content?.border);

  const headerLayout = (
    <Header
      title={title}
      description={description}
      alignment={layout?.content?.alignment === "Left" ? "left" : "center"}
      colorReverse={isReverse}
      fontSize={layout?.headerFontSize}
    />
  );

  const formLayout = form && (
    <form action="/" class="flex flex-col gap-4">
      <div class="flex flex-col justify-center items-center lg:flex-row gap-3">
        <input
          class="hover:border-black  hover:text-black border-b text-[12px] text-gray-400 w-[245px]"
          type="text"
          placeholder={form.placeholder2}
        />
        <input
          class="hover:border-black  hover:text-black border-b text-[12px] text-gray-400 w-[245px]"
          type="text"
          placeholder={form.placeholder}
        />
        <button
          class={` btn w-[145px] text-black text-[12px] 
          ${isReverse ? "btn-accent" : "bg-white"} rounded-none border 
          border-black hover:bg-secondary hover:text-white `}
          type="submit"
        >
          {form.buttonText}
        </button>
      </div>
      {form.helpText && (
        <div
          class="text-sm"
          dangerouslySetInnerHTML={{ __html: form.helpText }}
        />
      )}
    </form>
  );

  const bgLayout = isReverse
    ? "bg-secondary text-secondary-content"
    : "bg-transparent";

  return (
    <div
      class={`${
        bordered
          ? isReverse ? "bg-secondary-content" : "bg-secondary"
          : bgLayout
      } ${bordered ? "p-4 lg:p-8" : "p-8"}`}
    >
      <div class="flex flex-col  text-center gap-5  font-light mb-8" >
        <span class="text-[23px] tracking-[7px]">{instagram}</span>
        <span class="text-[14px]">  {mensagem}</span>
      </div>
      {(!layout?.content?.alignment ||
        layout?.content?.alignment === "Center") && (
        <div
          class={` flex flex-col rounded p-4 gap-6 lg:p-4 lg:gap-12 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-center">
            {formLayout}
          </div>
        </div>
      )}
      {layout?.content?.alignment === "Left" && (
        <div
          class={` flex flex-col rounded p-4 gap-6 lg:p-4 lg:gap-12 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-start">
            {formLayout}
          </div>
        </div>
      )}
      {layout?.content?.alignment === "Side to side" && (
        <div
          class={` flex flex-col rounded justify-between lg:flex-row p-4 gap-6 lg:p-4 lg:gap-12 ${bgLayout}`}
        >
          {headerLayout}
          <div class="flex justify-center">
            {formLayout}
          </div>
        </div>
      )}
    </div>
  );
}
