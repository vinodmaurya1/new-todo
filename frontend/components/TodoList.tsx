import Image from "next/image";
import addImg from "@/public/icons/add_notes.png";
import searchImg from "@/public/icons/search.png";
import deleteImg from "@/public/icons/delete.png";
import { TailSpin } from "react-loader-spinner";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export interface Todo {
  _id: string;
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

interface TodoListProps {
  todos: Todo[];
  onSelect: (todo: Todo) => void;
  handleAddTodo: () => void;
  loading: boolean;
  search: string;
  selectedTodo: string;
  setSearch: (value: string) => void;
//   setPage:num;
  searchActive: boolean;
  setSearchActive: (value: boolean) => void;
  fetchTodosList: () => void;
  totalPages: number;
  page: number;
}

const TodoList = ({
  todos,
  onSelect,
  handleAddTodo,
  selectedTodo,
  selectedTodoData,
  loading,
  search,
  setSearch,
  searchActive,
  setSearchActive,
  fetchTodosList,
  page,
  setPage,
  totalPages,
}: TodoListProps) => {
  return (
    <div className="w-full max-w-md mx-auto md:max-w-full">
      <div className="flex justify-between py-2">
        <button
          onClick={handleAddTodo}
          className="bg-black text-white flex items-center px-4 py-2 rounded"
        >
          <Image
            src={addImg}
            alt="add"
            width={15}
            height={15}
            className="mr-2"
          />
          TODO
        </button>
        <button
          onClick={() => setSearchActive(!searchActive)}
          className="flex bg-white items-center px-4 py-2 rounded"
        >
          <Image src={searchImg} alt="search" width={15} height={15} />
        </button>
      </div>

      {searchActive && (
        <div className="flex mb-2">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            onClick={fetchTodosList}
            className="flex bg-white items-center px-4 py-2 mx-2 rounded shadow"
          >
            <Image src={searchImg} alt="search" width={15} height={15} />
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-20">
          <TailSpin
            visible={true}
            height="40"
            width="40"
            color="#0ff3c3"
            ariaLabel="tail-spin-loading"
          />
        </div>
      ) : (
        todos
          ?.filter((todo) =>
            todo.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((todo, index) => (
            <div
              key={todo?.id}
              onClick={() => {
                onSelect(todo);
              }}
              className={`p-3 bg-white border-2 mb-2 rounded flex justify-between items-center cursor-pointer ${
                selectedTodoData?._id === todo._id
                  ? "border-b-gray-700"
                  : "border-gray-50"
              }`}
            >
              <div className="w-3/4">
                <h2 className="font-bold">{todo.title}</h2>
                <p className="text-xs text-gray-600">{todo.content.length > 40 ? `${todo.content.slice(0, 40)}...` : todo.content}</p>
              </div>
              <p className="text-xs text-gray-400">
                {new Date(todo.createdAt).toLocaleDateString("en-DE", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          ))
      )}

      <div className="flex items-center justify-center mt-4">
        <button
          onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`bg-white px-4 py-2 mx-2 rounded shadow ${
            page === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <MdKeyboardArrowLeft />
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`bg-white px-4 py-2 mx-2 rounded shadow ${
              page === index + 1 ? "bg-gray-300" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setPage((prev: number) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`bg-white px-4 py-2 mx-2 rounded shadow ${
            page === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <MdKeyboardArrowRight />
        </button>
      </div>
    </div>
  );
};

export default TodoList;
