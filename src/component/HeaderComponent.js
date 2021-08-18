import React,{Component} from 'react'

class HeaderComponent extends Component{

    render(){
        return(
            <div id="top-nav" className="navbar navbar-inverse navbar-static-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                            <span className="icon-toggle"></span>
                         </button>
                        <a className="navbar-brand" >Welcome, <span>Dipankar Dutta</span> </a>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <div className="btn-group">
                                    <button type="button" className="btn btn-primary"><i className="fa fa-hourglass-end" aria-hidden="true"></i></button>
                                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="caret"></span>
                                        <span className="sr-only">Toggle Dropdown</span>
                                    </button>

                                    <ul style={{ backgroundColor: "aliceblue" }} className="dropdown-menu">
                                        <li style={{ backgroundColor: "aliceblue" }}><a href="/logout"><i className="fa fa-sign-out"></i> Logout</a></li>
                                    </ul>

                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderComponent;