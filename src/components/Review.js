import React from "react";

const Review = ({ review }) => {
  return (
    <div>
      {review?.results?.map((item) => (
        <div key={item.id} className="div1 eachdiv">
          <div className="userdetails">
            <div className="imgbox">
              <div>
                <img
                  src={
                    item.author_details.avatar_path === null
                      ? "https://www.gravatar.com/avatar/default-image"
                      : item.author_details.avatar_path.includes("https:")
                      ? item.author_details.avatar_path.slice(1)
                      : `https://www.themoviedb.org/t/p/w64_and_h64_face/${item.author_details.avatar_path}`
                  }
                />
              </div>
            </div>
            <div className="detbox">
              <p className="name">{item.author}</p>
              <div>
                <p className="review_date">
                  {new Date(item.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="review">
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Review;
