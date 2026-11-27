import {createlocalStorageTaskRepository} from "../../modules/task/infrastructure/localStorageTaskRepository";
import { createTaskService } from "../../modules/task/application/TaskService";
import { useEffect, useState, type SubmitEventHandler } from "react";
import { generateTaskId, isValidTaskTitle, type Task } from "../../modules/task/domain/Task";


// mi service me pide un repositorio asi que lo creamos 
const repository = createlocalStorageTaskRepository();

const service = createTaskService(repository);

// ahora podemos usar el service para obtener todas las tareas y mostrarlas en la vista


export default function TaskView() {

    // crear estado 
    const [tasks, setTasks] = useState<Task[]>([]);
                                  // Task aqui lo usamos para tipar el estado para que sea un array de tareas 

    const [title, setTitle] = useState("");       

    const [FormErrors, setFormErrors] = useState<{ title: string | null }>({title: null}); // estado para errores de validacion
    
    const submit : SubmitEventHandler = (event) => {
        event.preventDefault();

        // submit se va ejecutar cuando se haga submit en el form y vamos a llamar al service para crear una nueva tarea con el title que tenemos en el estado y un id generado por generateTaskId() y isDone en false

        const isValid = isValidTaskTitle(title);

        setFormErrors((prevErrors) => ({...prevErrors, title: isValid ? null : "Invalid Title"}));

        if (!isValid) 
            return;




        service.save(generateTaskId(), title, false)
            .then(() => {

            fetchTasks(); // llamamos a fetchTasks para que se vuelva a ejecutar y se actualicen las tareas en el estado

            setTitle("");
        })

        .catch ((error) => {
            alert(error.message)
        });
    }
    // gestionar el formulario para crear nuevas tareas



    const fetchTasks = () => {

        service.getAll()
           .then((tasks) => {
            setTasks(tasks);
            })
            
            .catch((error) => {

            alert(error.message)

            });

    }


    const toggleTask = (task: Task) => {
        service.save(task.id, task.title, !task.isDone)
        .then(() => {
            fetchTasks()
        })
        .catch((error) => {
            alert(error.message)
        })
    }
    

    useEffect(() => {

        fetchTasks();
    }, []);
// fetchTasks sirve para obtener todas las tareas y setearlas en el estado, y useEffect para que se ejecute al montar el componente.
// fetchTasks quiero que se vuelva a ejecutar cada vez que se cree una nueva tarea, para eso podemos pasarle un array de dependencias con el estado de tasks, 
// asi cada vez que se cree una nueva tarea se ejecutara fetchTasks y se actualizaran las tareas en el estado.


    useEffect(() => {
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            title: null
        }));

    }, [title]);

    // esto quita el mensaje de invalide task que aparece al escribir algo vacio en el form.

    return (
        <div>
            <h1>Task View</h1>

            {tasks.length === 0 && <p>No tasks found</p>}


            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>

                        <div style={{ display: "flex"}}>

                        <button onClick={() => {
                        
                        toggleTask(task)
                        
                        }}>

                            {task.isDone ? "Completada" : "No completada"}

                        </button>

                            <p>{task.isDone ? <s> {task.title}</s> : task.title}</p>   

                        <button onClick= {() => {

                            const isConfirmed = confirm("Estas seguro ?")
                            if (!isConfirmed) return 

                            service.delete (task.id).then(() =>{
                                fetchTasks();
                            })
                            
                        }}>❌</button>

                        </div>
                        
                        </li>
                ))}
            </ul>


        <form onSubmit={submit}>

            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <button type="submit">Add Task</button>

            {FormErrors.title && <p>{FormErrors.title}</p>}

        </form>


        </div>
    );
}


// {tasks.length === 0 && <p>No tasks found</p>}
            // si no hay tasks 
// por cada task que tengamos en el estado, vamos a renderizar un li con el title de la task y el id como key
// agregamos un form para crear nuevas tareas


// En React (JSX), las llaves {} sirven para evaluar código JavaScript dentro del marcado HTML.
//             {tasks.length === 0 && <p>No tasks found</p>}

// ¿Cómo funciona en tu línea {tasks.length === 0 && <p>No tasks found</p>}?
// Evalúa de izquierda a derecha aplicando evaluación de cortocircuito (short-circuit):

// Si la parte izquierda es true (tasks.length === 0 se cumple porque el arreglo está vacío): 
// pasa a la derecha y devuelve <p>No tasks found</p>, así que React lo pinta en pantalla.

// Si la parte izquierda es false (tasks.length === 0 no se cumple porque sí hay tareas): 
// se detiene ahí y devuelve false, que React simplemente ignora (no renderiza nada).


//          <button type="submit">Add Task</button>

//         {FormErrors.title && <p>{FormErrors.title}</p>}

// el orden de esta linea influye en el codigo ya que si la pongo arriba del button el boton se desplaza abajo del form, 
// pero si lo pongo abajo entonces el mensaje de invalid task aparece abajo sin modificar el boton de posicion.



// Estructura general y estado vacío

// <h1>Task View</h1>: Título principal de la vista.

// {tasks.length === 0 && <p>No tasks found</p>}: Si el arreglo tasks está vacío, muestra el mensaje "No tasks found"; si hay tareas, no renderiza ese párrafo.

// Renderizado de la lista (<ul> y .map)
// <ul>: Contenedor de lista no ordenada para mostrar las tareas.

// {tasks.map((task) => ( ... ))}: Recorre cada objeto task dentro de tasks y genera un elemento <li> por cada uno.

// <li key={task.id}>: Usa task.id como key única y estable para que React identifique cada elemento al actualizar o reordenar la lista.

// Fila de cada tarea y botón de toggle
// <div style={{ display: "flex" }}>: Agrupa el botón y el título en una fila horizontal usando CSS flexbox en línea.

// <button onClick={() => { ... }}>: Al hacer clic, ejecuta una función que actualiza la tarea:

// Llama a service.save(task.id, task.title, !task.isDone) enviando el mismo id y title, pero invirtiendo el booleano isDone (!task.isDone: si era true pasa a false, y si era false pasa a true).

// Espera la resolución con .then(() => { fetchTasks(); }) y llama a fetchTasks() para recargar las tareas desde el repositorio y refrescar el estado tasks en pantalla.

// {task.isDone ? "Completada" : "No completada"}: Operador ternario que muestra "Completada" si task.isDone es true, o "No completada" si es false.

// <p>{task.title}</p>: Muestra el título de la tarea junto al botón.

// ,then() sirve para ejecutar código cuando una operación asíncrona termina con éxito.
// Si la promesa se resuelve bien, entra al .then(...).

// Si la promesa falla, puedes capturar el error con .catch((error) => ...) 
// (o usar async / await con try / catch como alternativa más lineal).



//    <button onClick= {() => {
//           service.delete (task.id).then(() =>{
//                fetchTasks();
//                })
//                            
//                }}>❌</button> */}

// al darle click al boton , va ejecutar el metodo delete del service , 
// va pasarle el id a la tarea y una vez termine va obtener todas las tareas pendientes de nuevo.  

// Al llamar a fetchTasks() tras service.delete(task.id), 
// obtienes el arreglo ya sin esa tarea y React actualiza el <ul> al instante.

// service.delete(task.id): Invoca el método delete de tu servicio pasándole task.id 
// para borrar esa tarea en el repositorio (localStorage). Devuelve una Promise.

// .then(() => { fetchTasks(); }): Espera a que termine service.delete(task.id) 
// y, una vez completado el borrado, ejecuta fetchTasks().

// Si no llamaras a fetchTasks() dentro del .then(...), la tarea se borraría de localStorage, 
// pero seguiría viéndose en pantalla hasta que el componente se volviera a renderizar o recargaras la página.

// Al llamar a fetchTasks() tras service.delete(task.id), 
// obtienes el arreglo ya sin esa tarea y React actualiza el <ul> al instante.


// <s> {task.title}</s> , sirve para hacer subrayado al completar task.

// para evitar que el usuario borre por error una tarea sin completar o ya completa , usamos : 

// const isConfirmed = confirm("Estas seguro ?")
//    if (!isConfirmed) return    



//             Mejoras a futuro :

// 1. meterle una alerta al delete para asegurar que el cliente no marco sin querer la task incorrecta. ( Completado )
// 2. Meterle una arrastre a las task para que cambien de posiciones.
// 3. poner fecha de creacion de las tareas y verificar que no choque con createdAt: new Date()


