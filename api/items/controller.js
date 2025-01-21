import { response } from 'express';
import  {
   createItem, 
   getItemById, 
   deleteItem, 
   getAllItems, 
   updateItem 
  }  from './repository.js';



export const  create_item = async(req, res)=> {

  try {
        if (!req.user || !req.body) throw new Error ('Item not found' ); 
       req.body.createdBy = req.user.userId;
        const Item = await createItem(req.body);
        res.status(201).send({
          data : Item,
          messages : "Item Created Successfully",
          responseCode : 201
        });
      } catch (error) {
        console.error('Error creating Item:', error);
        res.status(400).send({ message: 'Failed to create Item', error });
      }
  }


  export const   get_items = async (req, res) =>{
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const result = await getAllItems(page, limit);
      res.status(200).send({
          data : result,
          messages : "Item fetched Successfully",
          responseCode : 200
      });
    } catch (error) {
      res.status(400).send({
         message: 'failed to fetch item', 
         error : error,
         responseCode : 400

        });
    }
  }



export const get_item = async (req, res) =>{
    try {
      const result = await getItemById(req.params.id);
      if (!result) throw new Error ( 'Item not found' );

      res.status(200).send({
        data : result,
        messages : "Item fetched Successfully",
        responseCode : 200
      });
    } catch (error) {
      res.status(400).send({
        message: 'failed to fetch item', 
        error : error,
        responseCode : 400

       });
    }
}

  export const  update_item= async(req, res) =>{
    
    let result = await getItemById(req.params.id);
    if (!result) throw new Error ( 'Item not found' );
      try {
         result = await updateItem(req.params.id, req.body);
        res.status(200).send({
        data : result,
        messages : "Item updated Successfully",
        responseCode : 200
        });

      } catch (error) {
        res.status(400).send({
          message: 'failed to fetch item', 
          error : error,
          responseCode : 400
 
         });
        }} 



export const delete_item = async(req, res) =>{

  const result = await getItemById(req.params.id);
  if (!result) throw new Error ('Item not found');
  
    try {
      const Item = await deleteItem(req.params.id);
      if (!Item) {
        return res.status(404).send('Item not found' );
      }
      res.status(200).send({
       message : 'Item deleted successfully',
       responseCode : 200
      });
    } catch (error) {
      res.status(400).send({
         message: 'Internal Server Error',
          error :error,
          responseCode : 400

        });
    }
  }



