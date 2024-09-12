import React from "react";
import databaseService from "../appwrite/database";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full h-72 bg-gray-100 rounded-xl p-4 flex flex-col justify-between ">
        <div className="w-full h-40 flex justify-center mb-4">
          <img
            src={databaseService.getFilePreview(featuredImage)}
            alt={title}
            className="object-contain w-full h-full rounded-lg"
          />
        </div>
        <h1 className="text-xl font-bold text-center truncate">{title}</h1>
      </div>
    </Link>
  );
}

export default PostCard;
