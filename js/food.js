class Food{
    constructor(foodStock, lastFed){
        this.image=loadImage("Images/Milk.png");
        this.foodStock =foodStock;
        this.lastFed;
        this.lastFed =lastFed;

    }

    getFoodStock(){
        database.ref('Food').on("value",(data)=>{
            this.foodStock=data.val();
        });
       
        console.log(this.foodStock);

    }

    updateFoodStock(foodStock){

          //deductFood();
          if(foodStock<=0){
           foodStock=0;
          }else{
            foodStock=foodStock-1;
          } 
          database.ref('/').update({
            Food:foodStock,
            FeedTime:this.lastFed
            
          })
    }

    deductFood(){

        if(this.foodStock<=0){
            this.foodStock=0;
          }else{
            this.foodStock=this.foodStock-1;
          } 


    }

    display(){

        var x=80,y=100;

        imageMode(CENTER);
        image(this.image,700,220,70,70);

        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){

                if(i%10===0){
                    x=80;
                    y=y+50;
                }
                AudioWorkletNode.add
               image(this.image,x,y,50,50);
               x=x+30;
            }

        }


    }


}