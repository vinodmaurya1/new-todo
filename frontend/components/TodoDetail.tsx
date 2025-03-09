import Image from "next/image";

import addImg from "@/public/icons/add_notes.png";
import searchImg from "@/public/icons/search.png";
import deleteImg from "@/public/icons/delete.png";
import boldImg from "@/public/icons/bold.png";
import itelicImg from "@/public/icons/itelic.png";
import centerImg from "@/public/icons/center.png";
import underlineImg from "@/public/icons/underline.png";
import colorPicker from "@/public/icons/colorPicker.png";
import list from "@/public/icons/dots.png";
import listNumber from "@/public/icons/number.png";
import endImg from "@/public/icons/end.png";
import fontsizeImg from "@/public/icons/fontsize.png";
import normalImg from "@/public/icons/normal.png";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

export interface Todo {
  _id: string;
  title: string;
  content: string;
}

interface TodoDetailProps {
  todo: Todo;
  onBack: () => void;
  handleUpdateTodo: () => void;
  handleDeleteTodo: () => void;
  setSelectedTodoData: (todo: Todo) => void;
}

const TodoDetail = ({
  todo,
  onBack,
  handleUpdateTodo,
  handleDeleteTodo,
  setSelectedTodoData,
}: TodoDetailProps) => {
  const [content, setContent] = useState('');


  useEffect(() => {
    setContent(todo.content)
  }, [todo.content])
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setSelectedTodoData({ ...todo, content: e.target.value });
  };

  return (
    <>
      <button
        onClick={onBack}
        className="ml-2 flex items-center justify-center p-2 rounded lg:hidden md:hidden "
      >
        <IoIosArrowRoundBack size={30} />{" "}
        <span className="ml-2 font-bold">Back</span>
      </button>
      <div className="p-5 bg-white rounded-lg shadow-md w-full sm:mx-3 mx-1 flex h-100 flex-col justify-between">
       <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="sm:text-2xl font-bold">{todo.title}</h2>
          <button
            onClick={handleDeleteTodo}
            className="flex bg-white items-center px-4 py-2 rounded shadow cursor-pointer"
          >
            <Image
              className=""
              src={deleteImg}
              alt="add"
              style={{ width: "15px", height: "15px" }}
            />
          </button>
        </div>
        <div className="flex items-center mt-1">
          <Image
            className="mx-2"
            src={boldImg}
            alt="add"
            style={{ width: "11px", height: "12px" }}
          />
          <Image
            className="mx-2"
            src={itelicImg}
            alt="add"
            style={{ width: "11px", height: "12px" }}
          />
          <Image
            className="mx-2"
            src={underlineImg}
            alt="add"
            style={{ width: "11px", height: "12px" }}
          />
          <Image
            className="mx-2"
            src={centerImg}
            alt="add"
            style={{ width: "11px", height: "12px" }}
          />
          <Image
            className="mx-2"
            src={endImg}
            alt="add"
            style={{ width: "11px", height: "12px" }}
          />
          <Image
            className="mx-2"
            src={normalImg}
            alt="add"
            style={{ width: "11px", height: "12px" }}
          />
          <Image
            className="mx-2"
            src={list}
            alt="add"
            style={{ width: "11px", height: "12px" }}
          />
          <Image
            className="mx-2"
            src={listNumber}
            alt="add"
            style={{ width: "11px", height: "12px" }}
          />
          <Image
            className="mx-2"
            src={colorPicker}
            alt="add"
            style={{ width: "11px", height: "12px" }}
          />
          <Image
            className="mx-2"
            src={fontsizeImg}
            alt="add"
            style={{ width: "11px", height: "12px" }}
          />
        </div>

        <div className="border-b my-4"></div>
        <textarea
          placeholder="Content"
          value={content}
          onChange={handleContentChange}
          className="p-2 w-full mb-2 border"
        />
</div>
        <div className="flex justify-end m-2">
          <button
            onClick={handleUpdateTodo}
            className="bg-teal-500 text-white px-4 py-2 mt-4 rounded shadow cursor-pointer"
          >
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoDetail;
