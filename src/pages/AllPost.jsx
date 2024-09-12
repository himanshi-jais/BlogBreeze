import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import { motion } from "framer-motion";
import databaseService from "../appwrite/database";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  const currentUser = useSelector((state) => state.authentication.userData);

  useEffect(() => {
    databaseService.getPosts().then((posts) => {
      console.log(posts);
      console.log(currentUser);
      if (posts) {
        const userPost = posts.documents.filter(
          (post) => post.user === currentUser.$id
        );

        setPosts(userPost);
      }
    });
  }, [currentUser]);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap ">
          {posts.map((post) => (
            <motion.div
              key={post.$id}
              className="p-2 w-1/4"
              initial={{ opacity: 0, y: 20 }} // Starting position (hidden)
              animate={{ opacity: 1, y: 0 }} // End position (visible)
              transition={{ duration: 0.5 }} // Animation duration
            >
              <PostCard {...post} />
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
