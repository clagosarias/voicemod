# voicemod-challenge

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```


### ReadMe

* He incluido los iconos en un paquete de fuentes svg, así queda optimizado para su uso como iconos. Además, esto permite cambiar los colores sin tener que modificar los svgs directamente y por lo tanto ahorra duplicados de iconos.
  - He tenido un problema que me ha llevado más tiempo del que esperaba, ya que los iconos no están optimizados correctamente para web. He tenido que convertir los strokes de svg en paths para poder usarlos como fuentes con ligature.

* En javascript hay muchas high order functions que permiten abstraer lógica del programador y aumentar la legibilidad (filter, reduce, map, etc).
Sin embargo hay veces que es conveniente usar un for loop de toda la vida. Imagino que dependiendo de esa delgada línea que se busque entre legibilidad y eficiencia.
En el primer caso de carga de voices, he optado por usar una forma eficiente para demostrar que sabría hacerlo si fuese necesario. En el resto de algoritmos, he usado funciones nativas de JS. Sin embargo hay formas mucho más eficaces (como almacenar los tags en un map {tagName: Set\[voices]} y cuando filtras, aplicar ese map en lugar de recorrer el array de voices para aplicar filtros).

* También me he tomado la libertad de modificar el diseño propuesto y añadir el icono de 'search-close' para eliminar una voice favorita cuando está mostrándose en el listado de favoritos.

* Hay cosas que podrían hacerse mejor con más tiempo y que en realidad serían de baja dificultad, como intentar aislar los voice-items en propios componentes o incluso el main__section.

