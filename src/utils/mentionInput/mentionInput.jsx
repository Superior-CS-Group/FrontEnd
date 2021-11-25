import { MentionsInput, Mention } from "react-mentions";
import { getSuggestions } from "../../api/formula";

function ReactMentionInput({
  elementList,
  onChange,
  value,
  placeholder,
  className,
  onBlur,
}) {
  const handleCatalog = (query, callback) => {
    return getSuggestions("material", query)
      .then((res) => {
        if (res.remote === "success") {
          return res.data.map((item) => {
            return {
              display: item.title,
              id: item._id,
            };
          });
        } else {
          return [];
        }
      })
      .then(callback);
  };
  return (
    <>
      <MentionsInput
        className={className}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onBlur={onBlur}
      >
        <Mention
          trigger="@"
          markup="@{{element||__id__||__display__}}"
          data={elementList || []}
          displayTransform={(id, title) => `{Element: "${title}"}`}
        />
        <Mention
          markup="@{{catalog||__id__||__display__}}"
          trigger="#"
          data={handleCatalog}
          displayTransform={(id, title) => `{Catalog: "${title}"}`}
        />
      </MentionsInput>
    </>
  );
}

export default ReactMentionInput;

/**
  // <MentionsInput
    //   class={className || ""}
    //   placeholder={placeholder}
    //   value={value}
    //   onChange={onChange}
    //   onBlur={onBlur}
    // >
    //   <Mention
    //     trigger="{E"
    //     data={elementList || []}
    //     displayTransform={(id, title) => `{Element: "${title}"}`}
    //     markup="###____id__^^^__element^^^____display__###^^^"
    //   />
    //   <Mention
    //     trigger="{C"
    //     data={handleCatalog}
    //     displayTransform={(id, title) => {
    //       console.log("id: ", id);
    //       return `{Catalog: "${title}"}`;
    //     }}
    //     markup="###____id__^^^__catalog^^^____display__###^^^"
    //   />
    // </MentionsInput> */
