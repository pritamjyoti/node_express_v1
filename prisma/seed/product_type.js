const {PrismaClient}= require('@prisma/client');
const prisma = new PrismaClient();


const product_type=[{type:"sample Product"},{type:"Group Product"},{type:"Single Product 2"}];

const load = async()=>{
    try{
        await prisma.product_type.deleteMany({});
        await prisma.product_type.createMany({data:product_type});
        console.log('product_type success');
    }
    catch(e){
        console.log(e);
    }
}
load();
