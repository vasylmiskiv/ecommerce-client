import Helmet from "react-helmet";

const Meta = ({
  title = "Ecommerce store",
  description = "Full stack ecommerce store app | Stack: React, React-router, Redux, Redux thunk, Express, Mongoose, MongoDB | Admin tools, dashborad, editing etc",
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
