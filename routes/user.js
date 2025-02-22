const { Router } = require("express");

const { check } = require("express-validator");

const { fieldsValidate } = require("../middlewares/fields-validate");
const {
  validateJWT,
  validateADMIN_ROLE,
  validateADMIN_ROLE_SameUser,
} = require("../middlewares/validateJWT");

const {
  getUsers,
  createUsers,
  updateUser,
  deleteUser,
  getUsersId,
} = require("../controllers/user");

const router = Router();

router.get("/", validateJWT, getUsers);
router.get("/:id", validateJWT, getUsersId);
router.post(
  "/",
  [
    check("name", "The name is required").not().isEmpty(),
    check("password", "The password is required").not().isEmpty(),
    check("email", "The email is required").isEmail().not().isEmpty(),
    fieldsValidate,
  ],
  createUsers
);
router.put(
  "/:id",
  [
    [validateJWT, validateADMIN_ROLE_SameUser],
    check("name", "The name is required").not().isEmpty(),
    check("role", "The role is required").not().isEmpty(),
    check("email", "The email is required").isEmail().not().isEmpty(),
    fieldsValidate,
  ],
  updateUser
);
router.delete("/:id", [validateJWT, validateADMIN_ROLE], deleteUser);

module.exports = router;
