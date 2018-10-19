import * as dataset from "./dataset";
import * as global from "./global";
/**
 * A two dimensional example: x and y coordinates with the label.
 */
export type Example2D = {
  x: number,
  y: number,
  label: number
};

type Point = {
  x: number,
  y: number
};

//Fonction test lecture fichier contenant un jeu de données:
export function classifyFileDataInput():
  Example2D[] {
    let points: Example2D[] = [];

    function genRand(max: number, min: number, label: number) {
      for(let i = 0; i < 500 / 2; i++){
        let x = randUniform(max, min);
        let y = randUniform(max, min);
        points.push({x, y, label});
      }
    }
    genRand(5, -5, 1);
    genRand(5, -5, -1);

    var text;
    var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function(){
    text = reader.result;
    lireFichierTexteInput(text);
      //console.log(reader.result.substring(0, 200));
    };
    reader.readAsText(input.files[0]);
  };
    function lireFichierTexteInput(text){
      points = [];
      //On peut récupérer puis traiter le texte du fichier
      //alert(text);
      var texteComplet = text;
      var ss: string[] = texteComplet.split(";");
      var k: number = 1;
      var x: number;
      var y: number;
      var label: number;
           for(var i of ss){
             //alert(parseInt(i));
             if (k==1){
               x = parseInt(i);
             }else if (k==2){
               y = parseInt(i);
             }else if (k==3){
               label = parseInt(i);
               k=0;
               points.push({x, y, label});
             }
             k++;
           }
    }
    global.datas = points;
    return points;
  }

  /**
 * Returns a sample from a uniform [a, b] distribution.
 * Uses the seedrandom library as the random generator.
 */
function randUniform(a: number, b: number) {
  return Math.random() * (b - a) + a;
}