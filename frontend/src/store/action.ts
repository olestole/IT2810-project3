//Funksjoner som returnerer action-objekter
// export function addPerson(personName: string) {
//   return {
//     type: 'ADD_PERSON',
//     payload: personName,
//   } as const;
// }
// export function removePerson(id: number) {
//   return {
//     type: 'REMOVE_PERSON',
//     payload: id,
//   } as const;
// }

export const increment = () => {
  return {
    type: 'INCREMENT',
  } as const;
};

export const decrement = () => {
  return {
    type: 'DECREMENT',
  } as const;
};
