import Link from "next/link";

export default function Form({
  type,
  posts,
  setPost,
  submitting,
  handleSubmit,
}) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {type}
          Post
        </span>
      </h1>

      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label htmlFor="description">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>

          <textarea
            name="description"
            id="description"
            placeholder="write your prompt here..."
            required
            className="form_textarea"
            value={posts.prompt}
            onChange={(e) =>
              setPost((prev) => ({
                ...prev,
                prompt: e.target.value,
              }))
            }
          />
        </label>

        <label htmlFor="tag">
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag&nbsp;
            <span className="font-normal">
              (#product, #idea, #web-development)
            </span>
          </span>

          <input
            name="tag"
            id="tag"
            placeholder="#tag"
            required
            className="form_input"
            value={posts.tag}
            onChange={(e) =>
              setPost((prev) => ({
                ...prev,
                tag: e.target.value,
              }))
            }
          />
        </label>

        <div className="flex-end mx-3  mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}
