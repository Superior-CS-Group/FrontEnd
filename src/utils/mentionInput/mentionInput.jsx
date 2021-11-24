import { MentionsInput, Mention } from "react-mentions";

function ReactMentionInput({
  valuesList,
  onChange,
  value,
  placeholder,
  className,
}) {
  return (
    <MentionsInput
      class={className || ""}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    >
      <Mention
        trigger="{"
        data={valuesList}
        displayTransform={(id, title) => `{Element: "${title}"}`}
        markup="###____id__^^^____display__###^^^"
      />
    </MentionsInput>
  );
}

export default ReactMentionInput;
