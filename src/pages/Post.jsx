import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import databaseService from "../appwrite/database";
import { Button, Container } from "../components";
import Modal from "../components/Modal";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const userData = useSelector((state) => state.authentication.userData);

  const isAuthor = post && userData ? post.user === userData.$id : false;

  useEffect(() => {
    if (slug && userData) {
      databaseService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = async () => {
    setShowModal(false); 
    await databaseService.deletePost(post.$id);
    databaseService.deleteFile(post.featuredImage);
    navigate("/");
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="relative border rounded-xl p-2">
          <div className="w-full flex justify-center mb-4 relative">
            <img
              src={databaseService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl max-w-lg max-h-72"
            />
            {isAuthor && (
              <div className="absolute right-6 top-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button className="mr-5 bg-transparent hover:bg-blue-600 hover:text-white">
                    <PencilIcon className="w-9 h-9" />
                  </Button>
                </Link>
                <Button
                  className="mr-5 hover:bg-red-500 hover:text-white"
                  bgColor="bg-transparent"
                  onClick={() => setShowModal(true)} // Show modal on delete click
                >
                  <TrashIcon className="w-9 h-9" />
                </Button>
              </div>
            )}
          </div>
          <div className="w-full mb-6">
            <h1 className="text-2xl font-bold">{post.title}</h1>
          </div>
          <div className="browser-css">{parse(post.content)}</div>
        </div>
      </Container>

      {/* Show modal if `showModal` is true */}
      {showModal && (
        <Modal
          title="Delete Post"
          onClose={() => setShowModal(false)}
          onConfirm={deletePost}
        >
          <p>Are you sure you want to delete this post?</p>
        </Modal>
      )}
    </div>
  ) : null;
}
