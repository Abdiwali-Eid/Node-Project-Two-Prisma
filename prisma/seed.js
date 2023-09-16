import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

async function seed(){
try{
    await prisma.author.create({
        data:{
            
        name:"Axmad Xasan",
        email:"cabdi@gmail.com"
    }
    });

    await prisma.author.create({
        data:{
            
        name:"guuleed faarax",
        email:"cabdi@gmail.com"
    }
    });

    await prisma.Book.create({
        data:{
            
        authorId:1,
        title:"Dhambaalada quraanka",
        price:10,
        image:"https://cilmiye.com/wp-content/uploads/2022/11/Dhambalada-Quranka-768x1024.jpg",
   
    }
    });

    await prisma.Book.create({
        data:{            
        authorId:2,
        title:"10 magac",
        price:10,
        image:"https://scontent.fmgq2-1.fna.fbcdn.net/v/t39.30808-6/322379623_837158727359325_5656345634942486205_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5614bc&_nc_ohc=SrOko76iYUEAX9Ih5a9&_nc_ht=scontent.fmgq2-1.fna&oh=00_AfBl5VzNiR6JQXCAL7l2ZFCwGO2VkhBCh9arlSmCQjjdjA&oe=65081003",
        
    }
    });

    await prisma.bookStore.create({
        data:{            
        bookId:1,
        name:"Iqra books",
        location:'Hargaysa',

        
    }
    });

    await prisma.bookStore.create({
        data:{            
        bookId:2,
        name:"Iqra books",
        location:'Hargaysa',

        
    }
    });

    console.log('seeding is done')
}catch(error){
    console.error(error)
    process.exit(1)
}finally{
    await prisma.$disconnect()
}   

}
seed()