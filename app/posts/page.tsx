"use client";
import { Comment, Post } from "@/types/post.type";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { SearchPost } from "./_components/SearchPost";
import { TableSkeleton } from "@/components/TableSkeleton";
import { DataTable } from "@/components/DataTable";
import { postColumns } from "./_components/PostColumns";
import { commentColumns } from "./_components/CommentColumns";

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [searchId, setSearchId] = useState("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      toast.error("Failed to fetch posts!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async () => {
    if (!searchId.trim()) return;

    try {
      setIsLoading(true);
      // Fetch Posts
      const postRes = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${searchId}`,
      );
      if (!postRes.ok) throw new Error("Post not found! Input a valid ID.");
      const post = await postRes.json();
      setPosts([post]);

      // Fetch Comments
      const commentRes = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${searchId}`,
      );
      const commentsData = await commentRes.json();
      setComments(commentsData);
    } catch (error: any) {
      handleClear();
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSearchId("");
    setComments([]);
    fetchData();
  };

  return (
    <section className="container mx-auto py-8 px-4">
      <div className="mb-4">
        <h1 className="text-3xl font-medium">Post</h1>
        <div className="flex justify-between mt-6">
          <SearchPost
            value={searchId}
            onChange={setSearchId}
            onSearch={handleSearch}
            onClear={handleClear}
          />
        </div>
      </div>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <DataTable columns={postColumns} data={posts} />

          {comments.length > 0 && (
            <>
              <h2 className="text-3xl font-medium my-6">Comments</h2>
              <DataTable columns={commentColumns} data={comments} />
            </>
          )}
        </>
      )}
    </section>
  );
};

export default page;
