import express from 'express'
import prisma from './lib/index.js';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        
        const authors = await prisma.author.findMany();
        if(authors.length === 0) {
            return res.status(404).json({status: 404, message: "Authores not found"});
        }

        res.json(authors)

    }catch(error){
    res.status(500).json({error: error.message});
  }
});

router.get('/:id',async(req, res)=>{
try{
    const {id}=req.params;
    const author= await prisma.author.findUnique({
        where:{
            id:Number(id),
        },
    });
    if(!author){
        return res.status(404).json({error:'author not found'})
    }
    res.json(author);
}catch(error){
    res.status(500).json({error: error.message});
}

})



router.post("/", async (req, res) => {
    try {
        
        const {name, email} = req.body;

        const author = await prisma.author.create({
            data: {
                name,
                email,
            },
        });

        if(!author) {
            return res.status(400).json({status: 400, message: "Author was not created!"})
        }

        res.status(200).json({status: 200, message: "Author successFully created!"},author)

    } catch (error) {
        res.status(500).json({status: 500, message: error.message})
    }
});


router.put('/:id',async(req, res)=>{
    try{
const {id}=req.params;
const {name,email}=req.body;
const author=await prisma.author.update({
    where:{
        id:Number(id),
    },
    data:{
        name,
        email,
    }
});
if(!author){
    return  res.status(409).json('Author already exists');
}

res.status(200).json({status: 200, message: "Author updated successfully"},author)

}catch(error){
        res.status(500).json({error: error.message});
    }

});

router.delete('/:id',async(req, res)=>{
    try{
const {id}=req.params;
const author=await prisma.author.delete({
    where:{
        id:Number(id),
    },
});
if(!author){
    return  res.status(409).json('Author already exists');
}
res.json[author];
res.status(200).json({status: 200, message: "Author successFully deleted!"})

}catch(error){
        res.status(500).json({error: error.message});
    }

});


export default router;