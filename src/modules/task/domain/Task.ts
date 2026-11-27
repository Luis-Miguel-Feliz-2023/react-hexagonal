import {v4 , validate} from 'uuid'


export interface Task {

    id: string;
    title: string;
    isDone: boolean;
    createdAt: Date;

}

export const generateTaskId = () => v4();
// En lugar de llamar a v4() disperso por distintos componentes o servicios, lo encapsulas en una función con nombre claro (generateTaskId)


export function isValidTaskId(id: string): boolean {
    return validate(id);
}
// return true si el id tiene un formato uuid valido y false si no.
// este no lanza error , de eso se encarga isValidTask.


export function ensureTaskIdIsValid(id:string): void{
    if (!isValidTaskId(id)){
        throw new Error(`Invalid task ID: ${id}`);
    }

}

export function isValidTaskTitle(title: string): boolean {
    return title.length > 0;
}

export function ensureTaskTitleIsValid(title: string): void {
    if (!isValidTaskTitle(title)) {
        throw new Error(`Invalid task title: ${title}`);
    }
}    // en TaskService aseguramos que el titulo de la tarea no este vacio , si lo esta lanzamos un error y no se guarda la tarea.

// Task.ts (Entidad de dominio): Describe qué es una tarea dentro de tu negocio (sus propiedades y reglas, como id, title, isDone, createdAt). 
// No conecta el interior con el exterior; simplemente representa un concepto de tu dominio.


// ensureTaskIdIsValid , va asegurar o validar id , lanzando un error si no es valido.

// validate : si al validar el id es falso , devuelve un booleano si es id o noo , 
// si return falso entonces id task es invalido y lanza el error y si esta todo bien pues no pasa nada.

// uuid : para generar identificadores únicos universales (UUIDs), como por ejemplo 550e8400-e29b-41d4-a716-446655440000.

// ¿Para qué sirve y cuándo se usa?
// Crear IDs sin depender de la base de datos: Puedes generar un identificador único al instante en el cliente 
// (por ejemplo, en React Native) o en el backend antes de guardar un registro.

// Evitar colisiones de nombres o claves: Útil para claves temporales en listas, nombres de archivos subidos, 
// trazas/peticiones (requestId), eventos o entidades creadas offline.

// Versiones más comunes:

// UUID v4: Aleatorio (el más habitual cuando solo necesitas un ID único sin orden).

// UUID v7: Basado en marca de tiempo + aleatoriedad (muy útil para IDs ordenables cronológicamente, 
// como registros o mensajes).


// validate : ¿Para qué sirve en la práctica?
// Fail-fast (fallar rápido): Evita que un id mal formado (como "", "123" o "abc") llegue a capas más profundas, 
// a una consulta de base de datos o a un endpoint donde fallaría de forma menos clara.

// Tipado y seguridad en dominio/aplicación: Es muy común usar funciones ensure... 
// al inicio de un caso de uso, repositorio o servicio para garantizar precondiciones.


// export const generateTaskId = () => v4(); define una función auxiliar llamada generateTaskId que genera un identificador único (UUID v4) cada vez que se ejecuta, 
// llamando a la función v4() (normalmente importada desde la librería uuid).



// ¿Qué hace y por qué es útil aquí ?

// Crea un id único (string): Al crear una nueva tarea (Task), necesitas asignarle un identificador que no se repita con el de otras tareas 
// (por ejemplo, para actualizarla o borrarla con delete(id: string)).

// Centraliza la generación del ID: En lugar de llamar a v4() disperso por distintos componentes o servicios, 
// lo encapsulas en una función con nombre claro (generateTaskId). 
// Si en el futuro decides cambiar cómo generas los IDs (por ejemplo, usar crypto.randomUUID()), solo cambias esa función.