import logo from '../images/GitHub.png';

export const Home = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col text-center">
                    <a href="https://github.com/BtCellNet18/crud-react-client">
                        <img src={logo} alt="GitHub" title="GitHub" height="32" width="32" />
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">
                    <h3>CRUD React Client</h3>
                </div>
            </div>
            <div className="row">
                <div className="col text-center">                
                    A sample React client that consumes a web&nbsp;
                    <a href="https://webapi20200129025509.azurewebsites.net">
                        API
                    </a>
                    .
                </div>
            </div>
        </div>
    );
}