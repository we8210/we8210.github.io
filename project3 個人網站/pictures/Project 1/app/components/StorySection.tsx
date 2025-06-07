"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface Story {
  id: number;
  created_at: string;
  author: string;
  content: string;
}

export default function StorySection() {
  const [stories, setStories] = useState<Story[]>([]);
  const [newStory, setNewStory] = useState({ author: "", content: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStory.author || !newStory.content) return;

    setIsSubmitting(true);
    const { error } = await supabase.from("stories").insert([
      {
        author: newStory.author,
        content: newStory.content,
      },
    ]);

    if (!error) {
      setNewStory({ author: "", content: "" });
      // 重新獲取故事列表
      const { data } = await supabase
        .from("stories")
        .select("*")
        .order("created_at", { ascending: false });
      setStories(data || []);
    }
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          分享你的香氛故事
        </h2>

        {/* 故事提交表單 */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-16">
          <div className="mb-6">
            <label htmlFor="author" className="block text-gray-700 mb-2">
              你的名字
            </label>
            <input
              type="text"
              id="author"
              value={newStory.author}
              onChange={(e) =>
                setNewStory((prev) => ({ ...prev, author: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="story" className="block text-gray-700 mb-2">
              你的香氛故事
            </label>
            <textarea
              id="story"
              value={newStory.content}
              onChange={(e) =>
                setNewStory((prev) => ({ ...prev, content: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                     disabled:bg-blue-300 transition duration-200"
          >
            {isSubmitting ? "提交中..." : "分享故事"}
          </button>
        </form>

        {/* 故事列表 */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-8 text-center">
            大家的故事
          </h3>
          <div className="space-y-6">
            {stories.map((story) => (
              <div key={story.id} className="bg-white p-6 rounded-lg shadow">
                <p className="text-gray-600 mb-2">
                  {new Date(story.created_at).toLocaleDateString("zh-TW")}
                </p>
                <h4 className="font-semibold text-lg mb-2">{story.author}</h4>
                <p className="text-gray-700">{story.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
