/**
 * Lo que más repiten los clientes en sus reseñas, contado con palabras propias
 * (no son citas literales).
 */

export type Value = {
  title: string;
  text: string;
};

export const values: readonly Value[] = [
  {
    title: "De toda la vida",
    text: "Hay clientes que se sentaron en el sillón por primera vez de niños y siguen viniendo de mayores.",
  },
  {
    title: "Trato cercano",
    text: "Julián atiende con la cercanía de siempre: aquí nadie es un número y siempre hay un rato para charlar.",
  },
  {
    title: "Para todas las edades",
    text: "Del primer corte infantil al clásico de siempre: cortes de todo tipo, hechos con oficio.",
  },
  {
    title: "Flexibilidad con las citas",
    text: "Si te surge algo, llama y se busca otro hueco. Sin complicaciones.",
  },
];
