import {Item} from "../../models/item.js"



export const createItem= async(data)=> {
      let  item = new Item(data);
       await item.save();
      return item
    }
  
  export const getItemById = async (id)=> {
      let item = await Item.findById(id).populate('createdBy', 'username email');
    return item
  }

  export const  updateItem = async(id, data)=> {
  
    let item = await Item.findByIdAndUpdate(id, data, { new: true });

    return  item
  }

export const deleteItem =  async (id) =>{
    let item = await Item.findByIdAndDelete(id);
    return  item
  }


  export const getAllItems = async (page, limit,search ) => {
    try {
      const skip = (page - 1) * limit;
      const searchFilter = search
        ? { name: { $regex: search, $options: 'i' } } 
        : {};
  
     
      const items = await Item.find(searchFilter).skip(skip).limit(limit);
      const totalItems = await Item.countDocuments(searchFilter); 
      const totalPages = Math.ceil(totalItems / limit);
  
      return {
        items,
        totalPages,
        currentPage: page,
      };
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  };
  

