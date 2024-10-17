"use client"

import { useState } from "react";
import { ToDosData } from "../data/ToDosData";

const Page = () => {

  const [text, setText] = useState('');
  const [toDos, setToDos] = useState([ToDosData]);


  const handleOpenModal = () => {
    let modal = document.getElementById("modal");
    let fullPage = document.getElementById("fullPage") as HTMLElement;

    modal?.classList.remove("hidden");
    fullPage.style.opacity = "0.3";
  }

  const handleCloseModal = () => {
    let modal = document.getElementById("modal");
    let fullPage = document.getElementById("fullPage") as HTMLElement;

    modal?.classList.add("hidden");
    fullPage.style.opacity = "1";
  }

  const createToDo = (event: any) => {
    event.preventDefault();
    let modal = document.getElementById("modal");
    let title = document.getElementById("title") as HTMLInputElement;
    let date = document.getElementById("date") as HTMLDataElement;
    alert(date)
    let description = document.getElementById("description") as HTMLInputElement;

    if (title.value == "" || date.value == "" || description.value == "") {
      return;
    }

    const data = {id: (toDos.length + 1), title: title.value, date: new Date(date.value), description: description.value, completed: false};

    setToDos([...toDos, data]);

    modal?.classList.add("hidden");

  }

  return (
    <main className="w-screen h-screen bg-gradient-to-br from-[#1c1833] to-[#2c305c] ">
      <div id="modal" className="hidden w-1/3 h-2/3 bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-xl">

        <div className="w-full h-10 flex justify-end items-center">
          <p onClick={handleCloseModal} className="text-black  flex justify-center items-center transition duration-300 ease-in-out cursor-pointer rounded-tr-md py-2 px-4
          hover:bg-red-600 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </p>
        </div>

        <div className="w-full h-[91%]">
          <form action="" onSubmit={(e) => createToDo(e)} className="w-full h-full flex justify-center items-center flex-col">

            <div className="w-full h-20 flex p-5 gap-5">
              <input type="text" name="" id="title_todo" className="w-3/5 h-10 p-3  border outline-none text-black" placeholder="Título da tarefa" />
              <input type="date" id="date_todo" className="w-2/5 h-10 text-black outline-none text-center border pr-4" />
            </div>

            <div className="w-full h-3/5 p-6">

              <textarea name="" id="desc_todo" className="w-full h-full p-3 outline-none text-black resize-none border" placeholder="Descricão da tarefa" />
            </div>

            <div className="w-full h-16 flex justify-center items-center">
              <input type="submit" value="Adicionar" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-lg flex items-center transition duration-300 transform hover:scale-105 cursor-pointer" />
            </div>
          </form>
        </div>

      </div>
      <section id="fullPage" className="w-full h-1/5 flex justify-center items-center ">
        <button onClick={handleOpenModal} className="w-32 h-10 bg-gradient-to-r from-[#e9fed3] to-[#ffe9ff] text-black rounded-md flex gap-2 justify-center items-center shadow-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
          tarefa </button>
      </section>
      <section className="w-full h-4/5  flex justify-center items-center">
        <div className="hidden w-72 h-3/5 bg-[#1b1e00] rounded-md shadow-md">
        {toDos.map(item => 
        <div>
          <p>{item.title}</p>
          <p>{item.date}</p>
          <p>{item.description}</p>
          <p>{item.completed}</p>
        </div>
        )}
        </div>
      </section>
    </main>
  );
}

export default Page;