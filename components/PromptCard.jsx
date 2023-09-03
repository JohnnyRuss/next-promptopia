"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export default function PromptCard({
  prompt,
  handleTagClick,
  handleEdit,
  handleDelete,
}) {
  const router = useRouter();

  const { data: session } = useSession();

  const pathname = usePathname();

  const [copy, setCopy] = useState("");

  const handleCopy = () => {
    setCopy(prompt.prompt);
    navigator.clipboard.writeText(prompt.prompt);

    setTimeout(() => {
      setCopy("");
    }, 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={prompt.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col ">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt.creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            width={40}
            height={40}
            alt="copy"
            src={
              copy === prompt.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{prompt.prompt}</p>

      <p
        onClick={() => handleTagClick && handleTagClick(prompt.tag)}
        className="font-inter text-sm blue_gradient cursor-pointer"
      >
        {prompt.tag}
      </p>

      {session?.user.id === prompt.creator._id && pathname === `/profile` && (
        <div className="mmt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <button
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
