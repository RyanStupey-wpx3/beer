const beers = ['Add some beers to your list'];
let id = 100;

module.exports = {

    create(req, res){
        beers.push({
            id: id,
            name: req.body.name,
            rating: req.body.rating,
            notes: req.body.notes
        })
        id++;
        res.json(beers);
    },

    read(req, res){
        res.json(beers);
    },

    update(req, res){
        const beerId = req.body.id;
        const index = beers.findIndex(beer => beer.id == parseInt(beerId, 10))
        beers[index] = {
            id: req.body.id,
            name: req.body.name,
            rating: req.body.rating,
            notes: req.body.notes
        }
        res.json(beers);
    },

    delete(req, res){
        const beerId = req.params.id;
        const index = beers.findIndex(beer => beer.id === parseInt(beerId, 10));
        beers.splice(index, 1);
        res.json(beers);
    }

}
