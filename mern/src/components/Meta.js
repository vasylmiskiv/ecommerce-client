import React from "react";
import Helmet from "react-helmet";

const Meta = ({
  title = "Welcome to StackStore",
  description = "Best products here",
  keywords = "electronics, buy electronics, iphone, ipods",
}) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keyword" content={keywords} />
      </Helmet>
    </div>
  );
};

export default Meta;
