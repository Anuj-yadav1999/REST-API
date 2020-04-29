const express = require('express')
const router = express.Router()
const touristMan = require('../models/tourists')

//Getting all travellers
router.get('/', async (req, res) => {
    try{
        const get_all_tourist = await touristMan.find()
        res.json(get_all_tourist)
    } catch(error){
        res.status(500).json({message: error.message})
    }
})

//Getting one traveller
router.get('/:id', getTourists, (req, res) => {
    res.json(res.tourist)
})

//Creating one traveller
router.post('/', async (req, res) => {
    const new_traveller = new touristMan({
        name: req.body.name,
        age: req.body.age
    })

    try{
        const welcome_traveller = await new_traveller.save()
        res.status(201).json(welcome_traveller)
    } catch(error){
        res.status(400).json({message: error.message})
    }
})

//Updating one traveller
router.patch('/:id', getTourists, async (req, res) => {
    if(req.body.name != null){
        res.tourist.name = req.body.name
    }
    if(req.body.age != null){
        res.tourist.age = req.body.age
    }
    try{
        const updated_tourist = await res.tourist.save()
        res.status(201).json(updated_tourist)
    } catch(error ) {
        res.status(400).json({message: error.message})
    }
})

//Delete one traveller
router.delete('/:id', getTourists, async (req, res) => {
    try{
        await res.tourist.remove()
        res.json({message: "Tourist Deleted Successfully"})
    } catch(error) {
        res.error(500).json({message: error.message})
    }
})

//middleware function
async function getTourists(req, res, next){
    let tourist
    try{
        tourist = await touristMan.findById(req.params.id)
        if(tourist == null){
            return res.status(404).json({message: 'Tourist Not Found'})
        }
    } catch(error) {
        return res.status(500).json({message: error.message})
    }
    res.tourist = tourist
    next()
}

module.exports = router