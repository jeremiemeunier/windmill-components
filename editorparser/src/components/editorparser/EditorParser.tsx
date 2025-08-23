import { ReactNode } from "react";
import { EditorBlockElementInterface } from "./EditorParser.types";

const EditorPrinter: ({
  type,
  className,
  content,
  author,
}: {
  type: string;
  className?: string[];
  content: string;
  author?: string;
}) => ReactNode = ({ type, className, content, author }) => {
  if (type === "h2") {
    return (
      <h2 className={`windmillui text ${className?.join(" ")}`}>
        {content as string}
      </h2>
    );
  } else if (type === "h3") {
    return (
      <h3 className={`windmillui text ${className?.join(" ")}`}>
        {content as string}
      </h3>
    );
  } else if (type === "h4") {
    return (
      <h4 className={`windmillui text ${className?.join(" ")}`}>
        {content as string}
      </h4>
    );
  } else if (type === "h5") {
    return (
      <h5 className={`windmillui text ${className?.join(" ")}`}>
        {content as string}
      </h5>
    );
  } else if (type === "h6") {
    return (
      <h6 className={`windmillui text ${className?.join(" ")}`}>
        {content as string}
      </h6>
    );
  } else if (type === "cit") {
    return (
      <blockquote>
        <p>{content as string}</p>
        {author && <p className="author">{author as string}</p>}
      </blockquote>
    );
  } else if (type === "img") {
    return <img src={content as string} alt="" />;
  } else {
    return (
      <p className={`windmillui text ${className?.join(" ")}`}>
        {content as string}
      </p>
    );
  }
};

const EditorParser: ({
  bson,
}: {
  bson: EditorBlockElementInterface | EditorBlockElementInterface[];
}) => ReactNode = ({ bson }) => {
  if (Array.isArray(bson)) {
    return bson.map((element) =>
      EditorPrinter({
        type: element.type,
        className: element.class,
        content: element.content as string,
        author: element.author,
      })
    );
  } else
    return EditorPrinter({
      type: bson.type,
      className: bson.class,
      content: bson.content as string,
      author: bson.author,
    });
};

export default EditorParser;
