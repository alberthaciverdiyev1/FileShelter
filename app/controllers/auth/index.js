const RegisterView = (req, res) => {
  // res.render('../../views/auth/auth.ejs');
  res.render('auth/register')

};

const Register = (req, res) => {
  res.render('auth/login')

};
const LoginView = (req, res) => {
  res.render('auth/login')

};
const Login = (req, res) => {
  res.render('auth/login')

};

module.exports = {
  RegisterView, Register , LoginView , Login
};