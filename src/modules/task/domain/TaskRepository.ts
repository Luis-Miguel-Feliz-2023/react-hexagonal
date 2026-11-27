// Puerto 
// 
import type {Task} from './Task';

export interface TaskRepository {

    getAll(): Promise<Task[]>;
    save(task: Task): Promise<void>;
    delete(id: string): Promise<void>;
}


// repository es el lugar donde se guardan las tareas(Task) y salen
// devuelve todas las tareas 


// Asincrono : getAll(): Promise<Task[]>;   lo cual es mucho mejor y más realista para cuando conectas una API o base de datos
// Sincrono : getAll() : Task[]; 

// metodos getAll , save , delete


// Ejemplo

// ¿Cómo se conecta esto con tu app principal ?

// Este ejercicio con task te sirve como laboratorio perfecto para dominar Puertos (TaskRepository) y Adaptadores (infrastructure) 
// antes de aplicarlo a tus módulos reales (account, matching, formation) en React Native. 
// La única diferencia cuando lo lleves a tu app móvil es que 
// agregarás una carpeta presentation/ (pantallas, componentes y hooks) dentro de cada módulo.



// ¿Qué significa Promise<void> en save y delete?
// Promise<...>: Significa que la operación es asíncrona (tarda un momento en completarse, 
// como guardar en una base de datos, localStorage o hacer una petición a una API) y devolverá una promesa.

// void dentro de la promesa: Significa que cuando la promesa se resuelva, no te entregará ningún dato (como un objeto o un texto); 
// solo te avisa que la acción terminó (o lanza un error si falló).

// Comparación rápida con getAll()
// getAll(): Promise<Task[]> → La promesa sí devuelve un valor: un arreglo de tareas (Task[]).

//save(task: Task): Promise<void> → La promesa solo completa el guardado; no devuelve una tarea ni un número.

// delete(id: string): Promise<void> → La promesa solo completa la eliminación; no devuelve un valor de resultado.