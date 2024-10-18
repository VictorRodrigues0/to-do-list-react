"use client"

import { useState } from "react";
import { ToDosData } from "../data/ToDosData";

const Page = () => {

  const [text, setText] = useState('');
  const [toDos, setToDos] = useState([...ToDosData]);
  const [textArea, setTextArea] = useState('');

  const showDescription = (id: Number) => {
    var description = document.querySelector(`#description-${id}`);
    var arrow = document.querySelector(`#arrow-${id}`);

    arrow?.classList.toggle("rotate-180");

    if (description?.classList.contains("hidden")) {
      description?.classList.remove("hidden");
      return;
    }

    description?.classList.add("hidden");
  }

  const checkToDo = (id: Number) => {

    setToDos(toDos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));

  }


  const handleOpenModal = () => {
    let modal = document.getElementById("modal");
    modal?.classList.remove("hidden");
  }

  const handleCloseModal = () => {
    let modal = document.getElementById("modal");
    modal?.classList.add("hidden");
  }

  const createToDo = (event: any) => {
    event.preventDefault();
    let modal = document.getElementById("modal");
    let title = document.getElementById("title_todo") as HTMLInputElement;
    let date = document.getElementById("date_todo") as HTMLDataElement;
    let description = document.getElementById("description_todo") as HTMLInputElement;

    if (title.value == "" || date.value == "") {
      return;
    }

    const data = { id: (toDos.length + 1), title: title.value, date: new Date(date.value), description, completed: false };

    setToDos([...toDos, data]);

    modal?.classList.add("hidden");
    title.value = "";
    date.value = "";
    setTextArea("");

  }

  return (
    <main className="w-screen h-screen bg-gradient-to-br from-[#1c1833] to-[#2c305c] ">
      <div id="modal" className="hidden w-1/3 h-2/3 bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-xl">

        <div className="w-full h-10 flex justify-end items-center">
          <button onClick={handleCloseModal} className="text-black  flex justify-center items-center transition duration-300 ease-in-out cursor-pointer rounded-tr-md py-2 px-4
          hover:bg-red-600 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="w-full h-[91%]">
          <form action="" onSubmit={(e) => createToDo(e)} className="w-full h-full flex justify-center items-center flex-col">

            <div className="w-full h-20 flex p-5 gap-5">
              <input type="text" name="" id="title_todo" className="w-3/5 h-10 p-3  border outline-none text-black" placeholder="Título da tarefa" />
              <input type="date" id="date_todo" className="w-2/5 h-10 text-black outline-none text-center border pr-4" />
            </div>

            <div className="w-full h-3/5 p-6">

              <textarea name="" id="desc_todo" onChange={(e) => setTextArea(e.target.value)} value={textArea} className="w-full h-full p-3 outline-none text-black resize-none border" placeholder="Descricão da tarefa" />
            </div>

            <div className="w-full h-16 flex justify-center items-center">
              <input type="submit" value="Adicionar" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-lg flex items-center transition duration-300 transform hover:scale-105 cursor-pointer" />
            </div>
          </form>
        </div>

      </div>
      <section id="fullPage" className="w-full h-[17%] flex justify-center items-center ">
        <button onClick={handleOpenModal} className="w-32 h-10 bg-gradient-to-r from-[#e9fed3] to-[#ffe9ff] text-black rounded-md flex gap-2 justify-center items-center shadow-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
          tarefa </button>
      </section>
      <section className="w-full h-4/5  flex justify-evenly items-center flex-wrap" id="card-container">
        {toDos.map(item =>
          <div className="bg-gray-900 w-64 rounded-lg text-white">
            <div className="flex p-2 gap-1 w-full">
              <div className="" onClick={() => {
                toDos.forEach((todo) => {
                  console.log(todo.description)
                })
              }}>
                <span className="bg-blue-500 inline-block center w-3 h-3 rounded-full"></span>
              </div>
              <div className="circle">
                <span className="bg-purple-500 inline-block center w-3 h-3 rounded-full"></span>
              </div>
              <div className="circle">
                <span className="bg-pink-500 box inline-block center w-3 h-3 rounded-full"></span>
              </div>
            </div>
            <div className="w-full min-h-[100px] px-5 py-4">
              <div className="flex gap-1 flex-col">
                <span className="flex gap-1 items-center">
                  <input type="checkbox" className="hidden" id={`checkbox-${item.id}`} onClick={() => checkToDo(item.id)} />
                  <label htmlFor={`checkbox-${item.id}`} className="w-4 h-4 bg-white rounded-sm flex justify-center items-center text-black">
                    {item.completed == true ? "✓" : ""}
                  </label>
                  <h3 className="font-semibold break-words overflow-hidden text-ellipsis ">{item.title}</h3>
                </span>
                <p className="mt-1 font-light text-[12px]">{item.date.toLocaleDateString()}</p>
              </div>
              <p className="text-[14px] mt-4 flex gap-1 rounded-sm items-center cursor-pointer" onClick={() => (showDescription(item.id))} >Ver descrição
                <svg id={`arrow-${item.id}`} className="transition-all ease duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </p>
              <p id={`description-${item.id}`} className="hidden break-words text-ellipsis overflow-hidden text-[13px]">
                {item.description}
              </p>
            </div>
          </div >
        )}
      </section>
    </main>
  );
}

export default Page;