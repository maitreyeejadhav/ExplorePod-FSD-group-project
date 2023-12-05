import {formatISO9075} from "date-fns";
import {Link} from "react-router-dom";

export default function Post({
	                             _id,
	                             title,
	                             summary,
	                             cover,
	                             content,
	                             createdAt,
	                             rating,
	                             author,
                             }) {
	return (
    <div className="post">
      <div className="img">
        <Link to={`/post/${_id}`}>
          <img src={"http://localhost:4000/" + cover} alt="" />
        </Link>
      </div>
      <div className="text">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
          <div
            style={{
              display: "flex",
              marginLeft: "5px",
              gap: "2px",
              alignItems: "center",
              color: "blue",
            }}
          >
            {rating ? rating : <div>Unrated</div>}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m12 18.275l-4.15 2.5q-.275.175-.575.15t-.525-.2q-.225-.175-.35-.438t-.05-.587l1.1-4.725L3.775 11.8q-.25-.225-.312-.513t.037-.562q.1-.275.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15q.275 0 .537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45q.1.275.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437q-.225.175-.525.2t-.575-.15l-4.15-2.5Z"
              />
            </svg>
          </div>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
