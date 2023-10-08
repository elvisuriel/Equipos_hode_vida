"use client";
import { useEffect } from "react";
import { useTasks } from "../../context/TasksContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const TaskFormPage = ({ params }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { createTask, updateTask, tasks } = useTasks();
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    if (!params.id) {
      createTask(data.title, data.description);
      toast.success("Task created successfully");
    } else {
      updateTask(params.id, data);
      toast.success("Task updated successfully");
    }
    router.push("/");
  });

  useEffect(() => {
    if (params.id) {
      const taskFound = tasks.find((task) => task.id === params.id);
      if (taskFound) {
        setValue("title", taskFound.title);
        setValue("description", taskFound.description);
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-full">
      <form className="bg-gray-700 p-10" onSubmit={onSubmit}>
        <h1 className="text-3xl mb-3">
          {params.id ? "Edit Pc" : "New Pc"}
        </h1>
        <div className="mb-2">
          <label htmlFor="title" className="block text-gray-300">
            Nombre del Pc
          </label>
          <input
            type="text"
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-2 block"
            placeholder="Write a name Pc"
            autoFocus
            name="title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="block text-red-400 mb-2">
              This field is required
            </span>
          )}
        </div>
  
        <div className="mb-2">
          <label htmlFor="description" className="block text-gray-300">
            Description
          </label>
          <textarea
            cols="2"
            placeholder="Write a Description"
            className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-1 block"
            name="description"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="block text-red-400 mb-2">
              This field is required
            </span>
          )}
        </div>
  
        <button className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity-30">
          Save
        </button>
      </form>
  
      {/* Tabla de descripciones */}
      <table className="table-auto mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Campo</th>
            <th className="px-4 py-2">Descripción</th>
          </tr>
        </thead>
        <tbody>
        
          <tr>
            <td className="border px-4 py-2">Marca del Equipo</td>
            <td className="border px-4 py-2">Que marca es el equipo</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Procesador</td>
            <td className="border px-4 py-2">Que procesador tiene el equipo</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Disco duro</td>
            <td className="border px-4 py-2">Que Disco duro tiene el equipo</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Mascara IP</td>
            <td className="border px-4 py-2">Que Mascara de red  tiene el equipo</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Informacion de Red</td>
            <td className="border px-4 py-2">Que Informacion de red  tiene el equipo</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">fecha de compra</td>
            <td className="border px-4 py-2">La descripción de la facha de compra </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Mantenimientos</td>
            <td className="border px-4 py-2">La descripción de los mantenimientos</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Ubicacion del Equipo</td>
            <td className="border px-4 py-2">La descripción del area al que pertenece la PC</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Sistema Operativo</td>
            <td className="border px-4 py-2">La descripción del sistema operativo de la PC</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Otra informacion</td>
            <td className="border px-4 py-2">Informacion adicional  de la PC</td>
          </tr>
        </tbody>
      </table>
    </div>
   );
  };

export default TaskFormPage;
