"use client"

import { useState } from "react";
import { ToDosData } from "../data/ToDosData";

const Page = () => {

  const [textTitle, setTextTitle] = useState('');
  const [toDos, setToDos] = useState([...ToDosData]);
  const [textArea, setTextArea] = useState('');
  const [textMsg, setTextMsg] = useState("");
  const [descriptionTextMsg, setDescriptionTextMsg] = useState("");
  const [btnText, setBtnText] = useState("Adicionar");
  const [idToDo, setIdToDo] = useState(0);
  const [svg, setSvg] = useState(
    <div className="text-[#2b9875] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        ></path>
      </svg>
    </div>
  );

  const showMessage = (msg: String, desc: String, status?: boolean) => {
    let msgContainer = document.getElementById("msg-container");

    setTextMsg(msg as unknown as string);
    setDescriptionTextMsg(desc as unknown as string);
    msgContainer?.classList.remove("hidden");
    msgContainer?.classList.add("flex");
    if (msgContainer) {
      msgContainer.style.left = "44px";
    }

    setSvg(
      <div className="text-[#2b9875] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          ></path>
        </svg>
      </div>
    )

    if (!status) {
      setSvg(<div className="text-red-500 bg-white/5 backdrop-blur-xl p-1 rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
      )
    }

    setTimeout(() => {
      msgContainer?.classList.remove("flex");
      msgContainer?.classList.add("hidden");
    }, 5000);

  }

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
    let date = document.getElementById("date_todo") as HTMLDataElement;

    if (textTitle == "" || date.value == "") {
      showMessage("Erro!", "Preencha o título a data!", false);
      return;
    }

    if (btnText == "Adicionar") {

      const data = { id: (toDos.length + 1), title: textTitle, date: new Date(date.value), description: textArea, completed: false };
      console.log(data)

      setToDos([...toDos, data]);

      modal?.classList.add("hidden");
      setTextTitle("");
      date.value = "";
      setTextArea("");
      showMessage("Sucesso!", "Parabéns! Seu To Do foi criado com sucesso!", true);

      return;
    }

    setToDos(toDos.map(todo => todo.id === idToDo ? { ...todo, title: textTitle, date: new Date(date.value), description: textArea } : todo));
    modal?.classList.add("hidden");
    setTextTitle("");
    date.value = "";
    setTextArea("");
    setBtnText("Adicionar");
    showMessage("Sucesso!", "Parabéns! Seu To Do foi editado com sucesso!", true);

  }

  const closeMsg = () => {
    let msgContainer = document.getElementById("msg-container");
    msgContainer?.classList.add("hidden");
  }

  const deleteItem = (id: Number) => {
    setToDos(toDos.filter(todo => todo.id !== id));
    showMessage("Sucesso!", "Parabéns! Seu To Do foi excluído com sucesso!", true);
  }

  const editarItem = (id: any, title: any, description: any) => {
    setTextTitle(title);
    setTextArea(description);
    setBtnText("Editar");
    setIdToDo(id);
    handleOpenModal();
  }

  return (
    <main className="w-screen min-h-screen bg-gradient-to-br from-[#1c1833] to-[#2c305c] ">
      <div id="modal" className="hidden w-[90%] h-2/3 bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md shadow-xl
      md:w-2/3
      ld:1/3
      ">

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
              <input type="text" name="" id="title_todo" className="w-3/5 h-10 p-3  border outline-none text-black" placeholder="Título da tarefa" value={textTitle} onChange={(e) => setTextTitle(e.target.value)} />
              <input type="date" id="date_todo" className="w-2/5 h-10 text-black outline-none text-center border pr-4" />
            </div>

            <div className="w-full h-3/5 p-6">

              <textarea name="" id="desc_todo" onChange={(e) => setTextArea(e.target.value)} value={textArea} className="w-full h-full p-3 outline-none text-black resize-none border" placeholder="Descricão da tarefa" />
            </div>

            <div className="w-full h-16 flex justify-center items-center">
              <input type="submit" value={btnText} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-lg flex items-center transition duration-300 transform hover:scale-105 cursor-pointer" />
            </div>
          </form>
        </div>

      </div>
      <section id="fullPage" className="w-full h-[120px] flex justify-center items-center ">
        <div
          className="max-w-32 bg-transparent items-center justify-center flex border-2 shadow-lg hover:bg-pink-500 bg-pink-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98] rounded-md"
        >
          <button className="px-5 py-2 flex gap-1" onClick={() => handleOpenModal()}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg> tarefa</button>
        </div>

      </section>
      <section className="w-full min-h-[500px] flex justify-center items-center flex-wrap gap-10" id="card-container">

        {toDos.map(item =>
          <div className="bg-gray-900 w-64 rounded-lg text-white py-2 px-3">
            <div className="flex p-2 gap-1 w-full">
              <div className="" >
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
                {item.description || "Sem descrição"}
              </p>
              {item.completed &&
                <div className="w-full flex justify-end gap-3">
                  <button id="editar" onClick={() => editarItem(item.id, item.title, item.description)} ><svg className="text-sky-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 3l-1.5-1.5a2.121 2.121 0 0 0-3 0L4 14.5V19h4.5L21 7.5a2.121 2.121 0 0 0 0-3z"></path>
                    <path d="M16 5l3 3"></path>
                    <path d="M4 19h4.5"></path>
                  </svg>


                  </button>
                  <button id="delete" onClick={() => deleteItem(item.id)} ><svg className="text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M4 7h16"></path>
                    <path d="M10 11v6"></path>
                    <path d="M14 11v6"></path>
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path>
                    <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"></path>
                  </svg>
                  </button>
                </div>
              }
            </div>
          </div >
        )}

        <div>
        </div>
        <div id="msg-container" className="flex flex-col gap-2 w-60 sm:w-96 text-[10px] sm:text-xs z-50 absolute bottom-10 -left-96 transition-all ease duration-500">
          <div
            className="succsess-alert cursor-default flex items-center justify-between w-full h-12 sm:h-14 rounded-lg bg-[#232531] px-[10px]"
          >
            <div className="flex gap-2 justify-center items-center">
              <div className="text-[#2b9875] bg-white/5 backdrop-blur-xl p-1 rounded-lg">
                {svg}
              </div>
              <div>
                <p className="text-white">{textMsg}</p>
                <p className="text-gray-500">{descriptionTextMsg}</p>
              </div>
            </div>
            <button
              className="text-gray-600 hover:bg-white/5 p-1 rounded-md transition-colors ease-linear" onClick={() => (closeMsg())}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

      </section>
    </main >
  );
}

export default Page;