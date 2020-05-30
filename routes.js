'use strict'

const login = require('./middleware/login')
const logout = require('./middleware/logout')
const signup = require('./middleware/signup')
const schoolClass = require('./middleware/class')
const student = require('./middleware/student')
const subject = require('./middleware/subject')
const teacher = require('./middleware/teacher')
const homework = require('./middleware/homework')
const koaForm = require("formidable-upload-koa");
const authentication = require("./middleware/authenticate")

const options = {
  uploadDir: `${__dirname}/UPLOAD`,
  keepExtensions: true,
  multiples: true
};

module.exports = (router) => {
  // authentication
  router.post('/login', login.validate, login.login)
  router.post('/logout', logout.logout)
  router.post('/signup', signup.validate, signup.signup)
  router.get('/list', login.list)

  // class endpoints
  router.post('/class', schoolClass.validate, schoolClass.createClass)
  router.get('/class', schoolClass.listClass)

  // student endpoints
  router.get('/students', student.listStudent)

  // subject endpoints
  router.post('/subject', subject.createSubject)
  router.get('/subject', subject.listSubject)

  // teacher endpoints
  router.post('/teacher', teacher.createTeacher)
  router.get('/teacher', teacher.listTeacher)

  // homework endpoints
  router.post('/homework', koaForm(options), homework.createHomework)
  router.get('/homework', homework.listHomework)
}
