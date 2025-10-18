import {Store} from "../models/store.model.js";


const registerStore = async (req, res) => {
    try{
        const{name,address}=req.body;

        if(!name || !address){
            return res.json({message:"All fields required"})
        }

        const store = new Store({name,address,ownerEmail:req.user.email})
        await store.save()
        return res.json({message:"Successfully registered"})
    }catch(err){
        return res.json({message:"Something went wrong in registering store"})
    }
}

const updateStore = async (req, res) => {
    try{
        const{id} = req.params;
        const updates = req.body;

        const store = await Store.findOneAndUpdate(
            {_id: id , ownerEmail:req.user.email},
            updates,
            { new: true }
        )
        if(!store) return res.json({message:"store not found"})
        res.json({message:"store updated"})
    }catch(err){
        return res.json({message:"store not updated"})
    }
}

const getStore = async (req, res) => {
    try {
        const { id } = req.params;

        const store = await Store.findOne({ _id: id, ownerEmail: req.user.email });
        if (!store) return res.status(404).json({ message: "Store not found" });

        res.json({ store });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching store" });
    }
};


const getAllStores = async (req, res) => {
    try {
        const stores = await Store.find({ ownerEmail: req.user.email });
        res.json({ stores });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching stores" });
    }
}

export {registerStore,updateStore,getStore,getAllStores}