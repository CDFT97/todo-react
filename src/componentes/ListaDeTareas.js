import React, { useState } from 'react';
import TareaFormulario from './TareaFormulario';
import Tarea from './Tarea';
import '../hojas-de-estilo/ListaDeTareas.css';

function ListaDeTareas() {
  let lista_tareas = localStorage.getItem("todo-react-list");
  if(!lista_tareas) {
    lista_tareas = [];
    localStorage.setItem("todo-react-list", JSON.stringify(lista_tareas));
  } else {
    lista_tareas = JSON.parse(lista_tareas);
  }
  
  const [tareas, setTareas] = useState(lista_tareas);

  const agregarTarea = tarea => {
    if (tarea.texto.trim()) {
      tarea.texto = tarea.texto.trim();
      const tareasActualizadas = [tarea, ...tareas];
      setTareas(tareasActualizadas);
      localStorage.setItem("todo-react-list", JSON.stringify(tareasActualizadas));
    }
  }

  const eliminarTarea = id => {
    const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);
    localStorage.setItem("todo-react-list", JSON.stringify(tareasActualizadas));
    setTareas(tareasActualizadas);
  }

  const completarTarea = id => {
    const tareasActualizadas = tareas.map(tarea => {
      if (tarea.id === id) {
        tarea.completada = !tarea.completada;
      }
      return tarea;
    });
    localStorage.setItem("todo-react-list", JSON.stringify(tareasActualizadas));
    setTareas(tareasActualizadas);
  }
  
  return (
    <>
      <TareaFormulario onSubmit={agregarTarea} />
      <div className='tareas-lista-contenedor'>
        {
          tareas.map((tarea) =>
            <Tarea
              key={tarea.id}
              id={tarea.id} 
              texto={tarea.texto}
              completada={tarea.completada}
              completarTarea={completarTarea}
              eliminarTarea={eliminarTarea} />
          ) 
        }
      </div>
    </>
  );    
}

export default ListaDeTareas;