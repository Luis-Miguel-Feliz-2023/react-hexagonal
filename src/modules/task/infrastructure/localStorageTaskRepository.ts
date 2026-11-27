import type { TaskRepository } from "../domain/TaskRepository";
import type { Task } from "../domain/Task";


const STORAGE_KEY = "tasks";

const readTasks = (): Task[] => {
   try {
    const tasks = localStorage.getItem(STORAGE_KEY);
    if (!tasks) return [];

    const parsed = JSON.parse(tasks);
    return Array.isArray(parsed) ? (parsed as Task[]) : [];
  } catch {
    return [];
  }
};


export const createlocalStorageTaskRepository = (): TaskRepository => {

    return {

        getAll: async () => {

            return readTasks();
           // const tasks = localStorage.getItem('tasks');

           // const parsedTasks = tasks ? JSON.parse(tasks) as Task[]: [];

          //  return parsedTasks;
        },
        save: async (task: Task) => {

            const parsedTasks = readTasks();
            
          //  const tasks = localStorage.getItem('tasks');

          //  const parsedTasks = tasks ? JSON.parse(tasks) as Task[]: [];

            const taskExists = parsedTasks.findIndex((t) => t.id === task.id);

            // actualizacion de la tarea nueva tarea si existe.
            if (taskExists !== -1) {

                parsedTasks[taskExists] = task;

            } else {

                // creacion de la nueva tarea si no existe , agregamos la nueva tarea con push.
                parsedTasks.push(task);
            }

            // localStorage.setItem(, JSON.stringify(newTasks));

            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsedTasks));

        },

        delete: async (id: string) => {

            const parsedTasks = readTasks();
           // const tasks = localStorage.getItem('tasks');

           // const parsedTasks = tasks ? (JSON.parse(tasks) as Task[]): [];

            const newTasks = parsedTasks.filter((t) => t.id !== id);
            // dame todas las tareas y filtra las que coincidan con el id

            // localStorage.setItem(, JSON.stringify(newTasks));

            localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
        }
        
    }


}


// TaskRepository es un puerto que define la interfaz para interactuar con el almacenamiento de tareas.

// debe tener los 3 metodos getAll , save , delete

// getitem('tasks') → Obtiene el valor asociado a la clave 'tasks' en el almacenamiento local (localStorage).

// JSON.parse(tasks) → Convierte la cadena JSON almacenada en un objeto JavaScript. 
// Si no hay tareas almacenadas, devuelve un arreglo vacío [].

// La función LocalStorageTaskRepository devuelve un objeto que implementa la interfaz TaskRepository,


//   const parsedTasks = tasks ? JSON.parse(tasks) : []; si existe task parseamos el json , si no existe devolvemos un arreglo vacio

//   const newTasks = tasks ? [...JSON.parse(tasks), task] : [task]; si existe task parseamos el json y le agregamos la nueva tarea , si no existe devolvemos un arreglo con la nueva tarea

//  localStorage.setItem('tasks', JSON.stringify(newTasks)); guardamos en el localStorage la nueva tarea en formato json


// const parsedTasks = tasks ? JSON.parse(tasks) as Task[]: []; 
// aqui decimos si task existe que puede ser string o null quiero que json parse esas task , 
// como javascript puede interpretar , pero le indicamos que devolvera un array de tasks.
// si no devolvera un array vacio.



// nuevo codigo 

// ¿Qué cambia en tu código?
// Sin repetir lógica: readTasks() lee 'tasks', 
// intenta hacer JSON.parse dentro de try / catch y comprueba Array.isArray(parsed) 
// para que getAll, save y delete trabajen siempre con un Task[] seguro.

// Si el JSON está dañado: 
// En lugar de lanzar un error y romper la app, readTasks() devuelve [] y permite que la aplicación siga funcionando.