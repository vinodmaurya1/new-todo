"use client";

import { BASE_URL } from "@/config/global";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import addImg from "@/public/icons/add_notes.png";
import searchImg from "@/public/icons/search.png";
import deleteImg from "@/public/icons/delete.png";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { TailSpin } from "react-loader-spinner";
import TodoDetail from "./TodoDetail";
import TodoList from "./TodoList";

interface Todo {
  _id: string;
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const MainPage = () => {
  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);
  const [selectedTodoData, setSelectedTodoData] = useState<Todo | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeDetail, setActiveDetail] = useState(false)

  const fetchTodosList = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}?page=${page}&limit=${limit}&search=${search}`
      );
      if (res.data?.data.length === 0) {
        toast.error("Not found todo");
      }
      setTodos(res.data?.data || []);
      setTotalPages(res.data?.pagination?.totalPages || 1);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodosList();
  }, [page]);

  useEffect(() => {
    if (selectedTodoData) {
      setSelectedTodo(selectedTodoData.id);
    }
  }, [selectedTodoData]);

  const handleAddTodo = async () => {
    try {
      await axios.post(`${BASE_URL}/`, {
        title: "New Task",
        content: "This is a newly added Todo item.",
      });
      toast.success("Todo added successfully!");
      fetchTodosList();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add todo");
    }
  };

  const handleUpdateTodo = async () => {
    // console.log("hit-update", selectedTodo , selectedTodoData);
    if (!selectedTodoData) return;
    try {
      await axios.put(`${BASE_URL}/${selectedTodoData._id}`, {
        content: selectedTodoData.content,
      });
      toast.success("Todo updated successfully!");
      fetchTodosList();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update todo");
    }
  };

  const handleDeleteTodo = async () => {
    if (!selectedTodoData) return;
    try {
      console.log("delete hit");
      await axios.delete(`${BASE_URL}/${selectedTodoData._id}`);
      toast.success("Todo deleted successfully!");
      setActiveDetail(false)
      setSelectedTodo(null);
      setSelectedTodoData(null);
      fetchTodosList();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete todo");
    }
  };

  return (
    <div className="container sm:py-6 sm:px-10 px-5 py-2 h-screen w-full bg-gray-100 p-4 flex flex-col md:flex-row">
      <div
        className={`w-full md:w-1/3 ${
          activeDetail ? "hidden md:block" : ""
        } sm:px-3 sm:py-1`}
      >
        <TodoList
          todos={todos}
          onSelect={(todo) => {
            console.log("onselect", todo);
            setSelectedTodo(todo._id);
            setSelectedTodoData(todo);
            setActiveDetail(true)
          }}
          selectedTodo={selectedTodo}
          selectedTodoData={selectedTodoData}
          handleAddTodo={handleAddTodo}
          loading={loading}
          search={search}
          setSearch={setSearch}
          searchActive={searchActive}
          setSearchActive={setSearchActive}
          fetchTodosList={fetchTodosList}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
      <div
        className={`w-full md:w-2/3 ${activeDetail ? "" : "hidden md:block"}`}
      >
        {activeDetail ? (
          <TodoDetail
            todo={selectedTodoData}
            onBack={() => {
              setActiveDetail(false)
              setSelectedTodo(null);
              setSelectedTodoData(null);
              fetchTodosList();
            }}
            handleUpdateTodo={handleUpdateTodo}
            handleDeleteTodo={handleDeleteTodo}
            setSelectedTodoData={setSelectedTodoData}
          />
        ) : (
          <div className="hidden md:flex items-center justify-center h-100 bg-white mx-3">
            <div className="flex justify-center items-center">
              <h3 className="font-bold">Please Select Any Todo</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
