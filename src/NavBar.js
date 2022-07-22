import { Link } from "react-router-dom";
const NavBar = () => {
    return ( 
        <div className="box1">
            <div className="navbar-background">
            <div>
            <div className="navbar1"><Link  to="/">home</Link></div>
            <div className="navbar2"><Link  to="/addpurchase">Add your purchase</Link></div>
            <div className="navbar3"><Link  to="/view">view</Link></div>
            </div>            
            </div>
            
        </div>
    );
}
 
export default NavBar;