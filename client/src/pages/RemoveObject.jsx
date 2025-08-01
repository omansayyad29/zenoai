import { Scissors } from "lucide-react";
import { Sparkles } from "lucide-react";
import React from "react";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (object.split(" ").length > 1) {
        return toast.error("Please enter a single object");
      }
      const formdata = new FormData();
      formdata.append("image", input);
      formdata.append("object", object);

      const data = await axios.post("/api/ai/remove-image-object", formdata, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.data.success === true) {
        console.log("DATADATA", data);

        setContent(data.data.content);
      } else {
        toast.error(data.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* left column */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4a7aff]" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">upload image</p>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          type="file"
          accept="image/*"
          className="w-full py-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
        />
        <p className="mt-6 text-sm font-medium">Describe your image</p>
        <textarea
          rows={4}
          type="text"
          className="w-full py-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="e.g.,watch or spoon,only single object name"
          value={object}
          onChange={(e) => setObject(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full flex gap-2 justify-center items-center bg-gradient-to-r from-[#417df6] to-[#8e37eb] text-white px-4 py-2 mt-6 rounded-lg cursor-pointer "
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Scissors className="w-4 h-4" />
          )}
          Remove Object
        </button>
      </form>
      {/* right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-96">
        <div className="flex items-center gap-3">
          <Scissors className="w-6 text-[#4a7aff]" />
          <h1 className="text-xl font-semibold">Processed Images</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Scissors className="w-9 h-9" />
              <p>Upload an image and click "Remove Object" to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full">
            <img
              src={content}
              alt="generated image"
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
