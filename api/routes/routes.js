const express = require("express");
const router = express.Router();

/*
 * ===================
 *   CONTROLERS IMPORTS
 * ===================
 */
const teacherController = require('../controllers/teacher');

const schoolSuppliesController = require('../controllers/schoolSupplies');

const schoolsController = require('../controllers/schools');

const schoolTypesController = require('../controllers/schoolTypes');

const parentsController = require('../controllers/parents');

const libraryController = require('../controllers/library');


const citiesController = require('../controllers/cities');


/*
 * ===================
 *   AUTHORIZATION CHECK
 * ===================
 */
const checkAuth = require('../middleware/check-auth');

/*
 * ===================
 *   TEACHER ROUTES
 * ===================
 */
router.post("/teacher-access/", teacherController.teacher_access);

router.post("/teacher-create/", checkAuth, teacherController.teachers_create_teacherData);

/*
 * ===================
 *   SCHOOL SUPPLIES ROUTES
 * ===================
 */
router.get("/school-supplies/", checkAuth, schoolSuppliesController.schoolSupplies_get);

router.post("/school-supplies/", checkAuth, schoolSuppliesController.schoolSupplies_create_one);

router.delete("/school-supplies/:Id/", checkAuth, schoolSuppliesController.schoolSupplies_delete_one);

/*
 * =================
 *   SCHOOLS ROUTES
 * =================
 */
router.get("/schools/", schoolsController.schools_get_all);

router.post("/schools/", schoolsController.Schools_create_school);

/*
 * =====================
 *   SCHOOL-TYPES ROUTES
 * =====================
 */
router.get("/school-type/", schoolTypesController.schoolTypes_get_all);

router.post("/school-type/", schoolTypesController.schoolTypes_create_schoolType);

router.get("/school-type/teacher/", schoolTypesController.schoolTypes_get_teacher_level);

router.delete("/school-type/:Id/", schoolTypesController.schoolTypes_delete_schoolType);

/*
 * ===================
 *   PARENTS ROUTES
 * ===================
 */
router.get("/parents/", parentsController.parents_get_all);

router.post("/parents/", parentsController.parents_create_parent);

/*
 * ===================
 *   LIBRARY ROUTES
 * ===================
 */
router.get("/library/", libraryController.libraries_get_all);

router.post("/library/", libraryController.libraries_create_library);
/*
 * ===================
 *   CITIES ROUTES
 * ===================
 */
router.get("/cities/:keyword/", citiesController.cities_get_all);

router.post("/cities/", citiesController.cities_create_city);

module.exports = router;