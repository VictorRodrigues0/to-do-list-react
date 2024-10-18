import { ToDosData } from "@/data/ToDosData";
import { ToDoType } from "@/types/ToDoType";
import { useState } from "react";

export const ToDoCards = ({ id, title, date, description, completed }: ToDoType) => {

    const [toDos, setToDos] = useState([...ToDosData]);
    const descriprionId = "description-" + id;
    const arrowId = "arrow-" + id;
    const checkId = "check-" + id;

    const showDescription = () => {
        var description = document.querySelector(`#description-${id}`);
        var arrow = document.querySelector(`#arrow-${id}`);

        arrow?.classList.toggle("rotate-180");

        if (description?.classList.contains("hidden")) {
            description?.classList.remove("hidden");
            return;
        }

        description?.classList.add("hidden");
    }

    const checkToDo = () => {

        setToDos(toDos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));

        var checkbox = document.querySelector(`#check-${id}`) as HTMLInputElement;

    }

    return (
        <div className="bg-gray-900 w-64 rounded-lg text-white">
            <div className="flex p-2 gap-1 w-full">
                <div className="">
                    <span onClick={() => {
                        console.log(toDos[0].completed, toDos[1].completed, toDos[2].completed)
                    }} className="bg-blue-500 inline-block center w-3 h-3 rounded-full"></span>
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
                        <input type="checkbox" className="" id={checkId} onClick={() => checkToDo()} />
                        <label htmlFor={checkId} className="w-4 h-4 bg-white rounded-sm ">
                            {completed == true ?  <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 10 L50 90 L90 10" stroke="black" stroke-width="2" fill="none" />
                            </svg> : ""}
                        </label>
                        <h3 className="font-semibold break-words overflow-hidden text-ellipsis ">{title}</h3>
                    </span>
                    <p className="mt-1 font-light text-[12px]">{date.toLocaleDateString()}</p>
                </div>
                <p className="text-[14px] mt-4 flex gap-1 rounded-sm items-center cursor-pointer" onClick={() => (showDescription())}>Ver descrição <svg id={arrowId} className="transition-all ease duration-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                </p>
                <p id={descriprionId} className="hidden break-words text-ellipsis overflow-hidden text-[13px]">
                    {description}</p>
            </div>
        </div >
    );
}