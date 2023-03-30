import express from 'express';
import { registerController,loginController,testController, forgotPasswordController, updateProfileController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
import { isAdmin,requireSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//routing

router.post('/register',registerController);
//router object
router.post("/login",loginController);
router.post('/forgot-password',forgotPasswordController);
router.get('/test',requireSignIn,isAdmin,testController);
//protected route auth
router.get("/user-auth",requireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
});
//protected admin route auth
router.get("/admin-auth",requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
});
//update profile
router.put('/profile',requireSignIn,updateProfileController);
//orders
router.get("/orders", requireSignIn, getAllOrdersController);
//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);
// order status update
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
  );
export default router;
