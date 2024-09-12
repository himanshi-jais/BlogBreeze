import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import databaseService from "../appwrite/database";
import { Button, Input, RTE, Select } from "./index";
import { useCallback } from "react";
import PostActions from "./PostActions";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authentication.userData);
  const submit = async (data) => {
    // updating featuredImage in DB
    if (post) {
      const file = data.image[0]
        ? await databaseService.uploadFile(data.image[0])
        : null;
      if (file) {
        databaseService.deleteFile(post.featuredImage);
      }

      const dbPost = await databaseService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      // navigating the user to see the post after successfully editing the post or artical
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await databaseService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await databaseService.createPost({
          ...data,
          userId: userData.$id,
        });

        // navigating the user to see the post after successfully creating the post or artical
        if (dbPost) {
          <PostActions />;
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value.trim().toLowerCase().replace(/\s+/g, "-");
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Title "
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <br />
        <Input
          label="Slug "
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <br />
        <Input
          label="Featured Image"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={databaseService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <br />
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <br />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
          btnText={post ? "Update" : "Submit"}
        ></Button>
      </div>
    </form>
  );
}

export default PostForm;
