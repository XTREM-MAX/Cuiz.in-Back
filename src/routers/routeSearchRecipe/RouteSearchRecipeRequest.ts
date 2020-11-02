export default interface RouteSearchRecipeRequest {
  text: string,
  time?: string, //Format : "00: 00"
  diet?: string, //"" if none
  nutriscore: string,
  category: number[],
  page: number
}