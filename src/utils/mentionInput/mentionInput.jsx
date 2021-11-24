import { MentionsInput, Mention } from "react-mentions";

function ReactMentionInput({
  elementList,
  catalogList,
  onChange,
  value,
  placeholder,
  className,
  onBlur,
}) {
  return (
    <MentionsInput
      class={className || ""}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    >
      <Mention
        trigger="{E"
        data={elementList || []}
        displayTransform={(id, title) => `{Element: "${title}"}`}
        markup="###____id__^^^__element^^^____display__###^^^"
      />
      {/* <Mention
        trigger="{C"
        data={catalogList || []}
        displayTransform={(id, title) => `{Catalog: "${title}"}`}
        markup="###____id__^^^__catalog^^^____display__###^^^"
      /> */}
    </MentionsInput>
  );
}

export default ReactMentionInput;
