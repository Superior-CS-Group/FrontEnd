import React from "react";
import { Card } from "antd";
import ReactMentionInput from "../../../utils/mentionInput/mentionInput";
export default function TermsAndConditions() {
  const [input, setInput] = React.useState("");
  return (
    <>
      <Card bordered={false} className="termsconditions radius-12">
        <h5>Terms & conditions</h5>
        <ReactMentionInput
          noMaterial
          noElement
          isCustomInput
          // isMaterialInput
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at velit
          sed sapien ullamcorper auctor. Pellentesque congue eleifend libero non
          dapibus. Donec scelerisque viverra efficitur. Etiam a euismod elit.
          Quisque vitae dui laoreet, ornare odio ac, dictum erat. Vivamus
          facilisis rhoncus magna. Pellentesque non suscipit enim. Aliquam
          iaculis dignissim augue id dapibus. Ut tincidunt turpis nibh, at
          semper quam imperdiet fringilla. Nulla massa nibh, accumsan id dolor
          ut, molestie lacinia odio. Vestibulum vel vestibulum arcu. Aenean sed
          dapibus velit, in hendrerit nunc. Vestibulum dapibus, eros nec finibus
          aliquet, dui orci euismod arcu, sollicitudin euismod velit mi
          elementum enim. Aliquam erat volutpat. Quisque quis placerat nisi.
        </p>
        <p>
          Morbi id urna id lectus congue varius nec eu nunc. Aenean orci justo,
          scelerisque ut massa ac, feugiat aliquet tortor. Phasellus a turpis at
          elit tincidunt finibus at nec ante. Quisque at tellus quis lacus
          viverra malesuada a laoreet odio. Maecenas vel mi nulla. Mauris tortor
          ante, finibus vitae aliquam in, sagittis eget risus. Morbi
          pellentesque dignissim felis, non scelerisque lacus lobortis quis.
          Nullam at enim nec ipsum interdum finibus sit amet nec neque. Nulla
          facilisi.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
          eros tristique, fringilla felis at, elementum augue. Nunc purus ex,
          sodales sed cursus vel, egestas eget odio. Sed scelerisque rhoncus
          urna, id rhoncus est convallis a. Fusce lacus dolor, facilisis finibus
          gravida a, tristique quis justo. Praesent elementum eleifend molestie.
          Nam elementum in eros nec varius. Ut ultricies sapien a elementum
          sagittis. Fusce mi massa, commodo quis sagittis sed, molestie eget
          enim. Maecenas sagittis neque sed nulla consequat faucibus. Mauris sit
          amet sem non sapien placerat scelerisque. Praesent dapibus vitae enim
          vel dictum. Duis bibendum nisi id leo euismod, ac pulvinar massa
          sollicitudin. Morbi blandit enim ligula. Cras id ornare magna.
        </p>
        <p>
          Nunc nec luctus justo. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Ut eget nulla et tellus accumsan tincidunt. Vivamus
          eu facilisis lacus. Donec rhoncus nulla enim, ut tempor tellus feugiat
          a. Praesent ut bibendum arcu. Sed rhoncus metus metus, et dictum
          mauris auctor tincidunt. Fusce sit amet suscipit urna. Ut vel sem
          ullamcorper, tempor diam sit amet, pretium augue. Suspendisse
          consequat ex velit, at sodales dui faucibus ut. Ut in est vehicula,
          posuere elit et, pharetra est. Nam non laoreet enim. Maecenas urna
          est, tempus sed erat ut, luctus fermentum tortor. Aliquam mattis, eros
          vel molestie mollis, est est congue lectus, non pellentesque augue sem
          sit amet est.
        </p>
        <p>
          Nulla id erat vel purus imperdiet condimentum. Sed arcu urna, sodales
          vitae nibh sit amet, scelerisque laoreet quam. Suspendisse sed viverra
          est. Cras quis rhoncus urna. Nam vestibulum dictum ante non pretium.
          Nunc cursus tempor molestie. Nunc cursus mattis eleifend. Nunc
          consectetur orci vel enim bibendum feugiat. Proin gravida ipsum vitae
          sem euismod, a scelerisque mi mollis. Vestibulum mollis elit id est
          imperdiet, eget viverra neque laoreet. Nunc feugiat vestibulum
          aliquam. Donec aliquam venenatis turpis eget egestas. Praesent in
          placerat orci. Phasellus sed imperdiet nunc, eget placerat enim.
        </p>
      </Card>
    </>
  );
}
