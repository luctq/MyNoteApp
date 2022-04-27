import { connect } from "react-redux";
import Login from "../screens/Login";
import { login } from "../redux/reducers/Auth";

const mapStateToProps = (state) => ({
});

const mapActionToProps = { login };

export default connect(mapStateToProps, mapActionToProps)(Login);
