import { ensureTaskIdIsValid, ensureTaskTitleIsValid } from '../domain/Task';
import type { TaskRepository } from '../domain/TaskRepository';

export const createTaskService = (Repository: TaskRepository) => {

    return {

    getAll: async() => await Repository.getAll(),
    save: async (id: string, title: string , isDone: boolean) => {

        ensureTaskIdIsValid(id);
        ensureTaskTitleIsValid(title);

       await Repository.save({
            id,
            title,
            isDone,
            createdAt: new Date(),
        });

    },
    delete: async (id: string) => {
        ensureTaskIdIsValid(id);

        await Repository.delete(id);
    },

    };
    
    

};


// aqui estara todo lo que necesite nuestra aplicacion o modulo de Task
// el service es el que se comunica con el repository 

// en lugar de crear una clase para cada caso de uso ,
// mejor hacemos un service para todos los casos de uso.

// service va interactuar con la infraestructura por medio del repositorio.


// envolver entre () con los {} ahora si hace return de la funcion , sin eso no estamos haciendo un retorno si no una funcion solamente.

// queda asi 

// export const createTaskService = (Repository: TaskRepository) => ({
//  getAll: () => Repository.getAll(),

// });

// tambien podemos usar el return y envolver los metodos dentro de la llave return {}



// isDone: true → La tarea está completada/marcada como hecha.

// isDone: false → La tarea está pendiente/no completada.

// createdAt: new Date() , fecha en la que se esta llamando al repositorio para guardar la tarea , es decir , cuando se crea la tarea.



// ya el repositorio se encarga de ver y decidir si lo que estamos enviando es un nuevo registro o uno existente , 
// si es uno existente lo actualiza y si es uno nuevo lo crea.


// las 3 clases son repository.getAll() , repository.save() y repository.delete()
// haciendo este service no hubo que hacerle repositorio a cada una aparte.


// await para esperar que async function termine de ejecutarse 
// y devuelva la promesa resuelta antes de continuar con el siguiente paso.