"use client";

import { useEffect, useState } from "react";
import PromptCardList from "@components/PromptCardList";

export default function UserFeed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  function handleSearchChange() {}

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}
