import React from "react";

const Post = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          {post.title}
          {post.publishedAt}
        </div>
      ))}
    </div>
  );
};

export default Post;
