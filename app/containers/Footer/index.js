import { connect } from "react-redux";

import Footer from "components/Footer";

const mapDispatchToProps = dispatch => ({
  onButtonClick: () => console.log("button clicked!")
});

export default connect(null, mapDispatchToProps)(Footer);
