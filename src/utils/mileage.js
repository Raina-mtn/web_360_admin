export function getMileage(mileage) {
  var n = Math.floor(mileage/1000);
  var r;
  if(mileage%1000 >= 100){
    r = (mileage%1000).toFixed(2);
  }else if(mileage%1000 >= 10){
    r = `0${(mileage%1000).toFixed(2)}`
  }else{
    r = `00${(mileage%1000).toFixed(2)}`
  }
  var m =`K${n}+${r}`;
  return m;
}