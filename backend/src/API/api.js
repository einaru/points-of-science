import { Router } from 'express';

const router = Router();

//Server directory imports:


//GET-Requests:
router.route("/*").get((request, response, next) =>{
    response.status(301).redirect("/index");
});

//POST-Requests:

//PUT-Requests

//DELETE-Requests:

export default router;